<template>
  <table cellspacing="0">
    <tbody>
      <tr v-for="item in dataJson">
        <td class="el-table__cell is-leaf jst">{{ item.label }}</td>
        <td class="el-table__cell is-leaf jst">
          <el-input v-model="item.value"> </el-input>
        </td>
        <td class="el-table__cell is-leaf">
          <el-button type="danger" icon="Delete" @click="removeJsonData(item.key)" />
        </td>
      </tr>
    </tbody>
  </table>
  <br />
  <el-form v-if="formVisible" ref="formRef" label-width="auto" :model="formData" :rules="formRule" class="form-class"
    style="max-width: 600px">
    <el-form-item :label="labelName" style="margin-top: 5px;margin-bottom: 5px;" prop="label">
      <el-input v-model="formData.label"  minlength="1"
        :placeholder="'请输入' + labelName" maxlength="8" clearable />
    </el-form-item>
    <el-form-item :label="valueName" style="margin-top: 16px;margin-bottom: 5px;" prop="value">
      <el-input v-model="formData.value"  maxlength="256" 
        :placeholder="'请输入' + valueName" clearable>
        <template #append><el-button type="danger" icon="Plus" size="small" circle @click="addJsonData" /></template>
      </el-input>
    </el-form-item>
  </el-form>
  <el-button type="danger" :icon="iIco" size="small" circle @click="statusJsonForm" />
</template>

<script setup>
const { proxy } = getCurrentInstance();
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
  { deep: true}
);

//初始化数据
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      dataJson.value = props.modelValue;
    }
    else {
      dataJson.value = [];
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

const formRule = {
  label: [{ required: true, message: "参数名字不能为空", trigger: "blur" }
  ],
  value: [{ required: true, message: "参数内容不能为空", trigger: "blur" }],
}

// 清空表单
function cleanForm() {
  formData.value = {
    label: "",
    key: "",
    value: "",
  };
}
//表单状态
function statusJsonForm() {
  cleanForm();
  if (formVisible.value) {
    iIco.value = "Plus";
  } else {
    iIco.value = "Hide";
  }
  formVisible.value = !formVisible.value;
}

//添加字段
function addJsonData() {

  proxy.$refs["formRef"].validate((valid) => {
    if (valid) {
      formData.value.key = new Date();
      dataJson.value.push(formData.value);
      cleanForm();
    } else {

    }

  })
}

//删除字段
function removeJsonData(key) {
  dataJson.value = dataJson.value.filter((currentValue, index, arr) => {
    return key != currentValue.key;
  });
}
</script>


<style scoped>
.jst {
  text-align: right;
  vertical-align: middle;
  padding-right: 5px;
}
</style>
