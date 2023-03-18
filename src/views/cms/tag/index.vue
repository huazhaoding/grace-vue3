<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="标签名" prop="tagName">
        <el-input
          v-model="queryParams.tagName"
          placeholder="请输入标签名"
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
      <el-form-item label="标签状态" prop="visible">
        <el-select
          v-model="queryParams.visible"
          placeholder="请选择状态"
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
      <el-form-item label="标签状态" prop="tagType">
        <el-select
          v-model="queryParams.tagType"
          placeholder="请选择类型"
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
          v-hasPermi="['cms:tag:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['cms:tag:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['cms:tag:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Aim"
          :disabled="multiple"
          @click="batchDialog"
          v-hasPermi="['cms:tag:edit']"
          >批量操作</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['cms:tag:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
        :columns="columns"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="tagList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="标签ID" align="center" prop="tagId" />
      <el-table-column label="标签名" align="center" prop="tagName" />
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
      <el-table-column label="标签状态" align="center" prop="visible">
        <template #default="scope">
          <dict-tag :options="sys_show_hide" :value="scope.row.visible" />
        </template>
      </el-table-column>
      <el-table-column label="标签类型:" align="center" prop="tagType">
        <template #default="scope">
          <dict-tag :options="cms_support_type" :value="scope.row.tagType" />
        </template>
      </el-table-column>
      <el-table-column
        label="标签图标"
        align="center"
        prop="tagIco"
        width="100"
      >
        <template #default="scope">
          <image-preview
            :src="scope.row.tagIco"
            :preview-teleported="true"
            :width="50"
            :height="50"
          />
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" prop="orderNum" />
      <el-table-column
        label="权限字符串"
        align="center"
        prop="perms"
        v-if="columns[2].visible"
      />
      <el-table-column
        label="关键词"
        align="center"
        prop="keywords"
        v-if="columns[3].visible"
      />
      <el-table-column
        label="描述"
        align="center"
        prop="description"
        v-if="columns[4].visible"
      />
      <el-table-column
        label="备注"
        align="center"
        prop="remark"
        v-if="columns[5].visible"
      />
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        width="180"
        v-if="columns[6].visible"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.updateTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新人"
        align="center"
        prop="updateBy"
        v-if="columns[7].visible"
      />
      <el-table-column
        label="标签路径"
        align="center"
        prop="tagUrl"
        v-if="columns[8].visible"
      />
      <el-table-column label="关联文章数" align="center" prop="tagCount" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
            link
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['cms:tag:edit']"
            >修改</el-button
          >
          <el-button
            link
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['cms:tag:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改内容标签对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="tagRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标签名" prop="tagName">
          <el-input v-model="form.tagName" placeholder="请输入标签名" />
        </el-form-item>
        <el-form-item label="标签路径" prop="tagUrl">
          <el-input v-model="form.tagUrl" placeholder="请输入标签路径" />
        </el-form-item>
        <el-form-item label="标签图标">
          <image-upload v-model="form.tagIco" :limit="1" />
        </el-form-item>
        <el-form-item label="权限字符" prop="perms">
          <el-input v-model="form.perms" placeholder="请输入权限字符串" />
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number
            v-model="form.orderNum"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="标签类型" prop="tagType">
          <el-select v-model="form.tagType" placeholder="标签类型">
            <el-option
              v-for="dict in cms_support_type"
              :key="dict.value"
              :label="dict.label"
              :value="Number(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签状态" prop="visible">
          <el-radio-group v-model="form.visible">
            <el-radio
              v-for="dict in sys_show_hide"
              :key="dict.value"
              :label="Number(dict.value)"
              >{{ dict.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入描述" />
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
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 批量操作 -->
    <el-dialog
      title="批量操作"
      v-model="batchOpen"
      width="500px"
      append-to-body
    >
      <el-form :model="batchForm" label-width="80px">
        <el-form-item label="状态" prop="visible">
          <el-select v-model="batchForm.visible" clearable placeholder="请选择状态">
            <el-option
              v-for="item in visibleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button type="primary" @click="batchVisible">更新状态</el-button>
        </el-form-item>

        <el-form-item label="排序" prop="orderNum">
          <el-input-number
            v-model="batchForm.orderNum"
            :min="1"
          />
          <el-button type="primary" @click="batchOrderNum">更新排序</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="batchCancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Tag">
import { listTag, getTag, delTag, addTag, updateTag,batchOrderNumTag,batchVisibleTag } from "@/api/cms/tag";
import KeysTag from "@/components/KeysTag";
const { proxy } = getCurrentInstance();
const { sys_show_hide, cms_support_type } = proxy.useDict(
  "sys_show_hide",
  "cms_support_type"
);
const batchOpen=ref(false);
const batchForm=ref({visible:"SHOW",orderNum:1});
// 列显隐信息
const columns = ref([
  { key: 0, label: `创建时间`, visible: false },
  { key: 1, label: `创建人`, visible: true },
  { key: 2, label: `权限字符`, visible: false },
  { key: 3, label: `关键词`, visible: false },
  { key: 4, label: `描述`, visible: false },
  { key: 5, label: `备注`, visible: false },
  { key: 6, label: `修改时间`, visible: false },
  { key: 7, label: `修改人`, visible: false },
  { key: 8, label: `标签路径`, visible: false },
]);

const tagList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const dateRange = ref([]);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    tagName: null,
    createBy: null,
    visible: null,
    orderNum: null,
    tagType: null,
  },
  rules: {
    tagName: [{ required: true, message: "标签名不能为空", trigger: "blur" }],
  },
});

const { queryParams, form, rules } = toRefs(data);

const visibleOptions = [
  {
    value: 'SHOW',
    label: '通过',
  },
  {
    value: 'HIDE',
    label: '隐藏',
  },
  {
    value: 'DELETE',
    label: '删除',
  }
];

/** 查询内容标签列表 */
function getList() {
  loading.value = true;
  listTag(proxy.addDateRange(queryParams.value, dateRange.value)).then(
    (response) => {
      tagList.value = response.rows;
      total.value = response.total;
      loading.value = false;
    }
  );
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    tagId: null,
    tagName: null,
    tagUrl: null,
    visible: null,
    perms: null,
    tagIco: null,
    keywords: null,
    description: null,
    remark: null,
    orderNum: 0,
    tagType: null,
  };
  proxy.resetForm("tagRef");
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

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.tagId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加内容标签";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _tagId = row.tagId || ids.value;
  getTag(_tagId).then((response) => {
    form.value = response.data;
    open.value = true;
    title.value = "修改内容标签";
  });
}

