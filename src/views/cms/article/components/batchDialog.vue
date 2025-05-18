<template>
  <!-- 批量操作 -->
  <el-dialog title="批量操作" v-model="batchOpen" width="500px" @close="batchCancel" append-to-body>
    <el-form :model="batchForm" label-width="80px">
      <el-form-item label="状态" prop="visible">
        <el-radio-group v-model="batchForm.visible">
          <el-radio v-for="dict in cms_article_visible" :key="dict.value" :label="Number(dict.value)">
            {{
              dict.label
            }}
          </el-radio>
        </el-radio-group>
        <el-button type="primary" @click="batchVisible">更新状态</el-button>
      </el-form-item>
      <el-form-item label="顶置" prop="articleTop">
        <el-input-number v-model="batchForm.articleTop" :min="1" />
        <el-button type="primary" @click="batchTop">更新顶置</el-button>
      </el-form-item>
      <el-form-item label="自定分类" prop="categoryIds">
        <el-tree-select v-model="batchForm.categoryIds" :data="categoryOptions" node-key="id" :props="{
          value: 'id',
          label: 'label',
          children: 'children',
          disabled: getCategoryDisabled,
        }" value-key="id" placeholder="请选择分类" check-strictly multiple :multiple-limit="maxCat" />
        <br/>
        <el-button type="primary" @click="batchCategory">更新分类</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="batchCancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {
  batchArticleVisible,
  batchArticleTop,
  batchAddArticleCategory,
  categoryTree
} from "@/api/cms/article";
const { proxy } = getCurrentInstance();
const emit = defineEmits(["update:modelValue", "closeBatchDialog"]);
const props = defineProps({
  /* 弹窗状态 */
  modelValue: {
    type: Boolean,
    default: false,
  },
  // 选择文章Id
  articleIds: {
    type: Object,
    default: [],
  },
  // 主分类ID
  categoryId: {
    type: Number,
    default: null,
  }
});
const { cms_article_visible } = proxy.useDict(
  "cms_article_visible"
);
const categoryOptions = ref(undefined);
const maxTag = ref(undefined);
const maxCat = ref(undefined);
const batchOpen = ref(undefined);
const batchForm = ref({ visible: undefined, articleTop: undefined, tagIds: undefined, categoryIds: undefined });
watch(
  () => props.modelValue,
  (val) => {
    batchOpen.value = val;
    init();
  },
  { deep: true, immediate: true }
);


watch(
  () => batchOpen.value,
  (val) => {
    if (val == false) {
      emit("closeBatchDialog", false);
      emit("update:modelValue", false);
    }
  },
  { deep: true, immediate: true }
);

function getCategoryDisabled(da, node) {
  return da.id===props.categoryId;
}


/** 查询树下拉树结构 */
function getCategoryTree() {
  categoryTree({categoryId:props.categoryId,nodeTypes:[1,6,7]}).then((response) => {
    categoryOptions.value = response.data;
  });
}


function batchVisible() {
  if (batchForm.value.visible != undefined) {
    batchArticleVisible(props.articleIds, batchForm.value.visible).then((response) => {
      proxy.$modal.msgSuccess("修改成功");
    });
  }
  else {
    proxy.$modal.msgError("请选择状态");
  }

}

function batchTop() {
  if (batchForm.value.articleTop != undefined) {
    batchArticleTop(props.articleIds, batchForm.value.articleTop).then((response) => {
      proxy.$modal.msgSuccess("修改成功");
    });
  }
  else {
    proxy.$modal.msgError("请选择顶置状态");
  }
}

function batchCategory() {
  const _categoryIds = batchForm.value.categoryIds; 
  _categoryIds.push(props.categoryId);
  if (batchForm.value.categoryIds && batchForm.value.categoryIds.length > 0) {
    batchAddArticleCategory(props.articleIds, _categoryIds).then((response) => {
      proxy.$modal.msgSuccess("修改成功");
    });
  }
  else {
    proxy.$modal.msgError("请选择分类");
  }
}

function setConfig() {
  proxy.getConfigValueMap("cmsConfig").then((response) => {
    const data = response.data;
    maxCat.value = data["oly.cms.articleCategory.maxNum"];
    maxTag.value = data["oly.cms.articleTag.maxNum"];
  });
}

function batchCancel() {
  batchOpen.value = false;
}

function init() {
  setConfig();
  getCategoryTree();
}

</script>