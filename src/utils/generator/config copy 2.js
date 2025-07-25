// 表单配置
export const formConf = {
  formRef: "formRef",
  formModel: "formData",
  size: "default",
  labelPosition: "right",
  labelWidth: 100,
  formRules: "rules",
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: true,
};

//基本组件
export const basicFormItems = {
  elCol: "el-col",
  elRow: "el-row",
  elInput: "el-input",
  elInputNumber: "el-input-number",
  elSelect: "el-select",
  elOption: "el-option",
  elCascader: "el-cascader",
  elDatePicker: "el-date-picker",
  elTimePicker: "el-time-picker",
}

//输入组件
export const inputFormItems = [
  {
    formItemHedge: Object.assign(
      defaultItemHedge, {
      // 表单项的标签文字
      label: "单行文本",
      // 表单域字段名，用于验证、重置等操作
      prop: "",
    }
    ),
    formItemAttr: {
      ariaLabel: "单行文本",
      tag: "el-input",
      tagIcon: "input",
      type: "text",
      placeholder: "请输入",
      defaultValue: undefined,
      style: { width: "100%" },
      clearable: true,
      prepend: "",
      append: "",
      "prefix-icon": "",
      "suffix-icon": "",
      maxlength: null,
      "show-word-limit": false,
      readonly: false,
      disabled: false,
      required: true,
      regList: [],
      changeTag: true,
      document: "https://element-plus.org/zh-CN/component/input",
    },
  },
  {
    formItemHedge: Object.assign(
      defaultItemHedge, {
      // 表单项的标签文字
      label: "多行文本",
      // 表单域字段名，用于验证、重置等操作
      prop: "",
    }
    ),
    formItemAttr: {
      ariaLabel: "多行文本",
      tag: "el-input",
      tagIcon: "textarea",
      type: "textarea",
      placeholder: "请输入",
      defaultValue: undefined,
      span: 24,
      labelWidth: null,
      autosize: {
        minRows: 4,
        maxRows: 4,
      },
      style: { width: "100%" },
      maxlength: null,
      "show-word-limit": true,
      readonly: false,
      disabled: false,
      required: true,
      regList: [],
      changeTag: true,
      document: "https://element-plus.org/zh-CN/component/input",
    },
  },
  {
    formItemHedge: Object.assign(
      defaultItemHedge, {
      // 表单项的标签文字
      label: "密码",
      // 表单域字段名，用于验证、重置等操作
      prop: "",
    }
    ),
    formItemAttr: {
      ariaLabel: "密码",
      tag: "el-input",
      tagIcon: "password",
      type: "password",
      placeholder: "请输入",
      defaultValue: undefined,
      span: 24,
      "show-password": true,
      labelWidth: null,
      style: { width: "100%" },
      clearable: true,
      prepend: "",
      append: "",
      "prefix-icon": "",
      "suffix-icon": "",
      maxlength: null,
      "show-word-limit": false,
      readonly: false,
      disabled: false,
      required: true,
      regList: [],
      changeTag: true,
      document: "https://element-plus.org/zh-CN/component/input",
    },
  },
  {
    formItemHedge: Object.assign(
      defaultItemHedge, {
      // 表单项的标签文字
      label: "计数器",
      // 表单域字段名，用于验证、重置等操作
      prop: "",
    }
    ),
    formItemAttr: {
      ariaLabel: "计数器",
      tag: "el-input-number",
      tagIcon: "number",
      placeholder: "",
      defaultValue: undefined,
      span: 24,
      labelWidth: null,
      min: undefined,
      max: undefined,
      step: undefined,
      "step-strictly": false,
      precision: undefined,
      "controls-position": "",
      disabled: false,
      required: true,
      regList: [],
      changeTag: true,
      document: "https://element-plus.org/zh-CN/component/input-number",
    },
  },
];

// 布局组件
export const layoutFormItems = [
  // layout布局
  {
  tagIcon: "el-row",
  tag: "el-row",
  justify: "start",
  align: "top",
  customTag: '',
  children: 
    {
      tagIcon: "el-col",
      tag: "el-col",
      xs: { span: 24, offset: 0, pull: 0, push: 0 },
      sm: { span: 24, offset: 0, pull: 0, push: 0 },
      md: { span: 24, offset: 0, pull: 0, push: 0 },
      lg: { span: 24, offset: 0, pull: 0, push: 0 },
      xl: { span: 24, offset: 0, pull: 0, push: 0 },
      customTag: ''
    }
},
//卡片布局

//轮播布局

//描述列表

//图片列表
  ]

//基础组件
export const basicComponents=[

] 

//基础组件
export const formComponents=[

] 

//反馈组件
export const  feedbackCompoents=[

]

//其他组件
export const  otherCompoents=[

]

//数据组件
export const  dataCompoents=[

]

// 高级组件
export const advancedFormItems = {
  elCol: "el-col",
  elRow: "el-row",
};

// 自定义组件
export const customFormItems = {
  elCol: "el-col",
  elRow: "el-row",
};

