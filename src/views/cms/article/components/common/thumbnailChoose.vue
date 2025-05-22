<template>
  <div>
    <el-tooltip content="从本地选择图片" placement="top">
      <el-button
        size="small"
        type="primary"
        icon="Plus"
        @click="imgChooseDialog"
        style="position: relative; top: 90px; right: 50px"
      >
      </el-button>
    </el-tooltip>

    <image-upload
      v-model="activeArticleImg"
      @delete="deleteImgChoose"
      :limit="maxImg"
    />
  </div>
  <el-dialog
    title="选择图片"
    v-model="openImgDialog"
    lock-scroll
    width="705px"
    append-to-body
  >
    <el-checkbox-group class="dialog-box" v-model="imgChoose">
      <div class="dialog-li" v-for="(item, index) in imgSrcList">
        <el-checkbox
          class="dialog-check"
          :key="index"
          :label="item"
          size="large"
        >
          &nbsp
        </el-checkbox>
        <img :src="item" class="dialog-img" />
      </div>
    </el-checkbox-group>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="imgChooseHandle">完成选择</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
const { proxy } = getCurrentInstance();
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
   modelValue: {
    type: String,
    default: "",
  },
  articleContent: {
    type: String,
    default: "",
  },
  maxImg: {
    type: Number,
    default: 3,
  },
  isPhoto: {
    type: Boolean,
    default: false,
  },
});

// 弹窗状态
const openImgDialog = ref(false);
// 文章截取的图片
const imgChoose = ref([]);
// 图片列表
const imgSrcList = ref([]);
// 激活的图片列表
const activeArticleImg = ref("");

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      activeArticleImg.value = val; 
      imgChoose.value = val.split(",");
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => activeArticleImg,
  (val) => {
    if (val) {
      emit("update:modelValue", val);
      emit("update:", val);
    }
  },
  { deep: true, immediate: true }
);

// 移除选择图片
function deleteImgChoose(value) {
  if (imgChoose.value.length > 0) {
    imgChoose.value.forEach((item, index) => {
      if (item == value) {
        imgChoose.value.splice(index, 1);
        if (imgChoose.value.length > 0) {
          activeArticleImg.value = imgChoose.value.join(",");
        } else {
          activeArticleImg.value = '';
        }
      }
    });
  }
  emit("update:modelValue",activeArticleImg.value );
}

// 选择图片
function imgChooseDialog() {
  if (
    activeArticleImg.value != undefined &&
    props.maxImg < activeArticleImg.value.split(",").length + 1
  ) {
    proxy.$modal.msgError("请确保图集数不大于" + props.maxImg);
  } else {
    openImgDialog.value = true;
    imgSrcList.value = chooseImg(props.articleContent);
    //过滤选择不存在的
    imgChoose.value = imgChoose.value.filter((v) =>
      imgSrcList.value.includes(v)
    );
  }
}

// 图片截取
function chooseImg(str) {
  const data = [];
  if (props.isPhoto) {
    JSON.parse(str).photoData.forEach((item) => {
      data.push(item.url);
    });
  } else {
    var arr = str.match(/<img.*?(?:>|\/>)/gi);
    if (arr != null) {
      for (var i = 0; i < arr.length; i++) {
        var src = arr[i].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i);
        //获取图片地址
        if (src[1]) {
          data.push(src[1]);
        }
      }
    }
  }
  return data;
}

function imgChooseHandle() {
  const c = imgChoose.value;
  let f = imgChoose.value;
  if (activeArticleImg.value != undefined) {
    f = activeArticleImg.value.split(",").concat(imgChoose.value);
    // 去重去空
    f = f.filter((item, index, arr) => {
      return f.indexOf(item, 0) === index && item !== ""; //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    });
  }
  if (f.length > props.maxImg) {
    proxy.$modal.msgError("请确保图集数不大于" + props.maxImg);
    c.splice(c.length - 1, 1);
    f.splice(f.length - 1, 1);
  } else {
    activeArticleImg.value = f.join(",");
    emit("update:modelValue",activeArticleImg.value );
  }
 
  openImgDialog.value = false;
}
</script>

<style lang="scss" scoped>
.dialog-box {
  border: 2px solid #f5f5f8;
  padding: 20px;
  max-height: 680px;
  overflow-y: scroll;

  .dialog-li {
    padding: 5px;
    width: 200px;
    height: 200px;
    border: 1px solid #f5f5f8;
    float: left;
    overflow: hidden;
    position: relative;

    .dialog-img {
      max-width: 200px;
      max-height: 200px;
    }

    .dialog-check {
      margin-left: 5px;
      position: absolute;
    }
  }
}
</style>
