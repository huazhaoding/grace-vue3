<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="分类ID" prop="catId">
        <el-input
          v-model="queryParams.catId"
          placeholder="请输入分类ID"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分类名字" prop="catName">
        <el-input
          v-model="queryParams.catName"
          placeholder="请输入分类名字"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="父ID" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          placeholder="请输入父ID"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建人ID" prop="createBy">
        <el-input
          v-model="queryParams.createBy"
          placeholder="请输入创建人ID"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分类状态" prop="visible">
        <el-select
          v-model="queryParams.visible"
          placeholder="请选择分类状态"
          clearable
        >
          <el-option
            v-for="dict in sys_show_hide"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分类类型" prop="catType">
        <el-select
          v-model="queryParams.catType"
          placeholder="请选择分类类型"
          clearable
        >
          <el-option
            v-for="dict in cms_support_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-input
          v-model="queryParams.orderNum"
          placeholder="请输入排序"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" style="width: 308px">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['cms:cat:add']"
          >新增</el-button
        >
      </el-col>

      <el-col :span="1.5">
        <el-button type="info" plain icon="Sort" @click="toggleExpandAll"
          >展开/折叠</el-button
        >
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
        :columns="columns"
      ></right-toolbar>
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="catList"
      row-key="catId"
      :default-expand-all="isExpandAll"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="分类ID" prop="catId" />
      <el-table-column label="分类名字" prop="catName" />
      <el-table-column label="父ID" align="center" prop="parentId" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
        v-if="columns[0].visible"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建人"
        align="center"
        prop="createBy"
        v-if="columns[1].visible"
      />

      <el-table-column label="状态" align="center" prop="visible">
        <template #default="scope">
          <dict-tag :options="sys_show_hide" :value="scope.row.visible" />
        </template>
      </el-table-column>
      <el-table-column label="类别类型" align="center" prop="catType">
        <template #default="scope">
          <dict-tag :options="cms_support_type" :value="scope.row.catType" />
        </template>
      </el-table-column>
      <el-table-column
        label="目录"
        align="center"
        prop="parent"
        v-if="columns[2].visible"
      >
        <template #default="scope">
          <dict-tag :options="cms_yes_no" :value="scope.row.parent" />
        </template>
      </el-table-column>

      <el-table-column
        label="栏目图标"
        align="center"
        prop="catIcon"
        width="100"
      >
        <template #default="scope">
          <image-preview
            :src="scope.row.catIcon"
            :preview-teleported="true"
            :width="50"
            :height="50"
          />
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" prop="orderNum" />
      <el-table-column
        label="祖级列表"
        align="center"
        prop="ancestors"
        v-if="columns[3].visible"
      />
      <el-table-column
        label="权限字符"
        align="center"
        prop="perms"
        v-if="columns[4].visible"
      />
      <el-table-column
        label="关键词"
        align="center"
        prop="keywords"
        v-if="columns[5].visible"
      />
      <el-table-column
        label="描述"
        align="center"
        prop="description"
        v-if="columns[6].visible"
      />
      <el-table-column
        label="备注"
        align="center"
        prop="remark"
        v-if="columns[7].visible"
      />
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        width="180"
        v-if="columns[8].visible"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.updateTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新人"
        align="center"
        prop="updateBy"
        v-if="columns[9].visible"
      />
      <el-table-column
        label="类目路径"
        align="center"
        prop="catUrl"
        v-if="columns[10].visible"
      />
      <el-table-column label="关联文章数" align="center" prop="catCount" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-tooltip content="修改" placement="top">
            <el-button
              link
              type="primary"
              icon="Edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['cms:cat:edit']"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip content="新增" placement="top" v-if="scope.row.parent==0">
            <el-button
              link
              type="primary"
              icon="Plus"
              @click="handleAdd(scope.row)"
              v-hasPermi="['cms:cat:add']"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button
              link
              type="primary"
              icon="Delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['cms:cat:remove']"
            >
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改分类对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="catRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="父元素" prop="parentId">
          <el-tree-select
            v-model="form.parentId"
            :data="catOptions"
            :props="{ value: 'catId', label: 'catName', children: 'children' }"
            value-key="catId"
            placeholder="请选择父元素id"
            
            check-strictly
          />
        </el-form-item>
        <el-form-item label="分类名字" prop="catName">
          <el-input v-model="form.catName" placeholder="请输入分类名字" />
        </el-form-item>
        <el-form-item label="分类目录" prop="parent">
          <el-radio-group v-model="form.parent">
            <el-radio
              v-for="dict in cms_yes_no"
              :key="dict.value"
              :label="parseInt(dict.value)"
              >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类目地址" prop="catUrl">
          <el-input v-model="form.catUrl" placeholder="请输入类目地址" />
        </el-form-item>
        <el-form-item label="栏目图标" prop="catIcon">
          <image-upload v-model="form.catIcon" :limit="1" />
        </el-form-item>
        <el-form-item label="权限字符" prop="perms">
          <el-input v-model="form.perms" placeholder="请输入权限字符" />
        </el-form-item>
        <el-form-item label="类目排序" prop="orderNum">
          <el-input-number
            v-model="form.orderNum"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="分类类别" prop="catType">
          <el-select v-model="form.catType" placeholder="请选择类别类">
            <el-option
              v-for="dict in cms_support_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类状态" prop="catType">
          <el-radio-group v-model="form.visible">
            <el-radio
              v-for="dict in sys_show_hide"
              :key="dict.value"
              :label="parseInt(dict.value)"
              >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <keys-tag
            v-model="form.keywords"
            :limit="3"
            :min-length="1"
            :max-length="5"
          />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
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

