<template>
    <div class="components-list">
        <div class="component" v-for="(item, index) in componentsGroup" :key="index">
            <div class="components-title">
                <svg-icon icon-class="component" />{{ item.title }}
            </div>
            <draggable class="components-draggable" :list="item.list"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }" :clone="cloneComponent"
            draggable=".components-item" :sort="false" @end="onEnd" item-key="label">
            <template #item="{ element, index }">
                <div :key="index" class="components-item" @click="addComponent(element)">
                    <div class="components-body">
                        <svg-icon :icon-class="element.attr.tagIcon" />
                        {{ element.attr.ariaLabel }}
                    </div>
                </div>
            </template>
        </draggable>
        </div>
    </div>
</template>

<script setup>
import draggable from 'vuedraggable'
import * as componentsGroup from '@/utils/generator/components'
 
function onEnd(evt) { 

}

function cloneComponent(element) {
    
}

function addComponent(element) {
    
}

</script>