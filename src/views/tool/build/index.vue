<template>
  <div class="container">
    <el-container>
      <el-aside width="300px" style="background-color: white; overflow: hidden">
        <div class="left-board">
          <div class="logo-wrapper">
            <div class="logo">
              <img :src="logo" alt="logo" /> Form Generator
            </div>
          </div>
          <!-- 左边组件库 -->
          <el-scrollbar class="left-scrollbar" height="90vh">
            <el-tabs v-model="leftActiveTab">
              <el-tab-pane label="组件库" name="componentLibrary">
                <components-library :idGlobal="idGlobal" @updateCloneComponent="updateCloneComponent" />
              </el-tab-pane>
              <el-tab-pane label="模板库" name="templateLibrary"> </el-tab-pane>
            </el-tabs>
          </el-scrollbar>
        </div>
      </el-aside>
      <el-main style="padding: 5px">
        <div class="center-board">
          <!-- 编辑器 -->
          <draggable class="drawing-board" :list="drawingList" :animation="340" group="componentsGroup"
            item-key="renderKey">
            <template #item="{ element, index }">
              <dynamic-component :key="element.renderKey" :drawing-list="drawingList" :elementData="element" :index="index"
                :active-id="activeId" @activeItem="activeFormItem" @copyItem="drawingItemCopy"
                @deleteItem="drawingItemDelete" />
            </template>
          </draggable>
          <div v-show="!drawingList.length" class="empty-info">
            从左侧拖入或点选组件进行表单设计
          </div>
        </div>
      </el-main>
      <el-aside width="350px">
        <!-- 右边属性库 -->
        <right-panel :active-data-property="activeData" :form-conf="{}" :show-field="!!drawingList.length" />
      </el-aside>
    </el-container>
  </div>
</template>
<script setup>
import ComponentsLibrary from "./components/ComponentsLibrary";
import draggable from "vuedraggable/dist/vuedraggable.common"; // 导入 vuedraggable 组件
import logo from "@/assets/logo/logo.png"; // 导入 logo 图片资源
import DraggableItem from "./components/DraggableItem"; // 导入可拖拽表单项组件
import DynamicComponent from "./components/DynamicComponent";
import RightPanel from "./RightPanel"; // 导入右侧属性面板组件
import { watch } from "vue";
const leftActiveTab = ref("componentLibrary"); // 当前左侧活动标签页
const drawingList = ref([]); // 当前表单项列表
const { proxy } = getCurrentInstance(); // 获取当前组件实例
const idGlobal = ref(100); // 全局唯一 ID 生成器
const activeData = ref([]); // 当前激活的表单项数据
const activeId = ref(null); // 当前激活的表单项 ID
const generateConf = ref(null); // 生成配置
provide('createIdAndKey', createIdAndKey);
function updateCloneComponent(element, from) {
  if (from === "click") {
    drawingList.value.push(element); // 将克隆的组件添加到表单项列表
    idGlobal.value = element.id;
    activeFormItem(element); // 激活新添加的组件
  } else {
    activeData.value = element; // 更新当前激活的表单项数据
    idGlobal.value = element.id;
    activeId.value = idGlobal.value; // 更新当前激活的表单项 ID
  }
}

// 复制项目
function drawingItemCopy(item, parent) {
  let clone = JSON.parse(JSON.stringify(item)); // 深拷贝表单项
  clone = createIdAndKey(clone); // 为克隆的表单项生成唯一的 ID 和 key
  parent.push(clone); // 将克隆的表单项添加到父级列表
  activeFormItem(clone); // 激活新复制的表单项
}

// 为表单项生成唯一的 ID 和 key
function createIdAndKey(clone) {
  clone.id = ++idGlobal.value; // 为克隆的组件生成唯一的 id
  if (clone.type === "form") {
    clone.attr.vModel = `field-${clone.id}`; // 动态生成 vModel
  }
  clone.renderKey = +new Date(); // 改变 renderKey 以强制更新组件
  // 处理数据
  if (clone?.slots?.default &&Array.isArray(clone.slots.default.slotOptions)) {

   clone.slots.default.slotOptions = clone.slots.default.slotOptions.map((data) => createIdAndKey(data)); // 递归处理数据列表
  }
  // // 处理子项列表
  // if (Array.isArray(clone.child)) {
  //   clone.child = clone.child.map((child) => createIdAndKey(child)); // 递归处理子项
  // }
  return clone; // 返回更新后的表单项
}

