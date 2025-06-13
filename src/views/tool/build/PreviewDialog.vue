<template>
    <el-dialog v-model="visible" title="预览弹窗" width="60%">
      <!-- Tab 标签 -->
      <el-tabs v-model="activeTab">
        <el-tab-pane label="表单模板预览" name="formPreview">
          <div class="preview-content">
            <pre>{{ formTemplate }}</pre>
            <div class="actions">
              <el-button type="primary" @click="copyFormContent">复制表单内容</el-button>
              <el-button type="success" @click="exportFormAsVue">导出为 Vue 文件</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="JSON 数据预览" name="jsonPreview">
          <div class="preview-content">
            <pre>{{ jsonData }}</pre>
            <div class="actions">
              <el-button type="primary" @click="copyJsonContent">复制 JSON 内容</el-button>
              <el-button type="success" @click="exportJsonFile">导出为 JSON 文件</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </template>
  
  <script>
  export default {
    name: "PreviewDialog",
    props: {
      modelValue: Boolean,
      formTemplate: {
        type: String,
        default: "",
      },
      jsonData: {
        type: Object,
        default: () => ({}),
      },
    },
    emits: ["update:modelValue"],
    data() {
      return {
        activeTab: "formPreview",
      };
    },
    computed: {
      visible: {
        get() {
          return this.modelValue;
        },
        set(val) {
          this.$emit("update:modelValue", val);
        },
      },
    },
    methods: {
      // 复制表单内容
      copyFormContent() {
        navigator.clipboard.writeText(this.formTemplate).then(() => {
          this.$message.success("表单内容已复制到剪贴板");
        });
      },
      // 导出表单为 Vue 文件
      exportFormAsVue() {
        const blob = new Blob([this.formTemplate], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "form-template.vue";
        link.click();
        this.$message.success("表单模板已导出");
      },
      // 复制 JSON 内容
      copyJsonContent() {
        const jsonString = JSON.stringify(this.jsonData, null, 2);
        navigator.clipboard.writeText(jsonString).then(() => {
          this.$message.success("JSON 内容已复制到剪贴板");
        });
      },
      // 导出 JSON 文件
      exportJsonFile() {
        const jsonString = JSON.stringify(this.jsonData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "data.json";
        link.click();
        this.$message.success("JSON 文件已导出");
      },
    },
  };
  </script>
  
  <style scoped>
  .preview-content {
    padding: 16px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    background-color: #f9fafc;
  }
  .actions {
    margin-top: 16px;
    display: flex;
    gap: 8px;
  }
  </style>