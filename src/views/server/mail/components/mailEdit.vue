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
        <el-form ref="mailRef" :model="form" :rules="rules" :disabled="formDisabled">
            <el-form-item label="邮件类型" prop="mailType">
                <el-radio-group v-model="form.mailType">
                    <el-radio v-for="dict in sys_server_mail_type" disabled :key="dict.dictSort"
                        :label="dict.dictSort">{{ dict.label }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="邮件用途" prop="mailUsed">
                <el-radio-group v-model="form.mailUsed">
                    <el-radio v-for="dict in sys_server_mail_used" disabled :key="dict.dictSort"
                        :label="dict.dictSort">{{ dict.label }}
                    </el-radio>
                </el-radio-group>
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
            <el-form-item prop="copyTo">
                <template #label>
                    <span>
                        <el-tooltip content="请输入正确的邮箱" placement="top">
                            <el-icon>
                                <question-filled />
                            </el-icon>
                        </el-tooltip>
                        抄送用户
                    </span>
                </template>
                <keys-tag v-model="form.copyTo" :limit="3" :min-length="1" :max-length="8" />
            </el-form-item>
            <el-form-item prop="bccTo">
                <template #label>
                    <span>
                        <el-tooltip content="请输入正确的邮箱" placement="top">
                            <el-icon>
                                <question-filled />
                            </el-icon>
                        </el-tooltip>
                        密送用户
                    </span>
                </template>
                <keys-tag v-model="form.bccTo" :limit="3" :min-length="1" :validType="'mail'" :max-length="8" />
            </el-form-item>
            <el-form-item label="添加附件" prop="attachKeys">
                <upload-attach v-model="form.attachKeys" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="form.remark" placeholder="请输入备注" />
            </el-form-item>

            <el-form-item v-if="handleCode != 'viewMail'">
                <el-button type="primary" @click="saveMail">保存</el-button>
                <el-button type="primary" @click="sendMail">{{ mailType }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup name="EditMail">
import {
    getMail,
    addMail,
    updateMail
} from "@/api/server/mail";
import Vue3Tinymce from "@/components/Editor/TinymceEdit";
import uploadAttach from "@/views/server/mail/components/uploadAttach";
import KeysTag from "@/components/KeysTag";

const { proxy } = getCurrentInstance();
const props = defineProps({
    handleCode: {
        type: String,
        default: 'addMail'
    },
    mailId: {
        type: String,
        default: null
    },
    mailType: {
        type: Number,
        default: 0
    },
    formDisabled: {
        type: Boolean,
        default: false
    }
    ,
    mailUsed: {
        type: Number,
        default: 0
    }
});
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
// 表单状态
const formDisabled = ref(false);
// 邮件状态 已发送 待发送 发送失败 草稿(保存)
const mailStatus = ref("立即发送");
const mailType = ref("立即发送");
const data = reactive({
    form: {

    },
    rules: {
    toMail: [{ required: true, message: "接收邮箱不能为空", trigger: "blur" }],
    subject: [{ required: true, message: "主题不能为空", trigger: "blur" }],
    content: [{ required: true, message: "内容不能为空", trigger: "blur" }],

    },
});

const { form, rules } = toRefs(data);


// 选择时间
function changeTime(value) {
    if (value) {
        mailType.value = "定时发送：" + value;
    } else {
        mailType.value = "立即发送";
    }
}

/** 保存邮件 */
function saveMail() {
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

/**
 * 发送邮件
 */
function sendMail() {
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

/** 定时发送 */
function sendTimeMail(row) {
    reset();
    const _mailId = row.mailId || ids.value;
    getMail(_mailId).then((response) => {
        form.value = response.data;
        open.value = true;
        title.value = "修改邮件";
    });
}

function initForm() {
    if (props.mailId != null) {
        getMail(props.mailId).then((response) => {
            form.value = response.data;
        }).catch(err => {
            console.log("获取数据失败");
        });
    }
    else {
        form.value.mailUsed = props.mailUsed;
        form.value.mailType = props.mailType;
    }
}
initForm();
</script>