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
    <slot></slot>
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
<script setup>
const props = defineProps({
  elementData: Object,
  index: Number,
  drawingList: Array,
  activeId: {
    type: [String, Number],
  },
});

function copyItem(item, parent) {
  emits("copyItem", item, parent ?? props.drawingList);
}
function deleteItem(item, parent) {
  emits("deleteItem", item, parent ?? props.drawingList);
}
</script>