<script setup name="Cat">
import { listCat, getCat, delCat, addCat, updateCat } from "@/api/cms/category";
import KeysTag from "@/components/KeysTag";
const { proxy } = getCurrentInstance();
const { cms_support_type, sys_show_hide, cms_yes_no } = proxy.useDict(
  "cms_support_type",
  "sys_show_hide",
  "cms_yes_no"
);

const catList = ref([]);
const catOptions = ref([]);
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
    catId: null,
    catName: null,
    catIcon: null,
    visible: null,
    parentId: null,
    catUrl: null,
    orderNum: null,
    catType: null,
  },
  rules: {
    catName: [{ required: true, message: "分类名字不能为空", trigger: "blur" }],
    visible: [{ required: true, message: "状态不能为空", trigger: "blur" }],
    catType: [{ required: true, message: "支持类型不能为空", trigger: "blur" }],
  },
});

const { queryParams, form, rules } = toRefs(data);

// 列显隐信息
const columns = ref([
  { key: 0, label: `创建时间`, visible: false },
  { key: 1, label: `创建人`, visible: true },
  { key: 2, label: `目录`, visible: false },
  { key: 3, label: `组级列表`, visible: false },
  { key: 4, label: `权限字符`, visible: false },
  { key: 5, label: `关键词`, visible: false },
  { key: 6, label: `描述`, visible: false },
  { key: 7, label: `备注`, visible: false },
  { key: 8, label: `修改时间`, visible: false },
  { key: 9, label: `修改人`, visible: false },
  { key: 10, label: `类目路径`, visible: false },
]);

/** 查询分类列表 */
function getList() {
  loading.value = true;
  listCat(proxy.addDateRange(queryParams.value, dateRange.value)).then(
    (response) => {
      catList.value = proxy.handleTree(response.data, "catId", "parentId");
      loading.value = false;
    }
  );
}

/** 查询分类下拉树结构 */
function getTreeselect() {
  listCat({ parent: 0 }).then((response) => {
    catOptions.value = [];
    const data = { catId: 0, catName: "顶级节点", children: [] };
    data.children = proxy.handleTree(response.data, "catId", "parentId");
    catOptions.value.push(data);
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
    catId: null,
    catName: null,
    catIcon: null,
    visible: 0,
    parentId: null,
    remark: null,
    catUrl: null,
    parent: null,
    ancestors: null,
    perms: null,
    keywords: null,
    description: null,
    orderNum: 0,
    catCount: null,
    catType: null,
  };
  proxy.resetForm("catRef");
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
  if (row != null && row.catId) {
    form.value.parentId = row.catId;
  } else {
    form.value.parentId = 0;
  }
  open.value = true;
  title.value = "添加分类";
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
  getCat(row.catId).then((response) => {
    form.value = response.data;
    open.value = true;
    title.value = "修改分类";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["catRef"].validate((valid) => {
    if (valid) {
      if (form.value.catId != null) {
        updateCat(form.value).then((response) => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addCat(form.value).then((response) => {
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
  proxy.$modal
    .confirm('是否确认删除分类编号为"' + row.catId + '"的数据项？')
    .then(function () {
      return delCat(row.catId);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
    .catch(() => {});
}

getList();
</script>
