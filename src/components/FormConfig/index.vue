<template>
  <el-form :model="formData" ref="configForm" label-width="120px" size="default">
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane v-for="(tabItem, i) in configForm.tabData" :key="i" :name="'tab_' + i" :label="tabItem.label">
        <el-form-item v-for="(formItem, j) in tabItem.formData" :key="j" :label="formItem.label" :prop="formItem.prop">
          <div v-if="formItem.type === 'msg'">
            {{ formData[formItem.prop] }}
          </div>
          <el-switch v-else-if="formItem.type === 'switch'" v-model="formData[formItem.prop]"></el-switch>
          <el-input v-else-if="formItem.type === 'input'" v-model="formData[formItem.prop]" type="text"
            :placeholder="formItem.placeholder"></el-input>
          <el-input v-else-if="formItem.type === 'textarea'" type="textarea" v-model="formData[formItem.prop]"
            :placeholder="formItem.placeholder" rows="3"></el-input>
          <image-upload v-else-if="formItem.type === 'imgUpload'" v-model="formData[formItem.prop]"
            :limit="formItem.limit" :fileSize="formItem.fileSize" />
          <el-input-number v-else-if="formItem.type === 'number'" v-model="formData[formItem.prop]"
            controls-position="right" :min="0" :max="100000000000" :precision="0" :step="1">
          </el-input-number>
          <el-radio-group v-else-if="formItem.type === 'radio'" v-model="formData[formItem.prop]">
            <el-radio v-for="dict in formItem.dicts" :key="dict.value" :label="dict.value">{{ dict.label
            }}</el-radio></el-radio-group>
          <config-select v-else-if="formItem.type === 'select'" v-model="formData[formItem.prop]"
            :placeholder="formItem.placeholder" :dicts="formItem.dicts">
          </config-select>
          <config-checkbox v-else-if="formItem.type === 'checkbox'" v-model="formData[formItem.prop]"
            :dicts="formItem.dicts"></config-checkbox>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
  </el-form>

      <el-button style="margin-left: 40%; margin-top: 10px" type="primary" @click="submitForm">确定</el-button>

</template>

<script setup name="configForm">
import request from '@/utils/request';
import configSelect from "@/components/ConfigSelect";
import ConfigCheckbox from "@/components/ConfigCheckbox";
const { proxy } = getCurrentInstance();
const emit = defineEmits(["submit"]);
const activeTab = ref("tab_0");
const props = defineProps({
  /* 配置表单 */
  configForm: {
    type: Object,
    default: {},
  },
  /* 更新配置地址 */
  updateConfigUrl: {
    type: String,
    default: "",
  },
  /* 配置组别 */
  configGroup: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "1000px",
  },
});

const data = reactive({
  formData: []
});

const { formData } = toRefs(data);

  if (props.configGroup) {
    proxy.getConfigValueMap(props.configGroup).then((response) => {
      formData.value = response.data;
    });
  }

//传递表单
function submitForm() {
  return request({
    url: props.updateConfigUrl,
    method: 'post',
    data: formData.value
  }).then((response) => {
    proxy.$modal.msgSuccess("修改成功");
    proxy.$emit("submit", true);
  }
  ).catch(()=>{
    proxy.$modal.msgError("修改失败");
    proxy.$emit("submit", false);
  });
}

</script>
