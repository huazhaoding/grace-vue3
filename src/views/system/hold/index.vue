<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="资源类型" prop="holdType">
        <el-select v-model="queryParams.holdType" placeholder="请选择资源类型" clearable  style="width: 160px">
          <el-option
            v-for="dict in sys_hold_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="数据类型" prop="dataType">
        <el-select v-model="queryParams.dataType" placeholder="请选择数据类型" clearable  style="width: 160px">
          <el-option
            v-for="dict in sys_data_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="资源名称" prop="holdName">
        <el-input
          v-model="queryParams.holdName"
          placeholder="请输入资源名称"
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
          v-hasPermi="['system:hold:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:hold:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:hold:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['system:hold:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="holdList" table-layout='auto' @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="资源类型" align="center" prop="holdType">
        <template #default="scope">
          <dict-tag :options="sys_hold_type" :value="scope.row.holdType"/>
        </template>
      </el-table-column>
      <el-table-column label="数据类型" align="center" prop="dataType">
        <template #default="scope">
          <dict-tag :options="sys_data_type" :value="scope.row.dataType"/>
        </template>
      </el-table-column>
      <el-table-column label="资源名称" align="center" prop="holdName" />
      <el-table-column label="资源备注" align="center" prop="remark" />
      <el-table-column label="资源CODE" align="center" prop="holdCode" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            link
          type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:hold:edit']"
          >修改</el-button>
          <el-button
            link
          type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:hold:remove']"
          >删除</el-button>
          <el-button
            link
          type="primary"
            icon="View"
            @click="handlePrview(scope.row)"
          >查看</el-button>
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

    <!-- 添加或修改资源数据映射对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="holdRef" :model="form" :rules="rules" :disabled="title=='查看资源数据映射'" label-width="80px">
        <el-form-item label="资源类型" prop="holdType">
          <el-select v-model="form.holdType" :disabled="title=='修改资源数据映射'" placeholder="请选择资源类型">
            <el-option
              v-for="dict in sys_hold_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源编码" prop="holdCode">
          <el-input v-model="form.holdCode" :disabled="title=='修改资源数据映射'" placeholder="请输入资源编码" />
        </el-form-item>
        <el-form-item label="数据类型" prop="dataType">
          <el-select v-model="form.dataType" placeholder="请选择数据类型">
            <el-option
              v-for="dict in sys_data_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
   
        <el-form-item label="资源名称" prop="holdName">
          <el-input v-model="form.holdName" placeholder="请输入资源名称" />
        </el-form-item>
        <el-form-item label="资源数据" prop="holdData">
          <JsonTag labelName="数据名字" valueName="数据内容" v-model="form.holdData"></JsonTag>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm" v-if="title!='查看资源数据映射'">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Hold">
import { listHold, getHold, delHold, addHold, updateHold } from "@/api/system/hold";
import JsonTag from "@/components/JsonTag";
const { proxy } = getCurrentInstance();
const { sys_data_type, sys_hold_type } = proxy.useDict('sys_data_type', 'sys_hold_type');
const holdList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const selectData = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    holdType: null,
    dataType: null,
    holdName: null,
    holdData: null,
  },
  rules: {
    holdType: [
      { required: true, message: "资源类型不能为空", trigger: "blur" },
    ],
    dataType: [
      { required: true, message: "数据类型不能为空", trigger: "blur" },
    ],
    holdCode: [
      { required: true, message: "资源ID不能为空", trigger: "blur" },
    ],
    holdName: [
      { required: true, message: "配置名称不能为空", trigger: "blur" },
    ],
    holdData: [
      { required: true, message: "配置参数不能为空"},
    ],
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询资源数据映射列表 */
function getList() {
  loading.value = true;
  listHold(queryParams.value).then(response => {
    holdList.value = response.rows;
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
    holdType: null,
    dataType: null,
    holdName: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    holdData: null,
    remark: null,
    holdCode: null
  };
  proxy.resetForm("holdRef");
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
  selectData.value = selection.map(item => item);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加资源数据";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  let _row;
  if (typeof row.holdType !== 'undefined') {
    _row = row 
    } else {
    _row =selectData.value[0]
    }
  getHold(_row.holdType,_row.holdCode).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改资源数据映射";
  });
}

function handlePrview(row){
  reset();
  form.value = JSON.parse(JSON.stringify(row));;
  open.value = true;
  title.value = "查看资源数据映射";
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["holdRef"].validate(valid => {
    if (valid) {
      if (title.value === "修改资源数据映射") {
        updateHold(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addHold(form.value).then(response => {
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
  const _row = row || selectData.value;
  proxy.$modal.confirm('是否确认删除{holdType:' + _row.holdType+",holdType:"+_row.holdCode + '}的数据项？').then(function() {
    return delHold(_row.holdType,_row.holdCode);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('system/hold/export', {
    ...queryParams.value
  }, `data_${new Date().getTime()}.xlsx`)
}

getList();
</script>
