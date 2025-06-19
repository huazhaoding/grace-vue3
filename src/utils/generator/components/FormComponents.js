export const FormComponents = [
  {
    tag: "el-autocomplete",
    tagLabel: "自动补全",
    tagIcon: "icon-autocomplete",
    document: "https://element.eleme.cn/#/zh-CN/component/autocomplete",
    attr: {
      "model-value": null, // 选中项绑定值
      placeholder: null, // 占位文本
      clearable: false, // 是否可清空
      disabled: false, // 自动补全组件是否被禁用
      "value-key": "value", // 输入建议对象中用于显示的键名
      debounce: 300, // 获取输入建议的防抖延时，单位为毫秒
      placement: "bottom-start", // 菜单弹出位置
      "fetch-suggestions": null, // 获取输入建议的方法
      "trigger-on-focus": true, // 是否在输入框聚焦时显示建议
      "select-when-unmatched": false, // 在输入无匹配建议时按下回车是否触发 select 事件
      name: null, // 等价于原生 input name 属性
      "aria-label": null, // 原生 aria-label 属性
      "hide-loading": false, // 是否隐藏远程加载时的加载图标
      "popper-class": null, // 下拉列表的类名
      teleported: true, // 是否将下拉列表插入 append-to 指向的元素下
      "append-to": null, // 下拉框挂载到哪个 DOM 元素
      "highlight-first-item": false, // 是否默认高亮远程搜索结果的第一项
      "fit-input-width": false, // 下拉框的宽度是否与输入框相同
    },
  },
  {    // 表单项的标签文字
    taglabel: "多选框组",
    // 组件标签名
    tag: "el-checkbox-group",
    // 图标名称，用于可视化展示
    tagIcon: "checkbox",
    // 文档链接
    document: "https://element-plus.org/zh-CN/component/checkbox",
    attr: {
      // 默认值
      defaultValue: [],
      type: "checkbox",// 多选框组的类型checkbox or button
      // 是否禁用
      disabled: false,
      // 是否必填
      required: true,
      // 多选框组的尺寸
      size: "default", // 可选值：'large', 'default', 'small'
      min: undefined, // 多选框组的最小选择数量
      max: undefined, // 多选框组的最大选择数量
      "aria-label": undefined,//原生 aria-label属性
      "text-color": "#ffffff",//多选框组的文本颜色
      fill: "#409eff",//多选框组的填充色
      tag: "div",//多选框组的标签类型
      "validate-event": true,//是否触发表单验证
    },
    // 多选框组的选项
    options: [
      {
        label: "选项一", // 显示的标签
        value: 1, // 选项值
        "true-value": undefined,
        "false-value": undefined,
        // 是否禁用
        disabled: false,
        // 是否选中
        checked: false,
        // 是否半选中
        indeterminate:false,
        // 是否触发表单验证
        "validate-event": true,
        //与 aria-control一致, 当 indeterminate为 true时生效
        "aria-controls": undefined,
        // 输入框的 tabindex
        tabindex: 0, 
        // checkbox 的 id
        id: undefined,
        // checkbox是否显示边框
        border: false, 
        // checkbox 的尺寸
        size: "default",
        // checkbox 的 name 属性
        name: undefined
        
      },
      {
        label: "选项二",
        value: 2,
      },
      {
        label: "选项三",
        value: 3,
      },
    ],
    // 是否显示边框
  },
{ 
  tag: "el-radio-group",
  taglabel: "单选框组",
  tagIcon: "radio",
  document: "https://element-plus.org/zh-CN/component/radio",
  attr: {
    defaultValue: null,
    type: "radio",
    disabled: false,
    required: true,
    size: "default",
    min: undefined,
    max: undefined,
    name: undefined,
    "aria-label": undefined,
    "text-color": "#ffffff",
    fill: "#409eff",
    tag: "div",
    "validate-event": true,
    options: [
      {
        label: "选项一",
        value: 1,
        disabled: false,
        border: false,
        size: "default",
        name: undefined,
        id: undefined,
        fill :undefined,
      }
    ]
  },
},
 {  
    tag: "el-color-picker",
    tagLabel: "颜色选择",
    tagIcon: "color",
    document: "https://element-plus.org/zh-CN/component/color-picker",
    attr: {
    defaultValue: null,
    "show-alpha": false,
    "color-format": "",
    disabled: false,
    required: true,
    size: "default",
    regList: [],
    changeTag: true,
  },},
]