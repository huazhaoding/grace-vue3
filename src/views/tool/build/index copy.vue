<template>
  <div class="container">
    <div class="left-board">
      <div class="logo-wrapper">
        <div class="logo"><img :src="logo" alt="logo" /> Form Generator</div>
      </div>
      <!-- 左边组件库 -->
      <el-scrollbar class="left-scrollbar">
        <el-tabs v-model="leftActiveTab">
          <el-tab-pane label="组件库" name="componentLibrary">
            <div class="components-list">
              <div class="components-title">
                <svg-icon icon-class="component" />输入型组件
              </div>
              <draggable
                class="components-draggable"
                :list="inputComponents"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="cloneComponent"
                draggable=".components-item"
                :sort="false"
                @end="onEnd"
                item-key="label"
              >
                <template #item="{ element, index }">
                  <div
                    :key="index"
                    class="components-item"
                    @click="addComponent(element)"
                  >
                    <div class="components-body">
                      <svg-icon :icon-class="element.tagIcon" />
                      {{ element.label }}
                    </div>
                  </div>
                </template>
              </draggable>
              <div class="components-title">
                <svg-icon icon-class="component" />选择型组件
              </div>
              <draggable
                class="components-draggable"
                :list="selectComponents"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="cloneComponent"
                draggable=".components-item"
                :sort="false"
                @end="onEnd"
                item-key="label"
              >
                <template #item="{ element, index }">
                  <div
                    :key="index"
                    class="components-item"
                    @click="addComponent(element)"
                  >
                    <div class="components-body">
                      <svg-icon :icon-class="element.tagIcon" />
                      {{ element.label }}
                    </div>
                  </div>
                </template>
              </draggable>
              <div class="components-title">
                <svg-icon icon-class="componentLibrary" /> 布局型组件
              </div>
              <draggable
                class="components-draggable"
                :list="layoutComponents"
                :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                :clone="cloneComponent"
                draggable=".components-item"
                :sort="false"
                @end="onEnd"
                item-key="label"
              >
                <template #item="{ element, index }">
                  <div
                    :key="index"
                    class="components-item"
                    @click="addComponent(element)"
                  >
                    <div class="components-body">
                      <svg-icon :icon-class="element.tagIcon" />
                      {{ element.label }}
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </el-tab-pane>
          <el-tab-pane label="模板库" name="templateLibrary"> 


          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </div>
    <div class="center-board">
      <!-- 编辑器工具栏 -->
      <div class="action-bar">
        <el-button icon="topRight" type="primary"  @click="importJson">
          导入模板
        </el-button>
        <el-button icon="View" type="primary" @click="openPreview">
          预览模板
        </el-button>
        <el-button
          class="delete-btn"
          icon="Delete"
          text
          @click="empty"
          type="danger"
        >
          清空模板
        </el-button>
      </div>
      <!-- 编辑器 -->
      <el-scrollbar class="center-scrollbar">
        <el-row class="center-board-row" :gutter="formConf.gutter">
          <el-form
            :size="formConf.size"
            :label-position="formConf.labelPosition"
            :disabled="formConf.disabled"
            :label-width="formConf.labelWidth + 'px'"
          >
            <draggable
              class="drawing-board"
              :list="drawingList"
              :animation="340"
              group="componentsGroup"
              item-key="label"
            >
              <template #item="{ element, index }">
                <draggable-item
                  :key="element.renderKey"
                  :drawing-list="drawingList"
                  :element="element"
                  :index="index"
                  :active-id="activeId"
                  :form-conf="formConf"
                  @activeItem="activeFormItem"
                  @copyItem="drawingItemCopy"
                  @deleteItem="drawingItemDelete"
                />
              </template>
            </draggable>
            <div v-show="!drawingList.length" class="empty-info">
              从左侧拖入或点选组件进行表单设计
            </div>
          </el-form>
        </el-row>
      </el-scrollbar>
    </div>
    <!-- 右边属性库 -->
    <right-panel
      :active-data-property="activeData"
      :form-conf="formConf"
      :show-field="!!drawingList.length"
      @tag-change="tagChange"
      @activeDataChange="fieldsAttributeChange"
    />
    
  </div>
   <preview-dialog v-model="previewDialogVisible"
      :formTemplate="formTemplate"
      :jsonData="jsonData"
    />

</template>

