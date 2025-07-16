<template>
  <div class="right-board">
    <el-tabs v-model="rightActiveTab" class="right-tabs">
      <el-tab-pane label="组件配置" name="componentConf">
        <el-card body-class="card-body" v-if="activeDataProperty.tag" header-class="card-header">
          <template #header>
            <div>
              <el-text>
                {{ activeDataProperty.tagLabel }}-{{ activeDataProperty.id }}
              </el-text>
              <a class="document-link" target="_blank" :href="documentLink" title="查看组件文档">
                <el-icon>
                  <Link />
                </el-icon>
              </a>
            </div>
          </template>
          <el-form style="padding-left: 5px; padding-right: 5px" size="default" label-width="90px" label-position="top">
            <el-collapse v-model="activeComponent" accordion @change="handleCollapseChange">
              <el-collapse-item title="基础属性" v-show="activeComponent === undefined || activeComponent === 'one'
                " name="one">
                <el-scrollbar class="right-scrollbar">
                  <el-form-item v-if="activeDataProperty.vModel !== undefined" label="字段名">
                    <el-input v-model="activeDataProperty.vModel" placeholder="请输入字段名（v-model）"></el-input>
                  </el-form-item>
                  <el-form-item v-for="(item, key) in activeDataProperty.attr" :label="item.label" :key="key">
                    <el-input v-model="item.value" :placeholder="item.placeholder" v-if="item.type === 'input'" />
                    <el-switch v-model="item.value" v-else-if="item.type === 'switch'" />
                    <el-radio-group @change="handleRadioChange" v-model="item.value" v-else-if="item.type === 'radio'">
                      <el-radio v-for="(radio, index) in item.options" :key="index" :value="radio.value">{{ radio.label
                        }}</el-radio>
                    </el-radio-group>
                    <el-input-number v-model="item.value" v-else-if="item.type === 'number'" />
                    <el-color-picker v-model="item.value" v-else-if="item.type === 'color'" />
                    <el-slider v-model="item.value" v-else-if="item.type === 'slider'" :min="item.min" :max="item.max"
                      style="padding-left: 12px; padding-right: 12px" />
                    <el-input-tag v-model="item.value" v-else-if="item.type === 'tag'" />
                    <el-input v-else-if="item.type === 'icon'" v-model="item.value">
                      <template #append>
                        <el-button icon="Pointer" @click="openIconsDialog(key)">
                          选择
                        </el-button>
                      </template>
                    </el-input>
                    <el-popover placement="left" :width="400" trigger="click" v-else-if="
                      item.type === 'object' &&
                      activeDataProperty.tag === 'el-col'
                    ">
                      <template #reference>
                        <el-button style="width: 100%">{{ key }}</el-button>
                      </template>
                      <el-form-item v-for="(value, key) in item.value" :label="key" :key="key">
                        <el-slider v-model="item.value[key]" :min="0" :max="24" />
                      </el-form-item>
                      {{ item.value.span }}-{{ item.value.offset }}-{{
                        item.value.pull
                      }}-{{ item.value.push }}
                    </el-popover>
                  </el-form-item>
                </el-scrollbar>
              </el-collapse-item>
              <el-collapse-item v-show="activeComponent === undefined || activeComponent === 'two'
                " title="子项配置" name="two" v-if="
                  activeDataProperty?.slots?.default?.slotType ===
                  'childDragComponent' ||
                  activeDataProperty?.slots?.default?.slotType ===
                  'childComponent'
                ">
                <template #title="{ isActive }">
                  <el-text style="margin-right: 10px">子项配置</el-text>
                  <el-tooltip effect="dark" content="添加子项" placement="top-start">
                    <el-text type="primary" @click.stop="addItemByTemplate">
                      <el-icon>
                        <Plus />
                      </el-icon>
                    </el-text>
                  </el-tooltip>
                </template>
                <el-scrollbar class="right-scrollbar">
                  <div class="scrollbar-item">
                    <template v-if="
                      activeDataProperty?.slots?.default?.slotType ===
                      'childDragComponent' ||
                      activeDataProperty?.slots?.default?.slotType ===
                      'childComponent'
                    ">
                      <draggable :list="activeDataProperty.slots.default.slotOptions" :group="{
                        name: 'formItemChild',
                        pull: false,
                        put: false,
                      }" :sort="true" item-key="renderKey" class="draggable">
                        <template #item="{ element, index }">
                          <el-card style="margin-bottom: 10px">
                            <template #header>
                              <div class="card-header">
                                <span>子项{{ index + 1 }}配置</span>
                                <el-button-group style="float: right">
                                  <el-button type="primary" icon="Plus" @click="addCol(element, index)" title="复制" />
                                  <el-button type="danger" icon="Remove" @click="removeCol(element, index)"
                                    title="删除" />
                                  <el-button type="success" :icon="colVisible[index] ? 'Hide' : 'View'" @click="
                                    changeColVisible(
                                      !colVisible[index],
                                      index
                                    )
                                    " title="显示|隐藏" />
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
                                <el-switch v-model="item.value" v-else-if="item.type === 'switch'" />
                                <el-radio-group v-model="item.value" v-else-if="item.type === 'radio'">
                                  <el-radio v-for="(item, index) in item.options" :key="index" :value="item.value">{{
                                    item.label
                                    }}</el-radio>
                                </el-radio-group>
                                <el-popover placement="left" :width="400" trigger="click" v-else-if="
                                  activeDataProperty.tag === 'el-row' &&
                                  item.type === 'object' &&
                                  activeDataProperty?.slots?.default
                                    ?.slotType === 'childDragComponent'
                                ">
                                  <template #reference>
                                    <el-button style="width: 100%">{{
                                      key
                                    }}</el-button>
                                  </template>
                                  <el-form-item v-for="(value, key) in item.value" :label="key" :key="key">
                                    <el-slider v-model="item.value[key]" :min="0" :max="24" style="
                                        padding-left: 12px;
                                        padding-right: 12px;
                                      " />
                                  </el-form-item>
                                  {{ item.value.span }}-{{
                                    item.value.offset
                                  }}-{{ item.value.pull }}-{{ item.value.push }}
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
              <el-collapse-item title="插槽配置" v-show="activeComponent === undefined || activeComponent === 'three'
                " name="three" v-if="Object.keys(filteredSlots).length > 0">
                <el-scrollbar class="right-scrollbar">
                  <el-form-item v-for="(item, key) in filteredSlots" :label="item.label" :key="key">
                    <el-input v-model="item.value" :placeholder="item.placeholder" type="textarea" />
                    <el-switch v-model="item.used" />
                  </el-form-item>
                </el-scrollbar>
              </el-collapse-item>
              <el-collapse-item title="事件配置" v-show="activeComponent === undefined || activeComponent === 'four'
                " name="four" v-if="activeDataProperty.events">
                <el-scrollbar class="right-scrollbar">
                  <el-form-item v-for="(item, key) in activeDataProperty.events" :label="item.label" :key="key">
                    <el-button type="primary" @click="handleEvent(item, key)" style="margin-right: 10px">编辑</el-button>
                    <el-switch v-model="item.used" />
                  </el-form-item>
                </el-scrollbar>
              </el-collapse-item>
            </el-collapse>
          </el-form>
        </el-card>
        <el-card body-class="card-body" header-class="card-header" v-if="
          activeDataProperty?.slots?.default?.slotType === 'itemComponent'
        ">
          <el-text>拖拽区</el-text>
          <draggable group="componentsGroup" :animation="340" :list="activeDataProperty.slots.default.slotOptions"
            class="panel-drag-wrapper" item-key="renderKey" @start="drag = true" @end="drag = false">
            <template #item="scoped">
              <el-button type="primary">{{
                scoped.element.tagLabel
              }}</el-button>
            </template>
          </draggable>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="全局配置" name="componentGlobal" style="padding-left: 5px; padding-right: 5px">
        <el-form style="padding-left: 5px; padding-right: 5px" size="default" label-width="90px" label-position="top">
          <el-collapse v-model="activeGeneral" accordion @change="handleCollapseChange">
            <el-collapse-item title="生命周期管理" name="lifeCycle" v-show="activeGeneral === undefined || activeGeneral === 'lifeCycle'
              ">
              <el-scrollbar class="right-scrollbar">
                <el-form-item v-for="(item, key) in generateConf.lifeCycles" :label="item.label" :key="key">
                  <el-button style="margin-right: 10px" type="primary"
                    @click="handleMethod(item, 'lifeCycle', true, key)" icon="Edit">编辑</el-button>
                  <el-switch v-model="item.used" />
                </el-form-item>
              </el-scrollbar>
            </el-collapse-item>
            <el-collapse-item title="方法管理" name="methods" v-show="activeGeneral === undefined || activeGeneral === 'methods'
              ">
              <el-scrollbar class="right-scrollbar">
                <el-form-item v-for="(item, key) in generateConf.methods" :label="item.label" :key="key">
                  <el-button style="margin-right: 10px" type="primary" @click="handleMethod(item, 'methods', true, key)"
                    icon="Edit">编辑</el-button>
                  <el-switch v-model="item.used" />
                </el-form-item>
                <el-button>添加方法</el-button>
              </el-scrollbar>
            </el-collapse-item>
            <el-collapse-item title="属性管理" name="attrbutes"
              v-show="activeGeneral === undefined || activeGeneral === 'attrbutes'">
              <el-scrollbar class="right-scrollbar">
                <edit-attr :props-key="undefined" @updateAttr="updateAttr" :is-add="true" />
                <template v-for="(item, key) in generateConf.attrbutes" :key="key">
                  <edit-attr :props-config="item" @updateAttr="updateAttr" :props-key="key" />
                </template>
              </el-scrollbar>
            </el-collapse-item>
            <el-collapse-item title="props管理" name="props"
              v-show="activeGeneral === undefined || activeGeneral === 'props'">
              <el-scrollbar class="right-scrollbar">
                <edit-props :props-key="undefined" @updateProps="updateProps" :is-add="true" />
                <template v-for="(item, key) in generateConf.props" :key="key">
                  <edit-props :props-config="item" @updateProps="updateProps" :props-key="key" />
                </template>
              </el-scrollbar>
            </el-collapse-item>
            <el-collapse-item title="emits管理" name="emits"
              v-show="activeGeneral === undefined || activeGeneral === 'emits'">
              <el-input-tag v-model="generateConf.emits" tag-type="success"  placeholder="请输入emit" />
            </el-collapse-item>
            <el-collapse-item title="expose管理" name="expose"
              v-show="activeGeneral === undefined || activeGeneral === 'expose'">
              <el-select v-model="exposeMethod" @change="exposeChange" multiple>
                <el-option v-for="(item,key) in generateConf.methods" :key="key" :label="key" :value="key" />
              </el-select>
              <el-select v-model="exposeAtttrbutes" multiple @change="exposeChange">
                <el-option v-for="(item,key) in generateConf.atttrbutes" :key="key" :label="key" :value="key" />
              </el-select >
              <el-input-tag disabled v-model="generateConf.expose" tag-type="success"  placeholder="请输入emit" />
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
  <icons-dialog v-model="iconsVisible" :current="currentIconModel ? activeDataProperty.attr[currentIconModel] : null
    " @select="setIcon" />
  <method-edit-dialog v-model="methodsVisible" :fnFrom="fnFrom" :isDefault="isDefault" :method="method"
    @updateMethod="updateMethod" />
