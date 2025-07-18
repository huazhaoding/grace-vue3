<template>
  <div class="right-board">
    <el-tabs v-model="rightActiveTab" class="right-tabs">
      <el-tab-pane label="组件配置" name="componentConf">
        <el-card body-class="card-body" v-if="activeDataProperty?.tag" header-class="card-header">
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
          <el-form size="default" label-width="90px" label-position="top">
            <el-collapse v-model="activeComponent" accordion @change="handleCollapseChange">
              <el-collapse-item title="基础属性" v-show="activeComponent === undefined || activeComponent === 'one'
                " name="one">
                <el-scrollbar class="right-scrollbar">
                  <el-form-item v-if="activeDataProperty.vModel !== undefined" label="字段名">
                    <el-input v-model="activeDataProperty.vModel" placeholder="请输入字段名（v-model）"></el-input>
                  </el-form-item>
                  <component-attr-edit :active-data-property="activeDataProperty" />
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
                  <div>
                    <el-text>子项配置</el-text>
                  </div>
                </template>
                <el-scrollbar class="right-scrollbar">
                  <div class="scrollbar-item">
                    <el-card style="margin-bottom: 10px">
                      <template #header>
                        <div class="card-header">
                          <span>模板操作</span>
                          <el-button-group style="float: right">
                            <el-button type="primary" icon="Plus" @click="addItemByTemplate" title="添加子项" />
                            <el-button type="success" :icon="temSetVisible ? 'Hide' : 'View'"
                              @click="temSetVisible = !temSetVisible" title="显示|隐藏" />
                          </el-button-group>
                        </div>
                      </template>
                      <div v-show="temSetVisible">
                        <el-form-item label="数据源" v-if="activeDataProperty.slots.default.dataSource">
                          <el-radio-group v-model="activeDataProperty.slots.default.dataSource">
                            <el-radio value="static">静态数据</el-radio>
                            <el-radio value="dict">字典数据</el-radio>
                            <el-radio value="config">配置数据</el-radio>
                          </el-radio-group>
                        </el-form-item>
                        <el-form-item label="数据源Key" v-if="activeDataProperty.slots.default.dataSource !== 'static'">
                          <el-input v-model="activeDataProperty.slots.default.dataKey"></el-input>
                          <el-button type="primary" @click="buildDictOptions">加载数据</el-button>
                        </el-form-item>
                        <component-attr-edit
                          :active-data-property="activeDataProperty.template[activeDataProperty.activeTemplate]" />
                      </div>
                      <el-text class="mx-1" type="info">点击眼睛切换状态</el-text>
                    </el-card>


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
                      }" :sort="true" item-key="renderKey">
                        <template #item="{ element, index }">
                          <el-card style="margin-bottom: 10px;">
                            <template #header>
                              <div class="card-header" style="cursor: move;">
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
      <el-tab-pane label="全局配置" name="componentGlobal">
        <el-card body-class="card-body" header-class="card-header">
          <el-form size="default" label-width="90px" label-position="top">
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
                    <el-button style="margin-right: 10px" type="primary"
                      @click="handleMethod(item, 'methods', true, key)" icon="Edit">编辑</el-button>
                    <el-switch v-model="item.used" />
                  </el-form-item>
                  <el-button @click="handleMethod(undefined, 'methods', false, '')">添加方法</el-button>
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
                <el-input-tag v-model="generateConf.emits" tag-type="success" placeholder="请输入emit" />
              </el-collapse-item>
              <el-collapse-item title="expose管理" name="expose"
                v-show="activeGeneral === undefined || activeGeneral === 'expose'">
                <el-form-item label="事件列表">
                  <el-select v-model="exposeMethod" @change="exposeChange" multiple>
                    <el-option v-for="(item, key) in generateConf.methods" :key="key" :label="key" :value="key" />
                  </el-select>
                </el-form-item>
                <el-form-item label="属性列表">
                  <el-select v-model="exposeAtttrbutes" multiple @change="exposeChange">
                    <el-option v-for="(item, key) in generateConf.attrbutes" :key="key" :label="key" :value="key" />
                  </el-select>
                </el-form-item>
                <el-input-tag disabled v-model="generateConf.expose" tag-type="success" placeholder="请输入emit" />
              </el-collapse-item>
            </el-collapse>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
  <method-edit-dialog v-model="methodsVisible" :fnFrom="fnFrom" :isDefault="isDefault" :method="method"
    @updateMethod="updateMethod" />
</template>

