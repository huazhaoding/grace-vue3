// 默认表单包围参数
 const defaultHedge = {
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

export const FormComponents = {
  title: "表单组件",
  icon: "",
  list: [
    {
      tag: "el-form",
      tagLabel: "表单",
      tagIcon: "form",
      document: "https://element.eleme.cn/#/zh-CN/component/form",
      attr: {
        // 表单数据对象，用于绑定表单输入的值
        model: {},
        // 表单验证规则对象，定义各个字段的验证逻辑
        rules: {},
        // 是否为行内表单，设置为 true 时表单项水平排列
        inline: false,
        // 标签对齐位置，可选值：'left', 'right', 'top',''
        labelPosition: "left",
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
      },
      data: [],
    },
    {
      tag: "el-input",
      tagLabel: "输入框",
      tagIcon: "input",
      document: "https://element.eleme.cn/#/zh-CN/component/input",
      attr: {
        // 类型，等同于原生 input 的 type 属性
        type: "text", // string
        // 绑定值
        modelValue: "", // string / number
        // 最大输入长度
        maxlength: null, // string / number
        // 最小输入长度
        minlength: null, // string / number
        // 是否显示统计字数，仅在 type 为 'text' 或 'textarea' 时生效
        "show-word-limit": false, // boolean
        // 输入框占位文本
        placeholder: "请输入", // string
        // 是否显示清除按钮，仅当 type 不是 textarea 时生效
        clearable: false, // boolean
        // 指定输入值的格式（仅当 type 为 'text' 时生效）
        formatter: null, // Function
        // 指定从格式化器中提取的值（仅当 type 为 'text' 时生效）
        parser: null, // Function
        // 是否禁用
        disabled: false, // boolean
        // 输入框尺寸，仅当 type 不为 'textarea' 时有效
        size: "default", // enum
        // 自定义前缀图标
        "prefix-icon": null, // string / Component
        // 自定义后缀图标
        "suffix-icon": null, // string / Component
        // 原生 autocomplete 属性
        autocomplete: "off", // string
        // 等价于原生 input name 属性
        name: "", // string
        // 原生 readonly 属性，是否只读
        readonly: false, // boolean
        // 控制是否能被用户缩放
        resize: null, // enum
        // 原生 autofocus 属性，自动获取焦点
        autofocus: false, // boolean
        // 原生 form 属性
        form: "", // string
        // 等价于原生 input aria-label 属性
        "aria-label": "", // string
        // 输入框的 tabindex
        tabindex: null, // string / number
        // 输入时是否触发表单的校验
        validateEvent: true, // boolean
        // input 元素或 textarea 元素的 style
        inputStyle: {}, // string / object
        changeTag: true,
      },
      hedge: Object.assign({},defaultHedge, {
        // 表单项的标签文字
        label: "输入框",
        // 表单域字段名，用于验证、重置等操作
        prop: "",
      }),
      
    },
    {
      tag: "el-autocomplete",
      tagLabel: "自动补全",
      tagIcon: "monitor",
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
      hedge: Object.assign({},defaultHedge, {
        // 表单项的标签文字
        label: "自动补全",
        // 表单域字段名，用于验证、重置等操作
        prop: "",
      }),
    },
    {
      // 表单项的标签文字
      tagLabel: "多选框组",
      // 组件标签名
      tag: "el-checkbox-group",
      // 图标名称，用于可视化展示
      tagIcon: "checkbox",
      // 文档链接
      document: "https://element-plus.org/zh-CN/component/checkbox",
      optionType: "button",
      attr: {
        // 默认值
        defaultValue: [],
        type: "checkbox", // 多选框组的类型checkbox or button
        // 是否禁用
        disabled: false,
        // 是否必填
        required: true,
        // 多选框组的尺寸
        size: "default", // 可选值：'large', 'default', 'small'
        min: undefined, // 多选框组的最小选择数量
        max: undefined, // 多选框组的最大选择数量
        "aria-label": undefined, //原生 aria-label属性
        "text-color": "#ffffff", //多选框组的文本颜色
        fill: "#409eff", //多选框组的填充色
        tag: "div", //多选框组的标签类型
        "validate-event": true, //是否触发表单验证
      },
      hedge: Object.assign({},defaultHedge, {
        // 表单项的标签文字
        label: "多选框",
        // 表单域字段名，用于验证、重置等操作
        prop: "",
      }),
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
          indeterminate: false,
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
          name: undefined,
        },
        {
          label: "选项二", // 显示的标签
          value: 2, // 选项值
          "true-value": undefined,
          "false-value": undefined,
          // 是否禁用
          disabled: false,
          // 是否选中
          checked: false,
          // 是否半选中
          indeterminate: false,
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
          name: undefined,
        },
      ],
      // 是否显示边框
    },
    {
      tag: "el-radio-group",
      tagLabel: "单选框组",
      tagIcon: "radio",
      document: "https://element-plus.org/zh-CN/component/radio",
      optionType: "radio",
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
      },
      hedge: Object.assign({},defaultHedge, {
        // 表单项的标签文字
        label: "单选框",
        // 表单域字段名，用于验证、重置等操作
        prop: "",
      }),
      options: [
        {
          label: "选项一",
          value: 1,
          disabled: false,
          border: false,
          size: "default",
          name: undefined,
          id: undefined,
          fill: undefined,
        },
        {
          label: "选项二",
          value: 2,
          disabled: false,
          border: false,
          size: "default",
          name: undefined,
          id: undefined,
          fill: undefined,
        },
      ],
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
      },
      hedge: Object.assign({},defaultHedge, {
        // 表单项的标签文字
        label: "颜色选择",
        // 表单域字段名，用于验证、重置等操作
        prop: "",
      }),
    },
  ],
};