</template>

<script setup>
import draggable from "vuedraggable/dist/vuedraggable.common";
import IconsDialog from "./IconsDialog";
import MethodEditDialog from "./components/MethodEditDialog";
import { cloneDeep } from "lodash-es";
import EditProps from "./components/EditProps";
import EditAttr from "./components/EditAttr";
const createIdAndKey = inject("createIdAndKey");
const { proxy } = getCurrentInstance();
const props = defineProps({
  showField: Boolean,
  activeDataProperty: {
    type: Object,
    required: true,
    default: undefined,
  },
  generateConf: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});
const childTemplate = ref({});
const colVisible = ref([]);
const fnFrom = ref("");
const isDefault = ref(false);
const method = ref({});

function handleEvent(item, key) {
  let med = props.generateConf.methods[item.functionName];
  if (med) {
    handleMethod(med, "event", true, key);
  } else {
    med = {};
    const functionName = `${item.functionName}${new Date().getTime()}`;
    med.value = `function ${functionName}(${item.param.join(",")}){${item.usedReturn ? "return;" : ""
      }}`;
    handleMethod(med, "event", true, key);
  }
}

function handleMethod(item, fnFromAc, isDefaultAc, key) {
  method.value = cloneDeep(item);
  method.value.key = key;
  fnFrom.value = fnFromAc;
  isDefault.value = isDefaultAc;
  methodsVisible.value = true;
}

