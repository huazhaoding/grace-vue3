<template>
  <el-dialog v-model="visible" title="事件编辑" width="60%">
    <div class="tip" style="display: flex; justify-content: flex-start">
      <el-input
        v-model="functionName"
        placeholder="请输入方法名"
        style="width: 20%"
      >
      <template v-if="functionHeard != ''" #prefix >
        {{ functionHeard }} &nbsp&nbsp
      </template>
      </el-input>
      <el-input-tag
        v-model="functionParam"
        clearable
        placeholder="请输入参数"
        style="width: 30%"
      >
        <template #prefix>
          {{ functionHeardPrefix }}
        </template>
        <template #suffix>
          {{ functionHeardSuffix }}
        </template>
      </el-input-tag>
    </div>
    <div class="preview-content">
      <Codemirror
        ref="templatePreviewRef"
        v-model="functionContent"
        :extensions="[javascript(), oneDark]"
        :options="codeOperate"
        basic
      />
    </div>
    <div class="tip">
      <span>{{ functionEndSuffix }}</span>
    </div>
  </el-dialog>
</template>

<script setup>
import Codemirror from "vue-codemirror6";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

// Props 定义
const props = defineProps({
  modelValue: Boolean,
  method: {
    type: Object,
    default: "",
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});
const codeOperate = ref({
  lineNumbers: true,
  codemirrorStyle: {
    fontSize: "18px",
    lineHeight: "150%",
    height: "450px",
    border: "1px solid #EBEEF5",
  },
});

// 计算属性
const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const functionName = ref("");
const functionHeard= ref("function");
const functionHeardPrefix = ref("((");
const functionHeardSuffix = ref(") => {");
const functionParam = ref([]);
const functionContent = ref("");
const functionEndSuffix = ref("})");
watch(
  () => props.method,
  (val) => {
    if (val) {
      // 提取参数
      const fnString = val.value.trim();
      let ps="";
      if (fnString.startsWith("function")) {
        functionName.value = fnString.split("(")[0].split(" ")[1].trim();
        ps = fnString
          .split("(")[1]
          .split(")")[0]
          .trim();
        functionParam.value=ps===""?[]:ps.split(",")
          .map((val) => val.trim());
          functionHeardPrefix.value="(";
          functionHeardSuffix.value="){";
          functionEndSuffix.value="}";
          functionHeard.value="function"
          functionContent.value =fnString.slice(fnString.indexOf("{")+1,-1);
      } else {
        functionName.value = fnString.split("((")[0].trim();
        ps = fnString
          .split("((")[1]
          .split(")")[0]
          .trim();
          alert(ps);
        functionParam.value=(ps==="")?[]:ps.split(",")
          .map((val) => val.trim());
          functionHeardPrefix.value="((";
          functionHeardSuffix.value=") => {";
          functionEndSuffix.value="})";
          functionHeard.value="";
          functionContent.value =fnString.slice(fnString.indexOf("{")+1,-2);
      }
    }
  }
);

// Emits 定义
const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
.preview-content {
  height: 500px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #f9fafc;
  overflow: scroll;
}
.actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>
