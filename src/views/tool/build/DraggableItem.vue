<template>
  <el-col :span="element.span" :class="className" @click.stop="activeItem(element)">
    <el-form-item :label="element.formItemHedge.label" 
      :label-width="element.formItemHedge.labelWidth ? element.formItemHedge.labelWidth + 'px' : null"
      :size="element.formItemHedge.size"
      :show-message="element.formItemHedge.showMessage" 
      :inline-message="element.formItemHedge.inlineMessage"
      :error="element.formItemHedge.error"
      :label-position="element.formItemHedge.labelPosition"
      :required="element.formItemHedge.required" v-if="element.layout === 'colFormItem'">
       <render :key="element.formItemAttr.tag" :conf="element.formItemAttr" v-model="element.formItemAttr.defaultValue" />
    </el-form-item>
    <el-row :gutter="element.gutter" :class="element.class" @click.stop="activeItem(element)" v-else>
      <span class="component-name"> {{ element.componentName }} </span>
      <draggable group="componentsGroup" :animation="340" :list="element.children" class="drag-wrapper" item-key="label"
        ref="draggableItemRef" :component-data="getComponentData()">
        <template #item="scoped">
          <draggable-item :key="scoped.element.renderKey" :drawing-list="element.children" :element="scoped.element"
            :index="index" :active-id="activeId" :form-conf="formConf" @activeItem="activeItem(scoped.element)"
            @copyItem="copyItem(scoped.element, element.children)"
            @deleteItem="deleteItem(scoped.index, element.children)" />
        </template>
      </draggable>
    </el-row>
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
  </el-col>
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
 console.log(val.formItemHedge);
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

watch(() => props.activeId, (val) => {
  className.value = (props.element.layout === 'rowFormItem' ? 'drawing-row-item' : 'drawing-item') + (val === props.element.formId ? ' active-from-item' : '')
  if (props.formConf.unFocusedComponentBorder) {
    className.value += ' unfocus-bordered'
  }
}, {
  immediate: true
})
</script>