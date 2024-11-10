<template>
  <div>
    <el-upload
      :action="uploadUrl"
      :before-upload="handleBeforeUpload"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      name="file"
      :show-file-list="false"
      :headers="headers"
      class="editor-img-uploader"
      v-if="type == 'url'"
    >
      <i ref="uploadRef" class="editor-img-uploader"></i>
    </el-upload>
  </div>
  <div class="editor">
    <quill-editor
      ref="quillEditorRef"
      v-model:content="content"
      contentType="html"
      :modules="modules"
      :toolbar="toolbar"
      @textChange="(e) => $emit('update:modelValue', content)"
      :options="options"
      :style="styles"
    />
  </div>
</template>

<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
import ImageUploader from "quill-image-uploader";
import request from "@/utils/request";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { getToken } from "@/utils/auth";
const { proxy } = getCurrentInstance();
const quillEditorRef = ref();
const uploadUrl = ref(import.meta.env.VITE_APP_BASE_API + "/server/oss/upload"); // 上传的图片服务器地址
const headers = ref({
  Authorization: "Bearer " + getToken()
})

const props = defineProps({
  /* 编辑器的内容 */
  modelValue: {
    type: String,
  },
  /* 高度 */
  height: {
    type: Number,
    default: null,
  },
   /* 上传文件大小限制(MB) */
   fileSize: {
    type: Number,
    default: 5,
  },
  // 文件类型, 例如['png', 'jpg', 'jpeg']
  fileType: {
    type: Array,
    default: () => ["png", "jpg", "jpeg", "ico"],
  },
  /* 类型（base64格式、url格式） */
  type: {
    type: String,
    default: "url",
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
  },
  /*工具栏 */
  toolbar: {
    type: Array,
    default: () => [
      ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
      ["blockquote", "code-block"], // 引用  代码块
      [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
      [{ indent: "-1" }, { indent: "+1" }], // 缩进
      [{ size: ["small", false, "large", "huge"] }], // 字体大小
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
      [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
      [{ align: [] }], // 对齐方式
      ["clean"], // 清除文本格式
      ["link", "image", "video"], // 链接、图片、视频
    ],
  },
});
const options = ref({
  bounds: document.body,
  debug: "warn",
  placeholder: "请输入内容呀",
  readOnly: props.readOnly,
});
const styles = computed(() => {
  let style = {};
  if (props.minHeight) {
    style.minHeight = `${props.minHeight}px`;
  }
  if (props.height) {
    style.height = `${props.height}px`;
  }
  return style;
});
const content = ref("");
//初始化数据
watch(
  () => props.modelValue,
  (v) => {
    if (v !== content.value) {
      document
        .querySelectorAll(".blot-formatter__overlay")
        .forEach((item, index, arr) => {
          item.style.display = "none";
        });
      content.value = v === undefined ? "<p></p>" : v;
    }
  },
  { immediate: true }
);

// 如果设置了上传地址则自定义图片上传事件
onMounted(() => {
  if (props.type == 'url') {
    let quill = quillEditorRef.value.getQuill();
    let toolbar = quill.getModule("toolbar");
    toolbar.addHandler("image", (value) => {
      if (value) {
        proxy.$refs.uploadRef.click();
      } else {
        quill.format("image", false);
      }
    });
  }
});

// 上传前校检格式和大小
function handleBeforeUpload(file) {
  const type = ["image/jpeg", "image/jpg", "image/png", "image/svg"];
  const isJPG = type.includes(file.type);
  //检验文件格式
  if (!isJPG) {
    proxy.$modal.msgError(`图片格式错误!`);
    return false;
  }
  // 校检文件大小
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize;
    if (!isLt) {
      proxy.$modal.msgError(`上传文件大小不能超过 ${props.fileSize} MB!`);
      return false;
    }
  }
  return true;
}
// 上传成功处理
function handleUploadSuccess(res, file) {
  // 如果上传成功
  if (res.code == 200) {
    // 获取富文本实例
    let quill = toRaw(quillEditorRef.value).getQuill();
    // 获取光标位置
    let length = quill.selection.savedRange.index;
    // 插入图片，res.url为服务器返回的图片链接地址
    quill.insertEmbed(length, "image", res.data.domain + res.data.fk);
    // 调整光标到最后
    quill.setSelection(length + 1);
  } else {
    proxy.$modal.msgError("图片插入失败");
  }
}
// 上传失败处理
function handleUploadError() {
  proxy.$modal.msgError("图片插入失败");
}

const modules = ref([
  {
    name: "imageUploader",
    module: ImageUploader,
    options: {
      upload: (file) => {
        if (isAllowFile(file)) {
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", file);
            return request({
              url: uploadUrl,
              method: "post",
              data: formData,
            })
              .then((res) => {
                resolve(res.data.domain + res.data.fk);
              })
              .catch((err) => {
                reject("Upload failed");
                proxy.$modal.msgError(`文件上传失败!`);
              });
          });
        }

        return false;
      },
    },
  },
  {
    name: "blotFormatter",
    module: BlotFormatter,
    options: {
      overlay: {
        className: "blot-formatter__overlay",
        style: {
          position: "absolute",
          boxSizing: "border-box",
          border: "1px dashed red",
        },
      },
    },
  },
]);
// 上传前校检格式和大小
const isAllowFile = (rawFile) => {
  let isImg = false;
  if (props.fileType.length) {
    let fileExtension = "";
    if (rawFile.name.lastIndexOf(".") > -1) {
      fileExtension = rawFile.name.slice(rawFile.name.lastIndexOf(".") + 1);
    }
    isImg = props.fileType.some((type) => {
      if (rawFile.type.indexOf(type) > -1) return true;
      if (fileExtension && fileExtension.indexOf(type) > -1) return true;
      return false;
    });
  } else {
    isImg = rawFile.type.indexOf("image") > -1;
  }
  if (!isImg) {
     proxy.$modal.msgError(`文件格式不正确，请上传${props.fileType.join("/")}图片格式文件!`);
    return false;
  }
  if (file.name.includes(',')) {
    proxy.$modal.msgError('文件名不正确，不能包含英文逗号!');
    return false;
  }
  // 校检文件大小
  if (proxy.fileSize) {
    const isLt = rawFile.size / 1024 / 1024 < proxy.fileSize;
    if (!isLt) {
      proxy.$message.error(`上传文件大小不能超过 ${proxy.fileSize} MB!`);
      return false;
    }
  } else if (
    rawFile.type !== "image/png" &&
    rawFile.type !== "image/jpg" &&
    rawFile.type !== "image/jpeg"
  ) {
    proxy.$message.error("图片仅支持jpg、jpeg、png格式!");
    return false;
  }
  return true;
};
</script>

<style>

.editor-img-uploader {
  display: none;
}

.editor,
.ql-toolbar {
  white-space: pre-wrap !important;
  line-height: normal !important;
}

.quill-img {
  display: none;
}

.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}

.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}

.blot-formatter__toolbar-button {
  border: none !important;
}
.blot-formatter__toolbar-button svg {
  position: relative;
  top: -24px;
  border: none;
}
</style>
