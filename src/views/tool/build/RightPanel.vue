<template>
  <div class="right-board">
    <el-tabs v-model="currentTab" stretch class="center-tabs">
      <el-tab-pane label="组件属性" name="field" />
      <el-tab-pane label="包围属性" name="hedge" />
      <el-tab-pane label="表单属性" name="form" />
    </el-tabs>
    <div class="field-box">
      <a
        class="document-link"
        target="_blank"
        :href="documentLink"
        title="查看组件文档"
      >
        <el-icon>
          <Link />
        </el-icon>
      </a>
      <el-scrollbar class="right-scrollbar">
        <!-- 组件属性 -->
        <el-form
          v-show="currentTab === 'field' && showField"
          size="default"
          label-width="90px"
          label-position="top"
        >
          <el-form-item v-if="formItemAttr.vModel" label="字段名">
            <el-input
              v-model="formItemAttr.vModel"
              placeholder="请输入字段名（v-model）"
            ></el-input>
          </el-form-item>
          <el-form-item v-for="(item, key) in formItemAttr" :label="item.label">
            <el-input
              v-model="item.value"
              :placeholder="item.placeholder"
              v-if="item.type === 'input'"
            />
            <el-switch
              v-model="item.value"
              v-else-if="item.type === 'switch'"
            />
            <el-radio-group
              v-model="item.value"
              v-else-if="item.type === 'radio'"
            >
              <el-radio
                v-for="(radio, index) in item.options"
                :key="index"
                :value="radio.value"
                >{{ radio.label }}</el-radio
              >
            </el-radio-group>
            <el-input-number
              v-model="item.value"
              v-else-if="item.type === 'number'"
            />
            <el-color-picker
              v-model="item.value"
              v-else-if="item.type === 'color'"
            />
            <el-slider
              v-model="item.value"
              v-else-if="item.type === 'slider'"
              :min="item.min"
              :max="item.max"
            />
            <el-input v-else-if="item.type === 'icon'" v-model="item.value">
              <template #append>
                <el-button icon="Pointer" @click="openIconsDialog(key)">
                  选择
                </el-button>
              </template>
            </el-input>
            <el-popover
              placement="left"
              :width="400"
              trigger="click"
              v-else-if="
                item.type === 'object' && activeDataProperty.tag === 'el-col'
              "
            >
              <template #reference>
                <el-button style="width: 100%">{{ key }}</el-button>
              </template>
              <el-form-item v-for="(value, key) in item.value" :label="key">
                <el-slider v-model="item.value[key]" :min="0" :max="24" />
              </el-form-item>
              {{ item.value.span }}-{{ item.value.offset }}-{{
                item.value.pull
              }}-{{ item.value.push }}
            </el-popover>
          </el-form-item>

          <el-divider
            content-position="center"
            v-if="activeDataProperty.tag === 'el-row'"
            >栅格配置</el-divider
          >

          <template v-if="activeDataProperty.tag === 'el-row'">
            <draggable
              :list="activeDataProperty.child"
              :group="{ name: 'formItemChild', pull: false, put: false }"
              :sort="true"
              item-key="renderKey"
              class="draggable"
              @start="onDragStart"
              @end="onDragEnd"
            >
              <template #item="{ element, index }">
                <el-card  style="margin-bottom: 10px;">
                  <template #header>
                    <div class="card-header">
                      <span>栅格{{ index + 1 }}配置</span
                      ><el-button-group style="float: right">
                        <el-button
                          type="primary"
                          icon="Plus"
                          @click="addCol(element, index)"
                          title="复制栏"
                        />
                        <el-button
                          type="danger"
                          icon="Remove"
                          @click="removeCol(element, index)"
                          title="删除栏"
                        />
                         <el-button
                          type="success"
                          :icon="colVisible[index]?'Hide':'View'"
                          @click="changeColVisible(!colVisible[index], index)"
                          title="显示|隐藏"
                        />

                      </el-button-group>
                    </div>
                  </template>
                  <div v-show="colVisible[index]">
                  <el-form-item
                    v-for="(item, key) in element.attr"
                    :label="item.label"
                    :key="key"
                  >
                    <el-input
                      v-model="item.value"
                      :placeholder="item.placeholder"
                      v-if="item.type === 'input'"
                    />
                    <el-input-number
                      v-model="item.value"
                      v-else-if="item.type === 'number'"
                    />
                    <el-slider
                      v-model="item.value"
                      v-else-if="item.type === 'slider'"
                      :min="item.min"
                      :max="item.max"
                    />
                    <el-popover
                      placement="left"
                      :width="400"
                      trigger="click"
                      v-else-if="item.type === 'object'"
                    >
                      <template #reference>
                        <el-button style="width: 100%">{{ key }}</el-button>
                      </template>
                      <el-form-item
                        v-for="(value, key) in item.value"
                        :label="key"
                      >
                        <el-slider
                          v-model="item.value[key]"
                          :min="0"
                          :max="24"
                        />
                      </el-form-item>
                      {{ item.value.span }}-{{ item.value.offset }}-{{
                        item.value.pull
                      }}-{{ item.value.push }}
                    </el-popover>
                  </el-form-item>
                  </div>
                </el-card>
              </template>
            </draggable>
          </template>
        </el-form>

        <!-- 包围属性 -->
        <!-- export const defaultItemHedge= {
    model: {}, // 表单数据  
    rules: {}, // 表单验证规则
    inline: false, // 是否行内表单
    labelPosition: "right", // 标签位置：left / right / top
    labelWidth: "100px", // 标签宽度
    labelSuffix: ":", // 标签后缀
    hideRequiredAsterisk: false, // 是否隐藏必填字段的红色星号
    showMessage: true, // 是否显示校验错误信息
    inlineMessage: false, // 是否以行内形式展示校验信息
    statusIcon: false, // 是否在输入框中显示校验结果反馈图标
    validateOnRuleChange: true, // 是否在 rules 属性改变时重新触发校验
    size: "default", // 尺寸：large / default / small
    disabled: false, // 是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性
    scrollToError: false, // 当校验失败时，是否滚动到第一个错误表单项
    scrollToErrorOffset: 0, // 滚动到错误表单项时的偏移量
    requireAsteriskPosition: "left", // 必填星号的位置：left / right
  } -->

        <!-- 表单属性 -->
      </el-scrollbar>
    </div>
    <icons-dialog
      v-model="iconsVisible"
      :current="formItemAttr[currentIconModel]"
      @select="setIcon"
    />
    <treeNode-dialog v-model="dialogVisible" @commit="addNode" />
  </div>
