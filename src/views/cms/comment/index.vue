<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="类型ID" prop="typeId">
        <el-input v-model="queryParams.typeId" placeholder="请输入类型ID" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="主楼ID" prop="parentId">
        <el-input v-model="queryParams.parentId" placeholder="请输入主楼ID" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="发布人" prop="fromBy">
        <el-input placeholder="请输入发布人" clearable @keyup.enter="handleQuery" />
      </el-form-item>

      <el-form-item label="状态" prop="visible">
        <el-select v-model="queryParams.visible" placeholder="请选择状态" clearable>
          <el-option v-for="dict in cms_comment_visible" :key="dict.value" :label="dict.label" :value="dict.dictSort" />
        </el-select>
      </el-form-item>

      <el-form-item label="类型" prop="commentType">
        <el-select v-model="queryParams.commentType" placeholder="请选择类型" clearable>
          <el-option v-for="dict in cms_comment_type" :key="dict.value" :label="dict.label" :value="dict.dictSort" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="success" plain icon="Tickets" :disabled="multiple" @click="handleVisibleDialog"
          v-hasPermi="['cms:comment:deal']">处理</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['cms:comment:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="Download" @click="handleExport"
          v-hasPermi="['cms:comment:export']">导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="commentList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="评论ID" v-if="columns[0].visible" align="center" prop="commentId" />
      <el-table-column label="类型ID" align="center" prop="typeId" />
      <el-table-column label="主楼ID" v-if="columns[1].visible" align="center" prop="parentId" />
      <el-table-column label="发布人" align="center" prop="fromBy" />
      <el-table-column label="回复的人" v-if="columns[2].visible" align="center" prop="replyBy" />
      <el-table-column label="内容" align="center" prop="content" />
      <el-table-column label="评论类型" align="center" prop="commentType">
        <template #default="scope">
          <dict-tag :options="cms_comment_type" :dictSort="true" :value="scope.row.commentType" />
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="visible">
        <template #default="scope">
          <dict-tag :options="cms_comment_visible" :dictSort="true" :value="scope.row.visible" />
        </template>
      </el-table-column>
      <el-table-column label="IP" v-if="columns[3].visible" align="center" prop="ip" />
      <el-table-column label="使用系统" v-if="columns[4].visible" align="center" prop="userSystem" />
      <el-table-column label="浏览器" v-if="columns[5].visible" align="center" prop="userBower" />
      <el-table-column label="备注" v-if="columns[6].visible" align="center" prop="remark" />
      <el-table-column label="排序" v-if="columns[7].visible" align="center" prop="orderNum" />
      <el-table-column label="讨厌统计" v-if="columns[8].visible" align="center" prop="nastyCount" />
      <el-table-column label="喜欢统计" v-if="columns[9].visible" align="center" prop="likeCount" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button v-if="userStore.name != scope.row.fromBy" link type="primary" icon="Edit"
            @click="handleReplyDialog(scope.row)" v-hasPermi="['cms:comment:reply']">回复</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
            v-hasPermi="['cms:comment:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改评论对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="commentRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="内容" v-if="!isCheck">
          <Editor v-model="form.content"></Editor>
        </el-form-item>
        <el-form-item label="状态" prop="visible">
          <el-radio-group v-model="form.visible">
            <el-radio v-for="dict in cms_comment_visible" :key="dict.dictSort" :label="dict.dictSort">{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleUpdate">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Comment">
import {
  listComment,
  getComment,
  delComment,
  addComment,
  batchComment,
} from "@/api/cms/comment";
import useUserStore from "@/store/modules/user";
const userStore = useUserStore();
const { proxy } = getCurrentInstance();
const { cms_comment_type, cms_comment_visible } = proxy.useDict(
  "cms_comment_type",
  "cms_comment_visible"
);
const commentList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const isCheck = ref(false);
// 列显隐信息
const columns = ref([
  { key: 0, label: `评论ID`, visible: false },
  { key: 1, label: `主楼ID`, visible: false },
  { key: 2, label: `回复的人`, visible: false },
  { key: 3, label: `IP`, visible: false },
  { key: 4, label: `使用系统`, visible: false },
  { key: 5, label: `浏览器`, visible: false },
  { key: 6, label: `备注`, visible: false },
  { key: 7, label: `浏览器`, visible: false },
  { key: 8, label: `喜欢统计`, visible: false },
  { key: 9, label: `讨厌统计`, visible: false },
]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    typeId: null,
    parentId: null,
    fromBy: null,
    replyBy: null,
    content: null,
    commentType: null,
    visible: null,
    ip: null,
    userSystem: null,
    userBower: null,
    orderNum: null,
    nastyCount: null,
    likeCount: null,
  },
  rules: {
    typeId: [{ required: true, message: "类型ID不能为空", trigger: "blur" }],
    parentId: [{ required: true, message: "主楼ID不能为空", trigger: "blur" }],
    fromBy: [{ required: true, message: "发布人不能为空", trigger: "blur" }],
    content: [{ required: true, message: "内容不能为空", trigger: "blur" }],
    commentType: [
      { required: true, message: "评论类型不能为空", trigger: "change" },
    ],
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询评论列表 */
function getList() {
  loading.value = true;
  listComment(queryParams.value).then((response) => {
    commentList.value = response.rows;
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
    commentId: null,
    typeId: null,
    fromBy: null,
    replyBy: null,
    content: null,
    visible: undefined,
    remark: null,
    orderNum: undefined,
  };
  proxy.resetForm("commentRef");
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
  ids.value = selection.map((item) => item.commentId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}


function handleVisibleDialog() {
  isCheck.value = true;
  open.value = true;
  title.value = "评论处理";
  reset();
}

function handleReplyDialog(row) {
  getComment(row.commentId).then(response => {
    form.value = {
    commentId: response.data.commentId,
    typeId: response.data.typeId,
    fromBy: userStore.name,
    replyBy: response.data.fromBy,
    content: "",
    visible: null,
    remark: null,
    orderNum: null,
  };

    isCheck.value = false;
    open.value = true;
    title.value = "评论回复";
  });

}

function handleUpdate() {
  const _commentIds = ids.value;
  //备注 状态 参数列表
  if (isCheck) {
    proxy.$modal
      .confirm('是否确认修改为"' + _commentIds + '"的数据的状态?')
      .then(function () {
        return batchComment(_commentIds, {
           visible:form.value.visible,
           orderNum:form.value.orderNum,
           remark:form.value.remark
        }
        );
      })
      .then(() => {
        getList();
        open.value = false;
        proxy.$modal.msgSuccess("修改成功");
      })
      .catch(() => { });
  } else {
    proxy.$modal
      .confirm('是否确认回复:"' + form.value.replyBy)
      .then(function () {
        return addComment(form.value);
      })
      .then(() => {
        getList();
        proxy.$modal.msgSuccess("添加成功!");
      })
      .catch(() => { });
  }
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _commentIds = row.commentId || ids.value;
  proxy.$modal
    .confirm('是否确认删除评论编号为"' + _commentIds + '"的数据项？')
    .then(function () {
      return delComment(_commentIds);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
    .catch(() => { });
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    "comment/comment/export",
    {
      ...queryParams.value,
    },
    `comment_${new Date().getTime()}.xlsx`
  );
}

getList();
</script>
