<template>
  <el-dialog title="站点配置" v-model="openSetting" :width="width" @close='cancel()' append-to-body>
    <el-form :model="formData" ref="webConfigRef" label-position="right" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="管理IP" prop="oly.theme.manger.allowIp">
            <el-input v-model="formData['oly.theme.manger.allowIp']" placeholder="请输入管理IP" />
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

<script setup name="webConfig">
import { updateConfig} from "@/api/cms/theme";
const { proxy } = getCurrentInstance();
const props = defineProps({

  /* 站点名字 */
  webName: {
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
