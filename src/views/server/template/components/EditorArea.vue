<template>
  <div class="editor-area" @dragover.prevent @drop="handleDrop">
    <!-- 动态渲染组件 -->
    <draggable
      :model-value="canvasComponents"
      item-key="id"
      handle=".drag-handle"
      @update:model-value="$emit('update:canvasComponents', $event)"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <template #item="{ element, index }">
        <div
          class="canvas-component"
          :class="{ 'is-active': activeComponentIndex === index }"
          @click="selectComponent(element, index)"
          draggable="false"
        >
          <!-- 拖动手柄 -->
          <span class="drag-handle" style="cursor: move;" draggable="true">☰</span>

          <!-- 动态组件 -->
          <component :is="element.type" v-bind="element.props">
            <template v-if="element.type === 'el-button'">{{ element.props.label || '默认按钮' }}</template>
          </component>

          <!-- 删除按钮 -->
          <el-button
            size="small"
            type="danger"
            @click.stop="deleteComponent(index)"
            style="margin-left: 10px;"
            v-if="activeComponentIndex === index"
          >
            删除
          </el-button>

          <!-- 复制按钮 -->
          <el-button
            size="small"
            type="primary"
            @click.stop="copyComponent(index)"
            style="margin-left: 5px;"
            v-if="activeComponentIndex === index"
          >
            复制
          </el-button>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: { draggable },
  props: {
    canvasComponents: {
      type: Array,
      required: true
    }
  },
  emits: ['update:canvasComponents', 'drop', 'select'],
  data() {
    return {
      isInternalDrag: false,
      activeComponentIndex: -1, // 当前激活的组件索引，默认为 -1（无激活）
    };
  },
  methods: {
    handleDrop(event) {
      try {
        if (this.isInternalDrag) {
          this.isInternalDrag = false;
          return;
        }

        const data = event.dataTransfer.getData('text/plain');
      
        if (!data) {
          console.error('No data found in drag event.');
          return;
        }

        if (this.isValidJSON(data)) {
          const components = JSON.parse(data);
          if (Array.isArray(components)) {
            this.$emit('drop', components);
          } else {
            console.error('Invalid components data:', components);
          }
        } else {
          console.error('Invalid dropped data format:', data);
        }
      } catch (error) {
        console.error('Failed to parse dropped data:', error);
      }
    },
    deleteComponent(index) {
      console.log('Deleting component at index:', index);
      const list = [...this.canvasComponents];
      list.splice(index, 1);
      this.$emit('update:canvasComponents', list);
      if (this.activeComponentIndex >= index) {
        this.activeComponentIndex--;  // 调整激活索引
      }
    },
    copyComponent(index) {
      console.log('Copying component at index:', index);
      const list = [...this.canvasComponents];
      const component = JSON.parse(JSON.stringify(list[index]));
      component.id = Math.random().toString(36).substr(2, 9);
      list.splice(index + 1, 0, component);
      this.$emit('update:canvasComponents', list);
      this.activeComponentIndex = index + 1;  // 更新激活索引
    },
    selectComponent(component, index) {
      console.log('Selected component:', component);
      this.activeComponentIndex = index;  // 更新激活组件索引
      this.$emit('select', component);
    },
    onDragStart() {
      this.isInternalDrag = true;
    },
    onDragEnd() {
      this.isInternalDrag = false;
    },
    isValidJSON(data) {
      try {
        JSON.parse(data);
        return true;
      } catch (error) {
        return false;
      }
    }
  },
};
</script>

<style scoped>
.editor-area {
  min-height: 500px;
  border-right: 1px dashed #ccc;
  padding: 10px;
  position: relative;
}
.canvas-component {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 4px;
  position: relative;  /* 为绝对定位的子元素提供定位上下文 */
}
.canvas-component.is-active {
  border-color: #409eff;  /* 激活框样式 */
  box-shadow: 0 0 10px rgba(64, 158, 255, 0.5);  /* 激活框阴影效果 */
}
.drag-handle {
  margin-right: 10px;
  font-size: 16px;
  color: #aaa;
}
</style>