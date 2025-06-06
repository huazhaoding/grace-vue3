import { createApp } from "vue";

import Cookies from "js-cookie";

import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'

import "@/assets/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";
import directive from "./directive"; // directive

// 注册指令
import plugins from "./plugins"; // plugins
import { download, downloadFile } from "@/utils/request";

// svg图标
import "virtual:svg-icons-register";
import SvgIcon from "@/components/SvgIcon";
import elementIcons from "@/components/SvgIcon/svgicon";

import "./permission"; // permission control

import {getWebConfig} from "@/settingsConfig"; //站点参数

import { useDict } from "@/utils/dict";

import { remote } from "@/utils/remote";

import {
  parseTime,
  resetForm,
  addDateRange,
  handleTree,
  selectDictLabel,
  selectDictLabels,
  includeDict,
} from "@/utils/ruoyi";

import {
  getConfigValue,
  getConfigGroups,
  getConfigMap,
  getConfigValueMap,
} from "@/api/system/config";
// 分页组件
import Pagination from "@/components/Pagination";
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar";
// 文件上传组件
import FileUpload from "@/components/FileUpload";
// 图片上传组件
import ImageUpload from "@/components/ImageUpload";
// 图片预览组件
import ImagePreview from "@/components/ImagePreview";
// Quill富文本组件
import Editor from "@/components/Editor/QuillEditor";
// 字典标签组件
import DictTag from "@/components/DictTag";


const app = createApp(App);

// 全局方法挂载
app.config.globalProperties.useDict = useDict;
app.config.globalProperties.remote = remote;
app.config.globalProperties.download = download;
app.config.globalProperties.downloadFile = downloadFile;
app.config.globalProperties.parseTime = parseTime;
app.config.globalProperties.resetForm = resetForm;
app.config.globalProperties.handleTree = handleTree;
app.config.globalProperties.addDateRange = addDateRange;
app.config.globalProperties.selectDictLabel = selectDictLabel;
app.config.globalProperties.selectDictLabels = selectDictLabels;
app.config.globalProperties.includeDict = includeDict;
// 挂载全局配置方法
app.config.globalProperties.getConfigValue = getConfigValue;
app.config.globalProperties.getConfigGroups = getConfigGroups;
app.config.globalProperties.getConfigMap = getConfigMap;
app.config.globalProperties.getConfigValueMap = getConfigValueMap;
// 挂着全局配置
app.config.globalProperties.$sysConfig = getWebConfig();


// 全局组件挂载
app.component("DictTag", DictTag);
app.component("Pagination", Pagination);
app.component("FileUpload", FileUpload);
app.component("ImageUpload", ImageUpload);
app.component("ImagePreview", ImagePreview);
app.component("RightToolbar", RightToolbar);
app.component('Editor', Editor)

app.use(router);
app.use(store);
app.use(plugins);
app.use(elementIcons);
app.component("svg-icon", SvgIcon);

directive(app);

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: locale,
  // 支持 large、default、small
  size: Cookies.get("size") || "default",
});

app.mount("#app");
