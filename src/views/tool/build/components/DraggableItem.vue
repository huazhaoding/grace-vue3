<template>
  <!-- 是表单组件 -->

  <!-- 不是表单组件 -->

  <!-- 布局组件 -->

  <!-- 选择组件 -->


  <render :key="element.tag" :conf="element" v-model="element.attr.defaultValue" />


  <!-- <div class="drawing-item-operate">
    <span class="drawing-item-copy" title="复制" @click.stop="copyItem(element)">
      <el-icon>
        <CopyDocument />
      </el-icon>
    </span>
    <span class="drawing-item-delete" title="删除" @click.stop="deleteItem(index)">
      <el-icon>
        <Delete />
      </el-icon>
    </span>
  </div> -->
</template>
<script setup name="DraggableItem">
import draggable from "vuedraggable/dist/vuedraggable.common";
import render from '@/utils/generator/render'
const emits = defineEmits(['activeItem', 'copyItem', 'deleteItem'])
const props = defineProps({
  element: Object,
  index: Number,
  drawingList: Array,
  activeId: {
    type: [String, Number]
  },
  formConf: Object
})


const className = ref('')
const draggableItemRef = ref(null)
watch(() => props.element, (val) => {
}, { immediate: true, deep: true })
function activeItem(item) {
  emits('activeItem', item)
}

function copyItem(item, parent) {
  emits('copyItem', item, parent ?? props.drawingList
  )
}
function deleteItem(item, parent) {
  emits('deleteItem', item, parent ?? props.drawingList)
}

function getComponentData() {
  return {
    gutter: props.element.gutter,
    justify: props.element.justify,
    align: props.element.align
  };
}


</script>