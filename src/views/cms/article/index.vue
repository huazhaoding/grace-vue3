<template>
  <div class="app-container">
    <el-container>
      <left>
        <el-input v-model="categoryName" placeholder="分类" clearable prefix-icon="Search" style="margin-bottom: 20px" />
        <el-tree :data="categoryOptions" :props="{ label: 'label', children: 'children' }" :expand-on-click-node="false"
          :filter-node-method="filterNode" ref="categoryTreeRef" node-key="id" highlight-current default-expand-all
          @node-click="handleNodeClick" />
      </left>
      <el-main>
        <!--文章数据-->
        <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
          <el-form-item label="站点" prop="mainCategoryId">
            <el-select @change="themeChange" ref="themeSelectRef" v-model="queryParams.params['mainCategoryId']"
              placeholder="请选择站点" clearable style="width: 240px">
              <el-option-group v-for="(themes, key) of themeMapData" :key="key" :label="key">
                <el-option v-for="theme in themes" :key="theme.webName + '_' + theme.themeName" :label="theme.themeName"
                  :value="theme.mainCategoryId" @click="themeChange(theme.webName + '_' + theme.themeName)" />
              </el-option-group>
            </el-select>
          </el-form-item>

          <el-form-item label="文章ID" prop="articleId">
            <el-input v-model="queryParams.articleId" placeholder="请输入文章ID" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="文章标题" prop="articleTitle">
            <el-input v-model="queryParams.articleTitle" placeholder="请输入文章标题" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="发表人" prop="createBy">
            <el-input v-model="queryParams.createBy" placeholder="请输入发表人" clearable style="width: 240px"
              @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="状态" prop="visible">
            <el-select v-model="queryParams.visible" placeholder="请选择状态" clearable style="width: 240px">
              <el-option v-for="dict in cms_article_visible" :key="dict.value" :label="dict.label"
                :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="articleType">
            <el-select v-model="queryParams.articleType" placeholder="请选择类型" clearable style="width: 240px">
              <el-option v-for="dict in cms_article_type" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>

          <el-form-item label="顶置级别" prop="articleTop">
            <el-input-number v-model="queryParams.articleTop" controls-position="right" clearable
              style="width: 240px" />
          </el-form-item>

          <el-form-item label="创建时间" style="width: 308px">
            <el-date-picker v-model="dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
              start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAddArticle">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Aim" :disabled="benchMultiple" @click="handleBatch"
              v-hasPermi="['cms:article:edit']">批量操作</el-button>
          </el-col>

          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete"
              v-hasPermi="['cms:article:remove']">删除</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="articleList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="文章ID" align="center" prop="articleId" />
          <el-table-column label="文章标题" align="center" prop="articleTitle" :show-overflow-tooltip="true" />
          <el-table-column label="创建时间" align="center" prop="createTime" width="180" v-if="columns[0].visible">
            <template #default="scope">
              <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" align="center" prop="createBy" v-if="columns[1].visible" />
          <el-table-column label="文章预览" align="center" prop="articleSummary" v-if="columns[2].visible" />
          <el-table-column label="文章类型" align="center" prop="articleType">
            <template #default="scope">
              <dict-tag :options="cms_article_type" :value="scope.row.articleType" />
            </template>
          </el-table-column>
          <el-table-column label="文章状态" align="center" prop="visible">
            <template #default="scope">
              <dict-tag :options="cms_article_visible" :value="scope.row.visible" />
            </template>
          </el-table-column>
          <el-table-column label="编辑器" align="center" prop="articleBuild" v-if="columns[3].visible" />
          <el-table-column label="顶置级别" align="center" prop="articleTop" />
          <el-table-column label="缩略图" align="center" prop="articleImg" v-if="columns[4].visible" />
          <el-table-column label="允许评论" align="center" prop="allowComment">
            <template #default="scope">
              <dict-tag :options="sys_true_false" :value="String(scope.row.allowComment)" />
            </template>
          </el-table-column>
          <el-table-column label="转载路径" align="center" prop="reprintUrl" v-if="columns[5].visible" />
          <el-table-column label="链接别名" align="center" prop="articleUrl" v-if="columns[6].visible" />
          <el-table-column label="关键词" align="center" prop="keywords" v-if="columns[7].visible" />
          <el-table-column label="描述" align="center" prop="description" v-if="columns[8].visible" />
          <el-table-column label="更新时间" align="center" prop="updateTime" width="180" v-if="columns[9].visible">
            <template #default="scope">
              <span>{{ parseTime(scope.row.updateTime, "{y}-{m}-{d}") }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新人" align="center" prop="updateBy" v-if="columns[10].visible" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
              <el-tooltip class="box-item" effect="dark" content="修改" placement="bottom">
                <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                v-hasPermi="['cms:article:edit']">
              </el-button>
              </el-tooltip>
              <el-tooltip class="box-item" effect="dark" content="删除" placement="bottom">
                <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                v-hasPermi="['cms:article:remove']"/>
              </el-tooltip><el-tooltip class="box-item" effect="dark" content="查看关联" placement="bottom">
                <el-button link type="primary" icon="View" @click="openViewCategoryHand(scope.row)"
                v-hasPermi="['cms:article:remove']"/>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize" @pagination="getList" />

      </el-main>
    </el-container>
    <batch-dialog v-model="batchOpen" :articleIds="ids" :categoryId="queryParams.params['mainCategoryId']"
      @closeBatchDialog="closeBatchDialog"></batch-dialog>

    <choose-edit-dialog v-model="chooseOpen" :themeMapData="themeMapData" :articleTypes="cms_article_type"
      :articleEdits="cms_article_edit">
    </choose-edit-dialog>

    <view-category-dialog v-model="openViewCategory" :articleId="activeArticleId"></view-category-dialog>
  </div>
</template>
<script setup name="Article">
import {
  listArticle,
  delArticle,
  categoryTree,
  themeMap,
} from "@/api/cms/article";
import batchDialog from "@/views/cms/article/components/batchDialog";
import viewCategoryDialog from "@/views/cms/article/components/viewCategoryDialog.vue";
import chooseEditDialog from "@/views/cms/article/components/chooseEditDialog";
import left from "@/components/Left";
import { ref } from "vue";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const articleList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const categoryName = ref("");
const categoryOptions = ref(undefined);
const batchOpen = ref(false);
const dateRange = ref([]);
const themeMapData = ref({});
const chooseOpen = ref(false);
const activeArticleId = ref(undefined);
const openViewCategory = ref(false);
const { sys_true_false, cms_article_type, cms_article_visible, cms_article_edit } = proxy.useDict(
  "sys_true_false",
  "cms_article_type",
  "cms_article_visible",
  "cms_article_edit"
);


const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    articleId: null,
    categoryId:
      route.query && route.query.categoryId ? route.query.categoryId : null,
    articleTitle: null,
    createBy: null,
    articleType: null,
    articleTop: null,
    visible: null,
    params: {},
  },
});

