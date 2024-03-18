<template>
    <el-form ref="articleRef" :model="form" :rules="rules" class="article-form" label-width="100px">
        <el-container>
            <el-header>
                <el-button-group>
                    <el-tooltip content="草稿" placement="top">
                        <el-button>top-start</el-button>
                    </el-tooltip>
                    <el-tooltip content="发布" @click="submitForm" placement="top">
                        <el-button>top-start</el-button>
                    </el-tooltip>
                    <el-tooltip content="定时发布" placement="top">
                        <el-button>top-start</el-button>
                    </el-tooltip>
                    <el-tooltip content="预览" placement="top">
                        <el-button>top-start</el-button>
                    </el-tooltip>
                </el-button-group>

            </el-header>
            <el-container>
                <left :maxWidth="'25vw'">
                    <el-tabs v-model="activeTab">
                        <el-tab-pane label="基本属性" name="basic">
                            <el-form-item label="标签" prop="tagIds">
                                <el-select  size="large" v-model="form.tagIds" multiple placeholder="请选择标签" style="width: 240px"
                                    :multiple-limit="maxTag">
                                    <el-option v-for="item in tagOptions" :key="item.categoryId" :label="item.categoryName"
                                        :disabled="
                                            Boolean(item.visible) && form.tagIds.indexOf(item.categoryId) == -1
                                        " :value="item.categoryId" />
                                </el-select>
                            </el-form-item> <el-form-item label="评论开关" prop="allowComment">
                                <el-radio-group v-model="form.allowComment">
                                    <el-radio v-for="dict in sys_true_false" :key="dict.value"
                                        :label="dict.value == 'true' ? true : false">{{
                                            dict.label }}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item   label="固定链接" prop="articleUrl">
                                <el-input size="large"  v-model="form.articleUrl" placeholder="请输入文章固定链接" />
                            </el-form-item>
                            <el-form-item   label="转载url" prop="reprintUrl">
                                <el-input size="large" v-model="form.reprintUrl" placeholder="请输入转载url" />
                            </el-form-item>
                            <el-tooltip content="从本地选择图片" placement="top">
                                <el-button size="small" type="primary" icon="Plus" @click="chooseImgDialog"
                                    style="position: relative; top: 90px; right: -50px">
                                </el-button>
                            </el-tooltip>
                            <el-form-item label="缩略图" prop="articleImg">
                                <image-upload v-model="form.articleImg" @delete="deleteChoose" :limit="maxImg" />
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
                                <keys-tag v-model="form.keywords" :limit="maxKey" :min-length="2" :max-length="5" />
                            </el-form-item>
                            <el-form-item label="描述" prop="description">
                                <el-input v-model="form.description" type="textarea" :rows="4" placeholder="请输入描述" />
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
                                    <el-option-group :key="activeTheme.webName" :label="activeTheme.webName">
                                        <el-option :key="activeTheme.siteName" :label="activeTheme.siteName" disabled
                                            :value="activeTheme.webName + '_' + activeTheme.themeName" />
                                    </el-option-group>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item  size="large" label="文章分类" prop="categoryIds">
                                <el-tree-select v-model="form.categoryIds" :data="categoryOptions" node-key="id" :props="{
                                    value: 'id',
                                    label: 'label',
                                    children: 'children',
                                    disabled: getCategoryDisabled,
                                }" value-key="id" placeholder="请选择分类" check-strictly multiple collapse-tags
                                    :multiple-limit="maxCategory" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item  size="large" label="文章类型" prop="articleType">
                                <el-select v-model="form.articleType" placeholder="请选择文章类型">
                                    <el-option v-for="dict in cms_article_type" :key="dict.value" :label="dict.label"
                                        :value="Number(dict.value)">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item  size="large" label="文章标题" prop="articleTitle">
                                <el-input v-model="form.articleTitle" placeholder="请输入文章标题" maxlength="64"
                                    show-word-limit />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="文章内容" prop="articleContent">
                                <vue3-tinymce v-model="form.articleContent" />
                            </el-form-item>
                        </el-col>
                    </el-row>






                </el-main>
            </el-container>
        </el-container>
    </el-form>
    <el-dialog title="选择图片" v-model="openImgDialog" lock-scroll width="705px" append-to-body>
        <el-checkbox-group class="dialog-box" v-model="imgCheck" @change="check">
            <div class="dialog-li" v-for="(item, index) in imgSrcs">
                <el-checkbox class="dialog-check" :key="index" :label="item" size="large">
                    &nbsp
                </el-checkbox>
                <img :src="item" class="dialog-img" />
            </div>
        </el-checkbox-group>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="chooseOk">选择完成</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup name="TinymceEdit">
