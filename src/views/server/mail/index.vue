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
      <el-table-column label="定时发送" align="center" prop="byTime">
        <template #default="scope">
          <dict-tag :options="sys_yes_no" :dictSort="true" :value="scope.row.byTime" />
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
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <!-- 邮件未发送,并且非系统邮件可修改 -->
          <el-tooltip content="修改" placement="top" >
            <el-button link type="primary" v-show="(scope.row.visible == 0 || scope.row.visible == 2|| scope.row.visible == 3) && scope.row.mailUsed == 0"
              icon="Edit" @click="handleUpdate(scope.row)">
            </el-button>
          </el-tooltip>
          <el-tooltip content="查看" placement="top">
            <el-button link type="primary" icon="View" @click="handleView(scope.row)"
              v-hasPermi="['server:mail:view']">
            </el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <!-- 如果是定时邮件,且未发送,需先取消 -->
            <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
              v-hasPermi="['server:mail:remove']">
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize" @pagination="getList" />
    <!-- 邮件配置 -->
    <el-dialog :title="configTitle" v-model="configOpen" width="650px" append-to-body draggable>
      <el-form ref="mailConfigRef" :model="configForm" label-width="90px">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="邮箱配置" name="mailConfig">
            <el-form-item label="邮件开关" prop="oly.mail.enabled">
              <el-radio-group v-model="configForm['oly.mail.enabled']">
                <el-radio v-for="dict in sys_true_false" :key="dict.value" :label="dict.value == 'true'">{{ dict.label
                  }}
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
            <el-form-item  prop="oly.mail.attach.size">
              <el-input-number v-model.number="configForm['oly.mail.attach.size']" controls-position="right" :min="0" />
              <template #label>
                        <span>
                           <el-tooltip content="单位M" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                           附件大小
                        </span>
                     </template>
            </el-form-item>
            <el-form-item label="附件总数" prop="oly.mail.attach.number">
              <el-input-number v-model.number="configForm['oly.mail.attach.number']" controls-position="right" :min="0" />
            </el-form-item>
            <el-space fill>
              <el-alert type="info" show-icon :closable="false">
                <p>请确定邮箱支持starttls协议,若不支持将导致无法发送邮件</p>
              </el-alert>
              <el-form-item label="starttls" prop="oly.mail.starttls">
                <el-radio-group v-model="configForm['oly.mail.starttls']">
                  <el-radio v-for="dict in sys_true_false" :key="dict.value" :label="dict.value == 'true'">{{ dict.label
                    }}
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
  stopOnTimeMail,
  delMail,
  updateConfig,
} from "@/api/server/mail";
const route = useRoute();
const uniqueId = ref("");
const { proxy } = getCurrentInstance();
const router = useRouter();
const {
  sys_true_false,
  sys_yes_no,
  sys_server_mail_type,
  sys_server_mail_used,
  sys_server_mail_visible,
} = proxy.useDict(
  "sys_true_false",
  "sys_yes_no",
  "sys_server_mail_type",
  "sys_server_mail_used",
  "sys_server_mail_visible"
);

const mailList = ref([]);
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

const { queryParams, configForm} = toRefs(data);

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

onActivated(() => {
  const time = route.query.t;
  if (time != null && time != uniqueId.value) {
    uniqueId.value = time;
    queryParams.value.pageNum = Number(route.query.pageNum);
    proxy.resetForm("queryRef");
    getList();
  }
})

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
// 查看邮件
function handleView(row) {
  const _mailId = row.mailId || ids.value;
    router.push({ path: "/server/mail/handle/view/" + _mailId });
}

/** 修改按钮操作 */
function handleUpdate(row) {
  const _mailId = row.mailId || ids.value;
  if (row.byTime === 0)
    proxy.$modal
      .confirm('定时邮件需要先取消定时方可修改,需要取消吗?')
      .then(function () {
        stopOnTimeMail( _mailId ).then((response) => { });
      })
      .then(() => {
        handleQuery();
        proxy.$tab.openPage("修改[" + _mailId + "]内容", "/server/mail/handle/update/" + _mailId, { pageNum: queryParams.value.pageNum })
      })
      .catch(() => { });
  else {
      proxy.$tab.openPage("修改[" + _mailId + "]内容", "/server/mail/handle/update/" + _mailId, { pageNum: queryParams.value.pageNum })
  }
}

// 选择时间
function changeTime(value) {
  if (value) {
    mailType.value = "定时发送：" + value;
  } else {
    mailType.value = "立即发送";
  }
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
