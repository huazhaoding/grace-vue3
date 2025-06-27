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
      type: "form",
      attr: {
        defaultValue: {
          value: {},
          type: "object",
          label: "表单数据",
        },
        // 表单验证规则对象，定义各个字段的验证逻辑
        rules: {
          value: "[]",
          label: "验证规则",
          type: "object",
        },
        // 是否为行内表单，设置为 true 时表单项水平排列
        inline: {
          value: false,
          type: "switch",
          label: "行内表单",
        },
        // 标签对齐位置，可选值：'left', 'right', 'top',''
        labelPosition: {
          value: "right",
          type: "radio",
          label: "标签对齐位置",
          options: [
            { label: "左对齐", value: "left" },
            { label: "右对齐", value: "right" },
            { label: "顶部对齐", value: "top" },
          ],
        },
        // 标签宽度，可以是像素值或百分比或者'auto'
        labelWidth: {
          value: "auto",
          type: "input",
          label: "标签宽度",
        },
        // 标签后缀，通常为冒号（:）
        labelSuffix: {
          value: ":",
          type: "input",
          label: "标签后缀",
        },
        // 是否隐藏必填字段前的红色星号
        hideRequiredAsterisk: {
          value: false,
          type: "switch",
          label: "是否隐藏必填的红色星号",
        },
        // 必填星号的位置，可选值：'left' 或 'right'
        requireAsteriskPosition: {
          value: "right",
          type: "radio",
          label: "必填星号位置",
          options: [
            { value: "left", label: "左边" },
            { value: "right", label: "右边" },
          ],
        },
        // 是否显示校验错误信息
        showMessage: {
          value: true,
          type: "radio",
          label: "是否显示校验错误信息",
        },
        // 是否以行内形式展示校验信息
        inlineMessage: {
          value: false,
          type: "radio",
          label: "是否以行内形式展示校验信息",
        },
        // 是否在输入框中显示状态图标（如成功或错误图标）
        statusIcon: {
          value: false,
          type: "radio",
          label: "是否在输入框中显示状态图标",
        },
        // 当 rules 属性改变时是否重新触发校验
        validateOnRuleChange: {
          value: true,
          type: "switch",
          label: "当 rules 属性改变时是否重新触发校验",
        },
        // 表单组件尺寸，可选值：'large', 'default', 'small'
        size: {
          value: "default",
          type: "radio",
          label: "表单组件尺寸",
          options: [
            {
              label: "小尺寸",
              value: "small",
            },
            {
              label: "中尺寸",
              value: "default",
            },
            {
              label: "大尺寸",
              value: "large",
            },
          ],
        },
        // 是否禁用整个表单内的所有组件
        disabled: {
          value: false,
          type: "switch",
          label: "是否禁用表单",
        },
        // 当校验失败时是否自动滚动到第一个错误表单项
        scrollToError: {
          value: true,
          type: "switch",
          label: "滚动到错误项",
        },
        // 滚动到错误项时的配置选项（例如偏移量等）
        scrollIntoViewOptions: {
          value: false,
          type: "switch",
          label: "滚动配置",
        },
      },
      data: [],
    },
    {
      tag: "el-input",
      tagLabel: "输入框",
      tagIcon: "input",
      document: "https://element.eleme.cn/#/zh-CN/component/input",
      type: "form",
      attr: {
        defaultValue: {
          value: "123456",
          type: "input",
          label: "内容",
        },
        placeholder: {
          value: "请输入",
          type: "input",
          label: "占位文本",
        },
        type: {
          value: "text",
          type: "radio",
          label: "类型",
          options: [{ value: "text", label: "文本" }],
        },
        maxlength: {
          value: 100,
          type: "number",
          label: "最大输入长度",
        },
        minlength: {
          value: 1,
          type: "number",
          label: "最小输入长度",
        },
        "show-word-limit": {
          value: false,
          type: "switch",
          label: "是否显示统计字数",
        },

        prepend: {
          value: "",
          type: "input",
          label: "前缀符号",
        },
        append: {
          value: "",
          type: "input",
          label: "后缀符号",
        },
        "prefix-icon": {
          value: "",
          type: "icon",
          label: "前缀图标",
        },
        "suffix-icon": {
          value: "",
          type: "icon",
          label: "后缀图标",
        },
        clearable: {
          value: false,
          type: "switch",
          label: "是否显示清除按钮",
        },
        disabled: {
          value: false,
          type: "switch",
          label: "是否禁用",
        },
        size: {
          value: "default",
          type: "radio",
          label: "输入框尺寸",
          options: [
            { label: "小尺寸", value: "small" },
            { label: "中尺寸", value: "default" },
            { label: "大尺寸", value: "large" },
          ],
        },
        autofocus: {
          value: false,
          type: "switch",
          label: "自动获取焦点",
        },
        readonly: {
          value: false,
          type: "switch",
          label: "是否只读",
        },
        validateEvent: {
          value: true,
          type: "switch",
          label: "输入时是否触发表单的校验",
        },
      },
      slots: {
        prepend: {
          value: "",
          type: "textarea",
          label: "输入框前置内容",
        },
        append: {
          value: "",
          type: "textarea",
          label: "输入框后置内容",
        },
        prefix: {
          value: "",
          type: "textarea",
          label: "输入框头部内容",
        },
        suffix: {
          value: "",
          type: "textarea",
          label: "输入框尾部内容",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
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
        defaultValue: {
          value: "",
          type: "input",
          label: "内容",
        },
        placeholder: {
          value: null,
          type: "input",
          label: "占位文本",
        },
        clearable: {
          value: false,
          type: "switch",
          label: "是否可清空",
        },
        disabled: {
          value: false,
          type: "switch",
          label: "自动补全组件是否被禁用",
        },
        "value-key": {
          value: "value",
          type: "input",
          label: "输入建议对象中用于显示的键名",
        },
        debounce: {
          value: 300,
          type: "input",
          label: "获取输入建议的防抖延时（单位：毫秒）",
        },
        placement: {
          value: "bottom-start",
          type: "radio",
          label: "菜单弹出位置",
          options: [
            { value: "top", label: "顶部" },
            { value: "bottom", label: "底部" },
          ],
        },
        "fetch-suggestions": {
          value: null,
          type: "function",
          label: "获取输入建议的方法",
        },
        "trigger-on-focus": {
          value: true,
          type: "switch",
          label: "是否在输入框聚焦时显示建议",
        },
        "select-when-unmatched": {
          value: false,
          type: "switch",
          label: "在输入无匹配建议时按下回车是否触发 select 事件",
        },
        name: {
          value: null,
          type: "input",
          label: "等价于原生 input name 属性",
        },
        "aria-label": {
          value: null,
          type: "input",
          label: "原生 aria-label 属性",
        },
        "hide-loading": {
          value: false,
          type: "switch",
          label: "是否隐藏远程加载时的加载图标",
        },
        "popper-class": {
          value: null,
          type: "input",
          label: "下拉列表的类名",
        },
        teleported: {
          value: true,
          type: "switch",
          label: "是否将下拉列表插入 append-to 指向的元素下",
        },
        "append-to": {
          value: null,
          type: "input",
          label: "下拉框挂载到哪个 DOM 元素",
        },
        "highlight-first-item": {
          value: false,
          type: "switch",
          label: "是否默认高亮远程搜索结果的第一项",
        },
        "fit-input-width": {
          value: false,
          type: "switch",
          label: "下拉框的宽度是否与输入框相同",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
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
      type: "form",
      attr: {
        defaultValue: {
          value: [],
          type: "input",
          label: "内容",
        },
        type: {
          value: "button",
          type: "radio",
          label: "风格",
          options: [
            {
              label: "按钮",
              value: "button",
            },
            {
              label: "默认",
              value: "default",
            },
          ],
        },
        disabled: {
          value: false,
          type: "switch",
          label: "是否禁用",
        },
        size: {
          value: "default",
          type: "radio",
          label: "多选框组的尺寸",
          options: [
            { value: "large", label: "大尺寸" },
            { value: "default", label: "中尺寸" },
            { value: "small", label: "小尺寸" },
          ],
        },
        min: {
          value: 1,
          type: "number",
          label: "多选框组的最小选择数量",
        },
        max: {
          value: 5,
          type: "number",
          label: "多选框组的最大选择数量",
        },
        "aria-label": {
          value: undefined,
          type: "input",
          label: "原生 aria-label 属性",
        },
        "text-color": {
          value: "#ffffff",
          type: "color",
          label: "多选框组的文本颜色",
        },
        fill: {
          value: "#409eff",
          type: "color",
          label: "多选框组的填充色",
        },
        tag: {
          value: "div",
          type: "input",
          label: "多选框组的标签类型",
        },
        "validate-event": {
          value: true,
          type: "switch",
          label: "是否触发表单验证",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        // 表单项的标签文字
        label: "多选框",
        // 表单域字段名，用于验证、重置等操作
        prop: "",
      }),
      // 多选框组的选项
      options: [
        {
          label: {
            value: "选项一",
            type: "input",
            label: "显示的标签",
          },
          value: {
            value: 1,
            type: "input",
            label: "选项值",
          },
          "true-value": {
            value: undefined,
            type: "switch",
            label: "选中时的值",
          },
          "false-value": {
            value: undefined,
            type: "switch",
            label: "未选中时的值",
          },
          disabled: {
            value: false,
            type: "switch",
            label: "是否禁用",
          },
          size: {
            value: "small",
            type: "radio",
            label: "尺寸",
            options: [
              { value: "large", label: "大尺寸" },
              { value: "default", label: "中尺寸" },
              { value: "small", label: "小尺寸" },
            ],
          },
          name: {
            value: undefined,
            type: "input",
            label: "checkbox 的 name 属性",
          },
          checked: {
            value: false,
            type: "switch",
            label: "是否被选中",
          },
          indeterminate: {
            value: false,
            type: "switch",
            label: "是否半选中",
          },
          "validate-event": {
            value: true,
            type: "switch",
            label: "是否触发表单验证",
          },
          "aria-controls": {
            value: undefined,
            type: "input",
            label: "与 aria-control 一致，当 indeterminate 为 true 时生效",
          },
          tabindex: {
            value: 0,
            type: "input",
            label: "输入框的 tabindex",
          },
          id: {
            value: undefined,
            type: "input",
            label: "checkbox 的 id",
          },
          border: {
            value: false,
            type: "switch",
            label: "checkbox 是否显示边框",
          },
        },
        {
          label: {
            value: "选项二",
            type: "input",
            label: "显示的标签",
          },
          value: {
            value: 2,
            type: "input",
            label: "选项值",
          },
          "true-value": {
            value: undefined,
            type: "input",
            label: "选中时的值",
          },
          "false-value": {
            value: undefined,
            type: "input",
            label: "未选中时的值",
          },
          disabled: {
            value: false,
            type: "switch",
            label: "是否禁用",
          },
          size: {
            value: "small",
            type: "radio",
            label: "尺寸",
            options: [
              { value: "large", label: "大尺寸" },
              { value: "default", label: "中尺寸" },
              { value: "small", label: "小尺寸" },
            ],
          },
          name: {
            value: undefined,
            type: "input",
            label: "checkbox 的 name 属性",
          },
          checked: {
            value: false,
            type: "switch",
            label: "是否被选中",
          },
          indeterminate: {
            value: false,
            type: "switch",
            label: "是否半选中",
          },
          "validate-event": {
            value: true,
            type: "switch",
            label: "是否触发表单验证",
          },
          "aria-controls": {
            value: undefined,
            type: "input",
            label: "与 aria-control 一致，当 indeterminate 为 true 时生效",
          },
          tabindex: {
            value: 0,
            type: "input",
            label: "输入框的 tabindex",
          },
          id: {
            value: undefined,
            type: "input",
            label: "checkbox 的 id",
          },
          border: {
            value: false,
            type: "switch",
            label: "checkbox 是否显示边框",
          },
        },
      ],
      // 是否显示边框
    },
    {
      tag: "el-radio-group",
      tagLabel: "单选框组",
      tagIcon: "radio",
      document: "https://element-plus.org/zh-CN/component/radio",
      type: "form",
      attr: {
        defaultValue: {
          value: "",
          type: "input",
          label: "内容",
        },
        type: {
          value: "button",
          type: "radio",
          label: "单选框类型",
          options: [
            { value: "default", label: "默认" },
            { value: "button", label: "按钮" },
          ],
        },
        disabled: {
          value: false,
          type: "switch",
          label: "是否禁用",
        },
        required: {
          value: true,
          type: "switch",
          label: "是否必填",
        },
        size: {
          value: "default",
          type: "radio",
          label: "尺寸",
          options: [
            { value: "large", label: "大尺寸" },
            { value: "default", label: "中尺寸" },
            { value: "small", label: "小尺寸" },
          ],
        },
        name: {
          value: undefined,
          type: "input",
          label: "原生 name 属性",
        },
        "aria-label": {
          value: undefined,
          type: "input",
          label: "原生 aria-label 属性",
        },
        "text-color": {
          value: "#ffffff",
          type: "color",
          label: "文本颜色",
        },
        fill: {
          value: "#409eff",
          type: "color",
          label: "填充色",
        },
        tag: {
          value: "div",
          type: "input",
          label: "标签类型",
        },
        "validate-event": {
          value: true,
          type: "switch",
          label: "是否触发表单验证",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        // 表单项的标签文字
        label: "单选框",
        // 表单域字段名，用于验证、重置等操作
        prop: "",
      }),
      options: [
        {
          label: {
            value: "选项一",
            type: "input",
            label: "显示的标签",
          },
          value: {
            value: 1,
            type: "input",
            label: "选项值",
          },
          disabled: {
            value: false,
            type: "switch",
            label: "是否禁用",
          },
          border: {
            value: false,
            type: "switch",
            label: "是否显示边框",
          },
          size: {
            value: "default",
            type: "radio",
            label: "尺寸",
            options: [
              { value: "large", label: "大尺寸" },
              { value: "default", label: "中尺寸" },
              { value: "small", label: "小尺寸" },
            ],
          },
          name: {
            value: undefined,
            type: "input",
            label: "原生 name 属性",
          },
        },
        {
          "v-model": {
            value: "value",
            type: "input",
            label: "绑定的值",
          },
          label: {
            value: "选项二",
            type: "input",
            label: "显示的标签",
          },
          value: {
            value: 2,
            type: "input",
            label: "选项值",
          },
          disabled: {
            value: false,
            type: "switch",
            label: "是否禁用",
          },
          border: {
            value: false,
            type: "switch",
            label: "是否显示边框",
          },
          size: {
            value: "default",
            type: "radio",
            label: "尺寸",
            options: [
              { value: "large", label: "大尺寸" },
              { value: "default", label: "中尺寸" },
              { value: "small", label: "小尺寸" },
            ],
          },
          name: {
            value: undefined,
            type: "input",
            label: "原生 name 属性",
          },
        },
      ],
    },
    {
      tag: "el-color-picker",
      tagLabel: "颜色选择",
      tagIcon: "color",
      document: "https://element-plus.org/zh-CN/component/color-picker",
      type: "form",
      attr: {
        defaultValue: {
          value: "",
          type: "input",
          label: "颜色值",
        },
        "show-alpha": {
          value: false,
          type: "switch",
          label: "是否显示透明度",
        },
        "color-format": {
          value: "",
          type: "input",
          label: "颜色格式",
        },
        disabled: {
          value: false,
          type: "switch",
          label: "是否禁用",
        },
        required: {
          value: false,
          type: "switch",
          label: "是否必填",
        },
        size: {
          value: "default",
          type: "select",
          label: "尺寸",
          options: [
            { label: "默认", value: "default" },
            { label: "小", value: "small" },
            { label: "大", value: "large" },
          ],
        },
        regList: {
          value: [],
          type: "textarea",
          label: "正则校验",
          tips: "正则校验，JSON数组格式",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        // 表单项的标签文字
        label: "颜色选择",
        // 表单域字段名，用于验证、重置等操作
        prop: "",
      }),
    },
  ],
};
