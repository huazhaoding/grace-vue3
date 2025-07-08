<template>
  <div class="right-board">
    <el-tabs v-model="rightActiveTab" class="right-tabs">
      <el-tab-pane label="组件配置" name="componentConf">
        <el-card body-class="card-body" header-class="card-header">
          <template #header>
            <div><el-text> {{ activeDataProperty.tagLabel }}-{{ activeDataProperty.id }}</el-text> <a
                class="document-link" target="_blank" :href="documentLink" title="查看组件文档">
                <el-icon>
                  <Link />
                </el-icon>
              </a></div>
          </template>
          <el-form style="padding-left: 5px;padding-right: 5px;" v-show="currentTab === 'field' && showField"
            size="default" label-width="90px" label-position="top">
            <el-collapse v-model="activeName">
              <el-collapse-item title="基础属性" name="1">
                <el-scrollbar max-height="300px">
                  <el-form-item v-if="formItemAttr.vModel" label="字段名">
                    <el-input v-model="formItemAttr.vModel" placeholder="请输入字段名（v-model）"></el-input>
                  </el-form-item>
                  <el-form-item v-for="(item, key) in formItemAttr" :label="item.label">
                    <el-input v-model="item.value" :placeholder="item.placeholder" v-if="item.type === 'input'" />
                    <el-switch v-model="item.value" v-else-if="item.type === 'switch'" />
                    <el-radio-group @change="handleRadioChange" v-model="item.value" v-else-if="item.type === 'radio'">
                      <el-radio v-for="(radio, index) in item.options" :key="index" :value="radio.value">{{ radio.label
                      }}</el-radio>
                    </el-radio-group>
                    <el-input-number v-model="item.value" v-else-if="item.type === 'number'" />
                    <el-color-picker v-model="item.value" v-else-if="item.type === 'color'" />
                    <el-slider v-model="item.value" v-else-if="item.type === 'slider'" :min="item.min" :max="item.max"
                      style="padding-left: 12px;padding-right:12px ;" />
                    <el-input-tag v-model="item.value" v-else-if="item.type === 'tag'" />
                    <el-input v-else-if="item.type === 'icon'" v-model="item.value">
                      <template #append>
                        <el-button icon="Pointer" @click="openIconsDialog(key)">
                          选择
                        </el-button>
                      </template>
                    </el-input>
                    <el-popover placement="left" :width="400" trigger="click" v-else-if="
                      item.type === 'object' && activeDataProperty.tag === 'el-col'
                    ">
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
                </el-scrollbar>
              </el-collapse-item>
              <el-collapse-item v-if="activeDataProperty.type === 'form' && activeDataProperty.hedge" title="包围属性"
                name="2">
                <el-scrollbar max-height="300px">
                  <el-form-item v-for="(item, key) in activeDataProperty.hedge.attr" :label="item.label" :key="key">
                    <el-input v-model="item.value" :placeholder="item.placeholder" v-if="item.type === 'input'" />
                    <el-input-number v-model="item.value" v-else-if="item.type === 'number'" />
                    <el-slider v-model="item.value" v-else-if="item.type === 'slider'" :min="item.min"
                      :max="item.max" />
                  </el-form-item>
                </el-scrollbar>
              </el-collapse-item>
              <el-collapse-item title="子项配置" name="3" v-if="
                activeDataProperty?.slots?.default?.slotType ===
                'childDragComponent' ||
                activeDataProperty?.slots?.default?.slotType === 'childComponent'
              ">
                <template #title="{ isActive }">
                  <el-text style="margin-right: 10px">子项配置</el-text>
                  <el-tooltip effect="dark" content="添加子项" placement="top-start">
                    <el-text type="primary" @click.stop="addItemByTemplate"><el-icon>
                        <Plus />
                      </el-icon></el-text>
                  </el-tooltip>
                </template>
                <el-scrollbar max-height="300px">
                  <div class="scrollbar-item">
                    <template v-if="
                      activeDataProperty?.slots?.default?.slotType ===
                      'childDragComponent' ||
                      activeDataProperty?.slots?.default?.slotType === 'childComponent'
                    ">
                      <draggable :list="activeDataProperty.slots.default.slotOptions"
                        :group="{ name: 'formItemChild', pull: false, put: false }" :sort="true" item-key="renderKey"
                        class="draggable">
                        <template #item="{ element, index }">
                          <el-card style="margin-bottom: 10px">
                            <template #header>
                              <div class="card-header">
                                <span>子项{{ index + 1 }}配置</span><el-button-group style="float: right">
                                  <el-button type="primary" icon="Plus" @click="addCol(element, index)" title="复制" />
                                  <el-button type="danger" icon="Remove" @click="removeCol(element, index)"
                                    title="删除" />
                                  <el-button type="success" :icon="colVisible[index] ? 'Hide' : 'View'"
                                    @click="changeColVisible(!colVisible[index], index)" title="显示|隐藏" />
                                </el-button-group>
                              </div>
                            </template>
                            <div v-show="colVisible[index]">
                              <el-form-item v-for="(item, key) in element.attr" :label="item.label" :key="key">
                                <el-input v-model="item.value" :placeholder="item.placeholder"
                                  v-if="item.type === 'input'" />
                                <el-input-number v-model="item.value" v-else-if="item.type === 'number'" />
                                <el-slider v-model="item.value" v-else-if="item.type === 'slider'" :min="item.min"
                                  :max="item.max" />
                                <el-popover placement="left" :width="400" trigger="click" v-else-if="
                                  activeDataProperty.tag === 'el-row' &&
                                  item.type === 'object' &&
                                  activeDataProperty?.slots?.default?.slotType ===
                                  'childDragComponent'
                                ">
                                  <template #reference>
                                    <el-button style="width: 100%">{{ key }}</el-button>
                                  </template>
                                  <el-form-item v-for="(value, key) in item.value" :label="key">
                                    <el-slider v-model="item.value[key]" :min="0" :max="24"
                                      style="padding-left: 12px;padding-right: 12px;" />
                                  </el-form-item>
                                  {{ item.value.span }}-{{ item.value.offset }}-{{
                                    item.value.pull
                                  }}-{{ item.value.push }}
                                </el-popover>
                              </el-form-item>
                            </div>
                            <el-text class="mx-1" type="info">点击眼睛切换状态</el-text>
                          </el-card>
                        </template>
                      </draggable>
                    </template>
                  </div>
                </el-scrollbar>
              </el-collapse-item>

              <el-collapse-item title="插槽配置" name="4" v-if="Object.keys(filteredSlots).length > 0">
                <el-scrollbar max-height="300px">
                  <el-form-item v-for="(item, key) in filteredSlots" :label="item.label" :key="key">
                  <el-input v-model="item.value" :placeholder="item.placeholder" type="textarea" />
                  <el-switch v-model="item.used"  />
                </el-form-item>
                </el-scrollbar>
              </el-collapse-item>

            </el-collapse>
          </el-form>
        </el-card>

        <el-card style="width: 100%;margin-top: 5px;" v-if="activeDataProperty?.slots?.default?.slotType ===
          'itemComponent'">
          <el-text>拖拽区</el-text>
          <draggable group="componentsGroup" :animation="340" :list="activeDataProperty.slots.default.slotOptions"
            class="panel-drag-wrapper" item-key="renderKey" @start="drag = true" @end="drag = false">
            <template #item="scoped">
              <el-button type="primary">{{ scoped.element.tagLabel }}</el-button>
            </template>
          </draggable>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="全局配置" name="componentGlobal"> 
      </el-tab-pane>
    </el-tabs>
  </div>
  <icons-dialog v-model="iconsVisible" :current="formItemAttr[currentIconModel]" @select="setIcon" />
  <treeNode-dialog v-model="dialogVisible" @commit="addNode" />