// 列显隐信息
const columns = ref([
  { key: 0, label: `创建时间`, visible: false },
  { key: 1, label: `创建人`, visible: true },
  { key: 2, label: `文章预览`, visible: false },
  { key: 3, label: `编辑器`, visible: false },
  { key: 4, label: `缩略图`, visible: false },
  { key: 5, label: `转载路径`, visible: false },
  { key: 6, label: `链接别名`, visible: false },
  { key: 7, label: `关键词`, visible: false },
  { key: 8, label: `描述`, visible: false },
  { key: 9, label: `修改时间`, visible: false },
  { key: 10, label: `修改人`, visible: false },
]);

const { queryParams } = toRefs(data);
const benchMultiple = ref(true);
/** 通过条件过滤节点  */
const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};
/** 根据名称筛选分类树 */
watch(categoryName, (val) => {
  proxy.$refs["categoryTreeRef"].filter(val);
});

/**初始化执行一次 */
function closeBatchDialog(val) {
  getList();
}

function handleBatch() {
  batchOpen.value = true;
}

function openViewCategoryHand(row) {
  activeArticleId.value = row.articleId;
  openViewCategory.value = true;
}

/** 查询树下拉树结构 {themeName:'',nodeType:1} */
function getCategoryTree(data) {
  categoryTree(data).then((response) => {
    categoryOptions.value = response.data;
  });
}

/** 节点单击事件 */
function handleNodeClick(data) {
  queryParams.value.categoryId = data.id;
  handleQuery();
}

/** 查询文章列表 */
function getList() {
  loading.value = true;
  listArticle(proxy.addDateRange(queryParams.value, dateRange.value)).then(
    (response) => {
      articleList.value = response.rows;
      total.value = response.total;
      loading.value = false;
    }
  );
}

themeMap().then((response) => {
  themeMapData.value = response.data;
});

function themeChange(themeName) {
  getCategoryTree({ themeName: themeName });
  handleQuery();
  benchMultiple.value = true;
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

function handleAddArticle() {
  chooseOpen.value = true;

}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  queryParams.value.categoryId = null;
  proxy.$refs["categoryTreeRef"].setCheckedKeys([], false);
  categoryName.value = null;
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.articleId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
  if (!multiple.value) {
    if (queryParams.value.params['mainCategoryId']) {
      benchMultiple.value = false;
    }
    else {
      benchMultiple.value = true;
    }
  }
  else {
    benchMultiple.value = true;
  }
}


/** 修改按钮操作 */
function handleUpdate(row) {
  const _articleIds = row.articleId;
  cms_article_edit.value.forEach((item, key) => {
    if (item.value == row.articleBuild + '') {
      router.push({ path: "/cms/article/edit/" + item.label + "/" + _articleIds });
      return;
    }
  })

}

/** 删除按钮操作 */
function handleDelete(row) {
  const _articleIds = row.articleId || ids.value;
  proxy.$modal
    .confirm('是否确认删除文章编号为"' + _articleIds + '"的数据项？')
    .then(function () {
      return delArticle(_articleIds);
    }).then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
    .catch(() => { });
}

onMounted(async () => {
  await getCategoryTree({});
});
</script>
