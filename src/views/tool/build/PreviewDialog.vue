<template>
    <el-dialog v-model="visible" title="预览弹窗" width="60%">
      <!-- Tab 标签 -->
      <el-tabs v-model="activeTab">
        <el-tab-pane label="表单模板预览" name="formPreview">
          <div class="actions">
              <el-button type="primary" @click="copyFormContent">复制表单内容</el-button>
              <el-button type="success" @click="exportFormAsVue">导出为 Vue 文件</el-button>
            </div>
          <div class="preview-content">
            <Codemirror ref="jsonPreviewRef" v-model="formTemplate" :extensions="[vue(), oneDark]" :disabled="true" :options="codeOperate" basic />
          </div>
        </el-tab-pane>
        <el-tab-pane label="JSON 数据预览" name="jsonPreview">
          <div class="actions">
              <el-button type="primary" @click="copyJsonContent">复制 JSON 内容</el-button>
              <el-button type="success" @click="exportJsonFile">导出为 JSON 文件</el-button>
            </div>
          <div class="preview-content">
            <Codemirror ref="templatePreviewRef" v-model="jsonData" :extensions="[json(), oneDark]" :disabled="true" :options="codeOperate" basic />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </template>
  
<script setup>
import Codemirror from "vue-codemirror6";
import { vue } from "@codemirror/lang-vue";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import { ref, watch } from "vue";

// Props 定义
const props = defineProps({
  modelValue: Boolean,
  formTemplate: {
    type: String,
    default: "",
  },
  jsonData: {
    type: Object,
    default: () => ({}),
  },
});
const codeOperate=ref({
      lineNumbers: true
    })

// Emits 定义
const emit = defineEmits(["update:modelValue"]);

// 状态管理
const activeTab = ref("formPreview");

// 计算属性
const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});


const jsonData=ref({});

const formTemplate=ref(props.formTemplate);

watch(() => props.jsonData, (val) => { 
  jsonData.value=JSON.stringify(val, null, 2)
});

watch(() => props.formTemplate, (val) => {  
  formTemplate.value=val;
})

// 方法定义
const copyFormContent = () => {
  navigator.clipboard.writeText(props.formTemplate).then(() => {
    alert("表单内容已复制到剪贴板");
  });
};

const exportFormAsVue = () => {
  const blob = new Blob([props.formTemplate], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "form-template.vue";
  link.click();
  alert("表单模板已导出");
};

const copyJsonContent = () => {
  const jsonString = JSON.stringify(props.jsonData, null, 2);
  navigator.clipboard.writeText(jsonString).then(() => {
    alert("JSON 内容已复制到剪贴板");
  });
};

const exportJsonFile = () => {
  const jsonString = JSON.stringify(props.jsonData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json";
  link.click();
  alert("JSON 文件已导出");
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
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>