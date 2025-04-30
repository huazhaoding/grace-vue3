<template>
    <div>
        <el-select @change="columnIdChange" v-model="columnId" placeholder="选择数据" style="width: 240px">
            <el-option v-for="column in columnDatas" :key="Number(column.columnId)" :label="column.columnName"
                :value="Number(column.columnId)">
            </el-option>
        </el-select>
    </div>
</template>

<script setup>
const emit = defineEmits("update:modelValue");
const props = defineProps({
    modelValue: {
        type: String,
    },
    columnId: {
        type: Number,
        default: undefined
    },
    columnDatas: {
        type: Array,
        default: []
    }
})

const columnId = ref(props.modelValue);

//初始化数据
watch(
  () => props.modelValue,
  (v) => {  
    columnId.value = v; // 初始化columnId的值
  },
  { immediate: true }
);
function columnIdChange(value) {
    emit("update:modelValue", value);
    console.log(value);
}

</script>