function batchDialog(){
  batchOpen.value=true;
}

function batchCancel(){
  batchOpen.value=false;
  getList();
}

function batchVisible(row){
  const _tagIds = row.tagId || ids.value;
  proxy.$modal
    .confirm('是否批量修改状态，标签编号为"' + _tagIds + '"的数据项？')
    .then(function () {
      return batchVisibleTag(_tagIds,batchForm.value.visible);
    })
    .then(() => {
      proxy.$modal.msgSuccess("批量更新成功");
      batchCancel()
    })
    .catch(() => {});

}

function batchOrderNum(row){
  const _tagIds = row.tagId || ids.value;
  proxy.$modal
    .confirm('是否批量修改排序，标签编号为"' + _tagIds + '"的数据项？')
    .then(function () {
      return batchOrderNumTag(_tagIds,batchForm.value.orderNum);
    })
    .then(() => {
      proxy.$modal.msgSuccess("批量更新成功");
      batchCancel()
    })
    .catch(() => {});
  
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["tagRef"].validate((valid) => {
    if (valid) {
      if (form.value.tagId != null) {
        updateTag(form.value).then((response) => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addTag(form.value).then((response) => {
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
  const _tagIds = row.tagId || ids.value;
  proxy.$modal
    .confirm('是否确认删除内容标签编号为"' + _tagIds + '"的数据项？')
    .then(function () {
      return delTag(_tagIds);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
    .catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    "cms/tag/export",
    {
      ...queryParams.value,
    },
    `tag_${new Date().getTime()}.xlsx`
  );
}

getList();
</script>
