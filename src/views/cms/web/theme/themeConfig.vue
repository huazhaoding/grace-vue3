<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>站点配置</span>
          </div>
        </template>
        <div>
      <el-form :model="formData" ref="vForm" label-width="120px" size="default">
        <div class="tab-container">
          <el-tabs v-model="activeTab" type="border-card">
            <el-tab-pane name="tab-1" label="网站设置">
              <el-form-item label="网站标题：" prop="oly.web.title">
                <el-input
                  v-model="formData['oly.web.title']"
                  type="text"
                  placeholder="请输入网站标题"
                ></el-input>
              </el-form-item>
              <el-form-item label="站点域名：" prop="oly.web.domain">
                <el-input
                  v-model="formData['oly.web.domain']"
                  type="text"
                  placeholder="请输入网站域名"
                ></el-input>
              </el-form-item>
              <el-form-item label="LOGO: " prop="oly.web.logo">
                <image-upload v-model="formData['oly.web.logo']" :limit="1" />
              </el-form-item>
              <el-form-item label="ICO: " prop="oly.web.ico">
                <image-upload v-model="formData['oly.web.ico']" :limit="1" />
              </el-form-item>
              <el-form-item label="网站版权：" prop="oly.web.copyright">
                <el-input
                  type="textarea"
                  v-model="formData['oly.web.copyright']"
                  rows="3"
                  placeholder="请输入网站版权"
                ></el-input>
              </el-form-item>
              <el-form-item label="页脚设置：" prop="oly.web.footer">
                <el-input
                  type="textarea"
                  v-model="formData['oly.web.footer']"
                  rows="3"
                  placeholder="请输入页脚设置"
                ></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="tab-2" label="默认页面">
              <el-form-item label="首页：" prop="oly.web.pageIndex">
                <el-input-number
                  v-model="formData['oly.web.pageIndex']"
                  controls-position="right"
                  :min="0"
                  :max="100000000000"
                  :precision="0"
                  :step="1"
                >
                </el-input-number>
              </el-form-item>
              <el-form-item label="分类页：" prop="oly.web.pageCategory.classify">
                <el-input-number
                  v-model="formData['oly.web.pageCategory.classify']"
                  controls-position="right"
                  :min="0"
                  :max="100000000000"
                  :precision="0"
                  :step="1"
                >
                </el-input-number>
              </el-form-item>
              <el-form-item label="标签页：" prop="oly.web.pageCategory.tag">
                <el-input-number
                  v-model="formData['oly.web.pageCategory.tag']"
                  controls-position="right"
                  :min="0"
                  :max="100000000000"
                  :precision="0"
                  :step="1"
                >
                </el-input-number>
              </el-form-item>
              <el-form-item label="排行榜：" prop="oly.web.pageRank">
                <el-input-number
                  v-model="formData['oly.web.pageRank']"
                  controls-position="right"
                  :min="0"
                  :max="100000000000"
                  :precision="0"
                  :step="1"
                >
                </el-input-number>
              </el-form-item>
              <el-form-item label="导航页：" prop="oly.web.pageLinks">
                <el-input-number
                  v-model="formData['oly.web.pageLinks']"
                  controls-position="right"
                  :min="0"
                  :max="100000000000"
                  :precision="0"
                  :step="1"
                >
                </el-input-number>
              </el-form-item>
              <el-form-item label="时间线：" prop="oly.web.pageTimeLine">
                <el-input-number
                  v-model="formData['oly.web.pageTimeLine']"
                  controls-position="right"
                  :min="0"
                  :max="100000000000"
                  :precision="0"
                  :step="1"
                >
                </el-input-number>
              </el-form-item>
              <el-form-item label="关于本站" prop="oly.web.pageAbout">
                <el-input-number
                  v-model="formData['oly.web.pageAbout']"
                  controls-position="right"
                  :min="0"
                  :max="100000000000"
                  :precision="0"
                  :step="1"
                >
                </el-input-number>
              </el-form-item>
              <el-form-item label="联系页：" prop="oly.web.pageCallMe">
                <el-input-number
                  v-model="formData['oly.web.pageCallMe']"
                  controls-position="right"
                  :min="0"
                  :max="100000000000"
                  :precision="0"
                  :step="1"
                >
                </el-input-number>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="tab-3" label="主题设置">
              <el-form-item
                label="支持类型："
                prop="oly.web.article.supportType"
              >
                <el-select
                  v-model="formData['oly.web.article.supportType']"
                  multiple
                  placeholder="请选择类型"
                  style="width: 240px"
                >
                  <el-option
                    v-for="dict in cms_support_type"
                    :key="dict.value"
                    :label="dict.label"
                    :value="String(dict.value)"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="评论开关：" prop="oly.web.comment.enable">
                <el-switch
                  v-model="formData['oly.web.comment.enable']"
                ></el-switch>
              </el-form-item>
              <el-form-item label="重建索引：">
                <el-button>重建</el-button>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="tab-4" label="站点相关">
              <el-form-item label="作者：" prop="oly.web.author">
                <el-input
                  v-model="formData['oly.web.author']"
                  type="text"
                  placeholder="请输入作者"
                ></el-input>
              </el-form-item>
              <el-form-item label="关于作者：" prop="oly.web.aboutAuthor">
                <el-input
                  type="textarea"
                  v-model="formData['oly.web.aboutAuthor']"
                  rows="3"
                ></el-input>
              </el-form-item>
              <el-form-item label="关于站点：" prop="oly.web.aboutSite">
                <el-input
                  type="textarea"
                  v-model="formData['oly.web.aboutSite']"
                  rows="3"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="oly.web.authorCall">
                <el-input
                  type="textarea"
                  v-model="formData['oly.web.authorCall']"
                  rows="3"
                ></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="tab-5" label="其他设置">
              <el-form-item label="自定义头部：" prop="oly.web.head">
                <el-input
                  type="textarea"
                  v-model="formData['oly.web.head']"
                  rows="3"
                  placeholder="请输入自定义标题"
                ></el-input>
              </el-form-item>
              <el-form-item label="自定义脚本：" prop="oly.web.script">
                <el-input
                  type="textarea"
                  v-model="formData['oly.web.script']"
                  rows="3"
                  placeholder="请输入自定义脚本"
                ></el-input>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-form>
      <el-button
        style="margin-left: 40%; margin-top: 10px"
        type="primary"
        @click="submitForm"
        >确 定</el-button
      >
    </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>主题信息</span>
            <el-button type="primary" class="o"  @click="updateHandel()">保存修改</el-button>
          </div>
        </template>
        <div>
          <el-form-item label="所属站点：">
            {{ themeData.webName }}
          </el-form-item>
          <el-form-item label="主题编号：">
            {{ themeData.themeName }}
          </el-form-item>
          <el-form-item label="主题名字：">
            <el-input
              v-model="themeData.siteName"
              type="text"
              placeholder="请输入主题名字"
            ></el-input>
          </el-form-item>
          <el-form-item label="主题类型：">
            {{ themeData.themeType }}
          </el-form-item>
          <el-form-item label="主题状态：">
            <el-radio-group v-model="themeData.themeEnabled">
                <el-radio v-for="dict in cms_theme_enabled" :key="dict.value" :label="Number(dict.dictSort)">{{ dict.label }}
                </el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="主类别ID：">
            <el-select
              v-model="themeData.supportThemeCategoryId"
              class="m-2"
              placeholder="请选择类别ID"
              size="large"
              style="width: 240px"
            >
              <el-option
                v-for="item in categoryData"
                :key="item.categoryName"
                :label="item.categoryName"
                :value="item.categoryId"
              />
          </el-select>
          </el-form-item>
          <el-form-item label="支持更新：">
            <el-switch disabled v-model="themeData.themeUpdate"></el-switch>
          </el-form-item>
          <el-form-item label="主题地址：">
            {{ themeData.themeUrl }}
          </el-form-item>
          <el-form-item label="创建人：">
            {{ themeData.createBy }}
          </el-form-item>
          <el-form-item label="联系方式：">
            <JsonTag labelName="社交平台" valueName="账号" v-model="themeData.themeTouch" ></JsonTag>
          </el-form-item>
          <el-form-item label="主题作者：">
            {{ themeData.themeAuthor }}
          </el-form-item>
          <el-form-item label="创建时间：">
            {{ themeData.createTime }}
          </el-form-item>
          <el-form-item label="主题介绍：">
            {{ themeData.themeInfo }}
          </el-form-item>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup name="ThemeConfig">