function updateMethod(fnString, fnFromAc, fnName, key) {
  if (fnFromAc === "lifeCycle") {
    props.generateConf.lifeCycles[fnName].value = fnString;
  } else {
    props.generateConf.methods[fnName] = {
      value: fnString,
    };
    props.activeDataProperty.events[key].functionName = fnName;
  }
}

const exposeMethod=ref(props.generateConf.expose.filter(item=>Object.keys(props.generateConf.methods).includes(item)));

const exposeAtttrbutes=ref(props.generateConf.expose.filter(item=>Object.keys(props.generateConf.atttrbutes).includes(item)));

function exposeChange(value){
 props.generateConf.expose = [...new Set([...props.generateConf.expose, ...value])];
}

function updateProps(key, value, type) {
  if (type === "delete") {
    proxy.$modal
      .confirm("确定要删除？")
      .then(function () {
        delete props.generateConf.props[key];
      })
      .then(() => {
        proxy.$modal.msgSuccess("更新成功");
      })
      .catch(() => { });
  } else {
    proxy.$modal
      .confirm("是否确定要更新吗？")
      .then(function () {
        props.generateConf.props[key] = value;
      })
      .then(() => {
        proxy.$modal.msgSuccess("更新成功");
      })
      .catch(() => { });
  }
}

