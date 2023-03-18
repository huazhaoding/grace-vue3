<template>
  <table cellspacing="0">
    <tbody>
      <tr v-for="item in dataJson">
        <td class="el-table__cell is-leaf" align="right">{{ item.label }}</td>
        <td class="el-table__cell is-leaf">
          <el-input v-model="item.value"> </el-input>
        </td>
        <td class="el-table__cell is-leaf">
          <el-button
            type="danger"
            icon="Delete"
            @click="removeJsonData(item.key)"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <el-form-item>
    <el-button
      type="danger"
      :icon="iIco"
      size="small"
      circle
      @click="statusJsonForm"
    />
  </el-form-item>
  <el-row :gutter="10" v-if="formVisible" class="json-box">
    <el-col :span="6">
      <el-form-item :label="labelName">
        <el-input
          v-model="formData.label"
          :placeholder="'请输入' + labelName"
          maxlength="8"
        /> </el-form-item>
      </el-col>
    <el-col :span="8">
      <el-form-item :label="valueName">
        <el-input v-model="formData.value" maxlength="256" :placeholder="'请输入' + valueName">
          <template #append
            ><el-button
              type="danger"
              icon="Plus"
              size="small"
              circle
              @click="addJsonData"
          /></template>
        </el-input> </el-form-item
    ></el-col>
  </el-row>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Object,
    default: {},
  },
  /* 参数名字 */
  labelName: {
    type: String,
    default: "参数名字",
  },
  /* 参数内容 */
  valueName: {
    type: String,
    default: "参数内容",
  },
});
const emit = defineEmits(["update:modelValue"]);
const dataJson = ref([]);

//动态响应参数
watch(
  () => dataJson.value,
  (val) => {
    if (val) {
      emit("update:modelValue", dataJson.value);
    }
  },
  { deep: true, immediate: true }
);

//初始化数据
watch(
  () => props.modelValue,
  (val) => {
    if(val){
    dataJson.value= props.modelValue;}
    else{
      dataJson.value= [];
    }
  },
  { deep: true, immediate: true }
);

const formVisible = ref(false);
const iIco = ref("Plus");
const formData = ref({
  label: "",
  key: "",
  value: "",
});

function cleanForm() {
  formData.value = {
    label: "",
    key: "",
    value: "",
  };
}

function statusJsonForm() {
  cleanForm();
  if (formVisible.value) {
    iIco.value = "Plus";
  } else {
    iIco.value = "Hide";
  }
  formVisible.value = !formVisible.value;
}

function addJsonData() {
  formData.value.key = new Date();
  dataJson.value.push(formData.value);
  cleanForm();
}

function removeJsonData(key) {
  dataJson.value = dataJson.value.filter((currentValue, index, arr) => {
    return key != currentValue.key;
  });
}
</script>

<style>
.json-box {
  padding-bottom: 10px;
}
</style>