import KeysTag from "@/components/KeysTag";
import {
    getArticle,
    addArticle,
    updateArticle,
    categoryTree,
    themeMap,
    listTag
} from "@/api/cms/article";
import Vue3Tinymce from "@/components/Editor/TinymceEdit";
import left from "@/components/Left";
import { getTheme } from "@/api/cms/theme";
const route = useRoute();
const activeTab = ref('basic')
const { proxy } = getCurrentInstance();
const { sys_true_false, cms_article_type } = proxy.useDict(
    "sys_true_false",
    "cms_article_type"
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
            { validator: urlRemote, trigger: "blur" }
        ],
        articleType: [
            { required: true, message: "文章类型不能为空", trigger: "change" },
        ],
        articleContent: [
            { required: true, message: "文章内容不能为空", trigger: "blur" },
        ],
        allowComment: [
            {
                required: true,
                message: "是否允许回复 0关闭 1开启不能为空",
                trigger: "blur",
            },
        ],
    },
});

const { form, rules } = toRefs(data);
//获取参数 webName,themeName,articleId

//只有webName,themeName为添加

//只有webName,themeName,articleId为添加

//判断文章是否支持当前类型

//查询文章
function selectArticle() {
    if (route.query && route.query.articleId) {
        getArticle(route.query.articleId).then((response) => {
            form.value = response.data;
        });
    }
    else {
        autoComplateUrl()
    }
    if (route.query && route.query.webName && route.query.themeName) {
        let themeName = route.query.webName + "_" + route.query.themeName;
        echoTheme(route.query.webName, route.query.themeName);
        getCategoryTree(themeName);
        getListTag(themeName);
    }
}
// 自动填充Url
function autoComplateUrl() {
    form.value.articleUrl = new Date().getTime() + '';
}

/** 查询树下拉树结构 */
function getCategoryTree(themeName) {
    categoryTree({ nodeTypes: '2,3', themeName: themeName, visible: 0 }).then((response) => {
        categoryOptions.value = response.data;
    });
}

/** 查询标签列表 */
function getListTag(themeName) {
    listTag({ nodeTypes: '5', themeName: themeName, visible: 0 }).then((response) => {
        tagOptions.value = response.data;
    });
}

// 回显主题名
function echoTheme(webName, themeName) {
    getTheme(webName, themeName).then((res) => {
        activeTheme.value = res.data;
        form.value.syncThemeName = webName + "_" + themeName;
    })

}

function init() {
    selectArticle()
}

init();


function titleRemote(rule, value, callback) {
    proxy.remote("/cms/article/check", { articleTitle: value, articleId: form.value.articleId }).then((res) => {
        if (res.data) {
            return callback();
        }
        else {
            return callback(new Error("标题名已经存在,请检查!"));
        }
    });
}

function urlRemote(rule, value, callback) {
    proxy.remote("/cms/article/check", { articleUrl: value, articleId: form.value.articleId }).then((res) => {
        if (res.data) {
            return callback();
        }
        else {
            return callback(new Error("固定路径已经存在,请检查!"));
        }
    });
}



// 文章截取的图片
const imgSrcs = ref([]);
const imgCheck = ref([]);
const openImgDialog = ref(false);

watch(() => form.value.articleUrl, (newValue, oldValue) => {
    if (newValue != undefined && newValue.substr(0, 1) != '/') {
        form.value.articleUrl = "/" + newValue;
    }
}, { deep: true, immediate: true })


