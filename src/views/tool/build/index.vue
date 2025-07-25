<template>
  <div >
    <el-container class="container">
      <el-aside width="300px" class="left-aside-box">
        <el-tabs v-model="leftActiveTab" class="left-tabs">
          <el-tab-pane label="组件库" name="componentLibrary">
            <el-scrollbar class="left-scrollbar">
              <components-library
                :idGlobal="idGlobal"
                @updateCloneComponent="updateCloneComponent"
              />
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="模板库" name="templateLibrary"> 123</el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-main style="padding: 5px" class="main-box">
        <el-card body-class="card-body" header-class="card-header">
          <template #header>
            <!-- 编辑器工具栏 -->
            <div class="action-bar">
              <el-button
                icon="topRight"
                type="primary"
                text
                @click="importJson"
              >
                导入模板
              </el-button>
              <el-button icon="View" type="primary" text @click="openPreview">
                预览模板
              </el-button>
              <el-button icon="Delete" text @click="empty" type="danger">
                清空模板
              </el-button>
            </div>
          </template>
          <el-scrollbar class="center-scrollbar">
            <div class="center-board">
              <!-- 编辑器 -->
              <draggable
                class="drawing-board"
                :list="drawingList"
                :animation="340"
                group="componentsGroup"
                item-key="tagLabel"
              >
                <template #item="{ element, index }">
                  <dynamic-component
                    :key="element.renderKey"
                    :drawing-list="drawingList"
                    :elementData="element"
                    :index="index"
                    :active-id="activeId"
                    @activeItem="activeComponentItem"
                    @copyItem="drawingItemCopy"
                    @deleteItem="drawingItemDelete"
                  />
                </template>
              </draggable>
              <div v-show="!drawingList.length" class="empty-info">
                从左侧拖入或点选组件进行表单设计
              </div>
            </div>
          </el-scrollbar>
        </el-card>
      </el-main>
      <el-aside width="300px" class="right-aside-box">
        <!-- 右边属性库 -->
        <right-panel
          :active-data-property="activeData"
          :generate-conf="generateConf"
        />
      </el-aside>
    </el-container>
    <preview-dialog
      v-model="previewDialogVisible"
      :formTemplate="componentTemplateData"
      :jsonData="jsonString"
    />
  </div>
</template>
<script setup name="Build">
import ComponentsLibrary from "./components/ComponentsLibrary";
import draggable from "vuedraggable/dist/vuedraggable.common"; // 导入 vuedraggable 组件
import PreviewDialog from "./PreviewDialog"; // 导出预览对话框组件
import DynamicComponent from "./components/DynamicComponent";
import RightPanel from "./RightPanel"; // 导入右侧属性面板组件
import beautifier from "js-beautify"; // 用于格式化生成的代码
import { defaultConfig  }  from "@/utils/generator/defaultConfig"
import { makeUpHtml } from "@/utils/generator/buildVue";
const leftActiveTab = ref("componentLibrary"); // 当前左侧活动标签页
const { proxy } = getCurrentInstance(); // 获取当前组件实例
const idGlobal = ref(100); // 全局唯一 ID 生成器
const activeData = ref({}); // 当前激活的表单项数据
const activeId = ref(null); // 当前激活的表单项 ID
const componentTemplateData = ref(""); // 存储生成的表单模板
const jsonString = ref("");
const previewDialogVisible = ref(false); // 控制预览对话框显示状态
provide("createIdAndKey", createIdAndKey);

const componentConf=reactive({
      drawingList:[],
      generateConf:defaultConfig
})

const {drawingList,generateConf}= toRefs(componentConf)

function updateCloneComponent(element, from) {
  if (from === "click") {
    drawingList.value.push(element); // 将克隆的组件添加到表单项列表
    idGlobal.value = element.id;
    activeComponentItem(element); // 激活新添加的组件
  } else {
    activeData.value = element; // 更新当前激活的表单项数据
    idGlobal.value = element.id;
    activeId.value = idGlobal.value; // 更新当前激活的表单项 ID
  }
}

// 复制组件
function drawingItemCopy(item, parent) {
  let clone = JSON.parse(JSON.stringify(item)); // 深拷贝表单项
  clone = createIdAndKey(clone); // 为克隆的表单项生成唯一的 ID 和 key
  parent.push(clone); // 将克隆的表单项添加到父级列表
  activeComponentItem(clone); // 激活新复制的表单项
}

// 为表单项生成唯一的 ID 和 key
function createIdAndKey(clone) {
  clone.id = ++idGlobal.value; // 为克隆的组件生成唯一的 id
  if (clone.attr["v-model"]) {
    clone.vModel= `field-${clone.id}`;
  }
  clone.renderKey = +new Date(); // 改变 renderKey 以强制更新组件
  // 处理数据
  if (clone?.slots?.default && Array.isArray(clone.slots.default.slotOptions)) {
    clone.slots.default.slotOptions = clone.slots.default.slotOptions.map(
      (data) => createIdAndKey(data)
    ); // 递归处理数据列表
  }
  return clone; // 返回更新后的表单项
}

