<template>
  <!-- 发布选择编辑器 选择主题  依据主题选择编辑 -->
  <el-dialog title="编辑器选择" v-model="chooseOpen" width="500px" @close="chooseCancel" >
    <el-form :model="chooseForm" label-width="80px" ref="chooseRef">
      <el-form-item label="主题列表" prop="themeName"> 
        <el-select ref="themeSelect"   v-model="chooseForm.themeName" placeholder="请选择站点" clearable>
          <el-option-group v-for="(themes, key) of themeMapData" :key="key" :label="key">
            <el-option v-for="theme in themes" :key="theme.webName + '_' + theme.themeName" :label="theme.themeName"
            :value="theme.webName + '_' + theme.themeName" @click="themeChange(theme)" />
          </el-option-group>
        </el-select>
      </el-form-item>

      <el-form-item label="发布类型" prop="articleType">
        <el-radio-group v-model="chooseForm.articleType"  @change="allowDictData">
          <el-radio v-for="dict in articleTypes" v-show="supportType.includes(dict.dictSort+'')" :key="dict.value"
            :value="Number(dict.value)">{{
              dict.label
            }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="编辑器" prop="articleEdit">
        <el-radio-group v-model="chooseForm.articleEdit" @change="chooseEditLink">
          <el-radio v-for="dict in articleEdits" :key="dict.dictSort"
            v-show="proxy.includeDict(allowDict, dict.dictSort)" :value="dict.label">{{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="chooseCancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup name="ChooseEdit">

import { getHold } from "@/api/system/hold";
const router = useRouter();
const activeTheme=ref({});
const props = defineProps({
  /* 弹窗状态 */
  modelValue: {
    type: Boolean,
    default: false,
  },
  //获取主题列表树
  themeMapData: {
    type: Object,
    default: {},
  },
  //获取主题列表树
  articleTypes: {
    type: Object,
    default: [],
  },
   //获取主题列表树
   articleEdits: {
    type: Object,
    default: [],
  },
});
const { proxy } = getCurrentInstance();

const emit = defineEmits(["update:modelValue"]);
const supportType = ref([]);
const chooseOpen=ref(false);
const allowDict=ref([]);
const chooseForm=ref({
     themeName:null,
     articleType:null,
     articleEdit:null
});

function themeChange(theme) {
  supportType.value = (theme.supportArticleType+'').split(",");
  activeTheme.value=theme;
}

async function allowDictData(articleType) {
  getHold(3, "articleType_" + articleType).then((response) => {
    if (response.hasOwnProperty("data")) {
      allowDict.value = response.data.holdData;
    }
    else {
      allowDict.value = [];
    }
  });
}

// 添加
function chooseEditLink(editType){
setTimeout(function() {
  chooseCancel();
}, 1000); 
  router.push({path:"/cms/article/edit/"+editType,query:{webName:activeTheme.value.webName,themeName:activeTheme.value.themeName,pageNum:1}});
}

watch(
  () => props.modelValue,
  (val) => {
    chooseOpen.value = val;
  },
  { deep: true, immediate: true }
);

watch(
  () => chooseOpen.value,
  (val) => {
    if (val == false) {
      emit("update:modelValue", false);
    }
  },
  { deep: true, immediate: true }
);

function chooseCancel() {
  chooseOpen.value = false;
  proxy.resetForm("chooseRef");
  supportType.value=[];
  allowDict.value=[];
}
</script>
