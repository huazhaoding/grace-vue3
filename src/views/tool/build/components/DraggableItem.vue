<template>
  <div>
   <el-form-item v-if="element?.hedge" :label="element.hedge.label" 
      :label-width="element.hedge.labelWidth ? element.hedge.labelWidth + 'px' : null"
      :size="element.hedge.size"
      :show-message="element.hedge.showMessage" 
      :inline-message="element.hedge.inlineMessage"
      :error="element.hedge.error"
      :label-position="element.hedge.labelPosition"
      :required="element.hedge.required">
       <render :key="element.tag" :conf="element" v-model="element.attr.defaultValue" />
    </el-form-item>

    <el-row v-else-if="element.tag === 'el-row'" :gutter="element.attr.gutter" :justify="element.attr.justify" :align="element.attr.align"  :customTag="element.attr.customTag" > 
      <el-col :xl="item.xl" :lg="item.lg" :md="item.md" :sm="item.sm" :xs="item.xs" v-for="(item, index) in element.optionChild.attr">
      <draggable group="componentsGroup" :animation="340" :list="item.data" class="drag-wrapper" item-key="renderKey" style="width: 100px;height:100px;border: 1px solid red;"
        >
        <template #item="{element,index}">
          <draggable-item
              :key="element.renderKey"
              :drawing-list="item.data"
              :element="element"
              :index="'child-'+index"
            />
        </template>
      </draggable>
      </el-col>
    </el-row> 

</div>

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
watch(() => props.drawingList, (val) => {
  console.log(val)
},{deep:true})
function activeItem(item) {
  alert("stop")
  emits('activeItem', item)
}

function copyItem(item, parent) {
  emits('copyItem', item, parent ?? props.drawingList
  )
}
function deleteItem(item, parent) {
  emits('deleteItem', item, parent ?? props.drawingList)
}

</script>