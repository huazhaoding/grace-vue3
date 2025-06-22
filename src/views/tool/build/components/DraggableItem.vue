<template>
  <div class="draggable-item">
    <div class="draggable-item-mark">
      <el-icon>
        <Rank />
      </el-icon>
      <span class="draggable-item-name">{{ elementData.tagLabel }}</span>
    </div>
    <el-form-item
      v-if="elementData?.hedge"
      :label="elementData.hedge.label"
      :label-width="
        elementData.hedge.labelWidth
          ? elementData.hedge.labelWidth + 'px'
          : null
      "
      :size="elementData.hedge.size"
      :show-message="elementData.hedge.showMessage"
      :inline-message="elementData.hedge.inlineMessage"
      :error="elementData.hedge.error"
      :label-position="elementData.hedge.labelPosition"
      :required="elementData.hedge.required"
      class="field-wrapper"
    >
      <render
        :key="elementData.tag"
        :conf="elementData"
        v-model="elementData.attr.defaultValue"
      />
    </el-form-item>
    <el-row
      v-else-if="elementData.tag === 'el-row'"
      :gutter="elementData.attr.gutter"
      :justify="elementData.attr.justify"
      :align="elementData.attr.align"
      :customTag="elementData.attr.customTag"
    >
      <el-col
        :xl="item.xl"
        :lg="item.lg"
        :md="item.md"
        :sm="item.sm"
        :xs="item.xs"
        v-for="(item, index) in elementData.optionChild.attr"
      >
        <draggable
          group="componentsGroup"
          :animation="340"
          :list="item.data"
          class="drag-wrapper"
          item-key="renderKey"
          @start="drag = true"
          @end="drag = false"
        >
          <template #item="{ element, index }">
            <draggable-item
              :key="element.renderKey"
              :drawing-list="item.data"
              :elementData="element"
              :index="index"
              @activeItem="activeItem(element)"
              @copyItem="copyItem(element, item.data)"
              @deleteItem="deleteItem(index, item.data)"
            />
          </template>
        </draggable>
      </el-col>
    </el-row>
    <el-form
      v-else-if="elementData.tag === 'el-form'"
      :model="elementData.attr.model"
      :rules="elementData.attr.rules"
      :inline="elementData.attr.inline"
      :label-width="elementData.attr.labelWidth"
      :hide-required-asterisk="elementData.attr.hideRequiredAsterisk"
      :label-position="elementData.attr.labelPosition"
    >
      <draggable
        group="componentsGroup"
        :animation="340"
        :list="elementData.data"
        class="drag-wrapper"
        item-key="renderKey"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element, index }">
          <draggable-item
            :key="element.renderKey"
            :drawing-list="elementData.data"
            :elementData="element"
            :index="index"
            @activeItem="activeItem(element)"
            @copyItem="copyItem(element, elementData.data)"
            @deleteItem="deleteItem(index, elementData.data)"
          />
        </template>
      </draggable>
    </el-form>
    <render
      v-else
      :key="elementData.tag"
      :conf="elementData"
      v-model="elementData.attr.defaultValue"
    />
    <div class="drawing-item-tool">
      <span
        class="drawing-item-copy"
        title="复制"
        @click.stop="copyItem(element)"
      >
        <el-icon>
          <CopyDocument />
        </el-icon>
      </span>
      <span
        class="drawing-item-delete"
        title="删除"
        @click.stop="deleteItem(index)"
      >
        <el-icon>
          <Delete />
        </el-icon>
      </span>
    </div>
  </div>
</template>
<script setup name="DraggableItem">
import draggable from "vuedraggable/dist/vuedraggable.common";
import render from "@/utils/generator/render";
const emits = defineEmits(["activeItem", "copyItem", "deleteItem"]);
const props = defineProps({
  elementData: Object,
  index: Number,
  drawingList: Array,
  activeId: {
    type: [String, Number],
  },
  formConf: Object,
});

const className = ref("");
const draggableItemRef = ref(null);

watch(
  () => props.elementData,
  (val) => {
    console.log(val);
  },
  { deep: true }
);
function activeItem(item) {
  alert("stop");
  emits("activeItem", item);
}

function copyItem(item, parent) {
  emits("copyItem", item, parent ?? props.drawingList);
}
function deleteItem(item, parent) {
  emits("deleteItem", item, parent ?? props.drawingList);
}
</script>
