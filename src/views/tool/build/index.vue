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
import draggable from 'vuedraggable'
import { FormComponents } from '@/utils/generator/components/FormComponents'
import { BaseComponents } from '@/utils/generator/components/BaseComponents'

console.log(BaseComponents)
function onEnd(evt) {

}

function cloneComponent(element) {

}

function addComponent(element) {

}

</script>