// 删除表单项
function drawingItemDelete(index, parent) {
  parent.splice(index, 1); // 从父级列表中删除表单项
  nextTick(() => {
    const len = drawingList.value.length; // 获取剩余表单项数量
    if (len>0) {
      activeComponentItem(drawingList.value[len - 1]); // 激活最后一个表单项
    }
    else {
      idGlobal.value = 100; // 重置全局 ID
      activeData.value = {};
    }
  });
}

// 激活表单项
function activeComponentItem(element) {
  if (!element.id) {
    element.id = ++idGlobal.value;
  }
  if (!element.renderKey) {
    element.renderKey = +new Date();
  }
  activeData.value = element; // 设置当前激活的表单项数据
  activeId.value = element.id; // 设置当前激活的表单项 ID
}
function importJson() {}

// 打开预览对话框并生成代码
function openPreview() {
  componentTemplateData.value = generateCode(); // 生成代码模板
  jsonString.value=JSON.stringify(generateConf,null,2);
  previewDialogVisible.value = true; // 显示预览对话框
}

// 清空所有表单项
function empty() {
  proxy.$modal
    .confirm("确定要清空所有组件吗？", "提示", { type: "warning" }) // 弹出确认对话框
    .then(() => {
      idGlobal.value = 100; // 重置全局 ID
      drawingList.value = []; // 清空表单项列表
      activeData.value = {};
    });
}
// 生成代码
function generateCode() {
  generateConf.components=drawingList.value;
  const html = makeUpHtml(generateConf); // 生成 HTML 模板
  return beautifier.html(html); // 格式化并返回生成的代码
}
</script>

<style lang="scss">
$lighterBlue: #409eff;
$deepBlue: #2e73ff;
$deepRed: #ff2e2e;
$deepGreen: #105b0e;
$dragColor: #340b49b4;
.container {
  width: 100%;
  height: calc(100vh - 50px - 40px);
  overflow: hidden;
  .left-aside-box {
    background-color: var(--el-bg-color-overlay);
    padding: 5px;
    margin-top: 5px;
    box-shadow: var(--el-box-shadow-light);
    border-radius: 5px;
    overflow: hidden;
    height: calc(100vh - 50px - 50px);
    .left-tabs {
      .el-tabs__nav-scroll {
        display: flex;
        justify-content: space-around;
      }
      .left-scrollbar {
        height: calc(100vh - 50px - 100px);
        .el-scrollbar__wrap {
          box-sizing: border-box;
          overflow-x: hidden !important;
          margin-bottom: 0 !important;

          .components-list {
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
  }

  .main-box {
    overflow: hidden;
    .action-bar {
      float: right;
    }
    .center-scrollbar{
      height: calc(100vh - 50px - 100px);
    }
  }

  .right-aside-box {
    background-color: var(--el-bg-color-overlay);
    padding: 5px;
    margin-top: 5px;
    box-shadow: var(--el-box-shadow-light);
    height: calc(100vh - 50px - 50px);
    border-radius: 5px;
    overflow: hidden;
  }

  .card-header {
    padding: 5px !important;
  }

  .card-body {
    padding: 5px !important;
  }

  .center-board {
    position: relative;
    width: 100%;
    min-height: calc(100vh - 50px - 100px);

    .drawing-board {
      min-height: calc(100vh - 50px - 100px);
      width: 100%;
      padding: 10px;
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
  min-height: 32px;
  overflow: hidden;
  position: relative;
  padding: 3px;
  margin: 1px;
  .drag-wrapper {
    height: auto;
    width: 100%;
    min-height: 32px;
    border: 1px dashed $dragColor;
  }
   .not-drag,.item-drag{
    padding: 4px;
    margin: 1px;
    min-height: 32px;
   }

  .draggable-item-mark {
    color: white;
    background-color: $deepBlue;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    font-size: 12px;
    line-height: 12px;
    font-style: normal;
    padding: 4px 4px 2px 4px;
    position: absolute;
    left:-2px;
    top:-2px;
    z-index: 666;
  }

  .draggable-item-tool {  
    color: white;
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 12px;
    line-height: 12px;
    font-style: normal;
    .drawing-item-copy,
    .drawing-item-delete {
      background-color: $deepBlue;
      padding: 4px 4px 2px 4px;
      margin:1px;
      cursor: pointer;
      border-radius: 2px;
    }
  }
}

._is-layout { 
  border: 1px dashed $deepRed;
}

._is-layout-not-drag{
  border: 1px dashed $deepGreen;
}

._is-normal { 
  border: 1px dashed $deepBlue;
  display: inline-block;
  width: auto;
}

.is_form{

}

.draggable-item-active {
    border: 2px solid $deepBlue !important;
  & > .draggable-item-mark,
  & > .draggable-item-tool {
     visibility: visible;
  }
}
.draggable-item-inactive {
  & > .draggable-item-mark,
  & > .draggable-item-tool {
    visibility: hidden;
  }
}
</style>