import { updateConfig, getTheme,updateTheme } from "@/api/cms/theme";
import JsonTag from "@/components/JsonTag";
import {
  listCategory
} from "@/api/cms/category";
import { ref } from "vue";
const route = useRoute();
const { proxy } = getCurrentInstance();
const { cms_support_type,cms_theme_enabled,cms_theme_type } = proxy.useDict("cms_support_type","cms_theme_enabled","cms_theme_type");
const emit = defineEmits(["update:modelValue"]);
const activeTab = ref("tab-1");
const themeData = ref({});
const webName = ref(route.params.webName);
const themeName = ref(route.params.themeName);
const categoryData=ref({});
const data = reactive({
  formData: {},
});

const { formData } = toRefs(data);
getConfig();

/** 修改配置 */
function getConfig() {
  try {
    proxy
      .getConfigValueMap(webName.value + "_" + themeName.value)
      .then((response) => {
        formData.value = response.data;
        formData.value["oly.web.article.supportType"] = formData.value[
          "oly.web.article.supportType"
        ]
          ? formData.value["oly.web.article.supportType"].split(",")
          : [];
      });
  } catch (error) {}
}

getTheme(webName.value, themeName.value).then((response) => {
  themeData.value = response.data;
});

listCategory({nodeType:1}).then(
    (response) => {
      categoryData.value = response.data;
    }
  );

function updateHandel(){
  updateTheme(themeData.value).then((response) => {
    proxy.$modal.msgSuccess("修改成功");
});
}

//传递表单
function submitForm() {
  formData.value["oly.web.article.supportType"] = formData.value[
    "oly.web.article.supportType"
  ]
    ? formData.value["oly.web.article.supportType"].join(",")
    : "";
  updateConfig(webName.value, themeName.value, formData.value)
    .then((response) => {
      proxy.$modal.msgSuccess("修改成功");
    })
    .catch((err) => {
      proxy.$modal.msgError("修改失败");
    });
}
</script>

<style>
.o{
  float: right;
  margin-top: -10px;
}
</style>