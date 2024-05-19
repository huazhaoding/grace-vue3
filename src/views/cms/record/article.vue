<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="文章ID" prop="articleId">
        <el-input v-model="queryParams.articleId" placeholder="请输入主题"  />
      </el-form-item>
      <el-form-item label="文章标题" prop="articleTitle">
        <el-input v-model="queryParams.articleTitle" placeholder="请输入文章标题"  />
      </el-form-item>
      <el-form-item label="发布用户" prop="createBy">
        <el-input v-model="queryParams.createBy" placeholder="请输入用户名"  />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" ></right-toolbar>
    </el-row>
    <el-table :select-on-indeterminate="false" v-loading="loading" :data="articleList">
      <el-table-column label="文章ID" align="center" prop="articleId" />
      <el-table-column label="文章标题" align="center" prop="articleTitle" :show-overflow-tooltip="true" />
      <el-table-column label="发布用户" align="center" prop="createBy" />
      <el-table-column label="浏览浏览" align="center" prop="articleLook" />
      <el-table-column label="内容点赞" align="center" prop="articleLike" />
      <el-table-column label="内容厌弃" align="center" prop="articleNasty" />
      <el-table-column label="内容讨论" align="center" prop="articleDiscuss" />
      <el-table-column label="内容评分" align="center" prop="articleScore" />
      <el-table-column label="内容分享" align="center" prop="articleShare" />
      <el-table-column label="内容收藏" align="center" prop="articleCollect" />
    </el-table>
    <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize"
      @pagination="getList" />

  </div>
</template>

<script setup name="ArticleCount">
import {
  listArticleCount,
} from "@/api/cms/record";

const { proxy } = getCurrentInstance();


const articleList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const total = ref(0);
const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    createBy: null,
    articleId: null,
    articleTitle: null
  } ,rules: {}
});

const { queryParams,rules } = toRefs(data);







/** 查询文章记录 */
function getList() {
  loading.value = true;
  listArticleCount(queryParams.value).then((response) => {
    articleList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}


/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}



/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}
















getList();
</script>