</template>

<script setup>
import draggable from "vuedraggable/dist/vuedraggable.common";
import { isNumberStr } from "@/utils/index";
import IconsDialog from "./IconsDialog";
import TreeNodeDialog from "./TreeNodeDialog";
const createIdAndKey = inject("createIdAndKey");
const { proxy } = getCurrentInstance();
const childTemplate = ref({});
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
const activeName = ref(1);
const rightActiveTab = ref("componentConf");
const formItemHedge = ref([]);

const formItemAttr = ref([]);

const formItemChild = ref([]);

function changeColVisible(visible, index) {
  colVisible.value[index] = visible;
}

const filteredSlots = computed(() => {
  if (!props.activeDataProperty?.slots) return {};
  return Object.entries(props.activeDataProperty.slots).reduce((acc, [key, value]) => {
    //如果插槽未使用或者插槽类型为normal且value为空，直接不使用
    if (value.slotType === "normal") {
      acc[key] = value;
    }
    return acc;
  }, {});
});

function chooseTemplate(type) { }

function handleRadioChange(value) {
  if (
    props.activeDataProperty.template &&
    typeof value === "string" &&
    value.indexOf("el-") > -1
  ) {
    props.activeDataProperty.slots.default.slotOptions = [];
    childTemplate.value = props.activeDataProperty.template[value];
  }
}

function addItemByTemplate() {
  addCol(childTemplate.value);
}
function addCol(child, index) {
  let clone = JSON.parse(JSON.stringify(child));
  clone = createIdAndKey(clone);
  props.activeDataProperty.slots.default.slotOptions.push(clone);
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
    if (val.slots?.default?.slotOptions) {
      formItemChild.value = val.slots.default.slotOptions;
    }
    if (val.template && Object.keys(val).length > 0) {
      for (let item in val.template) {
        childTemplate.value = val.template[item];
        break;
      }
    }
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
  .right-tabs{
  ::v-deep .el-tabs__nav-scroll {
      display: flex !important;
      justify-content: space-around !important;
    }
    .document-link {
      position: absolute;
      display: flex;
      width: 26px;
      height: 26px;
      top: 6px;
      right: 0;
      cursor: pointer;
      background: #409eff;
      z-index: 1;
      border-radius: 0 0 6px 0;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 18px;
    }

    .panel-drag-wrapper {
      min-height: 300px;
      border: 1px dashed red;
    }
  }
}
</style>