<script setup>
import draggable from "vuedraggable/dist/vuedraggable.common"; // 导入 vuedraggable 组件
import PreviewDialog from "./PreviewDialog"; // 导入预览对话框组件
import beautifier from "js-beautify"; // 用于格式化生成的代码
import logo from "@/assets/logo/logo.png"; // 导入 logo 图片资源
import {
  inputComponents, // 输入型组件配置
  selectComponents, // 选择型组件配置 
  layoutComponents, // 布局型组件配置
  formConf as formConfData, // 表单全局配置
} from "@/utils/generator/config";

import { beautifierConf } from "@/utils/index"; // 导入代码美化配置
import drawingDefalut from "@/utils/generator/drawingDefalut"; // 默认表单项数据
import {
  makeUpHtml, // 生成 HTML 模板
  vueTemplate, // Vue 模板生成器
  vueScript, // Vue 脚本生成器
  cssStyle, // CSS 样式生成器
} from "@/utils/generator/html";
import { makeUpJs } from "@/utils/generator/js"; // 生成 JS 脚本
import { makeUpCss } from "@/utils/generator/css"; // 生成 CSS 样式
import DraggableItem from "./DraggableItem"; // 导入可拖拽表单项组件
import RightPanel from "./RightPanel"; // 导入右侧属性面板组件

const leftActiveTab = ref("componentLibrary"); // 当前左侧活动标签页
const drawingList = ref(drawingDefalut); // 当前表单项列表
const { proxy } = getCurrentInstance(); // 获取当前组件实例
const previewDialogVisible = ref(false); // 控制预览对话框显示状态
const formTemplate = ref(""); // 存储生成的表单模板
const jsonData = ref({}); // 存储生成的 JSON 数据
const idGlobal = ref(100); // 全局唯一 ID 生成器
const activeData = ref(drawingDefalut[0]); // 当前激活的表单项数据
const activeId = ref(drawingDefalut[0].formId); // 当前激活的表单项 ID
const generateConf = ref(null); // 生成配置
const formData = ref({}); // 表单数据对象
const formConf = ref(formConfData); // 表单全局配置
let oldActiveId; // 上一个激活的表单项 ID
let tempActiveData; // 临时存储克隆的表单项数据

// 打开预览对话框并生成代码
function openPreview() {
  generateConf.value = {
    fileName: undefined,
    type: 'file'
  };
  AssembleFormData(); // 汇总表单数据
  formTemplate.value = generateCode(); // 生成代码模板
  jsonData.value = formData.value; // 生成 JSON 数据
  previewDialogVisible.value = true; // 显示预览对话框
}

// 更新字段属性
function fieldsAttributeChange(data) {
  console.log(data);
  activeData.value = data; // 更新当前激活的表单项数据
}

// 激活表单项
function activeFormItem(element) {
  activeData.value = element; // 设置当前激活的表单项数据
  activeId.value = element.formId; // 设置当前激活的表单项 ID
}

// 清空所有表单项
function empty() {
  proxy.$modal
    .confirm("确定要清空所有组件吗？", "提示", { type: "warning" }) // 弹出确认对话框
    .then(() => {
      idGlobal.value = 100; // 重置全局 ID
      drawingList.value = []; // 清空表单项列表
    });
}

// 拖拽结束时触发
function onEnd(obj, a) {
  if (obj.from !== obj.to) {
    activeData.value = tempActiveData; // 更新当前激活的表单项数据
    activeId.value = idGlobal.value; // 更新当前激活的表单项 ID
  }
}

// 添加组件到表单
function addComponent(item) {
  const clone = cloneComponent(item); // 克隆组件
  drawingList.value.push(clone); // 将克隆的组件添加到表单项列表
  activeFormItem(clone); // 激活新添加的组件
}

// 克隆组件
function cloneComponent(origin) {
  const clone = JSON.parse(JSON.stringify(origin)); // 深拷贝原始组件
  clone.formId = ++idGlobal.value; // 为克隆的组件生成唯一的 formId
  clone.span = formConf.value.span; // 设置组件的 span 属性
  clone.renderKey = +new Date(); // 改变 renderKey 以强制更新组件
  if (!clone.layout) clone.layout = "colFormItem"; // 如果未定义 layout，默认为 colFormItem
  if (clone.layout === "colFormItem") {
    clone.vModel = `field${idGlobal.value}`; // 动态生成 vModel
    clone.placeholder !== undefined && (clone.placeholder += clone.label); // 动态生成 placeholder
    tempActiveData = clone; // 临时存储克隆的组件
  } else if (clone.layout === "rowFormItem") {
    delete clone.label; // 删除 label 属性
    clone.componentName = `row${idGlobal.value}`; // 动态生成 componentName
    clone.gutter = formConf.value.gutter; // 设置 gutter 属性
    tempActiveData = clone; // 临时存储克隆的组件
  }
  return tempActiveData; // 返回克隆的组件
}