function setConfig() {
    proxy.getConfigValueMap("cmsConfig").then((response) => {
        const data = response.data;
        maxCategory.value = data["oly.cms.articleCategory.maxNum"];
        maxTag.value = data["oly.cms.articleTag.maxNum"];
        maxImg.value = data["oly.cms.articleImg.maxNum"];
        maxKey.value = data["oly.cms.articleKey.maxNum"];
    });
}

setConfig();

function submitForm() {
    form.value.articleBuild = 0;
    proxy.$refs["articleRef"].validate((valid) => {
        if (valid) {
            // 关闭当前tab页签，打开新页签
            const obj = { path: "/cms/article", name: "Article" };
            if (form.value.articleId != null) {
                updateArticle(form.value).then((response) => {
                    proxy.$modal.msgSuccess("修改成功");
                    proxy.$tab.closeOpenPage(obj).then(() => {
                        proxy.$tab.refreshPage(obj);
                    });
                });
            } else {
                addArticle(form.value).then((response) => {
                    proxy.$modal.msgSuccess("新增成功");
                    proxy.$tab.closeOpenPage(obj).then(() => {
                        proxy.$tab.refreshPage(obj);
                    });
                });
            }
        }
    });
}

function getCategoryDisabled(da, node) {
    return Boolean(da.visible) && form.value.categoryIds.indexOf(da.id) == -1;
}

function deleteChoose(value) {
    if (imgCheck.value.length > 0) {
        imgCheck.value.forEach((item, index) => {
            if (item == value) {
                imgCheck.value.splice(index, 1);
                return false;
            }
        });
    }
}

function chooseImgDialog() {
    if (
        form.value.articleImg != undefined &&
        maxImg.value < form.value.articleImg.split(",").length + 1
    ) {
        proxy.$modal.msgError("请确保图集数不大于" + maxImg.value);
    } else {
        openImgDialog.value = true;
        imgSrcs.value = chooseImg(form.value.articleContent);
        //过滤选择不存在的
        imgCheck.value = imgCheck.value.filter((v) => imgSrcs.value.include(v));
    }
}

function chooseOk() {
    const c = imgCheck.value;
    let f = imgCheck.value;
    if (form.value.articleImg != undefined) {
        f = form.value.articleImg.split(",").concat(imgCheck.value);
        f = f.filter((item, index, arr) => {
            return f.indexOf(item, 0) === index; //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
        });
    }
    if (f.length > maxImg.value) {
        proxy.$modal.msgError("请确保图集数不大于" + maxImg.value);
        c.splice(c.length - 1, 1);
        f.splice(f.length - 1, 1);
    } else {
        form.value.articleImg = f.join(",");
    }
    openImgDialog.value = false;
}

function check(value) {
    const c = imgCheck.value;
    let f = imgCheck.value.length;
    if (form.value.articleImg != undefined) {
        //合并
        let o = form.value.articleImg.split(",").concat(imgCheck.value);
        //过滤
        o = o.filter((item, index, arr) => {
            return o.indexOf(item, 0) === index; //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
        });
        f = o.length;
    }
    if (f > maxImg.value) {
        proxy.$modal.msgError("请确保图集数不大于" + maxImg.value);
        c.splice(c.length - 1, 1);
    }
}



function chooseImg(str) {
    const data = [];
    var arr = str.match(/<img.*?(?:>|\/>)/gi);
    if (arr == null) {
        return data;
    }
    for (var i = 0; i < arr.length; i++) {
        var src = arr[i].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i);
        //获取图片地址
        if (src[1]) {
            data.push(src[1]);
        }
    }
    return data;
}
</script>

<style lang="scss" scoped>
.dialog-box {
    border: 2px solid #f5f5f8;
    padding: 20px;
    max-height: 680px;
    overflow-y: scroll;

    .dialog-li {
        padding: 5px;
        width: 200px;
        height: 200px;
        border: 1px solid #f5f5f8;
        float: left;
        overflow: hidden;
        position: relative;

        .dialog-img {
            max-width: 200px;
            max-height: 200px;
        }

        .dialog-check {
            position: absolute;
        }
    }
}
</style>