<template>
  <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false"
    @close="handleClose(tag)">
    {{ tag }}
  </el-tag>

  <span v-if="addVisible">
    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small"
      :maxlength="maxLength" :minlength="minLength" @keyup.enter="handleInputConfirm" />
    <el-button v-else class="button-new-tag ml-1" size="small" type="primary" circle @click="showInput">+
    </el-button>
  </span>
</template>

<script setup>
import { nextTick } from "vue";
const emit = defineEmits();
const inputValue = ref("");
const dynamicTags = ref([]);
//是否展示输入框 默认不展示
const inputVisible = ref(false);
const InputRef = ref();
const addVisible = ref(true);
const { proxy } = getCurrentInstance();
const props = defineProps({
  /* 关键词字符 */
  modelValue: {
    type: String,
    default: "",
  },
  /* 关键词个数 */
  limit: {
    type: Number,
    default: 1,
  },
  /* 分割字符 */
  splitString: {
    type: String,
    default: ",",
  },
  /* 关键长度 */
  maxLength: {
    type: Number,
    default: 32,
  },
  /* 关键长度 */
  minLength: {
    type: Number,
    default: 1,
  },
  validType:{
    type: String,
    default: "str",
  }
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      // 首先将值转为数组
      const list = Array.isArray(val)
        ? val
        : props.modelValue.split(props.splitString);
      dynamicTags.value = list.map((item) => {
        return item;
      });
      if (props.limit < dynamicTags.value.length + 1) {
        addVisible.value = false;
      }
    } else {
      dynamicTags.value = [];
      addVisible.value = true;
      return [];
    }
  },
  { deep: true, immediate: true }
);
const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
  emit("update:modelValue", dynamicTags.value.join(props.splitString));
  if (props.limit > dynamicTags.value.length) {
    addVisible.value = true;
    inputVisible.value = false;
    inputValue.value = "";
  } else {
    addVisible.value = false;
  }
};
// 展示输入框
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value.input.focus();
  });
};
// 输入框提示
const handleInputConfirm = () => {
  const v = inputValue.value;
  //输入框是否为空
  if (inputValue.value == "") {
    inputVisible.value = false;
    return false;
  }
  if (v.length < props.minLength || v.length > props.maxLength) {
    proxy.$modal.msgError(
      `字符限制 ${props.minLength} 至${props.maxLength} 字符`
    );
    inputVisible.value = false;
    return false;
  }

  if(validValue(props.validType,v)){
    inputVisible.value = false;
    return false;
  }
  if (dynamicTags.value.indexOf(v) != -1) {
    proxy.$modal.msgError('当前输入已经存在');
    inputVisible.value = false;
    return false;
  }
  else {
    dynamicTags.value.push(inputValue.value);
    emit("update:modelValue", dynamicTags.value.join(props.splitString));
  }
  if (props.limit < dynamicTags.value.length + 1) {
    addVisible.value = false;
  }
  inputVisible.value = false;
  inputValue.value = "";
}

// 字段验证 邮件 电话 数值

const validValue = (vType,value) => {
  let reValue = false;
  switch (vType) {
    case 'mail':
      if (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value)) {
        reValue = true;
      }
      else {
        proxy.$modal.msgError('邮箱验证未通过');
        reValue = false;
      }
      break;
    case 'phone':
      if (/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) {
        reValue = true;
      }
      else {
        proxy.$modal.msgError('手机号验证未通过');
        reValue = false;
      }
      break;
    case 'number':
      if (/^[-+]?\d*$/.test(value)) {
        reValue = true;
      }
      else {
        proxy.$modal.msgError('数字验证未通过');
        reValue = false;
      }
      break;
    case 'floatNum':
      if (/^[-\+]?\d+(\.\d+)?$/.test(value)) {
        reValue = true;
      }
      else {
        proxy.$modal.msgError('小数验证未通过');
        reValue = false;
      }
      break;
    default:
      break;
  }
  return reValue;

}

function sendArray() {
  return dynamicTags.value;
}
// 组件回调方法
defineExpose({
  sendArray
});

</script>
