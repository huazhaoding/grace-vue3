<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="链接地址" prop="linkUrl">
        <el-input v-model="queryParams.linkUrl" placeholder="请输入链接地址" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="链接名" prop="linkName">
        <el-input v-model="queryParams.linkName" placeholder="请输入链接名" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="关键词" prop="keywords">
        <el-input v-model="queryParams.keywords" placeholder="请输入关键词" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="链接描述" prop="description">
        <el-input v-model="queryParams.description" placeholder="请输入链接描述" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="状态" prop="visible">
        <el-input v-model="queryParams.visible" placeholder="请输入状态" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-input v-model="queryParams.orderNum" placeholder="请输入排序" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="父元素id" prop="parentId">
        <el-input v-model="queryParams.parentId" placeholder="请输入父元素id" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:link:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="Sort" @click="toggleExpandAll">展开/折叠</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
    </el-row>

    <el-table v-if="refreshTable" v-loading="loading" :data="linkList" row-key="linkId" :default-expand-all="isExpandAll"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column label="链接ID" align="center" prop="linkId" />
      <el-table-column label="父元素ID" align="center" prop="parentId" />
      <el-table-column label="链接地址" prop="linkUrl" />
      <el-table-column label="链接名" align="center" prop="linkName" />
      <el-table-column label="链接LOGO" align="center" prop="linkIco" >
        <template #default="scope">
          <image-preview :src="scope.row.linkIco" :preview-teleported="true" :width="50" :height="50" />
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" prop="orderNum" />
      <el-table-column label="状态" align="center" prop="visible">
        <template #default="scope">
          <dict-tag :options="sys_show_hide" :value="scope.row.visible" />
        </template>
      </el-table-column>
      <el-table-column label="打开方式" align="center" prop="openType" >
        <template #default="scope">
          <dict-tag :options="cms_link_open" :value="scope.row.openType" />
        </template>
      </el-table-column>
      <el-table-column label="节点类型" align="center" prop="nodeType" />
      <el-table-column label="页面类型" align="center" prop="pageType" />
      <el-table-column label="备注" align="center" prop="remark" v-if="columns[0].visible" />
      <el-table-column label="关键词" align="center" prop="keywords" v-if="columns[1].visible" />
      <el-table-column label="描述" align="center" prop="description" v-if="columns[2].visible" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-tooltip content="修改" placement="top">
            <el-button type="text" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:link:edit']" />
          </el-tooltip>
          <el-tooltip content="添加" placement="top">
            <el-button type="text" icon="Plus" @click="handleAdd(scope.row)" v-hasPermi="['system:link:add']" />
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button type="text" icon="Delete" @click="handleDelete(scope.row)"
              v-hasPermi="['system:link:remove']" /></el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改友情链接对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="linkRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="父元素" prop="parentId">
          <el-tree-select v-model="form.parentId" :data="linkOptions"
            :props="{ value: 'linkId', label: 'linkName', children: 'children' }" value-key="linkId"
            placeholder="请选择父元素id" check-strictly :render-after-expand="false" />
        </el-form-item>
        <el-form-item label="链接地址" prop="linkUrl">
          <el-input v-model="form.linkUrl" placeholder="请输入链接地址" />
        </el-form-item>
        <el-form-item label="链接名" prop="linkName">
          <el-input v-model="form.linkName" placeholder="请输入链接名" />
        </el-form-item>
        <el-form-item prop="linkIcon" >
              <image-upload v-model="form.linkIcon" :fileSize="1" :fileType='["png", "jpg", "jpeg","ico"]' :limit="1" />
            </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="状态" prop="visible">
          <el-radio-group v-model="form.visible">
                <el-radio v-for="dict in sys_show_hide" :key="dict.value" :label="parseInt(dict.value)">{{ dict.label }}
                </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <keys-tag v-model="form.keywords" :limit="3" :min-length="1" :max-length="8" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
              <el-input v-model="form.description" type="textarea" rows="2" maxlength="256" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" rows="2" maxlength="256" placeholder="请输入内容" />
        </el-form-item>
        
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Link">
import { listLink, getLink, delLink, addLink, updateLink } from "@/api/cms/link";

import KeysTag from "@/components/KeysTag";
const { proxy } = getCurrentInstance();
const { sys_show_hide,cms_link_open } = proxy.useDict(
  "sys_show_hide",
  "cms_link_open"
);
const linkList = ref([]);
const linkOptions = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const title = ref("");
const isExpandAll = ref(true);
const refreshTable = ref(true);

// 列显隐信息
const columns = ref([
  { key: 0, label: `备注`, visible: false },
  { key: 1, label: `关键词`, visible: false },
  { key: 2, label: `描述`, visible: false }
]);

const data = reactive({
  form: {},
  queryParams: {
    linkUrl: null,
    linkName: null,
    keywords: null,
    description: null,
    linkIco: null,
    visible: null,
    orderNum: null,
    openType: null,
    nodeType: null,
    pageType: null,
    parentId: null
  },
  rules: {
    linkUrl: [
      { required: true, message: "链接地址不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询友情链接列表 */
function getList() {
  loading.value = true;
  listLink(queryParams.value).then(response => {
    linkList.value = proxy.handleTree(response.data, "linkId", "parentId");
    loading.value = false;
  });
}

/** 查询友情链接下拉树结构 */
function getTreeselect() {
  listLink().then(response => {
    linkOptions.value = [];
    const data = { linkId: 0, linkName: '顶级节点', children: [] };
    data.children = proxy.handleTree(response.data, "linkId", "parentId");
    linkOptions.value.push(data);
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    linkId: null,
    linkUrl: null,
    linkName: null,
    keywords: null,
    description: null,
    linkIco: null,
    visible: 0,
    remark: null,
    createTime: null,
    updateTime: null,
    updateBy: null,
    createBy: null,
    orderNum: null,
    openType: null,
    nodeType: null,
    pageType: null,
    parentId: null
  };
  proxy.resetForm("linkRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

/** 新增按钮操作 */
function handleAdd(row) {
  reset();
  getTreeselect();
  if (row != null && row.linkId) {
    form.value.parentId = row.linkId;
  } else {
    form.value.parentId = 0;
  }
  open.value = true;
  title.value = "添加友情链接";
}

/** 展开/折叠操作 */
function toggleExpandAll() {
  refreshTable.value = false;
  isExpandAll.value = !isExpandAll.value;
  nextTick(() => {
    refreshTable.value = true;
  });
}

/** 修改按钮操作 */
async function handleUpdate(row) {
  reset();
  await getTreeselect();
  if (row != null) {
    form.value.parentId = row.linkId;
  }
  getLink(row.linkId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改友情链接";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["linkRef"].validate(valid => {
    if (valid) {
      if (form.value.linkId != null) {
        updateLink(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addLink(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  proxy.$modal.confirm('是否确认删除友情链接编号为"' + row.linkId + '"的数据项？').then(function () {
    return delLink(row.linkId);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => { });
}

getList();
</script>
