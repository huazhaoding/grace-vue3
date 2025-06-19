<template>
  <div class="components-list">

    <div class="component" >
      <div class="components-title">
        <svg-icon icon-class="component" />{{ BaseComponents.title }}
      </div>
      <draggable class="components-draggable" :list="BaseComponents.list"
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

      <div class="component">
        <div class="components-title">
          <svg-icon icon-class="component" />{{ FormComponents.title }}
        </div>
        <draggable class="components-draggable" :list="FormComponents.list"
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
let tempActiveData; // 临时存储克隆的表单项数据
const emits = defineEmits(['getCloneComponent'])
const idGlobal = ref(100); // 全局唯一 ID 生成器

function onEnd(obj) {
if (obj.from !== obj.to) {
   emits('getCloneComponent', tempActiveData,"drag");
  }
}

// 添加组件到表单
function addComponent(item) {
  const clone = cloneComponent(item); // 克隆组件
  emits('getCloneComponent', clone,"click"); // 将克隆的组件传递给父组件
}

// 克隆组件
function cloneComponent(origin) {
  const clone = JSON.parse(JSON.stringify(origin)); // 深拷贝原始组件
  clone.id=++idGlobal.value; // 为克隆的组件生成唯一的 id
  clone.attr.vModel = `field${idGlobal.value}`; // 动态生成 vModel
  clone.renderKey = +new Date(); // 改变 renderKey 以强制更新组件
  return clone;
}

</script>