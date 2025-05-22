<template>
  <el-form
    ref="articleRef"
    :model="form"
    :rules="rules"
    class="article-form"
    label-width="100px"
  >
    <el-container>
      <el-header>
        <el-tooltip content="草稿" placement="top">
          <el-button type="primary" size="large" icon="Edit" @click="saveForm"
            >草稿</el-button
          >
        </el-tooltip>
        <el-tooltip content="发布" placement="top">
          <el-button
            type="warning"
            size="large"
            icon="Position"
            @click="submitForm"
            >发布</el-button
          >
        </el-tooltip>
        <el-tooltip content="定时发布" placement="top">
          <el-button type="success" size="large" icon="Clock"
            >定时发布</el-button
          >
        </el-tooltip>
        <el-tooltip content="预览" placement="top">
          <el-button type="info" size="large" icon="View" @click="getHtml"
            >预览</el-button
          >
        </el-tooltip>
      </el-header>
      <el-container>
        <left :maxWidth="'25vw'">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本属性" name="basic">
              <el-form-item label="内容标签" prop="tagIds">
                <el-select
                  size="large"
                  v-model="form.tagIds"
                  multiple
                  placeholder="请选择标签"
                  style="width: 240px"
                  :multiple-limit="maxTag"
                >
                  <el-option
                    v-for="item in tagOptions"
                    :key="item.categoryId"
                    :label="item.categoryName"
                    :disabled="
                      Boolean(item.visible) &&
                      form.tagIds.indexOf(item.categoryId) == -1
                    "
                    :value="item.categoryId"
                  />
                </el-select>
              </el-form-item>
              <el-form-item prop="pageType">
                <template #label>
                  <span>
                    <el-tooltip content="需要搭配主题使用" placement="top">
                      <el-icon>
                        <question-filled />
                      </el-icon>
                    </el-tooltip>
                    页面类型
                  </span>
                </template>
                <el-select
                  size="large"
                  v-model="form.pageType"
                  placeholder="请选择页面类型"
                  style="width: 240px"
                  :multiple-limit="maxTag"
                >
                  <el-option
                    v-for="dict in cms_page_type"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="评论开关" prop="allowComment">
                <el-radio-group v-model="form.allowComment">
                  <el-radio
                    v-for="dict in sys_true_false"
                    :key="dict.value"
                    :value="dict.value == 'true' ? true : false"
                    >{{ dict.label }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="articleUrl">
                <template #label>
                  <span>
                    <el-tooltip content="不为空则需要保持唯一" placement="top">
                      <el-icon>
                        <question-filled />
                      </el-icon>
                    </el-tooltip>
                    固定链接
                  </span>
                </template>
                <el-input
                  size="large"
                  v-model="form.articleUrl"
                  maxlength="64"
                  placeholder="请输入文章固定链接"
                  show-word-limit
                />
              </el-form-item>
              <el-form-item prop="reprintUrl">
                <template #label>
                  <span>
                    <el-tooltip content="为空为原创" placement="top">
                      <el-icon>
                        <question-filled />
                      </el-icon>
                    </el-tooltip>
                    转载连接
                  </span>
                </template>
                <el-input
                  size="large"
                  v-model="form.reprintUrl"
                  maxlength="64"
                  placeholder="请输入转载url"
                  show-word-limit
                />
              </el-form-item>
              <!-- 缩略图 -->
              <el-form-item label="缩略图" prop="articleImg">
                <slot
                  name="thumbnailChoose"
                  :formData="form"
                  :maxImg="maxImg"
                >
                </slot>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="SEO" name="seo">
              <el-form-item prop="keywords">
                <template #label>
                  <span>
                    <el-tooltip content="关键词限制1-8个字符" placement="top">
                      <el-icon>
                        <question-filled />
                      </el-icon>
                    </el-tooltip>
                    关键词
                  </span>
                </template>
                <keys-tag
                  v-model="form.keywords"
                  :limit="maxKey"
                  :min-length="2"
                  :max-length="5"
                />
              </el-form-item>
              <el-form-item label="内容描述" prop="description">
                <el-input
                  v-model="form.description"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入描述"
                  maxlength="256"
                  show-word-limit
                />
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="扩展字段" name="extra">Role</el-tab-pane>
          </el-tabs>
        </left>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item size="large" label="文章所属" prop="syncThemeName">
                <el-select ref="themeSelectRef" v-model="form.syncThemeName">
                  <el-option-group
                    :key="activeTheme.webName"
                    :label="activeTheme.webName"
                  >
                    <el-option
                      :key="activeTheme.siteName"
                      :label="activeTheme.siteName"
                      disabled
                      :value="activeTheme.webName + '_' + activeTheme.themeName"
                    />
                  </el-option-group>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item size="large" label="文章分类" prop="categoryIds">
                <el-tree-select
                  v-model="form.categoryIds"
                  :data="categoryOptions"
                  node-key="id"
                  :props="{
                    value: 'id',
                    label: 'label',
                    children: 'children',
                    disabled: getCategoryDisabled,
                  }"
                  value-key="id"
                  placeholder="请选择分类"
                  check-strictly
                  multiple
                  collapse-tags
                  :multiple-limit="maxCategory"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item size="large" label="文章类型" prop="articleType">
                <el-select
                  v-model="form.articleType"
                  placeholder="请选择文章类型"
                >
                  <el-option
                    v-for="dict in cms_article_type"
                    :key="dict.value"
                    :label="dict.label"
                    :value="Number(dict.value)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item size="large" label="文章标题" prop="articleTitle">
                <el-input
                  v-model="form.articleTitle"
                  placeholder="请输入文章标题"
                  maxlength="128"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <!-- 内容编辑器 -->
              <el-form-item label="内容编辑" prop="articleContent">
                <slot
                  name="editContent"
                  :formData="form"
                ></slot>
              </el-form-item>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </el-form>
