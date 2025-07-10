<template>
  <el-dialog v-model="visible" title="事件编辑" width="60%" style="z-index: 9999999;">
    <div class="tip" style="display: flex; justify-content: flex-start">
      <el-input v-model="functionName" placeholder="请输入方法名" style="width: 20%"
        :disabled="isDefault && fnFrom === 'lifeCycle'">
        <template v-if="functionHeard != ''" #prefix>
          {{ functionHeard }} &nbsp&nbsp
        </template>
      </el-input>
      <el-input-tag v-model="functionParam" clearable :placeholder="isDefault?'':'请输入参数名'" :disabled="isDefault" style="width: 30%">
        <template #prefix>
          {{ functionHeardPrefix }}
        </template>
        <template #suffix>
          {{ functionHeardSuffix }}
        </template>
      </el-input-tag>
    </div>
    <div class="preview-content">
      <Codemirror ref="templatePreviewRef" v-model="functionContent" :extensions="[javascript(), oneDark]"
        :options="codeOperate" basic />
    </div>
    <div class="tip">
      <span>{{ functionEndSuffix }}</span>
    </div>
    <div class="actions">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="saveFunction">保存</el-button>
    </div>
  </el-dialog>
 
</template>

<script setup>
import Codemirror from "vue-codemirror6";
import { javascript } from "@codemirror/lang-javascript";
import { js_beautify as jsBeautify } from "js-beautify";
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
  fnFrom: {
    type: String,
    default: ""
  }
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
const functionHeard = ref("function");
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
      let ps = "";
      if (fnString.startsWith("function")) {
        functionName.value = fnString.split("(")[0].split(" ")[1].trim();
        ps = fnString
          .split("(")[1]
          .split(")")[0]
          .trim();
        functionParam.value = ps === "" ? [] : ps.split(",")
          .map((val) => val.trim());
        functionHeardPrefix.value = "(";
        functionHeardSuffix.value = "){";
        functionEndSuffix.value = "}";
        functionHeard.value = "function"
        functionContent.value = jsBeautify(fnString.slice(fnString.indexOf("{") + 1, -1));
      } else {
        functionName.value = fnString.split("((")[0].trim();
        ps = fnString
          .split("((")[1]
          .split(")")[0]
          .trim();
        functionParam.value = (ps === "") ? [] : ps.split(",")
          .map((val) => val.trim());
        functionHeardPrefix.value = "((";
        functionHeardSuffix.value = ") => {";
        functionEndSuffix.value = "})";
        functionHeard.value = "";
        functionContent.value = jsBeautify(fnString.slice(fnString.indexOf("{") + 1, -2));
      }
    }
  }
);
// Emits 定义
const emit = defineEmits(["update:modelValue", "updateMethod"]);
function saveFunction() {
  const fnString = `${functionHeard.value} ${functionName.value} ${functionHeardPrefix.value} ${functionParam.value.join(",")}) ${functionHeardSuffix.value} ${functionContent.value} ${functionEndSuffix.value}`;
  emit("updateMethod", fnString, props.fnFrom, functionName.value,props.method.key);
}

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