<script setup>
import draggable from "vuedraggable/dist/vuedraggable.common";
import MethodEditDialog from "./components/MethodEditDialog";
import ComponentAttrEdit from "./components/ComponentAttrEdit.vue";
import { cloneDeep, set } from "lodash-es";
import EditProps from "./components/EditProps";
import EditAttr from "./components/EditAttr";
import { getDicts } from '@/api/system/dict/data';
const createIdAndKey = inject("createIdAndKey");
const { proxy } = getCurrentInstance();
const props = defineProps({
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
const colVisible = ref([])
const fnFrom = ref("")
const isDefault = ref(false)
const method = ref({})
const temSetVisible = ref(false)


//事件控制器
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

const isComponentMounted = ref(true); // 标志变量，表示组件是否已挂载

onUnmounted(() => {
  isComponentMounted.value = false; // 组件卸载时设置为 false
});

// ... existing code ...
function getDictus(key, timeout = 500) {
  const dictRef = proxy.useDict(key)[key]; // 获取响应式引用
  return Promise.race([
    new Promise((resolve, reject) => {
      let unwatch; // 定义 unwatch 为可选变量
      const stopWatch = () => {
        if (unwatch) {
          unwatch(); // 停止监听
          unwatch = null; // 避免重复调用
        }
      };

      unwatch = watch(
        () => dictRef.value,
        (newValue) => {
          if (newValue && newValue.length > 0 && isComponentMounted.value) {
            stopWatch(); // 停止监听
            resolve(newValue); // 返回加载完成的数据
          }
        },
        { immediate: true }
      );

      // 设置超时逻辑
      const timeoutId = setTimeout(() => {
        stopWatch();
        reject(new Error(`字典数据加载超时: ${key}`)); // 超时后抛出错误
      }, timeout);
    }),
    new Promise((_, reject) => {
      if (!isComponentMounted.value) {
        reject(new Error("组件已卸载，无法加载字典数据"));
      }
    }),
  ]).catch((error) => {
    proxy.$message.warning(error.message || error); // 警告信息
    return []; // 超时或异常时返回空数组
  });
}

async function buildDictOptions() {
  const tem = props.activeDataProperty.template[props.activeDataProperty.activeTemplate];
  const key = props.activeDataProperty.slots.default.dataKey;

  switch (props.activeDataProperty.slots.default.dataSource) {
    case "static":
      break;
    case "dict":
      try {
        const dis = await getDictus(key); // 等待字典数据加载完成
        // 清空并更新子项配置
        props.activeDataProperty.slots.default.slotOptions = [];
        if (!dis || dis.length === 0) {
          proxy.$message.warning("字典数据为空或未正确加载");
          return;
        }
        nextTick(() => {
          if (!isComponentMounted.value) return; // 如果组件已卸载，直接返回
          const ad = [];
          for (const item of dis) {
            let childComponent = cloneDeep(tem);
            if (childComponent?.attr?.label) {
              childComponent.attr.label.value = item.label;
            }
            if (childComponent?.slots?.default?.slotType === "normal") {
              childComponent.slots.default.value = item.label;
            }
            if (childComponent?.attr?.value) {
              childComponent.attr.value.value = item.value;
            }
            ad.push(childComponent);
          }
          props.activeDataProperty.slots.default.slotOptions.push(...ad);
        });
      } catch (error) {
        proxy.$message.warning("加载字典数据失败:", error.message || error);
      }
      break;
    case "config":
      break;
    default:
      break;
  }
}
// ... existing code ...

function getConfig(key) {
  return proxy.useDict(key)[key];
}

function handleMethod(item, fnFromAc, isDefaultAc, key) {
  if (!item) {
    key = "function_" + new Date().getTime();
    item = {
      value: `function ${key}(){return 'hello world';}`,
      label: "测试方法",
      info: "测试方法",
      used: false
    }
  }
  method.value = item;
  method.value.key = key;
  fnFrom.value = fnFromAc;
  isDefault.value = isDefaultAc;
  methodsVisible.value = true;
}
//更新方法
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

//方法列表
const exposeMethod = ref(props.generateConf.expose.filter(item => Object.keys(props.generateConf.methods).includes(item)));

//属性列表
const exposeAtttrbutes = ref(props.generateConf.expose.filter(item => Object.keys(props.generateConf.atttrbutes).includes(item)));

//暴露变化
function exposeChange(value) {
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


// 通过模板添加
function addItemByTemplate() {
  if (props.activeDataProperty.activeTemplate !== "") {
  } else {
    if (
      props.activeDataProperty.template &&
      Object.keys(props.activeDataProperty.template).length > 0
    ) {
      for (let key in Object.keys(props.activeDataProperty.template)) {
        props.activeDataProperty.activeTemplate = key;
        break;
      }
    } else {
      proxy.$modal.msgError("请确认模板存在");
    }
  }
  addCol(props.activeDataProperty.template[props.activeDataProperty.activeTemplate]);
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
});

const {
  methodsVisible,
} = toRefs(data);

const documentLink = computed(
  () =>
    props.activeDataProperty.document ||
    "https://element-plus.org/zh-CN/guide/installation"
);

const emit = defineEmits(["tag-change", "formItemChange"]);


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
