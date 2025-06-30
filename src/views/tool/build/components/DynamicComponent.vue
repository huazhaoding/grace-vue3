<template>
  <div>
    <dynamic-component
      v-for="(item, index) in componentTree"
      :key="index"
      :config="item"
      @update:content="updateContent(index, $event)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

// 定义组件树的数据模型
const componentTree = ref([
  {
    tag: "el-row",
    props: { gutter: 20 },
    children: [
      {
        tag: "el-col",
        props: { span: 12 },
        content: "Column Content 1",
        draggable: true,
      },
      {
        tag: "el-col",
        props: { span: 12 },
        children: [
          {
            tag: "el-row",
            props: { gutter: 10 },
            children: [
              {
                tag: "el-col",
                props: { span: 6 },
                content: "Nested Column Content",
                draggable: true,
              },
            ],
          },
        ],
      },
    ],
  },
]);

// 更新内容的方法
function updateContent(index, newContent) {
  componentTree.value[index].content = newContent;
}
</script>

<template>
  <!-- 动态组件 -->
  <component
    :is="config.tag"
    v-bind="config.props"
    class="dynamic-component"
  >
    <!-- 渲染内容 -->
    <template v-if="config.slotType=== 'normal'">
      <draggable
        v-if="config.draggable"
        :list="[config.content]"
        item-key="id"
        class="drag-wrapper"
      >
        <template #item="{ element }">
          <div>{{ element }}</div>
        </template>
      </draggable>
      <div v-else>{{ config.content }}</div>
    </template>

    <!-- 渲染子组件 -->
    <template v-if="config.slotType='component' && config.children.length">
      <dynamic-component
        v-for="(child, childIndex) in config.children"
        :key="childIndex"
        :config="child"
        @update:content="updateChildContent(config, childIndex, $event)"
      />
    </template>

    <template v-else-if="config.slotType='slot'">
    </template>

  </component>
</template>

<script setup>
defineProps({
  config: {
    type: Object,
    required: true,
  },
});

// 更新子组件内容的方法
function updateChildContent(parentConfig, childIndex, newContent) {
  parentConfig.children[childIndex].content = newContent;
}
</script>