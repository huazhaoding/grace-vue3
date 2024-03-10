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
      <el-col :span="20" class="code-content">
        <Codemirror
          ref="codeRef"
          v-model="content"
          :extensions="extensions"
          basic
          @changes="onChanges"
          :disabled="activeUrl==''"
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
          //设置光标到头部 防止超出范围后无法设置内容
          codeRef.value.setCursor(0);
          content.value = res.msg;
          activeUrl.value=data.id;
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


const emit = defineEmits(["codeChange"]);
const onChanges = () => {

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
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 20px;
}
.save-btn {
  margin-left: 40px;
}
.code-content{
  height: 85vh;
  background-color: black;
  overflow-y: scroll;
}
</style>
