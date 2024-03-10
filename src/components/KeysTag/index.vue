<template>
  <el-tag
    v-for="tag in dynamicTags"
    :key="tag"
    class="mx-1"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)"
  >
    {{ tag }}
  </el-tag>

  <span v-if="addVisible">
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="ml-1 w-20"
      size="small"
      :maxlength="maxLength"
      :minlength="minLength"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button
      v-else
      class="button-new-tag ml-1"
      size="small"
      type="primary"
      circle
      @click="showInput"
      >+
    </el-button>
  </span>
</template>

<script setup>
import { nextTick } from "vue";
const emit = defineEmits();
const inputValue = ref("");
const dynamicTags = ref([]);
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
    default: 8,
  },
  /* 关键长度 */
  minLength: {
    type: Number,
    default: 2,
  },
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

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value.input.focus();
  });
};

const handleInputConfirm = () => {
  const v = inputValue.value;
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

  if (inputValue.value && dynamicTags.value.indexOf(inputValue.value)) {
    dynamicTags.value.push(inputValue.value);
    emit("update:modelValue", dynamicTags.value.join(props.splitString));
  }
  if (props.limit < dynamicTags.value.length + 1) {
    addVisible.value = false;
  }
  inputVisible.value = false;
  inputValue.value = "";
}

function sendArray(){
  return dynamicTags.value;
}

defineExpose({
  sendArray
});

</script>
