<template>
  <div class="property-panel">
    <h3>属性配置</h3>
    <el-form label-width="80px">
      <!-- 类型 -->
      <el-form-item label="类型">
        <el-input v-model="component.type" disabled></el-input>
      </el-form-item>

      <!-- 文本 -->
      <el-form-item v-if="component.props && 'text' in component.props" label="文本">
        <el-input v-model="component.props.text"></el-input>
      </el-form-item>

      <!-- 占位符 -->
      <el-form-item v-if="component.props && 'placeholder' in component.props" label="占位符">
        <el-input v-model="component.props.placeholder"></el-input>
      </el-form-item>

      <!-- 类型（如密码框） -->
      <el-form-item v-if="component.props && 'type' in component.props" label="输入类型">
        <el-select v-model="component.props.type" placeholder="请选择输入类型">
          <el-option label="文本" value="text"></el-option>
          <el-option label="密码" value="password"></el-option>
        </el-select>
      </el-form-item>

      <!-- 其他属性配置项 -->


    </el-form>
  </div>
</template>

<script>


/**
 * 
 * 
 * 
 * 
 * 
 * 
 */
export default {
  props: {
    component: {
      type: Object,
      required: true
    }
  },
  watch: {
    // 监听 component 的变化，确保属性实时更新
    component: {
      deep: true,
      handler(newVal) {
        this.$emit('update:component', newVal);
      }
    }
  }
};
</script>

<style scoped>
.property-panel {
  padding: 10px;
  border-left: 1px solid #ccc;
}
</style>