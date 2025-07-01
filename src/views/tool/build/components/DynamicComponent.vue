<template>
    <component v-if="elementData.type &&
        elementData.type === 'form' && elementData.hedg" :is="elementData.hedg.tag" v-bind="elementData.hedg.attr"
        :modelValue="elementData.modelValue" @update:modelValue="handleModelValueUpdate(elementData, $event)"
        class="dynamic-component">
        <render :key="elementData.tag" :conf="elementData" v-model="elementData.attr.defaultValue.value"
            :active-item="activeItem" />
    </component>

    <component v-else :is="elementData.tag" v-bind="elementData.attr">
        <template
            v-if="elementData.slots && elementData.slots.default && elementData.slots.default.slotType == 'childComponent'">
            <component v-for="(slotChild, index) in elementData.slots.default.slotOptions" :key="index"
                :is="slotChild.tag" v-bind="slotChild.attr">
                <template
                    v-if="slotChild.slots && slotChild.slots.default && slotChild.slots.default.slotType == 'dragComponent'">
                    <div :class="activeId === item.id
                        ? 'draggable-item draggable-item-active'
                        : 'draggable-item draggable-item-inactive'
                        ">
                        <div class="draggable-item-mark">
                            <span class="draggable-item-name">{{ slotChild.tagLabel }}</span>
                        </div>
                        <draggable group="componentsGroup" :animation="340" :list="slotChild.slotOptions"
                            class="drag-wrapper" item-key="renderKey" @start="drag = true" @end="drag = false">
                            <template #item="{ element, index }">
                                <draggable-item :key="element.renderKey" :drawing-list="slotChild.slotOptions"
                                    :elementData="element" :index="index" :active-id="activeId"
                                    @click.stop="activeItem(element)"
                                    @copyItem="copyItem(element, slotChild.slotOptions)"
                                    @deleteItem="deleteItem(index, slotChild.slotOptions)" />
                            </template>
                        </draggable>
                        <div class="draggable-item-tool" style="bottom: -7px">
                            <span class="drawing-item-copy" title="复制"
                                @click.stop="copyItem(slotChild, elementData.slots.default.slotOptions)">
                                <el-icon>
                                    <CopyDocument />
                                </el-icon>
                            </span>
                            <span class="drawing-item-delete" title="删除">
                                <el-icon>
                                    <Delete v-if="elementData.child.length > 1"
                                        @click.stop="deleteItem(index, elementData.slots.default.slotOptions)" />
                                </el-icon>
                            </span>
                        </div>
                    </div>
                </template>
            </component>
        </template>

        <template
            v-else-if="elementData.slots && elementData.slots.default && elementData.slots.default.slotType == 'dragComponent'">
            <draggable group="componentsGroup" :animation="340" :list="elementData.slots.default.slotOptions"
                class="drag-wrapper" item-key="renderKey" @start="drag = true" @end="drag = false">
                <template #item="{ element, index }">
                    <draggable-item :key="element.renderKey" :drawing-list="elementData.slots.default.slotOptions"
                        :elementData="element" @click.stop="activeItem(element)" :active-id="activeId" :index="index"
                        @copyItem="copyItem(element, elementData.slots.default.slotOptions)"
                        @deleteItem="deleteItem(index, elementData.slots.default.slotOptions)" />
                </template>
            </draggable>
        </template>

    </component>

    <component>

        <template v-for="(item, slotName) in elementData.slots" :key="index" v-slot:[slotName]="slotProps">
            <template v-if="item.slotType === 'normal'">
                <div v-html="item.value"></div>
            </template>

            <template v-if-else="item.slotType === 'childComponent'">

            </template>

            <template v-if-else="item.slotType === 'dragComponent'">
                <draggable group="componentsGroup" :animation="340" :list="elementData.slots.default.slotOptions"
                    class="drag-wrapper" item-key="renderKey" @start="drag = true" @end="drag = false">
                    <template #item="{ element, index }">
                        <draggable-item :key="element.renderKey" :drawing-list="elementData.slots.default.slotOptions"
                            :elementData="element" @click.stop="activeItem(element)" :active-id="activeId"
                            :index="index" @copyItem="copyItem(element, elementData.slots.default.slotOptions)"
                            @deleteItem="deleteItem(index, elementData.slots.default.slotOptions)" />
                    </template>
                </draggable>
            </template>

        </template>



    </component>







    <!-- 渲染内容 -->
    <template v-if="elementData.content">
        <draggable v-if="elementData.draggable" v-model="elementData.content" item-key="id" class="drag-wrapper">
            <template #item="{ element }">
                <div>{{ element }}</div>
            </template>
        </draggable>
        <div v-else>{{ elementData.content }}</div>
    </template>

    <!-- 渲染子组件 -->
    <template v-if="elementData.children && elementData.children.length">
        <dynamic-component v-for="(child, childIndex) in elementData.children" :key="childIndex" :elementData="child"
            @update:modelValue="handleChildModelValueUpdate(elementData, childIndex, $event)" />
    </template>


    <component :is="elementData.tag" v-bind="elementData.props" :modelValue="elementData.modelValue"
        @update:modelValue="handleModelValueUpdate(elementData, $event)" class="dynamic-component">
        <!-- 渲染内容 -->
        <template v-if="elementData.content">
            <draggable v-if="elementData.draggable" v-model="elementData.content" item-key="id" class="drag-wrapper">
                <template #item="{ element }">
                    <div>{{ element }}</div>
                </template>
            </draggable>
            <div v-else>{{ elementData.content }}</div>
        </template>

        <!-- 渲染子组件 -->
        <template v-if="elementData.children && elementData.children.length">
            <dynamic-component v-for="(child, childIndex) in elementData.children" :key="childIndex"
                :elementData="child"
                @update:modelValue="handleChildModelValueUpdate(elementData, childIndex, $event)" />
        </template>
    </component>

    <!-- 表单组件
  非表单组件 -->
</template>

<script setup>
import draggable from "vuedraggable";

defineProps({
    elementData: {
        type: Object,
        required: true,
    },
});

// 更新当前组件的 modelValue
function handleModelValueUpdate(elementData, newValue) {
    elementData.modelValue = newValue;
}

// 更新子组件的 modelValue
function handleChildModelValueUpdate(parentelementData, childIndex, newValue) {
    parentelementData.children[childIndex].modelValue = newValue;
}
</script>