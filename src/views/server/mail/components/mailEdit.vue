<template>
    <!-- 仅用户发送的邮件可修改 系统发送邮件不可修改 
           邮件类型：系统邮件，用户邮件
           系统邮件：系统发送邮件，定时发送邮件
           用户邮件：用户发送邮件，定时发送邮件
           系统邮件不可修改，用户邮件可修改
           系统邮件可定时发送，用户邮件可定时发送
           系统邮件可立即发送，用户邮件可立即发送
           系统邮件可发送，用户邮件可发送
           系统邮件可删除，用户邮件可删除
    邮件状态：保存，发送成功，发送失败，发送中,定时发送成功，定时发送失败
    发送后不可修改
    邮件操作：添加，修改，查看
    添加 保存，发送 定时发送
    修改 保存，发送 定时发送
    查看 -->
    <div class="app-container">
        <el-form ref="mailRef" :model="form" :rules="rules" label-width="80px" :disabled="false">
            <el-form-item label="邮件类型" prop="mailType">
                <el-input v-model="form.toMail" placeholder="邮件类型" />
            </el-form-item>
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
                <upload-attach v-model="form.attachKeys" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="form.remark" placeholder="请输入备注" />
            </el-form-item>
            
            <el-form-item >
                <el-button type="primary" @click="mailSave">保存</el-button>
                <el-button type="primary" @click="mailSend">{{ mailType }}</el-button>
            </el-form-item>
        </el-form>
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
const mailStatus = ref("立即发送");
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
    reset();
    open.value = true;
    title.value = "添加邮件";
}

/** 修改按钮操作 */
function handleUpdate(row) {
    reset();
    const _mailId = row.mailId || ids.value;
    getMail(_mailId).then((response) => {
        form.value = response.data;
        open.value = true;
        title.value = "修改邮件";
    });
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