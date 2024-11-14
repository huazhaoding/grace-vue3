<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="菜单ID" prop="columnId">
        <el-input v-model="queryParams.catId" placeholder="请输入菜单ID" clearable style="width: 240px" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="菜单名字" prop="columnName">
        <el-input v-model="queryParams.columnName" placeholder="请输入菜单名字" clearable style="width: 240px" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="父ID" prop="parentId">
        <el-input v-model="queryParams.parentId" placeholder="请输入父元素ID" clearable style="width: 240px" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="创建人" prop="createBy">
        <el-input v-model="queryParams.createBy" placeholder="请输入创建人" clearable style="width: 240px" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="菜单状态" prop="visible">
        <el-select v-model="queryParams.visible" placeholder="请选择菜单状态" clearable style="width: 240px">
          <el-option v-for="dict in sys_show_hide" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="排序" prop="orderNum">
        <el-input-number v-model="queryParams.articleTop" controls-position="right" clearable style="width: 240px" />
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
        <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['cms:column:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="Sort" @click="toggleExpandAll">展开/折叠</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
    </el-row>

    <el-table v-if="refreshTable" table-layout='auto' v-loading="loading" :data="columnList" row-key="columnId"
      :default-expand-all="isExpandAll" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column label="栏目ID" prop="columnId" />
      <el-table-column label="栏目名字" prop="columnName" :show-overflow-tooltip="true" />
      <el-table-column label="父元素ID" align="center" prop="parentId" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180" v-if="columns[0].visible">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center" prop="createBy" v-if="columns[1].visible" />
      <el-table-column label="栏目图标" align="center" prop="columnIcon" v-if="columns[2].visible" >
        <template #default="scope">
          <image-preview v-if="scope.row.columnIcon" :src="scope.row.columnIcon" preview-teleported :width="50" :height="50" />
        </template>
      </el-table-column>
      <el-table-column label="栏目地址" align="center" prop="columnUrl" />
      <el-table-column label="状态" align="center" prop="visible">
        <template #default="scope">
          <dict-tag :options="sys_show_hide" :value="scope.row.visible" />
        </template>
      </el-table-column>
      <el-table-column label="节点类型" align="center" prop="nodeType">
        <template #default="scope">
          <dict-tag :options="cms_column_node_type" :dictSort="true" :value="scope.row.nodeType" />
        </template>
      </el-table-column>
      <el-table-column label="打开方式" align="center" prop="openType">
        <template #default="scope">
          <dict-tag :options="cms_link_open" :value="scope.row.openType" />
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" prop="orderNum" />
      <el-table-column label="祖级列表" align="center" prop="ancestors" v-if="columns[3].visible" />
      <el-table-column label="权限字符" align="center" prop="perms" v-if="columns[4].visible" />
      <el-table-column label="关键词" align="center" prop="keywords" v-if="columns[5].visible" />
      <el-table-column label="描述" align="center" prop="description" v-if="columns[6].visible" />
      <el-table-column label="备注" align="center" prop="remark" v-if="columns[7].visible" />
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180" v-if="columns[8].visible">
        <template #default="scope">
          <span>{{ parseTime(scope.row.updateTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新人" align="center" prop="updateBy" v-if="columns[9].visible" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-tooltip content="修改" placement="top">
            <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['cms:column:edit']">
            </el-button>
          </el-tooltip>
          <el-tooltip content="添加下级" placement="top" v-if="scope.row.nodeRoot">
            <el-button link type="primary" icon="Plus" @click="handleAdd(scope.row)" v-hasPermi="['cms:column:add']">
            </el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
              v-hasPermi="['cms:column:remove']">
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改内容菜单对话框 -->
    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form ref="columnRef" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上层元素" prop="parentId">
              <el-tree-select :disabled="title!='添加菜单'" v-model="form.parentId" :data="columnOptions" @node-click="clickColumnTree" :props="{
                value: 'columnId',
                label: 'columnName',
                children: 'children',
              }" value-key="columnId" placeholder="请选择父元素" check-strictly />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="节点类型" prop="nodeType">
              <el-radio-group v-model="form.nodeType">
                <el-radio v-for="dict in cms_column_node_type" :key="dict.dictSort"
                  v-show="proxy.includeDict(allowDict, dict.dictSort)" :label="dict.dictSort">{{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="栏目名字" prop="columnName">
              <el-input v-model="form.columnName" placeholder="请输入栏目名字" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="columnIcon" >
              <image-upload v-model="form.columnIcon" :fileSize="1" :fileType='["png", "jpg", "jpeg","ico"]' :limit="1" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item prop="columnUrl" >
              <template #label>
                <span>
                  <el-tooltip content="栏目访问固定链接" placement="top">
                    <el-icon>
                      <question-filled />
                    </el-icon>
                  </el-tooltip>
                  栏目地址
                </span>
              </template>
              <el-input v-model="form.columnUrl" placeholder="请输入栏目地址" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="类目排序" prop="orderNum">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>

            <el-col :span="12">
            <el-form-item label="打开方式" prop="openType">
              <el-select v-model="form.openType" placeholder="请选择打开方式">
                <el-option v-for="dict in cms_link_open" :key="dict.value" :label="dict.label"
                  :value="Number(dict.value)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="栏目状态" prop="visible">
              <el-radio-group v-model="form.visible">
                <el-radio v-for="dict in sys_show_hide" :key="dict.value" :label="parseInt(dict.value)">{{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item  prop="perms">
              <template #label>
                <span>
                  <el-tooltip content="访问需要的权限" placement="top">
                    <el-icon>
                      <question-filled />
                    </el-icon>
                  </el-tooltip>
                  权限字符
                </span>
              </template>
              <el-input v-model="form.perms" placeholder="请输入权限字符" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="关键词" prop="keywords">
              <template #label>
                <span>
                  <el-tooltip content="关键词限制1-8个字符" placement="top">
                    <el-icon>
                      <question-filled />
                    </el-icon>
                  </el-tooltip>
                  关键词
                </span>
              </template>
              <keys-tag v-model="form.keywords" :limit="3" :min-length="1" :max-length="8" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述" prop="description">
              <el-input v-model="form.description" rows="3" maxlength="256" type="textarea" placeholder="请输入描述" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" type="textarea" rows="3" maxlength="256" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
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
<script setup name="Column">
import {
  listColumn,
  getColumn,
  delColumn,
  addColumn,
  updateColumn,
} from "@/api/cms/column";
import { getHold } from "@/api/system/hold";
import KeysTag from "@/components/KeysTag";
const { proxy } = getCurrentInstance();
const { cms_column_node_type, sys_show_hide, cms_link_open } = proxy.useDict(
  "cms_column_node_type",
  "sys_show_hide",
  "cms_link_open"
);
const allowDict = ref([]);
const columnList = ref([]);
const columnOptions = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const title = ref("");
const isExpandAll = ref(true);
const refreshTable = ref(true);
const dateRange = ref([]);

const data = reactive({
  form: {},
  queryParams: {
    columnName: null,
    columnIcon: null,
    visible: null,
    parentId: null,
    nodeType: null,
    openType: null,
    perms: null,
    columnUrl: null,
    ancestors: null,
    keywords: null,
    description: null,
    orderNum: null
  },
  rules: {
    parentId: [
      { required: true, message: "父元素不能为空", trigger: "blur" },
    ],
    columnName: [
      { required: true, message: "栏目名字不能为空", trigger: "blur" },
    ],
    visible: [
      { required: true, message: "状态不能为空", trigger: "blur" },
    ],
    openType: [
      { required: true, message: "打开方式不能为空", trigger: "blur" },
    ],
    nodeType: [{ required: true, message: "节点不能为空", trigger: "blur" }],
  },
});

// 列显隐信息
const columns = ref([
  { key: 0, label: `创建时间`, visible: false },
  { key: 1, label: `创建人`, visible: true },
  { key: 2, label: `栏目图标`, visible: false },
  { key: 3, label: `组级列表`, visible: false },
  { key: 4, label: `权限字符`, visible: false },
  { key: 5, label: `关键词`, visible: false },
  { key: 6, label: `描述`, visible: false },
  { key: 7, label: `备注`, visible: false },
  { key: 8, label: `修改时间`, visible: false },
  { key: 9, label: `修改人`, visible: false },
]);

const { queryParams, form, rules } = toRefs(data);

/** 查询内容菜单列表 */
function getList() {
  loading.value = true;
  listColumn(proxy.addDateRange(queryParams.value, dateRange.value)).then(
    (response) => {
      columnList.value = proxy.handleTree(
        response.data,
        "columnId",
        "parentId"
      );
      loading.value = false;
    }
  );
}

/** 查询内容菜单下拉树结构 */
function getTreeselect() {
  listColumn().then((response) => {
    columnOptions.value = [];
    const data = { columnId: 0, columnName: "顶级节点", children: [] };
    data.children = proxy.handleTree(response.data, "columnId", "parentId");
    columnOptions.value.push(data);
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
    columnId: null,
    columnName: null,
    columnIcon: null,
    visible: 0,
    parentId: null,
    nodeType: 0,
    remark: null,
    openType: 0,
    perms: null,
    columnUrl: null,
    ancestors: null,
    keywords: null,
    description: null,
    orderNum: 0
  };
  proxy.resetForm("columnRef");
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
async function handleAdd(row) {
  reset();
  getTreeselect();
  if (row != null && row.columnId) {
    form.value.parentId = row.columnId;
    allowDictData(row.nodeType);
  } else {
    form.value.parentId = 0;
    allowDictData(-1);
  }
  open.value = true;
  title.value = "添加菜单";
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
    form.value.parentId = row.columnId;
  }
  getColumn(row.columnId).then((response) => {
    form.value = response.data;
    getAllowDict(response.data.parentId);
    open.value = true;
    title.value = "修改内容菜单";
  });
}

async function getAllowDict(parentId) {
  if (parentId == 0) {
    allowDictData(-1);
  }
  else {
    getColumn(parentId).then((response) => {
      allowDictData(response.data.nodeType);
    });
  }

}

async function allowDictData(nodeType) {
  getHold(1,"nodeType_" + nodeType).then((response) => {
    if (response.hasOwnProperty("data")) {
      allowDict.value = response.data.holdData;
    }
    else {
      allowDict.value = [];
    }
  });
}

function clickColumnTree(item, data) {
  form.value.nodeType=null;
  if (item.columnId == 0) {
    allowDictData(-1);
  }
  else {
    allowDictData(item.nodeType);
  }
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["columnRef"].validate((valid) => {
    if (valid) {
      if (form.value.columnId != null) {
        updateColumn(form.value).then((response) => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addColumn(form.value).then((response) => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

function filterNodeType() {
  parentNdoeType

}

/** 删除按钮操作 */
function handleDelete(row) {
  proxy.$modal
    .confirm('是否确认删除内容菜单编号为"' + row.columnId + '"的数据项？')
    .then(function () {
      return delColumn(row.columnId);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
    .catch(() => { });
}

getList();
</script>
