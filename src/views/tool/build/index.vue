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
            <components-library
              :idGlobal="idGlobal"
              @updateCloneComponent="updateCloneComponent"
            />
          </el-tab-pane>
          <el-tab-pane label="模板库" name="templateLibrary"> </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </div>
    <div class="center-board">
      <!-- 编辑器 -->
      <el-scrollbar class="center-scrollbar">
        <draggable
          class="drawing-board"
          style="height: 1000px; background-color: azure"
          :list="drawingList"
          :animation="340"
          group="componentsGroup"
          item-key="renderKey"
          @start="onDragStart"
          @change="onDragChange"
        >
          <template #item="{ element, index }">
            <draggable-item
              :key="element.renderKey"
              :drawing-list="drawingList"
              :elementData="element"
              :index="index"
              :active-id="activeId"
              @activeItem="activeFormItem"
            />
          </template>
        </draggable>
        <div v-show="!drawingList.length" class="empty-info">
          从左侧拖入或点选组件进行表单设计
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup>
import ComponentsLibrary from "./components/ComponentsLibrary";
import draggable from "vuedraggable/dist/vuedraggable.common"; // 导入 vuedraggable 组件
import logo from "@/assets/logo/logo.png"; // 导入 logo 图片资源
import DraggableItem from "./components/DraggableItem"; // 导入可拖拽表单项组件

const leftActiveTab = ref("componentLibrary"); // 当前左侧活动标签页
const drawingList = ref([]); // 当前表单项列表
const { proxy } = getCurrentInstance(); // 获取当前组件实例

const idGlobal = ref(100); // 全局唯一 ID 生成器
const activeData = ref([]); // 当前激活的表单项数据
const activeId = ref(null); // 当前激活的表单项 ID
const generateConf = ref(null); // 生成配置

// 拖拽开始事件
function onDragStart(event) {
  console.log("拖拽开始:", event);
  if (!event.item || !event.oldIndex) {
    console.error("Error: Invalid drag start event data");
  }
}

// 监听 change 事件
function onDragChange(event) {
  console.log("拖拽变化事件:", event);
  const { added, moved, removed } = event;

  if (added) {
    console.log("新增项目:", added.element, "索引:", added.newIndex);
  }
  if (moved) {
    console.log(
      "移动项目:",
      moved.element,
      "旧索引:",
      moved.oldIndex,
      "新索引:",
      moved.newIndex
    );
  }
  if (removed) {
    console.log("删除项目:", removed.element, "索引:", removed.oldIndex);
  }

  console.log("拖动后的 drawingList:", drawingList.value);
}

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

// 激活表单项
function activeFormItem(element) {
  activeData.value = element; // 设置当前激活的表单项数据
  activeId.value = element.formId; // 设置当前激活的表单项 ID
}
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
