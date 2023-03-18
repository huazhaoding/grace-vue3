<template>
  <div class="app-container">
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane name="article" label="文章设置">
        <el-form
          :model="formData"
          ref="configRef"
          :rules="rules"
          label-position="right"
          label-width="100px"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="分类上限" prop="oly.cms.articleCat.maxNum">
                <el-input-number
                  v-model="formData['oly.cms.articleCat.maxNum']"
                  controls-position="right"
                  :min="1"
                  :max="100"
                />
              </el-form-item>
              <el-form-item label="标签上限" prop="oly.cms.articleTag.maxNum">
                <el-input-number
                  v-model="formData['oly.cms.articleTag.maxNum']"
                  controls-position="right"
                  :min="0"
                  :max="100"
                >
                </el-input-number>
              </el-form-item>
              <el-form-item label="关键词上限" prop="oly.cms.articleKey.maxNum">
                <el-input-number
                  v-model="formData['oly.cms.articleKey.maxNum']"
                  controls-position="right"
                  :min="0"
                  :max="100"
                >
                </el-input-number>
              </el-form-item>
              <el-form-item label="预览图上限" prop="oly.cms.articleImg.maxNum">
                <el-input-number
                  v-model="formData['oly.cms.articleImg.maxNum']"
                  controls-position="right"
                  :min="0"
                  :max="100"
                >
                </el-input-number>
              </el-form-item>
              <el-form-item
                label="默认状态"
                prop="oly.cms.articleVisible.default"
              >
                <el-radio-group
                  v-model="formData['oly.cms.articleVisible.default']"
                >
                  <el-radio
                    v-for="dict in cms_article_visible"
                    :key="dict.value"
                    :label="dict.value"
                    >{{ dict.label }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="固定前缀" prop="oly.cms.articleUrl.prefix">
                <el-input
                  v-model="formData['oly.cms.articleUrl.prefix']"
                  type="text"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-button
      type="primary"
      @click="submitConfigForm"
      v-hasPermi="['cms:setting:config']"
      >确 定</el-button
    >
  </div>
</template>

<script setup>
import { updateConfig } from "@/api/cms/setting";
const { proxy } = getCurrentInstance();
const { cms_article_visible } = proxy.useDict("cms_article_visible");
const activeTab = ref("article");
const data = reactive({
  formData: {},
  rules: {},
});
const { formData, rules } = toRefs(data);
proxy.getConfigValueMap("cmsConfig").then((response) => {
  formData.value = response.data;
});
/** 提交按钮 */
function submitConfigForm() {
  updateConfig(formData.value).then((response) => {
    proxy.$modal.msgSuccess("修改成功");
  });
}
</script>

