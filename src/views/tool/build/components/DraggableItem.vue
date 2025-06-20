<template>
  <!-- 是表单组件 -->
    
  <!-- 不是表单组件 -->

  
<render :key="element.tag" :conf="element" v-model="element.attr.defaultValue" />


  
    
  






  
</template>
<script setup name="DraggableItem">
import draggable from "vuedraggable/dist/vuedraggable.common";
import render from '@/utils/generator/render'
import { watch } from "vue";
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
const emits = defineEmits(['activeItem', 'copyItem', 'deleteItem'])
watch(() => props.element, (val) => {
},{immediate: true,deep:true})
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