// 默认表单包围参数
export const defaultItemHedge = {
  // 表单项的标签文字
  label: "",
  // 表单域字段名，用于验证、重置等操作
  prop: "",
  // 是否必填
  required: true,
  // 表单验证规则
  rules: [],
  // 手动设置的错误提示信息
  errorMessage: "",
  // 是否显示校验错误信息
  showMessage: true,
  // 是否以行内形式展示校验信息
  inlineMessage: false,
  // 尺寸：large / default / small
  size: "default",
  // 标签宽度
  labelWidth: "100",
  // 标签位置：left / right / top
  labelPosition: "right",
  // 原生 label 的 for 属性
  for: "",
  // 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息。
  error: "",
  // 表单项的校验状态（success/error/validating）
  validateStatus: "",
};

// 默认表单配置
export const defaultConf = {
  // 表单数据对象，用于绑定表单输入的值
  model: {},
  // 表单验证规则对象，定义各个字段的验证逻辑
  rules: {},
  // 是否为行内表单，设置为 true 时表单项水平排列
  inline: false,
  // 标签对齐位置，可选值：'left', 'right', 'top',''
  labelPosition: "",
  // 标签宽度，可以是像素值或百分比或者'auto'
  labelWidth: "100px",
  // 标签后缀，通常为冒号（:）
  labelSuffix: "",
  // 是否隐藏必填字段前的红色星号
  hideRequiredAsterisk: false,
  // 必填星号的位置，可选值：'left' 或 'right'
  requireAsteriskPosition: "left",
  // 是否显示校验错误信息
  showMessage: true,
  // 是否以行内形式展示校验信息
  inlineMessage: false,
  // 是否在输入框中显示状态图标（如成功或错误图标）
  statusIcon: false,
  // 当 rules 属性改变时是否重新触发校验
  validateOnRuleChange: true,
  // 表单组件尺寸，可选值：'large', 'default', 'small'
  size: "default",
  // 是否禁用整个表单内的所有组件
  disabled: false,
  // 当校验失败时是否自动滚动到第一个错误表单项
  scrollToError: false,
  // 滚动到错误项时的配置选项（例如偏移量等）
  scrollIntoViewOptions: true,
};

export const inputComponents = [
  {
    label: "多行文本",
    tag: "el-input",
    tagIcon: "textarea",
    type: "textarea",
    placeholder: "请输入",
    defaultValue: undefined,
    span: 24,
    labelWidth: null,
    autosize: {
      minRows: 4,
      maxRows: 4,
    },
    style: { width: "100%" },
    maxlength: null,
    "show-word-limit": true,
    readonly: false,
    disabled: false,
    required: true,
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/input",
  },
  {
    label: "密码",
    tag: "el-input",
    tagIcon: "password",
    type: "password",
    placeholder: "请输入",
    defaultValue: undefined,
    span: 24,
    "show-password": true,
    labelWidth: null,
    style: { width: "100%" },
    clearable: true,
    prepend: "",
    append: "",
    "prefix-icon": "",
    "suffix-icon": "",
    maxlength: null,
    "show-word-limit": false,
    readonly: false,
    disabled: false,
    required: true,
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/input",
  },
  {
    label: "计数器",
    tag: "el-input-number",
    tagIcon: "number",
    placeholder: "",
    defaultValue: undefined,
    span: 24,
    labelWidth: null,
    min: undefined,
    max: undefined,
    step: undefined,
    "step-strictly": false,
    precision: undefined,
    "controls-position": "",
    disabled: false,
    required: true,
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/input-number",
  },
];