function updateAttr(key, value, type) {
  if (type === "delete") {
    proxy.$modal
      .confirm("确定要删除？")
      .then(function () {
        delete props.generateConf.attrbutes[key];
      })
      .then(() => {
        proxy.$modal.msgSuccess("更新成功");
      })
      .catch(() => { });
  } else {
    proxy.$modal
      .confirm("是否确定要更新吗？")
      .then(function () {
        props.generateConf.attrbutes[key] = value;
      })
      .then(() => {
        proxy.$modal.msgSuccess("更新成功");
      })
      .catch(() => { });
  }
}

const activeComponent = ref(undefined);

const activeGeneral = ref(undefined);

function handleCollapseChange(val) {
  if (!val) {
    activeComponent.value = undefined;
    activeGeneral.value = undefined;
  }
}

const rightActiveTab = ref("componentConf");
function changeColVisible(visible, index) {
  if (index >= 0 && index < colVisible.value.length) {
    colVisible.value[index] = visible;
  } else if (index === colVisible.value.length) {
    colVisible.value.push(visible);
  }
}

const filteredSlots = computed(() => {
  if (!props.activeDataProperty?.slots) return {};
  return Object.entries(props.activeDataProperty.slots).reduce(
    (acc, [key, value]) => {
      // 如果插槽类型为normal，则包含该插槽
      if (value.slotType === "normal") {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
});

function handleRadioChange(value) {
  // 模板切换
  if (
    props.activeDataProperty.template &&
    typeof value === "string" &&
    value.indexOf("el-") > -1
  ) {
    props.activeDataProperty.slots.default.slotOptions = [];
    childTemplate.value = props.activeDataProperty.template[value];
  }
}

// 通过模板添加
function addItemByTemplate() {
  if (Object.keys(childTemplate.value).length > 0) {
  } else {
    if (
      props.activeDataProperty.template &&
      Object.keys(props.activeDataProperty.template).length > 0
    ) {
      for (let item in props.activeDataProperty.template) {
        childTemplate.value = props.activeDataProperty.template[item];
        break;
      }
    } else {
      proxy.$modal.msgError("请确认模板存在");
    }
  }
  addCol(childTemplate.value);
}

function addCol(child, index) {
  const clone = createIdAndKey(cloneDeep(child));
  props.activeDataProperty.slots.default.slotOptions.push(clone);
  changeColVisible(
    true,
    props.activeDataProperty.slots.default.slotOptions.length - 1
  );
}

function removeCol(child, index) {
  const items = props.activeDataProperty.slots.default.slotOptions;
  if (items.length <= 1) {
    proxy.$modal.msgError("请保留至少一项");
    return;
  }
  items.splice(index, 1);
  if (colVisible.value.length > items.length) {
    colVisible.value.pop();
  }
}

const data = reactive({
  currentTab: "field",
  currentNode: null,
  dialogVisible: false,
  methodsVisible: false,
  iconsVisible: false,
  currentIconModel: null,
});

const {
  currentTab,
  currentNode,
  dialogVisible,
  methodsVisible,
  iconsVisible,
  currentIconModel,
} = toRefs(data);

const documentLink = computed(
  () =>
    props.activeDataProperty.document ||
    "https://element-plus.org/zh-CN/guide/installation"
);

const emit = defineEmits(["tag-change", "formItemChange"]);

function openIconsDialog(model) {
  iconsVisible.value = true;
  currentIconModel.value = model;
}

function setIcon(val) {
  if (props.activeDataProperty.attr[currentIconModel.value]) {
    props.activeDataProperty.attr[currentIconModel.value].value = val;
  }
}
</script>

<style lang="scss" scoped>
.right-board {
  .right-tabs {
    :deep(.el-tabs__nav-scroll) {
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

    .right-scrollbar {
      height: calc(100vh - 250px);
    }

    .panel-drag-wrapper {
      min-height: 300px;
      border: 1px dashed red;
    }
  }
}
</style>
