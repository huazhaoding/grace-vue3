<template>
  <el-upload
    :file-list="fileList"
    :action="uploadUrl"
    :headers="headers"
    :on-success="handSuccess"
    :on-remove="handRemove"
  >
    <el-button type="primary">上传文件</el-button>
    <template #tip>
      <div class="el-upload__tip">
        上传文件不能大于10M
      </div>
    </template>
  </el-upload>
</template>
<script setup>
import { getToken } from "@/utils/auth"; // 自己存储token的文件
const emit = defineEmits(["update:modelValue"]);
const headers = ref({ Authorization: "Bearer " + getToken() });
const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
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

function handSuccess(res) {
  props.modelValue.push({ label: res.data.fk, value: res.data.fk });
  emit("update:modelValue", props.modelValue);
}

function handRemove(file, uploadFiles) {
   emit("update:modelValue", props.modelValue.filter(item =>{return item.label != file.name}));
}
</script>
