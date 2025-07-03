<template>
  <div :class="className" ref="draggableItemRef" @click.stop="activeItem(elementData)" v-if="tool">
    <div class="draggable-item-mark">
      <el-icon>
        <Rank />
      </el-icon>
      <span class="draggable-item-name">{{ elementData.tagLabel+elementData.id }}</span>
    </div>

    <component v-if="
      elementData.type && elementData.type === 'form' && elementData.hedge
    " :is="elementData.hedge.tag" v-bind="elementData.hedge.attr" class="field-wrapper not-drag">
      <component :is="elementData.tag" v-bind="simplifyItem(elementData.attr)"
        :modelValue="elementData.attr.defaultValue?.value ?? ''"
        @update:modelValue="handleModelValueUpdate(elementData, $event)">
        <template v-for="(item, slotName) in filteredSlots" :key="item" v-slot:[slotName]>
          <template v-if="item.slotType === 'normal' && item.value">
            <div v-html="item.value"></div>
          </template>
          <template v-else-if="item.slotType === 'childComponent'">
            <template v-for="(slotChild, slotChildIndex) in item.slotOptions" :key="slotChildIndex">
              <dynamic-component :drawing-list="item.slotOptions" :index="slotChildIndex" :elementData="slotChild"
                :tool="false" @activeItem="activeItem" @copyItem="copyItem"
                @deleteItem="deleteItem" />
            </template>
          </template>
        </template>
      </component>
    </component>

    <div v-else :class="chooseStyle">
      <component :is="elementData.tag" v-bind="simplifyItem(elementData.attr)" >
        <template v-for="(item, slotName) in filteredSlots" :key="item" v-slot:[slotName]>
          <template v-if="item.slotType === 'normal'">
            <div v-html="item.value"></div>
          </template>

          <template v-else-if="item.slotType === 'childComponent'">
            <template v-for="(slotChild, slotChildIndex) in item.slotOptions" :key="slotChildIndex">
              <dynamic-component :drawing-list="item.slotOptions" :index="slotChildIndex" :elementData="slotChild"
                @activeItem="activeItem" @copyItem="copyItem" @deleteItem="deleteItem" :tool="false" />
            </template>
          </template>

          <template v-else-if="item.slotType === 'dragComponent'">
            <draggable group="componentsGroup" :animation="340" :list="elementData.slots.default.slotOptions"
              class="drag-wrapper" item-key="renderKey" @start="drag = true" @end="drag = false">
              <template #item="scoped">
                <dynamic-component :key="scoped.element.renderKey" :drawing-list="elementData.slots.default.slotOptions"
                  :elementData="scoped.element" :active-id="activeId" :index="scoped.index" @activeItem="activeItem"
                  @copyItem="copyItem" @deleteItem="deleteItem" />
              </template>
            </draggable>
          </template>

          <template v-else-if="item.slotType === 'childDragComponent'">
            <component v-for="(slotChild, slotChildIndex) in elementData.slots.default.slotOptions" :key="slotChildIndex"
              :is="slotChild.tag" v-bind="simplifyItem(slotChild.attr)" @click.stop="activeItem(slotChild)"
              class="can-drag">
              <template v-if="
                slotChild.slots &&
                slotChild.slots.default &&
                slotChild.slots.default.slotType == 'dragComponent'
              ">
                <div :class="activeId === slotChild.id
                  ? 'draggable-item draggable-item-active'
                  : 'draggable-item draggable-item-inactive'
                  " @click.stop="activeItem(slotChild)">
                  <div class="draggable-item-mark">
                    <span class="draggable-item-name">{{
                      slotChild.tagLabel+slotChild.id
                    }}</span>
                  </div>
                  <draggable group="componentsGroup" :animation="340" :list="slotChild.slots.default.slotOptions"
                    class="drag-wrapper" item-key="renderKey" @start="drag = true" @end="drag = false">
                    <template #item="scoped">
                      <dynamic-component :key="scoped.element.renderKey" :drawing-list="slotChild.slots.default.slotOptions"
                        :elementData="scoped.element" :index="scoped.index" :active-id="activeId" :tool="true"
                        @activeItem="activeItem"
                        @copyItem="copyItem"
                        @deleteItem="deleteItem" />
                    </template>
                  </draggable>
                  <div class="draggable-item-tool" style="bottom: -7px">
                    <span class="drawing-item-copy" title="复制" @click.stop="
                      copyItem(slotChild, elementData.slots.default.slotOptions)
                      ">
                      <el-icon>
                        <CopyDocument />
                      </el-icon>
                    </span>
                    <span class="drawing-item-delete" title="删除">
                      <el-icon>
                        <Delete v-if="elementData.slots.default.slotOptions.length > 1" @click.stop="
                          deleteItem(
                            slotChildIndex,
                            elementData.slots.default.slotOptions
                          )
                          " />
                      </el-icon>
                    </span>
                  </div>
                </div>
              </template>
            </component>
          </template>
        </template>
      </component>
    </div>
    <div class="draggable-item-tool">
      <span class="drawing-item-copy" title="复制" @click.stop="copyItem(elementData,drawingList)">
        <el-icon>
          <CopyDocument />
        </el-icon>
      </span>
      <span class="drawing-item-delete" title="删除" @click.stop="deleteItem(index,drawingList)">
        <el-icon>
          <Delete />
        </el-icon>
      </span>
    </div>
  </div>

  <component v-else :is="elementData.tag" v-bind="simplifyItem(elementData.attr)">
    <template v-for="(item,slotName) in filteredSlots" :key="item" v-slot:[slotName]>
      <template v-if="item.slotType === 'normal' && item.value">
        <div v-html="item.value"></div>
      </template>
      <template v-else-if="item.slotType === 'childComponent'">
        <template v-for="(slotChild, slotChildIndex) in item.slotOptions" :key="slotChildIndex">
          <dynamic-component :drawing-list="item.slotOptions"  :index="slotChildIndex" :elementData="slotChild"
            :tool="false" 
            @copyItem="copyItem"
            @deleteItem="deleteItem" />
        </template>
      </template>
    </template>
  </component>
