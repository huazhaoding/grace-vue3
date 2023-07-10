<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="站点名" prop="webName">
        <el-input
          v-model="queryParams.webName"
          placeholder="请输入站点名"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="站点地址" prop="webUrl">
        <el-input
          v-model="queryParams.webUrl"
          placeholder="请输入站点地址"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建人" prop="createBy">
        <el-input
          v-model="queryParams.createBy"
          placeholder="请输入创建人"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
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
          v-hasPermi="['cms:web:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['cms:web:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['cms:web:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['cms:web:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="webList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="站点名" align="center" prop="webName" />
      <el-table-column label="站点地址" align="center" prop="webUrl" />
      <el-table-column label="管理IP" align="center" prop="manageIp" />
      <el-table-column label="添加时间" align="center" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center" prop="createBy" />
      <el-table-column label="描述" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button-group>
          <el-button
            link
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['cms:web:edit']"
          >修改</el-button>
          <el-button
            link
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['cms:web:remove']"
          >删除</el-button>
          <el-button
            link
            type="primary"
            icon="Grid"
            @click="handleThemeList(scope.row)"
            v-hasPermi="['cms:theme:list']"
          >站点</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改站点对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="webRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="站点名" prop="webName">
          <el-input v-model="form.webName" placeholder="请输入站点名" />
        </el-form-item>
        <el-form-item label="站点地址" prop="webUrl">
          <el-input v-model="form.webUrl" placeholder="请输入站点地址" />
        </el-form-item>
        <el-form-item label="管理IP" prop="manageIp">
          <el-input v-model="form.manageIp" placeholder="请输管理Ip" />
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input type="textarea" v-model="form.remark" placeholder="请输入描述" />
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

<script setup name="Web">
import { listWeb, getWeb, delWeb, addWeb, updateWeb } from "@/api/cms/web";
const router = useRouter();
const { proxy } = getCurrentInstance();

const webList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const webNames = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    webName: null,
    webIp: null,
    createBy: null,
  },
  rules: {
    webName: [
      { required: true, message: "站点名不能为空", trigger: "blur" }
    ],
    manageIp: [
      { required: true, message: "管理Ip不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询站点列表 */
function getList() {
  loading.value = true;
  listWeb(queryParams.value).then(response => {
    webList.value = response.rows;
    total.value = response.total;
    loading.value = false;
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
    webName: null,
    webIp: null,
    createTime: null,
    updateTime: null,
    updateBy: null,
    createBy: null,
    remark: null
  };
  proxy.resetForm("webRef");
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
  webNames.value = selection.map(item => item.webName);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加站点";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _webName = row.webName || webNames.value
  getWeb(_webName).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改站点";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["webRef"].validate(valid => {
    if (valid) {
      if (form.value.webName != null) {
        updateWeb(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addWeb(form.value).then(response => {
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
  const _webNames = row.webName || webNames.value;
  proxy.$modal.confirm('是否确认删除站点编号为"' + _webNames + '"的数据项？').then(function() {
    return delWeb(_webNames);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

function handleThemeList(row){
  const _webName = row.webName || webNames.value;
  router.push({path: "/cms/theme/"+ _webName});

}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('cms/web/export', {
    ...queryParams.value
  }, `web_${new Date().getTime()}.xlsx`)
}

getList();
</script>
