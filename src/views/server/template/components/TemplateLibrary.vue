<template>
  <div class="template-library">
    <h3>模板库</h3>
    <ul>
      <li
        v-for="(template, index) in templates"
        :key="index"
        draggable="true"
        @dragstart="handleDragStart(template.components)"
      >
        {{ template.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      templates: [
        {
          name: '登录表单',
          components: [
            { type: 'el-input', props: { placeholder: '请输入用户名' } },
            { type: 'el-input', props: { placeholder: '请输入密码', type: 'password' } },
            { type: 'el-button', props: { type: 'primary', label: '登录' } },
          ],
        },
        {
          name: '注册表单',
          components: [
            { type: 'el-input', props: { placeholder: '请输入邮箱' } },
            { type: 'el-input', props: { placeholder: '请输入密码', type: 'password' } },
            { type: 'el-button', props: { type: 'success', label: '注册' } },
          ],
        },
      ],
    };
  },
  methods: {
    handleDragStart(components) {
      event.dataTransfer.setData('text/plain', JSON.stringify(components));
    },
  },
};
</script>

<style scoped>
.template-library {
  border-right: 1px solid #ccc;
  padding: 10px;
}
</style>