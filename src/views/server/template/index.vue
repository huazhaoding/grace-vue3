<template>
  <el-container class="low-code-container">
    <!-- 左侧 Tab 区域 -->
    <el-aside width="200px">
      <el-tabs v-model="activeTab" class="left-tabs">
        <el-tab-pane label="组件库" name="component-library">
          <ComponentLibrary />
        </el-tab-pane>
        <el-tab-pane label="模板库" name="template-library">
          <TemplateLibrary />
        </el-tab-pane>
      </el-tabs>
    </el-aside>

    <!-- 中间编辑区 -->
    <el-container>
      <el-main>
        <EditorArea
          :canvas-components="canvasComponents"
          @update:canvas-components="updateCanvasComponents"
          @drop="handleDrop"
          @select="selectComponent"
        />
      </el-main>

      <!-- 右侧属性配置 -->
      <el-aside width="300px">
        <PropertyPanel v-if="selectedComponent" :component="selectedComponent" @update:component="updateComponent" />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import ComponentLibrary from './components/ComponentLibrary.vue';
import TemplateLibrary from './components/TemplateLibrary.vue';
import EditorArea from './components/EditorArea.vue';
import PropertyPanel from './components/PropertyPanel.vue';

export default {
  components: { ComponentLibrary, TemplateLibrary, EditorArea, PropertyPanel },
  data() {
    return {
      activeTab: 'component-library',
      canvasComponents: [],
      selectedComponent: null,
    };
  },
  methods: {
    handleDrop(components) {
      if (!Array.isArray(components)) {
        console.error('Invalid components data:', components);
        return;
      }

      const newComponents = components.map(component => ({
        ...component,
        id: Math.random().toString(36).substr(2, 9),
        props: component.props || {}
      }));

      this.canvasComponents.push(...newComponents);
    },
    selectComponent(component) {
      this.selectedComponent = component;
    },
    updateComponent(updatedComponent) {
      const index = this.canvasComponents.findIndex(c => c.id === updatedComponent.id);
      if (index !== -1) {
        this.canvasComponents.splice(index, 1, updatedComponent);
      }
    },
    updateCanvasComponents(newComponents) {
      console.log('Updating canvas components:', newComponents);
      this.canvasComponents = newComponents;
    }
  },
};
</script>

<style scoped>
.low-code-container {
  height: 100vh;
  display: flex;
}
.left-tabs {
  padding: 10px;
}
</style>