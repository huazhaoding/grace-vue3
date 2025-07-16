<template>
  <el-dialog v-model="visible" title="预览弹窗" width="60%">
    <!-- Tab 标签 -->
    <el-tabs v-model="activeTab">
      <el-tab-pane label="表单模板预览" name="formPreview">
        <div class="actions">
          <el-button type="primary" @click="copyFormContent"
            >复制表单内容</el-button
          >
          <el-button type="success" @click="exportFormAsVue"
            >导出为 Vue 文件</el-button
          >
        </div>
        <div class="preview-content">
          <Codemirror
            ref="jsonPreviewRef"
            v-model="formTemplate"
            :extensions="[vue(), oneDark]"
            :disabled="true"
            :options="codeOperate"
            basic
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="JSON 数据预览" name="jsonPreview">
        <div class="actions">
          <el-button type="primary" @click="copyJsonContent"
            >复制JSON内容</el-button
          >
          <el-button type="success" @click="exportJsonFile"
            >导出JSON文件</el-button
          >
        </div>
        <div class="preview-content">
          <Codemirror
            ref="templatePreviewRef"
            v-model="jsonData"
            :extensions="[json(), oneDark]"
            :disabled="true"
            :options="codeOperate"
            basic
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
  <input id="copyNode" type="hidden" />
</template>

<script setup>
import Codemirror from "vue-codemirror6";
import { vue } from "@codemirror/lang-vue";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import Download from "@/plugins/download";
import { ElNotification } from "element-plus";
import ClipboardJS from "clipboard";
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
const codeOperate = ref({
  lineNumbers: true,
});

// Emits 定义
const emit = defineEmits(["update:modelValue"]);
// 状态管理
const activeTab = ref("formPreview");
//  代码类型
const copyType = ref("vue");
//  JSON数据
const jsonData = ref("");
//  表单模板
const formTemplate = ref(props.formTemplate);
// 计算属性
const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});



watch(
  () => props.jsonData,
  (val) => {
    jsonData.value = val;
  }
);

watch(
  () => props.formTemplate,
  (val) => {
    formTemplate.value = val;
  }
);

// 方法定义
const copyFormContent = () => {
  copyType.value="vue";
  document.getElementById("copyNode").click();
};

const exportFormAsVue = () => {
  const blob = new Blob([props.formTemplate], {
    type: "text/plain;charset=utf-8",
  });
  Download.saveAs(blob, `${+new Date()}.vue`);
};

const copyJsonContent = () => {
  copyType.value="json";
  document.getElementById("copyNode").click();
};

onMounted(() => {
  const clipboard = new ClipboardJS("#copyNode", {
    text: (trigger) => {
      let codeStr =JSON.stringify(props.jsonData, null, 2) ;
      if (copyType.value === "vue") {
        codeStr = props.formTemplate;
      }
      ElNotification({
        title: "成功",
        message: "代码已复制到剪切板",
        type: "success",
      });
      return codeStr;
    },
  });
  clipboard.on("error", (e) => {
    ElMessage.error("代码复制失败");
  });
});
const exportJsonFile = () => {
  const jsonString = JSON.stringify(props.jsonData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  Download.saveAs(blob, `${+new Date()}.json`);
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
