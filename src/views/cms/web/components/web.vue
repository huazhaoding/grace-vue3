<template>
  <el-dialog title="站点配置" v-model="openSetting" :width="width" @close='cancel()' append-to-body>
    <el-form :model="formData" ref="webConfigRef" label-position="right" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="默认主题" prop="oly.theme.used">
            <el-select v-model="formData['oly.theme.used']" class="m-2" placeholder="选择主题" size="large">
              <el-option v-for="item in themeNames" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="多主题" prop="oly.theme.more">
            <el-switch v-model="formData['oly.theme.more']"></el-switch>
          </el-form-item>
          <el-form-item label="管理IP" prop="oly.theme.manger.allowIp">
            <el-input v-model="formData['oly.theme.manger.allowIp']" placeholder="请输入管理IP" />
          </el-form-item>
          <el-form-item label="重建索引">
            <el-button type="primary">重建站点索引</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitConfig" v-hasPermi="['cms:setting:config']">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup name="themeConfig">
import { updateConfig,listThemeNames } from "@/api/cms/theme";
const { proxy } = getCurrentInstance();
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  //弹窗状态
  modelValue: {
    type: Boolean,
    default: false,
  },
  /* 站点名字 */
  webName: {
    type: String,
    default: "",
  },
  // 使用主题
  themeUsed: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "1000px",
  },
});

const data = reactive({
  formData: {},
});
const themeNames=ref([]);
const { formData } = toRefs(data);
const openSetting = ref(false);

watch(
  () => props.modelValue,
  (val) => {
    openSetting.value = val;
    if (openSetting.value) {
      getConfig();
    }
  },
  { deep: true, immediate: true }
);

/** 修改配置 */
function getConfig() {
  if (props.webName !== "") {
    proxy
      .getConfigValueMap(props.webName + "_themeConfig")
      .then((response) => {
        formData.value = response.data;
      });
      listThemeNames(props.webName)
      .then((response) => {
        themeNames.value = response.data;
      });
  }
}

//传递表单
function submitConfig() {
  updateConfig(props.webName, "themeConfig", formData.value)
    .then((response) => {
      cancel();
      proxy.$modal.msgSuccess("修改成功");
    })
    .catch((err) => {
      cancel();
    });
}

function cancel() {
  openSetting.value = false;
  emit("update:modelValue", false);
}
</script>