// 删除表单项
function drawingItemDelete(index, parent) {
  parent.splice(index, 1); // 从父级列表中删除表单项
  nextTick(() => {
    const len = drawingList.value.length; // 获取剩余表单项数量
    if (len) {
      activeFormItem(drawingList.value[len - 1]); // 激活最后一个表单项
    }
  });
}

// 激活表单项
function activeFormItem(element) {
  if (!element.id) {
    element.id = ++idGlobal.value;
  }
  if (!element.renderKey) {
    element.renderKey = +new Date();
  }
  activeData.value = element; // 设置当前激活的表单项数据
  activeId.value = element.id; // 设置当前激活的表单项 ID
}

watch(() => activeData, (val) => { 
  console.log(val);
},
   { immediate: true,deep:true });
</script>

<style lang="scss">
$lighterBlue: #409eff;

.container {
  width: 100%;
  background-color: var(--el-bg-color-overlay);
  height: calc(100vh - 50px - 40px);
  overflow: hidden;

  .left-board {
    width: 260px;
    height: calc(100vh - 50px - 40px);

    .logo-wrapper {
      position: relative;
      height: 42px;
      border-bottom: 1px solid var(--el-border-color-extra-light);
      box-sizing: border-box;

      .logo {
        position: absolute;
        left: 12px;
        top: 6px;
        line-height: 30px;
        color: #00afff;
        font-weight: 600;
        font-size: 17px;
        white-space: nowrap;

        >img {
          width: 30px;
          height: 30px;
          vertical-align: top;
        }

        .github {
          display: inline-block;
          vertical-align: sub;
          margin-left: 15px;

          >img {
            height: 22px;
          }
        }
      }
    }

    .left-scrollbar {
      .el-tabs__nav-scroll {
        display: flex;
        justify-content: center;
      }

      .el-scrollbar__wrap {
        box-sizing: border-box;
        overflow-x: hidden !important;
        margin-bottom: 0 !important;

        .components-list {
          padding: 8px;
          box-sizing: border-box;
          height: 100%;

          .components-title {
            font-size: 14px;
            // color: #222;
            margin: 6px 2px;

            .svg-icon {
              // color: #666;
              font-size: 18px;
              margin-right: 5px;
            }
          }

          .components-draggable {
            padding-bottom: 20px;

            .components-item {
              display: inline-block;
              width: 48%;
              margin: 1%;
              transition: transform 0ms !important;

              .components-body {
                padding: 8px 10px;
                background: var(--el-border-color-extra-light);
                font-size: 12px;
                cursor: move;
                border: 1px dashed var(--el-border-color-extra-light);
                border-radius: 3px;

                .svg-icon {
                  // color: #777;
                  font-size: 15px;
                  margin-right: 5px;
                }

                &:hover {
                  border: 1px dashed #787be8;
                  color: #787be8;

                  .svg-icon {
                    color: #787be8;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .center-board {
    position: relative;
    width: 100%;
    min-height: 800px;

    .drawing-board {
      position: absolute;
      width: 100%;
      min-height: 800px;
      padding: 10px;
      background-color: aquamarine;
    }

    .empty-info {
      position: absolute;
      top: 40%;
      width: 100%;
      height: 25px;
      text-align: center;
      font-size: 18px;
      color: #ccb1ea;
      letter-spacing: 4px;
    }
  }
}

.draggable-item {
  cursor: move;
  position: relative;
  margin-bottom: 10px;

  .drag-wrapper {
    height: auto;
    min-height: 200px;
  }

  .field-wrapper {
    margin: 0;
  }

  .draggable-item-mark {
    z-index: 9999;
    color: aliceblue;
    position: absolute;
    background-color: #409eff;
    text-align: center;
    top: 1px;
    left: 1px;
    opacity: 0.5;
    font-size: 12px;
    font-style: normal;
    padding: 4px;

    .draggable-item-name {
      padding-left: 10px;
      padding-bottom: 20px;
    }
  }

  .draggable-item-tool {
    position: absolute;
    color: aliceblue;
    left: calc(100% - 49px);
    bottom: 4px;
    font-size: 12px;
    font-style: normal;

    .drawing-item-copy,
    .drawing-item-delete {
      background-color: #409eff;
      padding: 7px 6px 3px 6px;
      cursor: pointer;
    }
  }
  .can-drag {
    border: 1px dashed #f50000
  }
}

.draggable-item-active {
  &>.not-drag {
    border: 1px solid #f50000;
  }

  &>.draggable-item-mark,
  &>.draggable-item-tool {
    display: block;
  }
}

.draggable-item-inactive {

  &>.draggable-item-mark,
  &>.draggable-item-tool {
    display: none;
  }
}
</style>
