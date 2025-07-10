<template>
  <div class="components-list">

    <div class="component" v-for="(item, index) in componentList" :key="index">
      <div class="components-title">
        <svg-icon icon-class="component" />{{ item.title }}
      </div>
      <draggable class="components-draggable" :list="item.list"
        :group="{ name: 'componentsGroup', pull: 'clone', put: false }" :clone="cloneComponent"
        draggable=".components-item" :sort="false" @end="onEnd" item-key="label">
        <template #item="{ element, index }">
          <div :key="index" class="components-item" @click="addComponent(element)">
            <div class="components-body">
              <svg-icon :icon-class="element.tagIcon" />
              {{ element.tagLabel }}
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>

</template>
<script setup>
import draggable from "vuedraggable/dist/vuedraggable.common"; // 导入 vuedraggable 组件
import { FormComponents } from '@/utils/generator/components/FormComponents'
import { BaseComponents } from '@/utils/generator/components/BaseComponents'
import { NavComponent } from "@/utils/generator/components/NavComponents";  
let tempActiveData; // 临时存储克隆的表单项数据
const emits = defineEmits(['updateCloneComponent'])
const props = defineProps({
  idGlobal: {
    type: Number,
    default: 0
  }
});

const componentList= [BaseComponents, FormComponents, NavComponent];

function onEnd(obj) {
  if (obj.from !== obj.to) {
    emits('updateCloneComponent', tempActiveData, "drag");
  }
}

// 添加组件到表单
function addComponent(item) {
  const clone = cloneComponent(item); // 克隆组件
  emits('updateCloneComponent', clone, "click"); // 将克隆的组件传递给父组件
}

// 克隆组件
function cloneComponent(origin) {
  const clone = JSON.parse(JSON.stringify(origin)); // 深拷贝原始组件
  clone.id = props.idGlobal + 1; // 为克隆的组件生成唯一的 id
  if (clone.attr["v-model"]) {
    clone.vModel=`field-${clone.id}`
  }
  clone.renderKey = +new Date(); // 改变 renderKey 以强制更新组件
  tempActiveData = clone;
  return clone;
}

</script>