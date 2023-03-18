<template>
  <md-editor v-model="content" @on-change="onChange" @on-html-changed="onHtmlChanged" @on-upload-img="onUploadImg" />
</template>

<script setup>
import { ref } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import request from "@/utils/request";
const { proxy } = getCurrentInstance();
const emit = defineEmits(["update:modelValue","getHtml"]);
const props=defineProps({
  /* 编辑器的内容 */
  modelValue: {
    type: String,
  },
  /* 高度 */
  height: {
    type: Number,
    default: null,
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 5,
  },
  // 文件类型, 例如['png', 'jpg', 'jpeg']
  fileType: {
    type: Array,
    default: () => ["png", "jpg", "jpeg", "ico"],
  },
  /* 只读 */
  readOnly: {
    type: Boolean,
    default: false,
  },
  /*额外设置 */
  setting: {
    type: Object,
    default: {},
  }
});

const content=ref("");

//初始化数据
watch(
  () => props.modelValue,
  (v) => {
    if (v !== content) {
      content.value = v === undefined ? "" : v;
    }
  },
  { immediate: true }
);

const onChange = (v) => {
    emit('update:modelValue', v);
};
const onHtmlChanged= (v) => {
    emit('getHtml', v);
};

const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const formData = new FormData();
            formData.append("file", file);
           request({
              url: "/server/oss/upload",
              method: "post",
              data: formData,
            }).then((res) => {
                rev(res);
              })
              .catch((err) => {
                rej("Upload failed");
                proxy.$modal.msgError(`文件上传失败!`);
              });
          });
    })
  );
  callback(res.map((item) =>
    item.data.domain + item.data.fk
  ));
};


</script>
