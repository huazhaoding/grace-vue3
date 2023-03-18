<template>
  <el-select
    v-model="chooseValue"
    multiple
    :multiple-limit="multipleLimit"
    :placeholder="placeholder"
    style="width: 240px"
    @change="selectChange"
  >
    <el-option
      v-for="dict in dicts"
      :key="dict.value"
      :label="dict.label"
      :value="dict.value"
    ></el-option>
  </el-select>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder:{
    type: String,
    default: "",
  },
  /* 字典 */
  dicts: {
    type: Object,
    default: [],
  },
  /* 最多选 */
  multipleLimit: {
    type: Number,
    default: 0,
  }
});
const emit = defineEmits(["update:modelValue"]);
const chooseValue=ref([]);

watch(() => props.modelValue, val => {
  if (val) {
    // 首先将值转为数组
    chooseValue.value = Array.isArray(val) ? val : props.modelValue.split(",");
  }
},{ deep: true, immediate: true });

function selectChange(val){
    emit("update:modelValue", val.join(","));
}

</script>