</template>

<script setup>
import KeysTag from "@/components/KeysTag";
import {
  getArticle,
  addArticle,
  updateArticle,
  categoryTree,
  listTag,
} from "@/api/cms/article";
import left from "@/components/Left";
import { getTheme } from "@/api/cms/theme";

const props = defineProps({
  articleContent: {
    type: String,
    default: "",
  },
  articleImg: {
    type: String,
    default: "",
  },
  articleBuild: {
    type: Number,
    default: 1,
  },
});

const route = useRoute();
const activeTab = ref("basic");
const { proxy } = getCurrentInstance();
const { sys_true_false, cms_article_type, cms_page_type } = proxy.useDict(
  "sys_true_false",
  "cms_article_type",
  "cms_page_type"
);
const categoryOptions = ref(undefined);
const tagOptions = ref(undefined);
const maxTag = ref(undefined);
const maxCategory = ref(undefined);
const maxImg = ref(undefined);
const maxKey = ref(undefined);
const activeTheme = ref({});
const data = reactive({
  form: { allowComment: true },
  rules: {
    articleTitle: [
      { required: true, message: "文章标题不能为空", trigger: "blur" },
      { validator: titleRemote, trigger: "blur" },
    ],
    articleUrl: [
      { required: true, message: "固定路径不能为空", trigger: "blur" },
      { validator: urlRemote, trigger: "blur" },
    ],
    articleType: [
      { required: true, message: "文章类型不能为空", trigger: "change" },
    ],
    allowComment: [
      {
        required: true,
        message: "是否允许回复 0关闭 1开启不能为空",
        trigger: "blur",
      },
    ],
    articleContent: [
      {
        required: true,
        message: "内容不能为空",
        trigger: "blur",
      },
    ],
  },
});

const { form, rules } = toRefs(data);

// 监听编辑器内容变化
watch(
  () => props.articleContent,
  (val) => {
    if (val) {
      form.value.articleContent = val;
    }
  },
  { deep: true, immediate: true }
);

// 监听选择缩略图内容变化
watch(
  () => props.articleImg,
  (val) => {
    form.value.articleImg = val ;
  },
  { deep: true, immediate: true }
);


