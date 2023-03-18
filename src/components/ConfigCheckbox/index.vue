<template>
 <el-checkbox-group v-model="chooseValue"  :max="max" :min="min" @change="checkChange">
    <el-checkbox v-for="dict in dicts" :key="dict.value" :label="dict.value">{{ dict.label}}</el-checkbox>
  </el-checkbox-group>

</template>


<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  /* 字典 */
  dicts: {
    type: Object,
    default: [],
  },
  /* 最多选 */
  max: {
    type: Number,
    default: 10,
  },
    /* 最少选 */
    min: {
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

function checkChange(val){
    emit("update:modelValue", val.join(","));
}

</script>