</template>

<script setup>
import draggable from "vuedraggable/dist/vuedraggable.common";
import { isNumberStr } from "@/utils/index";
import IconsDialog from "./IconsDialog";
import TreeNodeDialog from "./TreeNodeDialog";
const createIdAndKey = inject("createIdAndKey");
const { proxy } = getCurrentInstance();
const colVisible = ref([]);
const dateTimeFormat = {
  date: "YYYY-MM-DD",
  week: "YYYY 第 ww 周",
  month: "YYYY-MM",
  year: "YYYY",
  datetime: "YYYY-MM-DD HH:mm:ss",
  daterange: "YYYY-MM-DD",
  monthrange: "YYYY-MM",
  datetimerange: "YYYY-MM-DD HH:mm:ss",
};
const props = defineProps({
  showField: Boolean,
  activeDataProperty: Object,
  formConf: Object,
});
const formItemHedge = ref([]);

const formItemAttr = ref([]);

const formItemChild = ref([]);

function changeColVisible(visible,index){
  colVisible.value[index]=visible;
}

 function  onDragStart(evt) {
      console.log("拖拽开始:", evt);
    }
 function   onDragEnd(evt) {
      console.log("拖拽结束:", evt);
    }
function addCol(child, index) {
  let clone = JSON.parse(JSON.stringify(child));
  clone = createIdAndKey(clone);
  formItemChild.value.push(clone);
}

function removeCol(child, index) {
  if (formItemChild.value.length <= 1) {
    proxy.$modal.msgError("请保留至少一项");
    return;
  }
  formItemChild.value.splice(index, 1);
}

watch(
  () => props.activeDataProperty,
  (val) => {
    formItemAttr.value = val.attr;
    formItemHedge.value = val.hedge;
    formItemChild.value = val.child;
  }
);
watch(
  () => formItemAttr,
  (val) => {
    console.log(val);
    // emit('formItemChange', {
    //   formItemAttr: val
    //   , formItemHedge: formItemHedge.value
    // })
  },
  {
    immediate: true, // 立即执行回调函数
    deep: true, // 深度监听，适用于监听对象或数组
  }
);