//查询文章
function selectArticle() {
  //修改文章
  if (route.params && route.params.articleId) {
    getArticle(route.params.articleId).then((response) => {
      form.value = response.data;
      let theme = response.theme;
      let themeName = theme.webName + "_" + theme.themeName;
      activeTheme.value = theme;
      form.value.syncThemeName = themeName;
      getCategoryTree(themeName);
      getListTag(themeName);
    });
  }
  //添加文章
  else if (route.query && route.query.webName && route.query.themeName) {
    let themeName = route.query.webName + "_" + route.query.themeName;
    echoTheme(route.query.webName, route.query.themeName);
    getCategoryTree(themeName);
    getListTag(themeName);
    autoCompleteUrl();
  } else {
  }
}

// 自动填充Url
function autoCompleteUrl() {
  form.value.articleUrl = new Date().getTime() + "";
}

/** 查询树下拉树结构 */
function getCategoryTree(themeName) {
  categoryTree({ nodeTypes: "2,3", themeName: themeName, visible: 0 }).then(
    (response) => {
      categoryOptions.value = response.data;
    }
  );
}

/** 查询标签列表 */
function getListTag(themeName) {
  listTag({ nodeTypes: "5", themeName: themeName, visible: 0 }).then(
    (response) => {
      tagOptions.value = response.data;
    }
  );
}

// 回显主题名
function echoTheme(webName, themeName) {
  getTheme(webName, themeName).then((res) => {
    activeTheme.value = res.data;
    form.value.syncThemeName = webName + "_" + themeName;
  });
}

// 获取配置参数
function setConfig() {
  proxy.getConfigValueMap("cmsConfig").then((response) => {
    const data = response.data;
    maxCategory.value = data["oly.cms.articleCategory.maxNum"];
    maxTag.value = data["oly.cms.articleTag.maxNum"];
    maxImg.value = data["oly.cms.articleImg.maxNum"];
    maxKey.value = data["oly.cms.articleKey.maxNum"];
  });
}

function init() {
  selectArticle();
  setConfig();
}

init();

function getHtml() {
  return "";
}

//标题验证
function titleRemote(rule, value, callback) {
  proxy
    .remote("/cms/article/check", {
      articleTitle: value,
      articleId: form.value.articleId,
    })
    .then((res) => {
      if (res.data) {
        return callback();
      } else {
        return callback(new Error("标题名已经存在,请检查!"));
      }
    });
}

// url验证
function urlRemote(rule, value, callback) {
  proxy
    .remote("/cms/article/check", {
      articleUrl: value,
      articleId: form.value.articleId,
    })
    .then((res) => {
      if (res.data) {
        return callback();
      } else {
        return callback(new Error("固定路径已经存在,请检查!"));
      }
    });
}
//监听Url
watch(
  () => form.value.articleUrl,
  (newValue, oldValue) => {
    if (newValue != undefined && newValue.substr(0, 1) != "/") {
      form.value.articleUrl = "/" + newValue;
    }
  },
  { deep: true, immediate: true }
);

// 表单提交
function submitForm() {
  proxy.$refs["articleRef"].validate((valid) => {

    if (valid) {
      // 关闭当前tab页签，打开新页签
      const obj = { path: "/cms/article", name: "Article" };
      if (form.value.articleId != null) {
        updateArticle(form.value).then((response) => {
          if (response.code == 200) {
            proxy.$modal.msgSuccess("修改成功");
            proxy.$tab.closeOpenPage(obj).then(() => {
              proxy.$tab.refreshPage(obj);
            });
          } else {
            proxy.$modal.msgError("修改失败!");
          }
        });
      } else {
        addArticle(form.value).then((response) => {
          if (response.code == 200) {
            proxy.$modal.msgSuccess("新增成功");
            proxy.$tab.closeOpenPage(obj).then(() => {
              proxy.$tab.refreshPage(obj);
            });
          } else {
            proxy.$modal.msgError("添加失败!");
          }
        });
      }
    }
  });
}

//保存文章
function saveForm() {
  form.value.visible = 1;
  submitForm();
}

function getCategoryDisabled(da, node) {
  return Boolean(da.visible) && form.value.categoryIds.indexOf(da.id) == -1;
}
</script>
