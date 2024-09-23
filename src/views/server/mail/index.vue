<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="接收邮箱" prop="toMail">
        <el-input v-model="queryParams.toMail" placeholder="请输入接收者邮箱" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="主题" prop="subject">
        <el-input v-model="queryParams.subject" placeholder="请输入主题" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="发送时间" prop="sendTime">
        <el-date-picker clearable v-model="queryParams.sendTime" type="date" value-format="YYYY-MM-DD"
          placeholder="请选择发送时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="邮件用途" prop="mailUsed">
        <el-input v-model="queryParams.mailUsed" placeholder="请输入邮件用途" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="邮件状态" prop="visible">
        <el-input v-model="queryParams.visible" placeholder="请输入邮件状态" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Edit" @click="configUpdate" v-hasPermi="['server:mail:config']">邮件配置
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['server:mail:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate"
          v-hasPermi="['server:mail:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['server:mail:remove']">删除</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" :columns="columns" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="mailList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="mailId" />
      <el-table-column label="接收者" align="center" prop="toMail" />
      <el-table-column label="主题" align="center" prop="subject" />
      <el-table-column label="邮件类型" align="center" prop="mailType">
        <template #default="scope">
          <dict-tag :options="sys_server_mail_type" :value="scope.row.mailType" />
        </template>
      </el-table-column>
      <el-table-column label="发送时间" align="center" prop="sendTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.sendTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="抄送用户" align="center" prop="copyTo" v-if="columns[0].visible" />
      <el-table-column label="描述" align="center" prop="remark" v-if="columns[2].visible" />
      <el-table-column label="邮件用途" align="center" prop="mailUsed">
        <template #default="scope">
          <dict-tag :options="sys_server_mail_used" :value="scope.row.mailUsed" />
        </template>
      </el-table-column>
      <el-table-column label="密送用户" align="center" prop="bccTo" v-if="columns[1].visible" />
      <el-table-column label="邮件状态" align="center" prop="visible">
        <template #default="scope">
          <dict-tag :options="sys_server_mail_visible" :value="scope.row.visible" />
        </template>
      </el-table-column>
      <el-table-column label="附件地址" align="center" prop="attachKeys" v-if="columns[3].visible" />
      <el-table-column label="操作" align="center" >
        <template #default="scope">
          <!-- 邮件未发送,并且非系统邮件可修改 -->
          <el-button link type="primary" v-if="(scope.row.visible==0||scope.row.visible==2)&&scope.row.mailUsed==0" icon="Edit" @click="handleUpdate(scope.row)">修改
          </el-button>
          <el-button link type="primary" icon="View" @click="handleView(scope.row)" v-hasPermi="['server:mail:view']">查看
          </el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
            v-hasPermi="['server:mail:remove']">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改邮件对话框 -->
    <el-dialog :title="title" v-model="open" width="40%" append-to-body>
      <el-form ref="mailRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="收者邮箱" prop="toMail">
          <el-input v-model="form.toMail" placeholder="请输入接收者邮箱" />
        </el-form-item>
        <el-form-item label="主题" prop="subject">
          <el-input v-model="form.subject" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="内容" :width="'80%'" prop="content">
          <vue3-tinymce v-model="form.content" />
        </el-form-item>
        <el-form-item label="发送时间" prop="sendTime">
          <el-date-picker clearable v-model="form.sendTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"
            @change="changeTime" placeholder="请选择发送时间" />
        </el-form-item>
        <el-form-item label="抄送用户" prop="copyTo">
          <el-input v-model="form.copyTo" placeholder="请输入抄送用户" />
        </el-form-item>
        <el-form-item label="密送用户" prop="bccTo">
          <el-input v-model="form.bccTo" placeholder="请输入密送用户" />
        </el-form-item>
        <el-form-item label="添加附件" prop="attachKeys">
          <upload-attach  v-model="form.attachKeys" />
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="mailSave">保存</el-button>
          <el-button type="primary" @click="mailSend">{{ mailType }}</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 邮件配置 -->
    <el-dialog :title="configTitle" v-model="configOpen" width="600px" append-to-body draggable>
      <el-form ref="mailConfigRef" :model="configForm" label-width="80px">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="邮箱配置" name="mailConfig">
            <el-form-item label="邮件开关" prop="oly.mail.enabled">
              <el-radio-group v-model="configForm['oly.mail.enabled']">
                <el-radio v-for="dict in sys_true_false" :key="dict.value" :label="dict.value == 'true'">{{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="用户名" prop="oly.mail.from.name">
              <el-input v-model="configForm['oly.mail.from.name']" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="邮箱账号" prop="oly.mail.username">
              <el-input v-model="configForm['oly.mail.username']" placeholder="请输入邮箱账号" />
            </el-form-item>
            <el-form-item prop="oly.mail.password">
              <template #label>
                <span>
                  <el-tooltip content="部分邮箱可能为密码" placement="top">
                    <el-icon>
                      <question-filled />
                    </el-icon>
                  </el-tooltip>
                  授权码
                </span>
              </template>
              <el-input v-model="configForm['oly.mail.password']" placeholder="请输入授权码" />
            </el-form-item>
            <el-form-item label="服务地址" prop="oly.mail.host">
              <el-input v-model="configForm['oly.mail.host']" placeholder="请输入服务地址" />
            </el-form-item>
            <el-form-item label="邮箱协议" prop="oly.mail.protocol">
              <el-input v-model="configForm['oly.mail.protocol']" placeholder="请输入邮箱协议" />
            </el-form-item>
            <el-form-item label="端口" prop="oly.mail.ssl.port">
              <el-input-number v-model.number="configForm['oly.mail.ssl.port']" controls-position="right" :min="0" />
            </el-form-item>
            <el-space fill>
              <el-alert type="info" show-icon :closable="false">
                <p>请确定邮箱支持starttls协议,若不支持将导致无法发送邮件</p>
              </el-alert>
              <el-form-item label="starttls" prop="oly.mail.starttls">
                <el-radio-group v-model="configForm['oly.mail.starttls']">
                  <el-radio v-for="dict in sys_true_false" :key="dict.value" :label="dict.value == 'true'">{{ dict.label }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-space>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitConfigForm">确 定</el-button>
          <el-button @click="configCancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Mail">
import {
  listMail,
  getMail,
  delMail,
  addMail,
  updateMail,
  sendMail,
  updateConfig,
} from "@/api/server/mail";
import Vue3Tinymce from "@/components/Editor/TinymceEdit";
import uploadAttach from "@/views/server/mail/components/uploadAttach";
const { proxy } = getCurrentInstance();
const router = useRouter();
const {
  sys_true_false,
  sys_server_mail_type,
  sys_server_mail_used,
  sys_server_mail_visible,
} = proxy.useDict(
  "sys_true_false",
  "sys_server_mail_type",
  "sys_server_mail_used",
  "sys_server_mail_visible"
);

const mailList = ref([]);
const open = ref(false);
const title = ref("");
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const mailType = ref("立即发送");
const activeTab = ref("mailConfig");
const configOpen = ref(false);
const configTitle = ref("");

// 列显隐信息
const columns = ref([
  { key: 0, label: `抄送用户`, visible: false },
  { key: 1, label: `密送用户`, visible: false },
  { key: 2, label: `描述`, visible: false },
  { key: 3, label: `附件地址`, visible: false },
]);

const data = reactive({
  form: {},
  configForm: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    toMail: null,
    subject: null,
    mailType: null,
    sendTime: null,
    mailUsed: null,
    visible: null,
  },
  rules: {},
});

const { queryParams, form, configForm, rules } = toRefs(data);

/** 修改配置 */
function configUpdate() {
  proxy.getConfigValueMap("mailConfig").then((response) => {
    configForm.value = response.data;
    configOpen.value = true;
    configTitle.value = "邮件配置";
  });
}

/** 提交按钮 */
function submitConfigForm() {
  updateConfig(configForm.value).then((response) => {
    proxy.$modal.msgSuccess("修改成功");
    configOpen.value = false;
  });
}

// 取消按钮
function configCancel() {
  configOpen.value = false;
}

/** 查询邮件列表 */
function getList() {
  loading.value = true;
  listMail(queryParams.value).then((response) => {
    mailList.value = response.rows;
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
    mailId: null,
    fromMail: null,
    createBy: null,
    createTime: null,
    toMail: null,
    subject: null,
    content: null,
    mailType: null,
    sendTime: null,
    copyTo: null,
    remark: null,
    mailUsed: null,
    bccTo: null,
    visible: null,
    attachKeys: [],
  };
  proxy.resetForm("mailRef");
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
  ids.value = selection.map((item) => item.mailId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  router.push({ path: "/server/mail/handle/add" });
}

/** 修改按钮操作 */
function handleUpdate(row) {
  const _mailId = row.mailId || ids.value;
  router.push({ path: "/server/mail/handle/update/"+_mailId });
}

// 选择时间
function changeTime(value) {
  if (value) {
    mailType.value = "定时发送：" + value;
  } else {
    mailType.value = "立即发送";
  }
}

/** 提交按钮 */
function mailSave() {
  console.log(form.value.attachKeys);
  proxy.$refs["mailRef"].validate((valid) => {
    if (valid) {
      if (form.value.mailId != null) {
        updateMail(form.value).then((response) => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addMail(form.value).then((response) => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

function mailSend() {
  proxy.$refs["mailRef"].validate((valid) => {
    if (valid) {
      proxy.$modal
        .confirm(mailType.value + "?")
        .then(function () {
          sendMail(form.value).then((response) => {
            proxy.$modal.msgSuccess("邮件已加入发送队列");
            open.value = false;
          });
        })
        .then(() => {
          getList();
        })
        .catch(() => { });
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _mailIds = row.mailId || ids.value;
  proxy.$modal
    .confirm('是否确认删除邮件编号为"' + _mailIds + '"的数据项？')
    .then(function () {
      return delMail(_mailIds);
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
    "system/mail/export",
    {
      ...queryParams.value,
    },
    `mail_${new Date().getTime()}.xlsx`
  );
}

getList();
</script>