watch(
  () => formItemHedge,
  (val) => {
    // emit('formItemChange', {
    //   formItemAttr: formItemAttr.value
    //   , formItemHedge: val
    // })
  },
  {
    immediate: true, // 立即执行回调函数
    deep: true, // 深度监听，适用于监听对象或数组
  }
);

const data = reactive({
  currentTab: "field",
  currentNode: null,
  dialogVisible: false,
  iconsVisible: false,
  currentIconModel: null,
  dateTypeOptions: [
    {
      label: "日(date)",
      value: "date",
    },
    {
      label: "周(week)",
      value: "week",
    },
    {
      label: "月(month)",
      value: "month",
    },
    {
      label: "年(year)",
      value: "year",
    },
    {
      label: "日期时间(datetime)",
      value: "datetime",
    },
  ],
  dateRangeTypeOptions: [
    {
      label: "日期范围(daterange)",
      value: "daterange",
    },
    {
      label: "月范围(monthrange)",
      value: "monthrange",
    },
    {
      label: "日期时间范围(datetimerange)",
      value: "datetimerange",
    },
  ],
  colorFormatOptions: [
    {
      label: "hex",
      value: "hex",
    },
    {
      label: "rgb",
      value: "rgb",
    },
    {
      label: "rgba",
      value: "rgba",
    },
    {
      label: "hsv",
      value: "hsv",
    },
    {
      label: "hsl",
      value: "hsl",
    },
  ],
  justifyOptions: [
    {
      label: "start",
      value: "start",
    },
    {
      label: "end",
      value: "end",
    },
    {
      label: "center",
      value: "center",
    },
    {
      label: "space-around",
      value: "space-around",
    },
    {
      label: "space-between",
      value: "space-between",
    },
  ],
  layoutTreeProps: {
    label(data, node) {
      return data.componentName || `${data.label}: ${data.vModel}`;
    },
  },
});

const {
  currentTab,
  currentNode,
  dialogVisible,
  iconsVisible,
  currentIconModel,
  dateTypeOptions,
  dateRangeTypeOptions,
  colorFormatOptions,
  justifyOptions,
  layoutTreeProps,
} = toRefs(data);

const documentLink = computed(
  () =>
    formItemAttr.value?.document ||
    "https://element-plus.org/zh-CN/guide/installation"
);

const dateOptions = computed(() => {
  if (
    formItemAttr.value.type !== undefined &&
    formItemAttr.value.tag === "el-date-picker"
  ) {
    if (formItemAttr.value["start-placeholder"] === undefined) {
      return dateTypeOptions.value;
    }
    return dateRangeTypeOptions.value;
  }
  return [];
});

const emit = defineEmits(["tag-change", "formItemChange"]);

function addReg() {
  formItemAttr.value.regList.push({
    pattern: "",
    message: "",
  });
}
function addSelectItem() {
  formItemAttr.value.options.push({
    label: "",
    value: "",
  });
}

function addTreeItem() {
  ++proxy.idGlobal;
  dialogVisible.value = true;
  currentNode.value = formItemAttr.value.options;
}

function renderContent(h, { node, data, store }) {
  return h(
    "div",
    {
      class: "custom-tree-node",
    },
    [
      h("span", node.label),
      h(
        "span",
        {
          class: "node-operation",
        },
        [
          h(resolveComponent("el-link"), {
            type: "primary",
            icon: "Plus",
            underline: false,
            onClick: () => {
              append(data);
            },
          }),
          h(resolveComponent("el-link"), {
            type: "danger",
            icon: "Delete",
            underline: false,
            style: "margin-left: 5px;",
            onClick: () => {
              remove(node, data);
            },
          }),
        ]
      ),
    ]
  );
  // return (
  //   <div class="custom-tree-node">
  //     <span>{node.label}</span>
  //     <span class="node-operation">
  //       <el-link type="primary" on-click={() => append(data)} icon="Plus" underline={false}></el-link>
  //       <el-link style="margin-left: 5px;" type="danger" on-click={() => remove(node, data)} icon="Delete" underline={false}></el-link>
  //     </span>
  //   </div>
  // )
}
function append(data) {
  if (!data.children) {
    // this.$set(data, 'children', [])
    data.children = [];
  }
  dialogVisible.value = true;
  currentNode.value = data.children;
}
function remove(node, data) {
  const { parent } = node;
  const children = parent.data.children || parent.data;
  const index = children.findIndex((d) => d.id === data.id);
  children.splice(index, 1);
}
function addNode(data) {
  currentNode.value.push(data);
}

