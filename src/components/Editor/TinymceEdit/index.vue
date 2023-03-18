<template>
  <div class="tinymce-container">
    <vue3-tinymce
      ref="tinyRef"
      v-model="content"
      :setting="tinySetting"
      @change="editChange"
    />
  </div>
</template>
<script setup>
import { getToken } from "@/utils/auth"; // 自己存储token的文件
// 引入组件
import Vue3Tinymce from "@jsdawn/vue3-tinymce";
import { toRefs } from "vue";
const props = defineProps({
  /* 编辑器的内容 */
  modelValue: {
    type: String,
    default: "",
  },
  // 配置参数
  setting: {
    type: Object,
    default: {},
  },

  readOnly:{
    type: Boolean,
    default: false,
  }

});

const emit = defineEmits(["update:modelValue"]);

const data = reactive({
  content: props.modelValue,
  tinySetting: {
    height: 300,
    toolbar:
      "undo redo | fullscreen | blocks alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontsize forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
    toolbar_mode: "sliding",
    quickbars_selection_toolbar:
      "removeformat | bold italic underline strikethrough | fontsize forecolor backcolor",
    plugins: "link image media table lists fullscreen quickbars",
    font_size_formats: "12px 14px 16px 18px",
    link_default_target: "_blank",
    link_title: false,
    // 自定义 图片上传模式
    custom_images_upload: true,
    // 上传文件地址
    images_upload_url: import.meta.env.VITE_APP_BASE_API + "/server/oss/upload",
    // 上传 api 请求头
    custom_images_upload_header: { Authorization: "Bearer " + getToken() },
    // 上传成功回调函数，return 图片地址。默认 response.location
    custom_images_upload_callback: (res) =>
      res.data.domain + res.data.fk,
    nonbreaking_force_tab: true,
    // 以中文简体为例
    language: "zh-Hans",
    language_url: "/tinymce/langs/zh-Hans.js",
    readonly: props.readOnly
  },
});

const { content, tinySetting } = toRefs(data);

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      content.value=val;
    }
  },
  { deep: true, immediate: true }
);

Object.assign(tinySetting.value, props.setting);

function editChange() {
  emit("update:modelValue", content.value);
}
</script>

<style >
/* 强制样式顶级 防止dialog被遮挡 */
.el-popup-parent--hidden .tox-tinymce-aux{
  z-index: 99999!important ;
}
</style>