</template>

<script setup name="DynamicComponent">
import draggable from "vuedraggable/dist/vuedraggable.common";
const emits = defineEmits(["activeItem", "copyItem", "deleteItem"]);
const props = defineProps({
  elementData: {
    type: Object,
    required: true,
  },
  index: Number,
  drawingList: {
    type: Array,
    required: true,
  },
  activeId: {
    type: [String, Number],
    required: false,
  },
  tool: {
    type: Boolean,
    default: true,
    required: false,
  },
});
const className = ref("");
const draggableItemRef = ref(null);
const filteredSlots = computed(() => {
  return Object.entries(props.elementData.slots).reduce((acc, [key, value]) => {
    //如果插槽未使用或者插槽类型为normal且value为空，直接不使用
    if (!value.used || (value.slotType === "normal" && !value.value)) {

    }
    else {
      acc[key] = value;
    }
    return acc;
  }, {});
});
function handleModelValueUpdate(elementData, $event) {
  elementData.attr.defaultValue.value = $event;
}

const chooseStyle = computed(() => {
  const _type = props.elementData.slots.default.slotType;
  if (_type === "childComponent" || _type === "normal") {
    return "not-drag";
  }
  return "can-drag";
});

// 转换函数：将复杂结构简化为简单结构
function simplifyItem(item) {
  const simplified = {};
  for (const key in item) {
    simplified[key] = item[key].value;
  }
  return simplified;
}

function activeItem(item) {
  emits("activeItem", item);
}

function copyItem(item, parent) {
  emits("copyItem", item, parent ?? props.drawingList);
}
function deleteItem(index, parent) {
  emits("deleteItem", index, parent ?? props.drawingList);
}

// 监听 activeId 的变化，动态更新激活状态 可拖拽组件为虚线 不可拖拽组件为实线
watch(
  () => props.activeId,
  (val) => {
    if (val) {
      if (val !== props.elementData.id) {
        className.value = "draggable-item draggable-item-inactive"; // 移除激活样式
      } else {
        className.value = "draggable-item draggable-item-active"; // 添加激活样式
      }
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => props.elementData,
  (val) => {
    console.log(val);
  },
  { immediate: true, deep: true }
);
</script>
