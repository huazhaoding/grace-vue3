<template>
  <el-button type="warning" icon="Rank" circle title="拖动"> 标签页 </el-button>
  <slot></slot>
  <el-button-group size="small">
    <el-button type="warning" icon="CopyDocument" circle title="复制" />
    <el-button type="danger" icon="Delete" circle title="删除" />
  </el-button-group>
</template>
<script setup>




function copyItem(item, parent) {
  emits("copyItem", item, parent ?? props.drawingList);
}
function deleteItem(item, parent) {
  emits("deleteItem", item, parent ?? props.drawingList);
}
</script>
