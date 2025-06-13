<template>
  <div class="component-library">
    <h3>组件库</h3>
    <ul>
      <li
        v-for="(component, index) in components"
        :key="index"
        draggable="true"
        @dragstart="handleDragStart(component)"
      >
        {{ component.name }}
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * {
 * }
 * 
 * 
 * 
 * 
 * 
 */
export default {
  data() {
    return {
      components: [
        {
          name: '输入框',
          type: 'el-input',
          props: { placeholder: '请输入内容' },
        },
        {
          name: '密码框',
          type: 'el-input',
          props: { placeholder: '请输入密码', type: 'password' },
        },
        {
          name: '按钮',
          type: 'el-button',
          props: { type: 'primary', label: '默认按钮' },
        },
      ],
    };
  },
  methods: {
    handleDragStart(component) {
      event.dataTransfer.setData('text/plain', JSON.stringify([component]));
    },
  },
};
</script>

<style scoped>
.component-library {
  border-right: 1px solid #ccc;
  padding: 10px;
}
</style>