<template>
  <div class="app-container">
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
                    <el-form-item label="网站标题:" prop="oly.web.title">
                      <el-input v-model="formData['oly.web.title']" type="text" placeholder="请输入网站标题"></el-input>
                    </el-form-item>
                    <el-form-item label="站点域名:" prop="oly.web.domain">
                      <el-input v-model="formData['oly.web.domain']" type="text" placeholder="请输入网站域名"></el-input>
                    </el-form-item>
                    <el-form-item label="LOGO: " prop="oly.web.logo">
                      <image-upload v-model="formData['oly.web.logo']" :limit="1" />
                    </el-form-item>
                    <el-form-item label="ICO: " prop="oly.web.ico">
                      <image-upload v-model="formData['oly.web.ico']" :limit="1" />
                    </el-form-item>
                    <el-form-item label="网站版权:" prop="oly.web.copyright">
                      <el-input type="textarea" v-model.number="formData['oly.web.copyright']" rows="3"
                        placeholder="请输入网站版权"></el-input>
                    </el-form-item>
                    <el-form-item label="页脚设置:" prop="oly.web.footer">
                      <el-input type="textarea" v-model.number="formData['oly.web.footer']" rows="3"
                        placeholder="请输入页脚设置"></el-input>
                    </el-form-item>
                  </el-tab-pane>
                  <el-tab-pane name="tab-2" label="默认页面">
                    <el-form-item label="首页:" prop="oly.web.pageIndex">
                      <column-select v-model="formData['oly.web.pageIndex']" :columnDatas="columnDatas"></column-select>
                    </el-form-item>
                    <el-form-item label="分类页:" prop="oly.web.pageCategory.classify">
                      <column-select v-model="formData['oly.web.pageCategory.classify']"
                        :columnDatas="columnDatas"></column-select>
                    </el-form-item>
                    <el-form-item label="标签页:" prop="oly.web.pageCategory.tag">
                      <column-select v-model="formData['oly.web.pageCategory.tag']"
                        :columnDatas="columnDatas"></column-select>
                    </el-form-item>
                    <el-form-item label="排行榜:" prop="oly.web.pageRank">
                      <column-select v-model="formData['oly.web.pageRank']" :columnDatas="columnDatas"></column-select>
                    </el-form-item>
                    <el-form-item label="导航页:" prop="oly.web.pageLinks">
                      <column-select v-model="formData['oly.web.pageLinks']" :columnDatas="columnDatas"></column-select>
                    </el-form-item>
                    <el-form-item label="时间线:" prop="oly.web.pageTimeLine">
                      <column-select v-model="formData['oly.web.pageTimeLine']"
                        :columnDatas="columnDatas"></column-select>
                    </el-form-item>
                    <el-form-item label="关于本站:" prop="oly.web.pageAbout">
                      <column-select v-model="formData['oly.web.pageAbout']" :columnDatas="columnDatas"></column-select>
                    </el-form-item>
                    <el-form-item label="联系页:" prop="oly.web.pageCallMe">
                      <column-select v-model="formData['oly.web.pageCallMe']"
                        :columnDatas="columnDatas"></column-select>
                    </el-form-item>
                  </el-tab-pane>
                  <el-tab-pane name="tab-3" label="主题设置">
                    <el-form-item label="评论开关:" prop="oly.web.comment.enable">
                      <el-switch v-model="formData['oly.web.comment.enable']"></el-switch>
                    </el-form-item>
                    <el-form-item label="重建索引文件:">
                      <el-button @click="reBulidSiteMapIndex">重建</el-button>
                    </el-form-item>
                  </el-tab-pane>
                  <el-tab-pane name="tab-4" label="站点相关">
                    <el-form-item label="作者:" prop="oly.web.author">
                      <el-input v-model="formData['oly.web.author']" type="text" placeholder="请输入作者"></el-input>
                    </el-form-item>
                    <el-form-item label="关于作者:" prop="oly.web.aboutAuthor">
                      <el-input type="textarea" v-model="formData['oly.web.aboutAuthor']" rows="3"></el-input>
                    </el-form-item>
                    <el-form-item label="关于站点:" prop="oly.web.aboutSite">
                      <el-input type="textarea" v-model="formData['oly.web.aboutSite']" rows="3"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式:" prop="oly.web.authorCall">
                      <el-input type="textarea" v-model="formData['oly.web.authorCall']" rows="3"></el-input>
                    </el-form-item>
                  </el-tab-pane>
                  <el-tab-pane name="tab-5" label="其他设置">
                    <el-form-item label="自定义头部:" prop="oly.web.head">
                      <el-input type="textarea" v-model="formData['oly.web.head']" rows="3"
                        placeholder="请输入自定义标题"></el-input>
                    </el-form-item>
                    <el-form-item label="自定义脚本:" prop="oly.web.script">
                      <el-input type="textarea" v-model="formData['oly.web.script']" rows="3"
                        placeholder="请输入自定义脚本"></el-input>
                    </el-form-item>
                  </el-tab-pane>
                  <el-tab-pane name="tab-6" label="用户设置">
                    <el-form-item prop="oly.web.hand.back">
                      <template #label>
                        <span>
                          背景:
                          <el-tooltip placement="top">
                            <template #content>
                              <div>
                                登录页或者注册页背景
                              </div>
                            </template>
                            <el-icon><question-filled /></el-icon>
                          </el-tooltip>
                        </span>
                      </template>
                      <image-upload v-model="formData['oly.web.hand.back']" :limit="1" />
                    </el-form-item>
                    <el-form-item prop="oly.web.hand.logo">
                      <template #label>
                        <span>
                          LOGO:
                          <el-tooltip placement="top">
                            <template #content>
                              <div>
                                登录页或者注册页LOGO
                              </div>
                            </template>
                            <el-icon><question-filled /></el-icon>
                          </el-tooltip>
                        </span>
                      </template>
                      <image-upload v-model="formData['oly.web.hand.logo']" :limit="1" />
                    </el-form-item>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-form>
            <el-button-group style="margin-left: 40%; margin-top: 10px"> 
              <el-button  type="success" @click="submitForm">确 定</el-button>
              <el-button style="margin-left:10px;" type="primary" @click="close">返回</el-button>
            </el-button-group>
          
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>主题信息</span>
              <el-button-group class="o">
                <el-button type="success"  @click="updateHandel()">保存</el-button>
                <el-button type="primary" style="margin-left:10px;" @click="close">返回</el-button>
              </el-button-group>
            </div>
          </template>
          <div>
            <el-form-item label="所属站点:">
              {{ themeData.webName }}
            </el-form-item>
            <el-form-item label="主题编号:">
              {{ themeData.themeName }}
            </el-form-item>
            <el-form-item label="主题名字:">
              <el-input v-model="themeData.siteName" type="text" placeholder="请输入主题名字"></el-input>
            </el-form-item>
            <el-form-item label="主题类型:">
              <el-select v-model="themeData.themeType" placeholder="请选择主题类型" style="width: 240px">
                <el-option v-for="dict in cms_theme_type" :key="dict.value" :label="dict.label"
                  :value="Number(dict.value)"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支持类型:" prop="supportArticleType">
              <el-select v-model="themeData.supportArticleType" multiple placeholder="请选择类型" style="width: 240px">
                <el-option v-for="dict in cms_article_type" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主题状态:">
              <el-radio-group v-model="themeData.themeEnabled">
                <el-radio v-for="dict in cms_theme_enabled" :key="dict.value" :value="Number(dict.dictSort)">{{
                  dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="主类别ID:">
              <el-select v-model="themeData.mainCategoryId" class="m-2" placeholder="请选择主类别" size="large"
                style="width: 240px">
                <el-option v-for="item in categoryData" :key="item.categoryId" :label="item.categoryName"
                  :value="item.categoryId" />
              </el-select>
            </el-form-item>
            <el-form-item label="主菜单ID:">
              <el-select v-model="themeData.mainColumnId" class="m-2" placeholder="请选择主菜单" size="large"
                style="width: 240px">
                <el-option v-for="item in columnMainDatas" :key="item.columnId" :label="item.columnName"
                  :value="item.columnId" />
              </el-select>
            </el-form-item>
            <el-form-item label="支持更新:">
              <el-switch disabled v-model="themeData.themeUpdate"></el-switch>
            </el-form-item>
            <el-form-item label="主题地址:">
              {{ themeData.themeUrl }}
            </el-form-item>
            <el-form-item label="创建人:">
              {{ themeData.createBy }}
            </el-form-item>
            <el-form-item label="联系方式:">
              <JsonTag labelName="社交平台" valueName="账号" v-model="themeData.themeTouch"></JsonTag>
            </el-form-item>
            <el-form-item label="主题作者:">
              {{ themeData.themeAuthor }}
            </el-form-item>
            <el-form-item label="创建时间:">
              {{ themeData.createTime }}
            </el-form-item>
            <el-form-item label="主题介绍:">
              {{ themeData.themeInfo }}
            </el-form-item>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="ThemeConfig">
import { updateConfig, getTheme, updateTheme, updateSiteMapIndex } from "@/api/cms/theme";
import JsonTag from "@/components/JsonTag";
import ColumnSelect from "../components/columnSelect.vue";
import {
  listCategory
} from "@/api/cms/category";
import {
  listColumn
} from "@/api/cms/column";

const columnDatas = ref([]);
const columnMainDatas = ref([]);
const route = useRoute();
const { proxy } = getCurrentInstance();
const { cms_article_type, cms_theme_enabled, cms_theme_type } = proxy.useDict("cms_article_type", "cms_theme_enabled", "cms_theme_type");
const emit = defineEmits(["update:modelValue"]);
const activeTab = ref("tab-1");
const themeData = ref({});
const webName = ref(route.params.webName);
const themeName = ref(route.params.themeName);
const categoryData = ref({});
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
      });
  } catch (error) { }
}

