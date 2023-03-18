<template>
  <div class="editor">
    <quill-editor
      v-model:content="content"
      :options="options"
      contentType="html"
      @textChange="(e) => $emit('update:modelValue', content)"
      :modules="modules"
      :toolbar="toolbar"
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
  },
  /*工具栏 */
  toolbar: {
    type: Array,
    default: () =>[
      ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
      ["blockquote", "code-block"], // 引用  代码块
      [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
      [{ indent: "-1" }, { indent: "+1" }], // 缩进
      [{ size: ["small", false, "large", "huge"] }], // 字体大小
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
      [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
      [{ align: [] }], // 对齐方式
      ["clean"] ,                                       // 清除文本格式
      ["link", "image", "video"]                       // 链接、图片、视频
    ],
  },
});
const options = ref({
  theme: "snow",
  bounds: document.body,
  debug: "warn",
  placeholder: "请输入内容呀",
  readOnly: props.readOnly,
});
const { proxy } = getCurrentInstance();
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
    if (v !== content) {
    document.querySelectorAll('.blot-formatter__overlay').forEach((item, index, arr) => {
        item.style.display="none";
    })

      content.value = v === undefined ? "<p></p>" : v;
    }
  },
  { immediate: true }
);

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
              url: "/server/oss/upload",
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
    className: 'blot-formatter__overlay',
    style: {
      position: 'absolute',
      boxSizing: 'border-box',
      border: '1px dashed red',
    }
  }
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
    proxy.$modal.msgError(
      `文件格式不正确, 请上传${props.fileType.join("/")}图片格式文件!`
    );
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
