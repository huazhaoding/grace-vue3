<template>
  <div class="tinymce-container">
    <vue3-tinymce
      ref="tinyRef"
      v-model="content"
      :setting="tinySetting"
      @init="onTinymceInit"
      @change="editChange"
      script-src="/tinymce/tinymce.min.js"
    />
  </div>

</template>
<script setup>
import { getToken } from "@/utils/auth"; // 自己存储token的文件


// 引入组件
import Vue3Tinymce from "@jsdawn/vue3-tinymce";
import { toRefs, watch } from "vue";
const props = defineProps({
  /* 编辑器的内容 */
  modelValue: {
    type: String,
    default: "",
  },
  // 配置参数
  setting: {
    type: Object,
    default: () => ({}), // 使用箭头函数确保this指向
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
// 使用reactive创建响应式对象时增加空行以提高可读性
const data = reactive({
  content: props.modelValue,
  tinySetting: getDefaultTinySetting(),
});

// 将默认设置抽取到一个函数，增加可维护性
function getDefaultTinySetting() {
  return {
    height: 600,
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
    menubar: 'file edit view insert format tools table help',
    toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    // 自定义 图片上传模式
    custom_images_upload: true,
    // 上传文件地址
    images_upload_url: import.meta.env.VITE_APP_BASE_API + "/server/oss/upload",
    // 上传 api 请求头
    custom_images_upload_header: { Authorization: "Bearer " + getTokenSafe() },
    // 上传成功回调函数，return 图片地址。默认 response.location
    custom_images_upload_callback: (res) =>
      res.data.domain + res.data.fk,
    nonbreaking_force_tab: true,
    // 以中文简体为例
    language: "zh-Hans",
    language_url: "/tinymce/langs/zh-Hans.js",
    convert_urls: false,
    readonly: props.readOnly,
  };
}

// 封装获取token的方法，增加异常处理
function getTokenSafe() {
  try {
    return getToken();
  } catch (error) {
    return ""; // 返回空字符串或应用中定义的默认令牌值
  }
}

const { content, tinySetting } = toRefs(data);

// 优化对props.modelValue的监听逻辑
watch(
  () => props.modelValue,
  (val) => {
    content.value = val;
  },
  { deep: true, immediate: true }
);

// 使用watch对props.setting进行监听，仅在变化时合并设置，提高性能
watch(
  () => props.setting,
  (newSetting) => {
    Object.assign(tinySetting.value, newSetting);
  }
);



function onTinymceInit(vm) {
  // 实例初始化后的逻辑
}



function editChange() {
  emit("update:modelValue", content.value);
}
</script>

<style scoped>

.tinymce-container {
  width: 100%;
}

/* 强制样式顶级 防止dialog被遮挡 */
.el-popup-parent--hidden .tox-tinymce-aux {
  z-index: 99999 !important;
}
</style>