getTheme(webName.value, themeName.value).then((response) => {
  themeData.value = response.data;
  listColumn({ nodeType:1 }).then((res) => {
    columnMainDatas.value = res.data;
  });
   // 栏目列表
  listColumn({ columnId: themeData.value.mainColumnId,nodeType:3 }).then((res) => {
    columnDatas.value = res.data;
  });
  if (response.data.supportArticleType) {
    themeData.value.supportArticleType = response.data.supportArticleType.split(
      ","
    );
  }
});

//分类列表
listCategory({ nodeType: 1 }).then(
  (response) => {
    categoryData.value = response.data;
  }
);

// 表单更新
function updateHandel() {
  themeData.value.supportArticleType = themeData.value.supportArticleType.join(
    ","
  );
  updateTheme(themeData.value).then((response) => {
    proxy.$modal.msgSuccess("修改成功");
    themeData.value.supportArticleType = themeData.value.supportArticleType.split(
      ","
    ); 
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

function close(){
  const obj = { path: "/cms/web/theme/"+webName.value, query: { t: Date.now()}};
  proxy.$tab.closeOpenPage(obj);
}

// 重建索引
function reBulidSiteMapIndex() {
  proxy.$modal.confirm('是否要重建站点地图索引？').then(() => {
    updateSiteMapIndex(webName.value, themeName.value).then((response) => {
      proxy.$modal.msgSuccess("重建成功");
    }).catch(() => {
      proxy.$modal.msgError("重建异常");

    });
  }).catch(() => {
    proxy.$modal.msgError("取消重建");
  });
}

</script>

<style>
.o {
  float: right;
  margin-top: -10px;
}
</style>