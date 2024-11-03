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
        <el-alert type="info" show-icon :closable="false">
          注意发送端和接收端支持文件大小,此服务器限制上传文件最大为{{fileSize}}MB且数目最大为{{ fileNum }}
      </el-alert> 
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
  }
});
const uploadUrl = ref(
  import.meta.env.VITE_APP_BASE_API + "/server/mail/uploadAttach"
);
const fileSize=ref(5);
const fileNum=ref(5);
const fileList = ref([]);
watch(
  () => props.modelValue,
  (val) => {
    console.log(props.modelValue)
    fileList.value = [];
    if(val){
    val.forEach((item) => {
      fileList.value.push({ name: item.label, url: item.value });
    });
  }
  },
  { deep: true, immediate: true }
);

function init(){
proxy.getConfigValue("mailConfig","oly.mail.attach.size").then((response) => {
        fileSize.value=response.msg
    });
    proxy.getConfigValue("mailConfig","oly.mail.attach.number").then((response) => {
        fileNum.value=response.msg
    });
  }

  init();
function handSuccess(res,file) {
  if(res.code==200){
    fileList.value.push({ name: res.data.fk, url: res.data.fk });
 changeData()
}
else{
  proxy.$modal.msgError(res.msg);
  if (props.modelValue) {
   fileList.value.filter(item =>{return item.name != file.name})
   changeData();
  } 
}
}



function handleBeforeUpload(file) {
  if (fileSize.value) {
    const isLt = file.size / 1024 / 1024 < fileSize.value;
    if (!isLt) {
      proxy.$modal.msgError(`上传内容不能超过 ${fileSize.value} MB!`);
      return false;
    }
  }
  if (fileNum.value) {
    const isNum = (fileNum.value<fileList.value.length+1);
    if (isNum) {
      proxy.$modal.msgError(`上传数目不能超过 ${fileNum.value}!`);
      return false;
    }
  }
}

function changeData(){
   let data=[];
   if(fileList.value){
  fileList.value.forEach(element => {
      data.push({label:element.name,value:element.url});
  });
}
emit("update:modelValue", data);
}



function handRemove(file, uploadFiles) {
   fileList.value.filter(item =>{return item.name != file.name});
   changeData();
}
</script>
