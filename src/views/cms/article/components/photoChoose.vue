<template>
    <div style="width: 80%">
        <el-row>
            <el-col :span="24" class="grid-cell">
                <el-input type="textarea" v-model="formData.info" rows="6" maxlength="1024" show-word-limit></el-input>
            </el-col>
            <el-col :span="24" style="margin-top:10px ;" class="grid-cell">
                <el-row >
                    <el-col :span="24" style="margin-top: 10px" class="grid-cell" v-for="(item, index) in formData.photoData">
                        <el-row>
                            <el-col :span="8" class="grid-cell" >
                                <el-image style="width: 100%; height: 100%" :src="item.url" :zoom-rate="1.2"
                                    :max-scale="7" :preview-src-list="[item.url]" :min-scale="0.2" :initial-index="4" fit="cover" />
                            </el-col>
                            <el-col :span="14" class="grid-cell">
                                <el-form-item label="图片名字" prop="name">
                                    <el-input v-model="item.name" type="text" maxlength="64" show-word-limit clearable></el-input>
                                </el-form-item>
                                <el-form-item label="图片说明" prop="info" style="margin-top: 10px">
                                    <el-input type="textarea" v-model="item.info" rows="6" maxlength="256" show-word-limit></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2" >
                                <el-button style="margin-top: 70px;margin-left: 10px;" type="danger" @click="deletePhoto(index)" icon="Delete" circle />
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="9" :offset="9" style="margin-top: 10px">
                <el-upload :action="uploadImgUrl" :on-success="handleUploadSuccess" :before-upload="handleBeforeUpload"
                    :on-error="handleUploadError" ref="imageUpload" :headers="headers" list-type="picture-card" :show-file-list="false">
                    <el-icon class="avatar-uploader-icon">
                        <plus />
                    </el-icon>
                </el-upload>
                <!-- 上传提示 -->
                <div class="el-upload__tip">
                    请上传
                    <template v-if="fileSize">
                        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
                    </template>
                    <template v-if="fileType">
                        格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
                    </template>
                    的文件
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { getToken } from "@/utils/auth";
const props = defineProps({
    modelValue: Object,
    // 大小限制(MB)
    fileSize: {
        type: Number,
        default: 5,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
        type: Array,
        default: () => ["png", "jpg", "jpeg"],
    }
});
const { proxy } = getCurrentInstance();
const baseUrl = import.meta.env.VITE_APP_BASE_API;
const uploadImgUrl = ref(baseUrl + "/server/oss/upload"); // 上传的图片服务器地址
const headers = ref({ Authorization: "Bearer " + getToken() });
const emit = defineEmits(["update:modelValue"]);
const formData = ref({});

watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            formData.value = val;
            return val;
        } else {
            formData.value = {info:'',photoData:[]};
            return {info:'',photoData:[]};
        }
    },
    { deep: true, immediate: true }
);
// 上传前loading加载
function handleBeforeUpload(file) {
    let isImg = false;
    if (props.fileType.length) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
            fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        isImg = props.fileType.some((type) => {
            if (file.type.indexOf(type) > -1) return true;
            if (fileExtension && fileExtension.indexOf(type) > -1) return true;
            return false;
        });
    } else {
        isImg = file.type.indexOf("image") > -1;
    }
    if (!isImg) {
        proxy.$modal.msgError(
            `文件格式不正确, 请上传${props.fileType.join("/")}图片格式文件!`
        );
        return false;
    }
    if (props.fileSize) {
        const isLt = file.size / 1024 / 1024 < props.fileSize;
        if (!isLt) {
            proxy.$modal.msgError(`上传头像图片大小不能超过 ${props.fileSize} MB!`);
            return false;
        }
    }
    proxy.$modal.loading("正在上传图片，请稍候...");
}

function deletePhoto(index){
    formData.value.photoData.splice(index,1);
    emit("update:modelValue",formData.value );
}

// 上传成功回调
function handleUploadSuccess(res, file) {
    if (res.code === 200) {
        formData.value.photoData.push({
            name: res.data.fileName,
            url: res.data.domain + res.data.fk,
            info: ''
        });
        uploadedSuccessfully();
    } else {
        proxy.$modal.closeLoading();
        proxy.$modal.msgError(res.msg);
        proxy.$refs.imageUpload.handleRemove(file);
        uploadedSuccessfully();
    }
    emit("update:modelValue",formData.value );
}

// 上传结束处理
function uploadedSuccessfully() {

    proxy.$modal.closeLoading();
}

// 上传失败
function handleUploadError() {
    proxy.$modal.msgError("上传图片失败");
    proxy.$modal.closeLoading();
}


</script>
