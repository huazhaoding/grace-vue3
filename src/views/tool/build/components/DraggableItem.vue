<template>
  <div
    :class="className"
    ref="draggableItemRef"
    @click.stop="activeItem(elementData)"
  >
    <div class="draggable-item-mark">
      <el-icon>
        <Rank />
      </el-icon>
      <span class="draggable-item-name">{{ elementData.tagLabel }}</span>
    </div>
    <el-form-item
      v-if="elementData?.hedge"
      :label="elementData.hedge.label"
      :label-width="
        elementData.hedge.labelWidth
          ? elementData.hedge.labelWidth + 'px'
          : null
      "
      :size="elementData.hedge.size"
      :show-message="elementData.hedge.showMessage"
      :inline-message="elementData.hedge.inlineMessage"
      :error="elementData.hedge.error"
      :label-position="elementData.hedge.labelPosition"
      :required="elementData.hedge.required"
      class="field-wrapper not-drg"
    >
      <render
        :key="elementData.tag"
        :conf="elementData"
        v-model="elementData.attr.defaultValue"
      />
    </el-form-item>
    <el-row
      v-else-if="elementData.tag === 'el-row'"
      :gutter="elementData.attr.gutter.value"
      :justify="elementData.attr.justify.value"
      :align="elementData.attr.align.value"
      :tag="elementData.attr.tag.value"
      class="drg-row"
    >
      <el-col
        v-for="(item, index) in elementData.child"
        :xl="item.attr.xl.value"
        :lg="item.attr.lg.value"
        :md="item.attr.md.value"
        :sm="item.attr.sm.value"
        :xs="item.attr.xs.value"
        @click.stop="activeItem(item)"
        class="can-drg"
      >
        <div :class="activeId === item.id ? 'draggable-item draggable-item-active' : 'draggable-item draggable-item-inactive'">
          <div class="draggable-item-mark">
            <span class="draggable-item-name">{{ item.tagLabel }}</span>
          </div>
          <draggable
            group="componentsGroup"
            :animation="340"
            :list="item.data"
            class="drag-wrapper"
            item-key="renderKey"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element, index }">
              <draggable-item
                :key="element.renderKey"
                :drawing-list="item.data"
                :elementData="element"
                :index="index"
                :active-id="activeId"
                @click.stop="activeItem(element)"
                @copyItem="copyItem(element, item.data)"
                @deleteItem="deleteItem(index, item.data)"
              />
            </template>
          </draggable>
          <div class="draggable-item-tool" style="bottom:-7px">
            <span
              class="drawing-item-copy"
              title="复制"
              @click.stop="copyItem(item, elementData.child)"
            >
              <el-icon>
                <CopyDocument />
              </el-icon>
            </span>
            <span
              class="drawing-item-delete"
              title="删除"
              @click.stop="deleteItem(index, elementData.child)"
            >
              <el-icon>
                <Delete />
              </el-icon>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-form
      v-else-if="elementData.tag === 'el-form'"
      :model="elementData.attr.model"
      :rules="elementData.attr.rules"
      :inline="elementData.attr.inline"
      :label-width="elementData.attr.labelWidth"
      :hide-required-asterisk="elementData.attr.hideRequiredAsterisk"
      :label-position="elementData.attr.labelPosition"
      class="can-drg"
    >
      <draggable
        group="componentsGroup"
        :animation="340"
        :list="elementData.data"
        class="drag-wrapper"
        item-key="renderKey"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element, index }">
          <draggable-item
            :key="element.renderKey"
            :drawing-list="elementData.data"
            :elementData="element"
            @click.stop="activeItem(element)"
            :active-id="activeId"
            :index="index"
            @copyItem="copyItem(element, elementData.data)"
            @deleteItem="deleteItem(index, elementData.data)"
          />
        </template>
      </draggable>
    </el-form>

    <div v-else class="not-drg">
      <render
        :key="elementData.tag"
        :conf="elementData"
        v-model="elementData.attr.defaultValue"
      />
    </div>

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
</template>
<script setup name="DraggableItem">
import draggable from "vuedraggable/dist/vuedraggable.common";
import render from "@/utils/generator/render";
const emits = defineEmits(["activeItem", "copyItem", "deleteItem"]);
const props = defineProps({
  elementData: Object,
  index: Number,
  drawingList: Array,
  activeId: {
    type: [String, Number],
  },
  formConf: Object,
});

const className = ref("");
const draggableItemRef = ref(null);

function activeItem(item) {
  emits("activeItem", item);
}

function copyItem(item, parent) {
  emits("copyItem", item, parent ?? props.drawingList);
}
function deleteItem(item, parent) {
  emits("deleteItem", item, parent ?? props.drawingList);
}

// 监听 activeId 的变化，动态更新激活状态 可拖拽组件为虚线 不可拖拽组件为实线
watch(
  () => props.activeId,
  (val) => {
    console.log("activeId", val);
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
</script>
