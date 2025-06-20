<template>
  <draggable
    class="drawing-board"
    :list="drawingList"
    :animation="340"
    group="componentsGroup"
    item-key="label"
  >
    <template #item="{ element, index }">
      <draggable-item
        :key="element.renderKey"
        :drawing-list="drawingList"
        :element="element"
        :index="index"
        :active-id="activeId"
        :form-conf="formConf"
        @activeItem="activeFormItem"
        @copyItem="drawingItemCopy"
        @deleteItem="drawingItemDelete"
      />
    </template>
  </draggable>
  <div v-show="!drawingList.length" class="empty-info">
    从左侧拖入或点选组件进行表单设计
  </div>
</template>

<script setup>




</script>