// 复制表单项
function drawingItemCopy(item, parent) {
  let clone = JSON.parse(JSON.stringify(item)); // 深拷贝表单项
  clone = createIdAndKey(clone); // 为克隆的表单项生成唯一的 ID 和 key
  parent.push(clone); // 将克隆的表单项添加到父级列表
  activeFormItem(clone); // 激活新复制的表单项
}

// 为表单项生成唯一的 ID 和 key
function createIdAndKey(item) {
  item.formId = ++idGlobal.value; // 生成唯一的 formId
  item.renderKey = +new Date(); // 生成唯一的 renderKey
  if (item.layout === "colFormItem") {
    item.vModel = `field${idGlobal.value}`; // 动态生成 vModel
  } else if (item.layout === "rowFormItem") {
    item.componentName = `row${idGlobal.value}`; // 动态生成 componentName
  }
  if (Array.isArray(item.children)) {
    item.children = item.children.map((childItem) => createIdAndKey(childItem)); // 递归处理子项
  }
  return item; // 返回更新后的表单项
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

// 切换表单项类型
function tagChange(newTag) {
  newTag = cloneComponent(newTag); // 克隆新的表单项
  newTag.vModel = activeData.value.vModel; // 保留原表单项的 vModel
  newTag.formId = activeId.value; // 保留原表单项的 formId
  newTag.span = activeData.value.span; // 保留原表单项的 span
  delete activeData.value.tag; // 删除旧表单项的 tag 属性
  delete activeData.value.tagIcon; // 删除旧表单项的 tagIcon 属性
  delete activeData.value.document; // 删除旧表单项的 document 属性
  Object.keys(newTag).forEach((key) => {
    if (
      activeData.value[key] !== undefined &&
      typeof activeData.value[key] === typeof newTag[key]
    ) {
      newTag[key] = activeData.value[key]; // 合并旧表单项的属性
    }
  });
  activeData.value = newTag; // 更新当前激活的表单项
  updateDrawingList(newTag, drawingList.value); // 更新表单项列表
}

// 更新表单项列表
function updateDrawingList(newTag, list) {
  const index = list.findIndex((item) => item.formId === activeId.value); // 查找表单项索引
  if (index > -1) {
    list.splice(index, 1, newTag); // 替换表单项
  } else {
    list.forEach((item) => {
      if (Array.isArray(item.children))
        updateDrawingList(newTag, item.children); // 递归处理子项
    });
  }
}

// 汇总表单数据
function AssembleFormData() {
  formData.value = {
    fields: JSON.parse(JSON.stringify(drawingList.value)), // 深拷贝表单项列表
    ...formConf.value, // 合并表单全局配置
  };
}

// 生成代码
function generateCode() {
  const { type } = generateConf.value; // 获取生成配置的类型
  AssembleFormData(); // 汇总表单数据
  const script = vueScript(makeUpJs(formData.value, type)); // 生成 JS 脚本
  const html = vueTemplate(makeUpHtml(formData.value, type)); // 生成 HTML 模板
  const css = cssStyle(makeUpCss(formData.value)); // 生成 CSS 样式
  return beautifier.html(html + script + css, beautifierConf.html); // 格式化并返回生成的代码
}

// 监听表单项标签变化
watch(
  () => activeData.value.label,
  (val, oldVal) => {
    if (
      activeData.value.placeholder === undefined ||
      !activeData.value.tag ||
      oldActiveId !== activeId.value
    ) {
      return;
    }
    activeData.value.placeholder =
      activeData.value.placeholder.replace(oldVal, "") + val; // 动态更新 placeholder
  }
);

// 监听激活表单项 ID 变化
watch(
  activeId,
  (val) => {
    oldActiveId = val; // 更新上一个激活的表单项 ID
  },
  {
    immediate: true, // 立即执行一次
  }
);
</script>
<style lang="scss">


.el-tabs__nav-wrap {
  display: flex;
  justify-content: space-around;
}
// body,
// html {
//   margin: 0;
//   padding: 0;
//   background: #fff;
//   -moz-osx-font-smoothing: grayscale;
//   -webkit-font-smoothing: antialiased;
//   text-rendering: optimizeLegibility;
//   font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
// }

// input,
// textarea {
//   font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
// }

$lighterBlue: #409eff;

.container {
  position: relative;
  width: 100%;
  background-color: var(--el-bg-color-overlay);
  height: calc(100vh - 50px - 40px);
  overflow: hidden;

  .left-board {
    width: 260px;
    position: absolute;
    left: 0;
    top: 0;
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

        > img {
          width: 30px;
          height: 30px;
          vertical-align: top;
        }

        .github {
          display: inline-block;
          vertical-align: sub;
          margin-left: 15px;

          > img {
            height: 22px;
          }
        }
      }
    }

    .left-scrollbar {
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
    height: calc(100vh - 50px - 40px);
    width: auto;
    margin: 0 350px 0 260px;
    box-sizing: border-box;

    .action-bar {
      position: relative;
      height: 42px;
      padding: 0 15px;
      box-sizing: border-box;
      border: 1px solid var(--el-border-color-extra-light);
      border-top: none;
      border-left: none;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      u .delete-btn {
        color: #f56c6c;
      }
    }

    .center-scrollbar {
      height: calc(100vh - 50px - 40px - 42px);
      overflow: hidden;
      border-left: 1px solid var(--el-border-color-extra-light);
      border-right: 1px solid var(--el-border-color-extra-light);
      box-sizing: border-box;

      .el-scrollbar__view {
        overflow-x: hidden;
      }

      .center-board-row {
        padding: 12px 12px 15px 12px;
        box-sizing: border-box;

        & > .el-form {
          // 69 = 12+15+42
          height: calc(100vh - 50px - 40px - 69px);
          flex: 1;

          .drawing-board {
            height: 100%;
            position: relative;

            .components-body {
              padding: 0;
              margin: 0;
              font-size: 0;
            }

            .sortable-ghost {
              position: relative;
              display: block;
              overflow: hidden;

              &::before {
                content: " ";
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                height: 3px;
                background: rgb(89, 89, 223);
                z-index: 2;
              }
            }

            .components-item.sortable-ghost {
              width: 100%;
              height: 60px;
              background: var(--el-border-color-extra-light);
            }

            .active-from-item {
              & > .el-form-item {
                background: var(--el-border-color-extra-light);
                border-radius: 6px;
              }

              & > .drawing-item-copy,
              & > .drawing-item-delete {
                display: initial;
              }

              & > .component-name {
                color: $lighterBlue;
              }

              .el-input__wrapper {
                box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset;
              }
            }

            .el-form-item {
              margin-bottom: 15px;
            }
          }

          .drawing-item {
            position: relative;
            cursor: move;

            &.unfocus-bordered:not(.activeFromItem) > div:first-child {
              border: 1px dashed #ccc;
            }

            .el-form-item {
              padding: 12px 10px;
            }
          }

          .drawing-row-item {
            position: relative;
            cursor: move;
            box-sizing: border-box;
            border: 1px dashed #ccc;
            border-radius: 3px;
            padding: 0 2px;
            margin-bottom: 15px;

            .drawing-row-item {
              margin-bottom: 2px;
            }

            .el-col {
              margin-top: 22px;
            }

            .el-form-item {
              margin-bottom: 0;
            }

            .drag-wrapper {
              min-height: 80px;
              flex: 1;
              display: flex;
              flex-wrap: wrap;
            }

            &.active-from-item {
              border: 1px dashed $lighterBlue;
            }

            .component-name {
              position: absolute;
              top: 0;
              left: 0;
              font-size: 12px;
              color: #bbb;
              display: inline-block;
              padding: 0 6px;
            }
          }

          .drawing-item,
          .drawing-row-item {
            &:hover {
              & > .el-form-item {
                background: var(--el-border-color-extra-light);
                border-radius: 6px;
              }

              & > .drawing-item-copy,
              & > .drawing-item-delete {
                display: initial;
              }
            }

            & > .drawing-item-copy,
            & > .drawing-item-delete {
              display: none;
              position: absolute;
              top: -10px;
              width: 22px;
              height: 22px;
              line-height: 22px;
              text-align: center;
              border-radius: 50%;
              font-size: 12px;
              border: 1px solid;
              cursor: pointer;
              z-index: 1;
            }

            & > .drawing-item-copy {
              right: 56px;
              border-color: $lighterBlue;
              color: $lighterBlue;
              background: #fff;

              &:hover {
                background: $lighterBlue;
                color: #fff;
              }
            }

            & > .drawing-item-delete {
              right: 24px;
              border-color: #f56c6c;
              color: #f56c6c;
              background: #fff;

              &:hover {
                background: #f56c6c;
                color: #fff;
              }
            }
          }

          .empty-info {
            position: absolute;
            top: 46%;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 18px;
            color: #ccb1ea;
            letter-spacing: 4px;
          }
        }
      }
    }
  }
}
</style>