function setOptionValue(item, val) {
  item.value = isNumberStr(val) ? +val : val;
}
function setDefaultValue(val) {
  if (Array.isArray(val)) {
    return val.join(",");
  }
  if (["string", "number"].indexOf(val) > -1) {
    return val;
  }
  if (typeof val === "boolean") {
    return `${val}`;
  }
  return val;
}

function onDefaultValueInput(str) {
  if (Array.isArray(formItemAttr.value.defaultValue)) {
    // 数组
    formItemAttr.value.defaultValue = str
      .split(",")
      .map((val) => (isNumberStr(val) ? +val : val));
  } else if (["true", "false"].indexOf(str) > -1) {
    // 布尔
    formItemAttr.value.defaultValue = JSON.parse(str);
  } else {
    // 字符串和数字
    formItemAttr.value.defaultValue = isNumberStr(str) ? +str : str;
  }
  console.log("defaultValue", formItemAttr.value.defaultValue);
}

function onSwitchValueInput(val, name) {
  if (["true", "false"].indexOf(val) > -1) {
    formItemAttr.value[name] = JSON.parse(val);
  } else {
    formItemAttr.value[name] = isNumberStr(val) ? +val : val;
  }
}

function setTimeValue(val, type) {
  const valueFormat = type === "week" ? dateTimeFormat.date : val;
  formItemAttr.value.defaultValue = null;
  formItemAttr.value["value-format"] = valueFormat;
  formItemAttr.value.format = val;
}

function spanChange(val) {
  props.formConf.span = val;
}

function multipleChange(val) {
  formItemAttr.value.defaultValue = val ? [] : "";
}

function dateTypeChange(val) {
  setTimeValue(dateTimeFormat[val], val);
}

function rangeChange(val) {
  formItemAttr.value.defaultValue = val
    ? [formItemAttr.value.min, formItemAttr.value.max]
    : formItemAttr.value.min;
}

function rateTextChange(val) {
  if (val) formItemAttr.value["show-score"] = false;
}

function rateScoreChange(val) {
  if (val) formItemAttr.value["show-text"] = false;
}

function colorFormatChange(val) {
  formItemAttr.value.defaultValue = null;
  formItemAttr.value["show-alpha"] = val.indexOf("a") > -1;
  formItemAttr.value.renderKey = +new Date(); // 更新renderKey,重新渲染该组件
}

function openIconsDialog(model) {
  iconsVisible.value = true;
  currentIconModel.value = model;
}

function setIcon(val) {
  formItemAttr.value[currentIconModel.value].value = val;
}
</script>

<style lang="scss" scoped>

.right-board {
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3px;

  &:deep() {
    .el-tabs__header {
      margin: 0;
    }

    .el-input-group__append .el-button {
      display: inline-flex;
    }
  }

  .field-box {
    position: relative;
    height: calc(100vh - 50px - 40px - 42px);
    box-sizing: border-box;
    overflow: hidden;
  }

  .el-scrollbar {
    height: 100%;

    &:deep() {
      .el-scrollbar__view {
        padding: 30px 20px;
      }
    }
  }
}

.reg-item {
  padding: 12px 6px;
  background: var(--el-border-color-extra-light);
  position: relative;
  border-radius: 4px;

  .close-btn {
    position: absolute;
    right: -6px;
    top: -6px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    line-height: 16px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    color: #fff;
    z-index: 1;
    cursor: pointer;
    font-size: 12px;
  }
}

.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;

  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }

  & .el-input + .el-input {
    margin-left: 4px;
  }
}

.select-item + .select-item {
  margin-top: 4px;
}

.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}

.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}

.option-drag {
  cursor: move;
}

.time-range {
  .el-date-editor {
    width: 227px;
  }

  :deep() {
    .el-icon-time {
      display: none;
    }
  }
}

.document-link {
  position: absolute;
  display: flex;
  width: 26px;
  height: 26px;
  top: 0;
  left: 0;
  cursor: pointer;
  background: #409eff;
  z-index: 1;
  border-radius: 0 0 6px 0;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
}

.node-label {
  font-size: 14px;
}

.node-icon {
  color: #bebfc3;
}
</style>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
