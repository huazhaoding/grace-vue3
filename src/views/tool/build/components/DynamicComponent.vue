<template>
  <div :class="className" ref="draggableItemRef" @click.stop="activeItem(elementData)" v-if="tool">
    <div class="draggable-item-mark">
      <el-icon>
        <Rank />
      </el-icon>
    </div>


    <component :is="elementData.tag" :modelValue="elementData.attr['v-model']?.value ?? ''"
        @update:modelValue="handleModelValueUpdate(elementData, $event)" 
      v-bind="simplifyItem(elementData.attr)">
      <template v-for="(item, slotName) in elementData.slots" :key="slotName" #[item.used?slotName:'']>
        <template v-if="item.slotType === 'normal' && item.value">
          <div v-html="item.value"></div>
        </template>
        <template v-else-if="item.slotType === 'childComponent'">
          <template v-for="(slotChild, slotChildIndex) in item.slotOptions" :key="slotChildIndex">
            <dynamic-component :drawing-list="item.slotOptions" :index="slotChildIndex" :elementData="slotChild"
              @activeItem="activeItem" @copyItem="copyItem" :active-id="activeId" @deleteItem="deleteItem"
              :tool="false" />
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

        <template v-else-if="item.slotType === 'itemComponent'">
          <template v-for="(slotChild, slotChildIndex) in elementData.slots.default
            .slotOptions" :key="slotChildIndex">
            <dynamic-component :drawing-list="elementData.slots.default.slotOptions" :active-id="activeId"
              :index="slotChildIndex" :elementData="slotChild" :tool="true" @activeItem="activeItem"
              @copyItem="copyItem" @deleteItem="deleteItem" />
          </template>
        </template>

        <template v-else-if="item.slotType === 'childDragComponent'">
          <component v-for="(slotChild, slotChildIndex) in elementData.slots.default
            .slotOptions" :key="slotChildIndex" :is="slotChild.tag" v-bind="simplifyItem(slotChild.attr)"
            @click.stop="activeItem(slotChild)">
            <template v-if="slotChild?.slots?.default?.slotType == 'dragComponent'">
              <div :class="activeId === slotChild.id
                ? 'draggable-item _is-layout draggable-item-active'
                : 'draggable-item _is-layout draggable-item-inactive'
                " @click.stop="activeItem(slotChild)">
                <draggable group="componentsGroup" :animation="340" :list="slotChild.slots.default.slotOptions"
                  class="drag-wrapper" item-key="renderKey" @start="drag = true" @end="drag = false">
                  <template #item="scoped">
                    <dynamic-component :key="scoped.element.renderKey"
                      :drawing-list="slotChild.slots.default.slotOptions" :elementData="scoped.element"
                      :index="scoped.index" :active-id="activeId" :tool="true" @activeItem="activeItem"
                      @copyItem="copyItem" @deleteItem="deleteItem" />
                  </template>
                </draggable>
                <div class="draggable-item-tool">
                  <span class="drawing-item-copy" title="复制" @click.stop="
                    copyItem(
                      slotChild,
                      elementData.slots.default.slotOptions
                    )
                    ">
                    <el-icon>
                      <CopyDocument />
                    </el-icon>
                  </span>
                  <span class="drawing-item-delete" title="删除" v-if="elementData.slots.default.slotOptions.length > 1">
                    <el-icon>
                      <Delete @click.stop="
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

    <div class="draggable-item-tool">
      <span class="drawing-item-copy" title="复制" @click.stop="copyItem(elementData, drawingList)">
        <el-icon>
          <CopyDocument />
        </el-icon>
      </span>
      <span class="drawing-item-delete" title="删除" @click.stop="deleteItem(index, drawingList)">
        <el-icon>
          <Delete />
        </el-icon>
      </span>
    </div>
  </div>

  <component v-else :is="elementData.tag" v-bind="simplifyItem(elementData.attr)"
    :class="activeId === elementData.id ? 'draggable-item-child' : ''" @click.stop="activeItem(elementData)">
    <template v-for="(item, slotName) in elementData.slots" :key="slotName" #[item.used?slotName:'']>
      <template v-if="item.slotType === 'normal' && item.value">
        <div v-html="item.value"></div>
      </template>
      <template v-else-if="item.slotType === 'childComponent'">
        <template v-for="(slotChild, slotChildIndex) in item.slotOptions" :key="slotChildIndex">
          <dynamic-component :drawing-list="item.slotOptions" :active-id="activeId" :index="slotChildIndex"
            :elementData="slotChild" :tool="false" @activeItem="activeItem" @copyItem="copyItem"
            @deleteItem="deleteItem" />
        </template>
      </template>
    </template>
  </component>
</template>
<script setup name="DynamicComponent">
import draggable from "vuedraggable/dist/vuedraggable.common";
const emits = defineEmits([
  "activeItem", "copyItem", "deleteItem"]);
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

// 动态类名计算
const className = computed(() => {
  const isActive = props.activeId === props.elementData.id;
  const componentTypeClass = getComponentTypeClass();
  return isActive
    ? `draggable-item draggable-item-active${componentTypeClass}`
    : `draggable-item draggable-item-inactive${componentTypeClass}`;
});

// 获取组件类型类名
function getComponentTypeClass() {
  if (!props.tool) return "";
  switch (props.elementData.type) {
    case "normal":
      return " _is-normal";
    case "not-drag-layout":
      return " _is-layout-not-drag";
    case "layout":
      return " _is-layout";
    default:
      return "";
  }
}

const draggableItemRef = ref(null);
function handleModelValueUpdate(elementData, $event) {
  if (elementData.attr["v-model"]) {
     nextTick(() => {
     elementData.attr["v-model"].value = $event;
 });
  }
}
// 转换函数：将复杂结构简化为简单结构
function simplifyItem(item) {
  const simplified = {};
  for (const key in item) {
    if (key === "v-model") {

    }
    else if (item[key].append) {
      simplified[key] = item[key].value + item[key].append;
    } else {
      simplified[key] = item[key].value;
    }
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


</script>

<style scoped>
.draggable-item-child::before {
  content: "->";
  color: red;
  margin-right: 2px;
}
</style>
