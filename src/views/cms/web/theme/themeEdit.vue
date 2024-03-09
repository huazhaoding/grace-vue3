<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="3" class="el-col">
        <el-button
          class="save-btn"
          type="primary"
          plain
          icon="Edit"
          v-hasPermi="['cms:theme:edit']"
          :disabled="activeUrl==''"
          @click="saveEditHandle"
          >保存主题</el-button
        >
        <el-tree
          :data="themeTreeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
      </el-col>
      <el-col :span="20">
        <Codemirror
          ref="codeRef"
          v-model="content"
          :extensions="extensions"
          basic
          @changes="onChanges"
      /></el-col>
      <el-col :span="24"> 底部 </el-col>
    </el-row>
  </div>
</template>

<script setup name="themeEdit">
import Codemirror from "vue-codemirror6";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import { getThemeTree, getThemeFileContent,updateThemeFileContent } from "@/api/cms/theme";
const { proxy } = getCurrentInstance();
const route = useRoute();
const content = ref(null);
const codeRef = ref(null);
const themeTreeData = ref([]);
const activeUrl=ref("");
const config = reactive({
  language: "html",
  theme: "oneDark",
});
const themes = { oneDark };
const languages = {
  html: html(),
  javascript: javascript(),
  css: css(),
  json: json(),
};

function handleNodeClick(data) {
  if (!data.parent) {
    let fileExtension = data.id.slice(data.id.lastIndexOf(".") + 1);
    if ("html|js|css|txt|json|yaml".indexOf(fileExtension) != -1) {
      getThemeFileContent(route.params.webName, data.id).then((res) => {
        if (res.code === 200) {
          activeUrl.value=data.id;
          content.value = res.msg;
        } else {
          proxy.$message.error(res.msg);
        }
      });
    }
  else{
    activeUrl.value="";
    content.value = "";
    proxy.$message.error("不支持类型,请选择html|js|css|txt|json");
  }

  }
}

getThemeTree(route.params.webName).then((res) => {
  if (res.code === 200) {
    themeTreeData.value = res.data;
  } else {
    proxy.$message.error(res.msg);
  }
});

const extensions = computed(() => {
  const result = [];
  result.push(languages[config.language]);
  if (themes[config.theme]) {
    result.push(themes[config.theme]);
  }
  return result;
});

const defaultProps = {
  children: "children",
  label: "name",
};
const props = defineProps({
  code: {
    type: String,
    required: true,
  },
});
watch(
  () => props.code,
  (newValue, oldValue) => {
    content.value = newValue;
  }
);
const emit = defineEmits(["codeChange"]);
const onChanges = () => {
  content.value = codeRef.value.content;
};

function saveEditHandle(){
  const poData={"path":activeUrl.value,"fileContent":content.value}
  updateThemeFileContent(route.params.webName,poData).then((res) => {
  if (res.code === 200) {
    proxy.$modal.msgSuccess(res.msg);
  } else {
    proxy.$message.error(res.msg);
  }
});
}

const play = () => {
  // 调用父组件的方法
  emit("codeChange", content.value);
};
const refresh = () => {
  content.value = props.code;
  emit("codeChange", props.code);
};
// 复制成功时的回调函数
const onCopy = (e) => {
  console.log(content.value);
};
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 20px;
}
.save-btn {
  margin-left: 40px;
}
</style>