export const selectComponents = [
  {
    label: "下拉选择",
    tag: "el-select",
    tagIcon: "select",
    placeholder: "请选择",
    defaultValue: undefined,
    span: 24,
    labelWidth: null,
    style: { width: "100%" },
    clearable: true,
    disabled: false,
    required: true,
    filterable: false,
    multiple: false,
    options: [
      {
        label: "选项一",
        value: 1,
      },
      {
        label: "选项二",
        value: 2,
      },
    ],
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/select",
  },
  {
    label: "级联选择",
    tag: "el-cascader",
    tagIcon: "cascader",
    placeholder: "请选择",
    defaultValue: [],
    span: 24,
    labelWidth: null,
    style: { width: "100%" },
    props: {
      props: {
        multiple: false,
      },
    },
    "show-all-levels": true,
    disabled: false,
    clearable: true,
    filterable: false,
    required: true,
    options: [
      {
        id: 1,
        value: 1,
        label: "选项1",
        children: [
          {
            id: 2,
            value: 2,
            label: "选项1-1",
          },
        ],
      },
    ],
    dataType: "dynamic",
    labelKey: "label",
    valueKey: "value",
    childrenKey: "children",
    separator: "/",
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/cascader",
  },
  {
    label: "单选框组",
    tag: "el-radio-group",
    tagIcon: "radio",
    defaultValue: 0,
    span: 24,
    labelWidth: null,
    style: {},
    optionType: "default",
    border: false,
    size: "default",
    disabled: false,
    required: true,
    options: [
      {
        label: "选项一",
        value: 1,
      },
      {
        label: "选项二",
        value: 2,
      },
    ],
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/radio",
  },
  {
    label: "多选框组",
    tag: "el-checkbox-group",
    tagIcon: "checkbox",
    defaultValue: [],
    span: 24,
    labelWidth: null,
    style: {},
    optionType: "default",
    border: false,
    size: "default",
    disabled: false,
    required: true,
    options: [
      {
        label: "选项一",
        value: 1,
      },
      {
        label: "选项二",
        value: 2,
      },
    ],
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/checkbox",
  },
  {
    label: "开关",
    tag: "el-switch",
    tagIcon: "switch",
    defaultValue: false,
    span: 24,
    labelWidth: null,
    style: {},
    disabled: false,
    required: true,
    "active-text": "",
    "inactive-text": "",
    "active-color": null,
    "inactive-color": null,
    "active-value": true,
    "inactive-value": false,
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/switch",
  },
  {
    label: "滑块",
    tag: "el-slider",
    tagIcon: "slider",
    defaultValue: null,
    span: 24,
    labelWidth: null,
    disabled: false,
    required: true,
    min: 0,
    max: 100,
    step: 1,
    "show-stops": false,
    range: false,
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/slider",
  },
  {
    label: "时间选择",
    tag: "el-time-picker",
    tagIcon: "time",
    placeholder: "请选择",
    defaultValue: "",
    span: 24,
    labelWidth: null,
    style: { width: "100%" },
    disabled: false,
    clearable: true,
    required: true,
    format: "HH:mm:ss",
    "value-format": "HH:mm:ss",
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/time-picker",
  },
  {
    label: "时间范围",
    tag: "el-time-picker",
    tagIcon: "time-range",
    defaultValue: null,
    span: 24,
    labelWidth: null,
    style: { width: "100%" },
    disabled: false,
    clearable: true,
    required: true,
    "is-range": true,
    "range-separator": "至",
    "start-placeholder": "开始时间",
    "end-placeholder": "结束时间",
    format: "HH:mm:ss",
    "value-format": "HH:mm:ss",
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/time-picker",
  },
  {
    label: "日期选择",
    tag: "el-date-picker",
    tagIcon: "date",
    placeholder: "请选择",
    defaultValue: null,
    type: "date",
    span: 24,
    labelWidth: null,
    style: { width: "100%" },
    disabled: false,
    clearable: true,
    required: true,
    format: "YYYY-MM-DD",
    "value-format": "YYYY-MM-DD",
    readonly: false,
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/date-picker",
  },
  {
    label: "日期范围",
    tag: "el-date-picker",
    tagIcon: "date-range",
    defaultValue: null,
    span: 24,
    labelWidth: null,
    style: { width: "100%" },
    type: "daterange",
    "range-separator": "至",
    "start-placeholder": "开始日期",
    "end-placeholder": "结束日期",
    disabled: false,
    clearable: true,
    required: true,
    format: "YYYY-MM-DD",
    "value-format": "YYYY-MM-DD",
    readonly: false,
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/date-picker",
  },
  {
    label: "评分",
    tag: "el-rate",
    tagIcon: "rate",
    defaultValue: 0,
    span: 24,
    labelWidth: null,
    style: {},
    max: 5,
    "allow-half": false,
    "show-text": false,
    "show-score": false,
    disabled: false,
    required: true,
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/rate",
  },
  {
    label: "颜色选择",
    tag: "el-color-picker",
    tagIcon: "color",
    defaultValue: null,
    labelWidth: null,
    "show-alpha": false,
    "color-format": "",
    disabled: false,
    required: true,
    size: "default",
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/color-picker",
  },
  {
    label: "上传",
    tag: "el-upload",
    tagIcon: "upload",
    action: "https://jsonplaceholder.typicode.com/posts/",
    defaultValue: null,
    labelWidth: null,
    disabled: false,
    required: true,
    accept: "",
    name: "file",
    "auto-upload": true,
    showTip: false,
    buttonText: "点击上传",
    fileSize: 2,
    sizeUnit: "MB",
    "list-type": "text",
    multiple: false,
    regList: [],
    changeTag: true,
    document: "https://element-plus.org/zh-CN/component/upload",
    tip: "只能上传不超过 2MB 的文件",
    style: { width: "100%" },
  },
];

export const layoutComponents = [
  {
    layout: "rowFormItem",
    tagIcon: "row",
    type: "default",
    justify: "start",
    align: "top",
    label: "行容器",
    layoutTree: true,
    children: [],
    document: "https://element-plus.org/zh-CN/component/layout",
  },
  {
    layout: "colFormItem",
    label: "按钮",
    changeTag: true,
    labelWidth: null,
    tag: "el-button",
    tagIcon: "button",
    span: 24,
    default: "主要按钮",
    type: "primary",
    icon: "Search",
    size: "default",
    disabled: false,
    document: "https://element-plus.org/zh-CN/component/button",
  },
];

// 组件rule的触发方式，无触发方式的组件不生成rule
export const trigger = {
  "el-input": "blur",
  "el-input-number": "blur",
  "el-select": "change",
  "el-radio-group": "change",
  "el-checkbox-group": "change",
  "el-cascader": "change",
  "el-time-picker": "change",
  "el-date-picker": "change",
  "el-rate": "change",
};
