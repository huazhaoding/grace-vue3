<template>
  <el-upload
    :file-list="fileList"
    :action="uploadUrl"
    :headers="headers"
    :on-success="handSuccess"
    :on-remove="handRemove"
    :before-upload="handleBeforeUpload"
  >
    <el-button type="primary">上传文件</el-button>
    <template #tip>
      <div class="el-upload__tip">
        注意发送端和接收端支持文件大小,此服务器限制上传文件最大为{{fileSize}}MB
      </div>
    </template>
  </el-upload>
</template>
<script setup>
import { getToken } from "@/utils/auth"; // 自己存储token的文件
const emit = defineEmits(["update:modelValue"]);
const { proxy } = getCurrentInstance();
const headers = ref({ Authorization: "Bearer " + getToken() });
const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 50,
  },
});
const uploadUrl = ref(
  import.meta.env.VITE_APP_BASE_API + "/server/mail/uploadAttach"
);

const fileList = ref([]);
watch(
  () => props.modelValue,
  (val) => {
    fileList.value = [];
    if(val){
    val.forEach((item) => {
      fileList.value.push({ name: item.label, url: item.value });
    });
  }
  },
  { deep: true, immediate: true }
);

function handSuccess(res,file) {
  if(res.code==200){
    fileList.value.push({ label: res.data.fk, value: res.data.fk });
  emit("update:modelValue", fileList.value);
}
else{
  proxy.$modal.msgError(res.msg);
  if (props.modelValue) {
    emit("update:modelValue", fileList.value.filter(item =>{return item.label != file.name}));
  }
  else {
    emit("update:modelValue", [].filter(item =>{return item.label != file.name}));
  }
  
}
}

function handleBeforeUpload(file) {
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize;
    if (!isLt) {
      proxy.$modal.msgError(`上传内容不能超过 ${props.fileSize} MB!`);
      return false;
    }
  }
}



function handRemove(file, uploadFiles) {
   emit("update:modelValue", props.modelValue.filter(item =>{return item.label != file.name}));
}
</script>
