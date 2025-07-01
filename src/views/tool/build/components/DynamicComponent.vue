<template>
  <div
    :class="className"
    ref="draggableItemRef"
    @click.stop="activeItem(elementData)"
    v-if="tool"
  >
    <div class="draggable-item-mark">
      <el-icon>
        <Rank />
      </el-icon>
      <span class="draggable-item-name">{{ elementData.tagLabel }}</span>
    </div>
    <component
      v-if="
        elementData.type && elementData.type === 'form' && elementData.hedge
      "
      :is="elementData.hedge.tag"
      v-bind="elementData.hedge.attr"
      :modelValue="elementData.modelValue"
      @update:modelValue="handleModelValueUpdate(elementData, $event)"
      class="field-wrapper not-drg"
    >
      <component :is="elementData.tag" v-bind="simplifyItem(elementData.attr)">
        <template
          v-for="(item, slotName) in filteredSlots"
          :key="index"
          v-slot:[slotName]
        >
          <template v-if="item.slotType === 'normal' && item.value">
            <div v-html="item.value"></div>
          </template>
          <template v-else-if="item.slotType === 'childComponent'">
            <template
              v-for="(slotChild, slotChildIndex) in item.slotOptions"
              :key="slotChildIndex"
            >
              <draggable-item
                :drawing-list="item.slotOptions"
                :index="slotChildIndex"
                :elementData="slotChild"
                :tool="false"
              />
            </template>
          </template>
        </template>
      </component>
    </component>

    <component
      v-else
      :is="elementData.tag"
      v-bind="simplifyItem(elementData.attr)"
      class="drg-row"
    > 
      <template
        v-for="(item, slotName) in filteredSlots"
        :key="index"
        v-slot:[slotName]
      >
        <template v-if="item.slotType === 'normal'">
          <div v-html="item.value"></div>
        </template>

        <template v-else-if="item.slotType === 'childComponent'">
          
          <template
            v-for="(slotChild, slotChildIndex) in item.slotOptions"
            :key="slotChildIndex"
          >
            <draggable-item
              :drawing-list="item.slotOptions"
              :index="slotChildIndex"
              :elementData="slotChild"
              :tool="false"
            />
          </template>
        </template>

        <template v-else-if="item.slotType === 'dragComponent'">
          <draggable
            group="componentsGroup"
            :animation="340"
            :list="elementData.slots.default.slotOptions"
            class="drag-wrapper"
            item-key="renderKey"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element, index }">
              <draggable-item
                :key="element.renderKey"
                :drawing-list="elementData.slots.default.slotOptions"
                :elementData="element"
                @click.stop="activeItem(element)"
                :active-id="activeId"
                :index="index"
                @copyItem="
                  copyItem(element, elementData.slots.default.slotOptions)
                "
                @deleteItem="
                  deleteItem(index, elementData.slots.default.slotOptions)
                "
              />
            </template>
          </draggable>
        </template>

        <template v-else-if="item.slotType === 'childDragComponent'">
          <component
            v-for="(slotChild, index) in elementData.slots.default.slotOptions"
            :key="index"
            :is="slotChild.tag"
            v-bind="simplifyItem(slotChild.attr)"
            class="can-drg"
          >
            <template
              v-if="
                slotChild.slots &&
                slotChild.slots.default &&
                slotChild.slots.default.slotType == 'dragComponent'
              "
            >
              <div
                :class="
                  activeId === item.id
                    ? 'draggable-item draggable-item-active'
                    : 'draggable-item draggable-item-inactive'
                "
              >
                <div class="draggable-item-mark">
                  <span class="draggable-item-name">{{
                    slotChild.tagLabel
                  }}</span>
                </div>
                <draggable
                  group="componentsGroup"
                  :animation="340"
                  :list="slotChild.slotOptions"
                  class="drag-wrapper"
                  item-key="renderKey"
                  @start="drag = true"
                  @end="drag = false"
                >
                  <template #item="{ element, index }">
                    <draggable-item
                      :key="element.renderKey"
                      :drawing-list="slotChild.slotOptions"
                      :elementData="element"
                      :index="index"
                      :active-id="activeId"
                      @click.stop="activeItem(element)"
                      @copyItem="copyItem(element, slotChild.slotOptions)"
                      @deleteItem="deleteItem(index, slotChild.slotOptions)"
                    />
                  </template>
                </draggable>
                <div class="draggable-item-tool" style="bottom: -7px">
                  <span
                    class="drawing-item-copy"
                    title="复制"
                    @click.stop="
                      copyItem(slotChild, elementData.slots.default.slotOptions)
                    "
                  >
                    <el-icon>
                      <CopyDocument />
                    </el-icon>
                  </span>
                  <span class="drawing-item-delete" title="删除">
                    <el-icon>
                      <Delete
                        v-if="elementData.slots.default.slotOptions.length > 1"
                        @click.stop="
                          deleteItem(
                            index,
                            elementData.slots.default.slotOptions
                          )
                        "
                      />
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
      <span
        class="drawing-item-copy"
        title="复制"
        @click.stop="copyItem(elementData)"
      >
        <el-icon>
          <CopyDocument />
        </el-icon>
      </span>
      <span
        class="drawing-item-delete"
        title="删除"
        @click.stop="deleteItem(index)"
      >
        <el-icon>
          <Delete />
        </el-icon>
      </span>
    </div>
  </div>

  <component
    v-else
    :is="elementData.tag"
    v-bind="simplifyItem(elementData.attr)"
  >
    <template
      v-for="(item, slotName) in filteredSlots"
      :key="index"
      v-slot:[slotName]
    >
      <template v-if="item.slotType === 'normal' && item.value">
        <div v-html="item.value"></div>
      </template>
      <template v-else-if="item.slotType === 'childComponent'">
        <template
          v-for="(slotChild, slotChildIndex) in item.slotOptions"
          :key="slotChildIndex"
        >
          <draggable-item
            :drawing-list="item.slotOptions"
            :index="slotChildIndex"
            :elementData="slotChild"
            :tool="false"
          />
        </template>
      </template>
    </template>
  </component>
</template>

<script setup name="DraggableItem">
import draggable from "vuedraggable/dist/vuedraggable.common";
import { watch } from "vue";
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
    if (!value.used||value.slotType === "normal" && !value.value) {
      
    }
    else{
      acc[key] = value;
    }
    return acc;
  }, {});
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
  console.log("activeItem", item);
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
  { immediate: true }
);

watch(
  () => props.elementData,
  (val) => {
    console.log(val);
  },
  { immediate: true }
);
</script>
