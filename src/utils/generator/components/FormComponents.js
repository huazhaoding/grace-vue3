// 默认表单包围参数
const defaultHedge = {
  tag: "el-form-item",
  attr: {
    label: {
      value: "",
      type: "input",
      label: "表单项的标签文字",
    },
    prop: {
      value: "",
      type: "input",
      label: "表单域字段名，用于验证、重置等操作",
    },
    required: {
      value: true,
      type: "switch",
      label: "是否必填",
    },
    rules: {
      value: [],
      type: "array",
      label: "表单验证规则",
    },
    errorMessage: {
      value: "",
      type: "input",
      label: "手动设置的错误提示信息",
    },
    showMessage: {
      value: true,
      type: "switch",
      label: "是否显示校验错误信息",
    },
    inlineMessage: {
      value: false,
      type: "switch",
      label: "是否以行内形式展示校验信息",
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
    labelWidth: {
      value: 100,
      type: "number",
      append: "px",
      label: "标签宽度",
    },
    labelPosition: {
      value: "right",
      type: "radio",
      label: "标签位置",
      options: [
        { value: "left", label: "左侧" },
        { value: "right", label: "右侧" },
        { value: "top", label: "顶部" },
      ],
    },
    for: {
      value: "",
      type: "input",
      label: "原生 label 的 for 属性",
    },
    error: {
      value: "",
      type: "input",
      label: "错误时的提示信息",
    },
    validateStatus: {
      value: "",
      type: "input",
      label: "表单项的校验状态",
    },
  },
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
        "v-model": {
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
      slots: {
        default: {
          label: "默认值",
          slotType: "dragComponent",
          used: true,
          slotOptions: [
            {
              tag: "el-input",
              tagLabel: "输入框",
              tagIcon: "input",
              document: "https://element.eleme.cn/#/zh-CN/component/input",
              type: "form",
              attr: {
                "v-model": {
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
                  value: undefined,
                  type: "textarea",
                  used: false,
                  label: "输入框前置内容",
                },
                append: {
                  value: undefined,
                  type: "textarea",
                  used: false,
                  label: "输入框后置内容",
                },
                prefix: {
                  value: undefined,
                  type: "textarea",
                  used: false,
                  label: "输入框头部内容",
                },
                suffix: {
                  value: undefined,
                  used: false,
                  type: "textarea",
                  label: "输入框尾部内容",
                },
              },
              hedge: Object.assign({}, defaultHedge, {
                attr: {
                  ...defaultHedge.attr, // 保留 defaultHedge 中的其他属性
                  label: {
                    // 仅覆盖 label 属性
                    value: "输入框",
                    type: "input",
                    label: "输入框",
                  },
                },
              }),
            },
          ],
        },
      },
    },
    {
      tag: "el-input",
      tagLabel: "输入框",
      tagIcon: "input",
      document: "https://element.eleme.cn/#/zh-CN/component/input",
      type: "form",
      attr: {
        "v-model": {
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
          slotType:"normal",
          used:false,
          label: "输入框前置内容",
        },
        append: {
          value: "",
           slotType:"normal",
          used:false,
          label: "输入框后置内容",
        },
        prefix: {
          value: "",
          slotType:"normal",
          used:false,
          label: "输入框头部内容",
        },
        suffix: {
          value: "",
          slotType:"normal",
          used:false,
          label: "输入框尾部内容",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr, // 保留 defaultHedge 中的其他属性
          label: {
            // 仅覆盖 label 属性
            value: "输入框",
            type: "input",
            label: "输入框",
          },
        },
      }),
    },
    {
      tag: "el-autocomplete",
      tagLabel: "自动补全",
      tagIcon: "monitor",
      document: "https://element.eleme.cn/#/zh-CN/component/autocomplete",
      attr: {
        "v-model": {
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
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "自动补全",
            type: "input",
            label: "自动补全",
          },
        },
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
      template: {
        "el-checkbox": {
          tagIcon: "el-checkbox", // 子组件图标名称
          tagLabel: "多选框", // 子组件标签名
          tag: "el-checkbox", // 子组件标签类型
          attr: {
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
          slots: {},
        },
        "el-checkbox-button": {
          tagLabel: "多选框", // 子组件标签名
          tag: "el-checkbox-button", // 子组件标签类型
          attr: {
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
          },
          slots: {},
        },
      },
      attr: {
        "v-model": {
          value: [],
          type: "input",
          label: "内容",
        },
        type: {
          value: "el-checkbox",
          type: "radio",
          label: "风格",
          options: [
            {
              label: "默认",
              value: "el-checkbox",
            },
            {
              label: "按钮",
              value: "el-checkbox-button",
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
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "多选框组",
            type: "input",
            label: "多选框组",
          },
        },
      }),
      slots: {
        default: {
          label: "默认插槽",
          slotType: "childComponent",
          used: true,
          slotOptions: [
            {
              tagIcon: "el-checkbox", // 子组件图标名称
              tagLabel: "列配置", // 子组件标签名
              tag: "el-checkbox", // 子组件标签类型
              attr: {
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
                  label:
                    "与 aria-control 一致，当 indeterminate 为 true 时生效",
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
              slots: {},
            },
          ],
        },
      },
    },
    {
      tag: "el-radio-group",
      tagLabel: "单选框组",
      tagIcon: "radio",
      document: "https://element-plus.org/zh-CN/component/radio",
      type: "form",
      template: {
        "el-radio": {
          tag: "el-radio",
          tagLabel: "单选框",
          attr: {
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
              value: undefined,
              type: "radio",
              label: "尺寸",
              options: [
                { value: undefined, label: "跟随容器" },
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
        },
        "el-radio-button": {
          tag: "el-radio-button",
          tagLabel: "单选框按钮",
          attr: {
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
            name: {
              value: undefined,
              type: "input",
              label: "原生 name 属性",
            },
          },
        },
      },
      attr: {
        type: {
          value: "el-radio",
          type: "radio",
          label: "单选框类型",
          options: [
            { value: "el-radio", label: "默认" },
            { value: "el-radio-button", label: "按钮" },
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
          label: "单选框组尺寸",
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
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "单选框组",
            type: "input",
            label: "单选框组",
          },
        },
      }),
      slots: {
        default: {
          label: "插槽",
          slotType: "childComponent",
          used: true,
          slotOptions: [
            {
              tag: "el-radio",
              tagLabel: "单选框",
              attr: {
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
                  value: undefined,
                  type: "radio",
                  label: "尺寸",
                  options: [
                    { value: undefined, label: "跟随容器" },
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
            },
          ],
        },
      },
    },
    {
      tag: "el-color-picker",
      tagLabel: "颜色选择",
      tagIcon: "color",
      document: "https://element-plus.org/zh-CN/component/color-picker",
      type: "form",
      attr: {
        "v-model": {
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
          type: "radio",
          label: "颜色格式",
          options: [
            { value: "hex", label: "hex" },
            { value: "rgb", label: "rgb" },
            { value: "hsv", label: "hsv" },
            { value: "hsl", label: "hsl" },
          ],
        },
        "popper-class": {
          value: "",
          type: "input",
          label: "ColorPicker 下拉框的类名",
        },
        predefine: {
          value: [],
          type: "object",
          label: "预定义颜色",
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
          type: "radio",
          label: "尺寸",
          options: [
            { label: "默认", value: "default" },
            { label: "小", value: "small" },
            { label: "大", value: "large" },
          ],
        },
        "validate-event": {
          value: true,
          type: "switch",
          label: "是否触发表单验证",
        },
        tabindex: {
          value: "",
          type: "input",
          label: "ColorPicker 的 tabindex",
        },
        id: {
          value: "",
          type: "input",
          label: "ColorPicker 的 id",
        },
        teleported: {
          value: true,
          type: "switch",
          label: "是否将弹窗插入至 body 元素上",
        },
        regList: {
          value: [],
          type: "textarea",
          label: "正则校验",
          tips: "正则校验，JSON数组格式",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "颜色选择",
            type: "input",
            label: "颜色选择",
          },
        },
      }),
    },
    {
      tag: "el-date-picker",
      tagLabel: "日期",
      tagIcon: "date",
      document: "https://element-plus.org/zh-CN/component/date-picker",
      type: "form",
      attr: {
        "v-model": {
          value: "",
          type: "input",
          label: "绑定值",
        },
        readonly: {
          value: false,
          type: "switch",
          label: "是否只读",
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
        editable: {
          value: true,
          type: "switch",
          label: "文本框可输入",
        },
        clearable: {
          value: true,
          type: "switch",
          label: "是否显示清除按钮",
        },
        placeholder: {
          value: "请选择日期",
          type: "input",
          label: "占位内容",
        },
        "start-placeholder": {
          value: "开始日期",
          type: "input",
          label: "范围选择时开始日期占位符",
        },
        "end-placeholder": {
          value: "结束日期",
          type: "input",
          label: "范围选择时结束日期占位符",
        },
        type: {
          value: "date",
          type: "radio",
          label: "显示类型",
          options: [
            { label: "年份", value: "year" },
            { label: "多年份", value: "years" },
            { label: "月份", value: "month" },
            { label: "多月份", value: "months" },
            { label: "日期", value: "date" },
            { label: "多日期", value: "dates" },
            { label: "日期时间", value: "datetime" },
            { label: "周", value: "week" },
            { label: "日期时间范围", value: "datetimerange" },
            { label: "日期范围", value: "daterange" },
            { label: "月份范围", value: "monthrange" },
            { label: "年份范围", value: "yearrange" },
          ],
        },
        format: {
          value: "YYYY-MM-DD",
          type: "input",
          label: "显示格式",
        },
        "popper-class": {
          value: "",
          type: "input",
          label: "下拉框类名",
        },
        "range-separator": {
          value: "-",
          type: "input",
          label: "范围分隔符",
        },
        "default-value": {
          value: undefined,
          type: "object",
          label: "选择器打开时默认显示的时间",
        },
        "value-format": {
          value: undefined,
          type: "input",
          label: "绑定值的格式",
        },
        id: {
          value: undefined,
          type: "input",
          label: "日期选择器的 id",
        },
        name: {
          value: "",
          type: "input",
          label: "日期选择器的 name",
        },

        "unlink-panels": {
          value: false,
          type: "switch",
          label: "取消两个日期面板联动",
        },
        "prefix-icon": {
          value: "Calendar",
          type: "input",
          label: "前缀图标",
        },
        "clear-icon": {
          value: "CircleClose",
          type: "input",
          label: "清除图标",
        },
        "validate-event": {
          value: true,
          type: "switch",
          label: "是否触发表单验证",
        },
        teleported: {
          value: true,
          type: "switch",
          label: "是否将下拉列表插入至 body 元素",
        },
        "empty-values": {
          value: [],
          type: "array",
          label: "组件的空值配置",
        },
        "value-on-clear": {
          value: "",
          type: "object",
          label: "清空时返回的值",
        },
        "fallback-placements": {
          value: [],
          type: "array",
          label: "定义了 popper.js 创建的元素在哪些位置可以显示",
        },
        placement: {
          value: "bottom",
          type: "string",
          label: "定义了 popper.js 创建的元素在哪个位置显示",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "日期选择",
            type: "input",
            label: "日期选择",
          },
        },
      }),
    },
    {
      tag: "el-date-picker",
      tagLabel: "日期时间",
      tagIcon: "date",
      document: "https://element-plus.org/zh-CN/component/datetime-picker",
      type: "form",
      attr: {
        "v-model": {
          value: "",
          type: "input",
          label: "绑定值",
        },
        readonly: {
          value: false,
          type: "switch",
          label: "是否只读",
        },
        disabled: {
          value: false,
          type: "switch",
          label: "是否禁用",
        },
        editable: {
          value: true,
          type: "switch",
          label: "文本框可输入",
        },
        clearable: {
          value: true,
          type: "switch",
          label: "是否显示清除按钮",
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
        placeholder: {
          value: "请选择日期",
          type: "input",
          label: "非范围选择时的占位内容",
        },
        "start-placeholder": {
          value: "开始日期",
          type: "input",
          label: "范围选择时开始日期的占位内容",
        },
        "end-placeholder": {
          value: "结束日期",
          type: "input",
          label: "范围选择时结束日期的占位内容",
        },
        "arrow-control": {
          value: false,
          type: "switch",
          label: "是否使用箭头进行时间选择",
        },
        type: {
          value: "date",
          type: "radio",
          label: "显示类型",
          options: [
            { label: "年份", value: "year" },
            { label: "多年份", value: "years" },
            { label: "月份", value: "month" },
            { label: "多月份", value: "months" },
            { label: "日期", value: "date" },
            { label: "多日期", value: "dates" },
            { label: "日期时间", value: "datetime" },
            { label: "周", value: "week" },
            { label: "日期时间范围", value: "datetimerange" },
            { label: "日期范围", value: "daterange" },
            { label: "月份范围", value: "monthrange" },
            { label: "年份范围", value: "yearrange" },
          ],
        },
        format: {
          value: "YYYY-MM-DD HH:mm:ss",
          type: "input",
          label: "显示在输入框中的格式",
        },
        "popper-class": {
          value: "",
          type: "input",
          label: "下拉框类名",
        },
        "range-separator": {
          value: "-",
          type: "input",
          label: "选择范围时的分隔符",
        },
        "unlink-panels": {
          value: false,
          type: "switch",
          label: "取消两个日期面板之间的联动",
        },
        "prefix-icon": {
          value: "Date",
          type: "input",
          label: "自定义前缀图标组件",
        },
        "clear-icon": {
          value: "CircleClose",
          type: "input",
          label: "自定义清除图标",
        },
        shortcuts: {
          value: [],
          type: "object",
          label: "快捷选项数组对象",
        },
        "disabled-date": {
          value: null,
          type: "function",
          label: "判断日期是否被禁用的函数",
        },
        "cell-class-name": {
          value: null,
          type: "function",
          label: "设置单元格自定义类名",
        },
        teleported: {
          value: true,
          type: "switch",
          label: "是否将下拉列表插入至 body 元素",
        },
        "show-now": {
          value: true,
          type: "switch",
          label: "是否显示 now 按钮",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "日期时间",
            type: "input",
            label: "日期时间",
          },
        },
      }),
    },
    {
      tag: "el-input-number",
      tagLabel: "计数器",
      tagIcon: "number",
      document: "https://element-plus.org/zh-CN/component/input-number",
      type: "form",
      attr: {
        "v-model": {
          value: null,
          type: "input",
          label: "选中项绑定值",
        },
        min: {
          value: 1,
          type: "number",
          label: "设置计数器允许的最小值",
        },
        max: {
          value: 999999999,
          type: "number",
          label: "设置计数器允许的最大值",
        },
        step: {
          value: 1,
          type: "number",
          label: "计数器步长",
        },
        "step-strictly": {
          value: false,
          type: "switch",
          label: "是否只能输入 step 的倍数",
        },
        precision: {
          value: null,
          type: "number",
          label: "数值精度",
        },
        size: {
          value: "default",
          type: "radio",
          label: "计数器尺寸",
          options: [
            { label: "小尺寸", value: "small" },
            { label: "中尺寸", value: "default" },
            { label: "大尺寸", value: "large" },
          ],
        },
        readonly: {
          value: false,
          type: "switch",
          label: "原生 readonly 属性，是否只读",
        },
        disabled: {
          value: false,
          type: "switch",
          label: "是否禁用状态",
        },
        controls: {
          value: true,
          type: "switch",
          label: "是否使用控制按钮",
        },
        "controls-position": {
          value: "",
          type: "radio",
          label: "控制按钮位置",
          options: [
            { label: "右侧", value: "right" },
            { label: "无", value: "" },
          ],
        },
        name: {
          value: "",
          type: "input",
          label: "等价于原生 input name 属性",
        },
        "aria-label": {
          value: "",
          type: "input",
          label: "等价于原生 input aria-label 属性",
        },
        placeholder: {
          value: "",
          type: "input",
          label: "等价于原生 input placeholder 属性",
        },
        id: {
          value: "",
          type: "input",
          label: "等价于原生 input id 属性",
        },
        "value-on-clear": {
          value: null,
          type: "radio",
          label: "当输入框被清空时显示的值",
          options: [
            { label: "null", value: null },
            { label: "0", value: 0 },
            { label: "自定义值", value: "custom" },
          ],
        },
        "validate-event": {
          value: true,
          type: "switch",
          label: "是否触发表单验证",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "计数器",
            type: "input",
            label: "计数器",
          },
        },
      }),
    },
    {
      tag: "el-input-tag",
      tagLabel: "标签输入框",
      tagIcon: "tags",
      document: "https://element-plus.org/zh-CN/component/tag-input",
      type: "form",
      attr: {
        "v-model": {
          value: [],
          type: "tag",
          label: "绑定值",
        },
        max: {
          value: 9,
          type: "number",
          label: "可添加标签的最大数量",
        },
        "tag-type": {
          value: "info",
          type: "radio",
          label: "标签类型",
          options: [
            { label: "主要", value: "primary" },
            { label: "成功", value: "success" },
            { label: "信息", value: "info" },
            { label: "警告", value: "warning" },
            { label: "危险", value: "danger" },
          ],
        },
        "tag-effect": {
          value: "light",
          type: "radio",
          label: "标签效果",
          options: [
            { label: "浅色", value: "light" },
            { label: "深色", value: "dark" },
            { label: "普通", value: "plain" },
          ],
        },
        trigger: {
          value: "Enter",
          type: "radio",
          label: "触发输入标签的按键",
          options: [
            { label: "回车键", value: "Enter" },
            { label: "空格键", value: "Space" },
          ],
        },
        draggable: {
          value: false,
          type: "switch",
          label: "是否可以拖动标签",
        },
        delimiter: {
          value: "",
          type: "input",
          label: "在匹配分隔符时添加标签",
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
        "save-on-blur": {
          value: true,
          type: "switch",
          label: "当输入失去焦点时是否保存输入值",
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
        "validate-event": {
          value: true,
          type: "switch",
          label: "是否触发表单验证",
        },
        readonly: {
          value: false,
          type: "switch",
          label: "等价于原生 readonly 属性",
        },
        autofocus: {
          value: false,
          type: "switch",
          label: "等价于原生 autofocus 属性",
        },
        id: {
          value: "",
          type: "input",
          label: "等价于原生 input id 属性",
        },
        tabindex: {
          value: null,
          type: "input",
          label: "等价于原生 tabindex 属性",
        },
        maxlength: {
          value: null,
          type: "input",
          label: "等价于原生 maxlength 属性",
        },
        minlength: {
          value: null,
          type: "input",
          label: "等价于原生 minlength 属性",
        },
        placeholder: {
          value: "请输入标签",
          type: "input",
          label: "输入框占位文本",
        },
        autocomplete: {
          value: "off",
          type: "radio",
          label: "等价于原生 autocomplete 属性",
          options: [
            { label: "关闭", value: "off" },
            { label: "开启", value: "on" },
          ],
        },
        "aria-label": {
          value: "",
          type: "input",
          label: "等价于原生 aria-label 属性",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "标签输入",
            type: "input",
            label: "标签输入",
          },
        },
      }),
    },
    {
      tag: "el-mention",
      tagLabel: "提及输入框",
      tagIcon: "mention",
      document: "https://element-plus.org/zh-CN/component/mention",
      type: "form",
      attr: {
        "v-model": {
          value: "",
          type: "input",
          label: "绑定值",
        },
        options: {
          value: [],
          type: "array",
          label: "提及选项列表",
        },
        prefix: {
          value: "@",
          type: "input",
          label: "触发字段的前缀",
        },
        split: {
          value: " ",
          type: "input",
          label: "用于拆分提及的字符",
        },
        "filter-option": {
          value: null,
          type: "function",
          label: "定制筛选器选项逻辑",
        },
        placement: {
          value: "bottom",
          type: "radio",
          label: "设置弹出位置",
          options: [
            { label: "顶部", value: "top" },
            { label: "底部", value: "bottom" },
            { label: "左侧", value: "left" },
            { label: "右侧", value: "right" },
          ],
        },
        "show-arrow": {
          value: false,
          type: "switch",
          label: "下拉菜单的内容是否有箭头",
        },
        offset: {
          value: 0,
          type: "number",
          label: "下拉面板偏移量",
        },
        whole: {
          value: false,
          type: "switch",
          label: "当退格键被按下做删除操作时，是否将提及部分作为整体删除",
        },
        "check-is-whole": {
          value: null,
          type: "function",
          label: "当退格键被按下做删除操作时，检查是否将提及部分作为整体删除",
        },
        loading: {
          value: false,
          type: "switch",
          label: "提及的下拉面板是否处于加载状态",
        },
        "popper-class": {
          value: "",
          type: "input",
          label: "自定义浮层类名",
        },
        "popper-options": {
          value: {},
          type: "object",
          label: "popper.js 参数",
        },
        "validate-event": {
          value: true,
          type: "switch",
          label: "是否触发表单验证",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "提及",
            type: "input",
            label: "提及",
          },
        },
      }),
    },
    {
      tag: "el-rate",
      tagLabel: "评分组件",
      tagIcon: "rate",
      document: "https://element-plus.org/zh-CN/component/rate",
      type: "form",
      attr: {
        "v-model": {
          value: 5,
          type: "number",
          label: "选中项绑定值",
        },
        max: {
          value: 5,
          type: "number",
          label: "最大分值",
        },
        size: {
          value: "default",
          type: "radio",
          label: "尺寸",
          options: [
            { label: "小", value: "small" },
            { label: "默认", value: "default" },
            { label: "大", value: "large" },
          ],
        },
        disabled: {
          value: false,
          type: "switch",
          label: "是否为只读",
        },
        "allow-half": {
          value: false,
          type: "switch",
          label: "是否允许半选",
        },
        "low-threshold": {
          value: 2,
          type: "number",
          label: "低分和中等分数的界限值",
        },
        "high-threshold": {
          value: 4,
          type: "number",
          label: "高分和中等分数的界限值",
        },
        colors: {
          value: ["#f7ba2a", "#f7ba2a", "#f7ba2a"],
          type: "object",
          label: "图标颜色",
        },
        "void-color": {
          value: "#c6d1de",
          type: "color",
          label: "未选中图标的颜色",
        },
        "disabled-void-color": {
          value: "#eff2f7",
          type: "color",
          label: "只读时未选中图标的颜色",
        },
        icons: {
          value: ["StarFilled", "StarFilled", "StarFilled"],
          type: "object",
          label: "图标组件",
        },
        "void-icon": {
          value: "Star",
          type: "input",
          label: "未被选中的图标组件",
        },
        "disabled-void-icon": {
          value: "StarFilled",
          type: "input",
          label: "禁用状态的未选择图标",
        },
        "show-text": {
          value: false,
          type: "switch",
          label: "是否显示辅助文字",
        },
        "show-score": {
          value: false,
          type: "switch",
          label: "是否显示当前分数",
        },
        "text-color": {
          value: "",
          type: "color",
          label: "辅助文字的颜色",
        },
        texts: {
          value: ["极差", "失望", "一般", "满意", "惊喜"],
          type: "input",
          label: "辅助文字数组",
        },
        "score-template": {
          value: "{value}",
          type: "input",
          label: "分数显示模板",
        },
        clearable: {
          value: false,
          type: "switch",
          label: "是否可以重置值为 0",
        },
        id: {
          value: "",
          type: "input",
          label: "原生 id 属性",
        },
        "aria-label": {
          value: "",
          type: "input",
          label: "ARIA 标签属性",
        },
        "validate-event": {
          value: true,
          type: "switch",
          label: "是否触发表单验证",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "评分",
            type: "input",
            label: "评分",
          },
        },
      }),
    },
    {
      tag: "el-slider",
      tagLabel: "滑块组件",
      tagIcon: "slider",
      document: "https://element-plus.org/zh-CN/component/slider",
      type: "form",
      attr: {
        "v-model": {
          value: 0,
          type: "number",
          label: "选中项绑定值",
        },
        min: {
          value: 0,
          type: "number",
          label: "最小值",
        },
        max: {
          value: 100,
          type: "number",
          label: "最大值",
        },
        disabled: {
          value: false,
          type: "switch",
          label: "是否禁用",
        },
        step: {
          value: 1,
          type: "number",
          label: "步长",
        },
        "show-input": {
          value: false,
          type: "switch",
          label: "是否显示输入框",
        },
        "show-input-controls": {
          value: true,
          type: "switch",
          label: "是否显示输入框控制按钮",
        },
        size: {
          value: "default",
          type: "radio",
          label: "滑块包装器的大小",
          options: [
            { label: "小", value: "small" },
            { label: "默认", value: "default" },
            { label: "大", value: "large" },
          ],
        },
        "input-size": {
          value: "default",
          type: "radio",
          label: "输入框的大小",
          options: [
            { label: "小", value: "small" },
            { label: "默认", value: "default" },
            { label: "大", value: "large" },
          ],
        },
        "show-stops": {
          value: false,
          type: "switch",
          label: "是否显示间断点",
        },
        "show-tooltip": {
          value: true,
          type: "switch",
          label: "是否显示提示信息",
        },
        "format-tooltip": {
          value: null,
          type: "function",
          label: "格式化提示信息",
        },
        range: {
          value: false,
          type: "switch",
          label: "是否开启选择范围",
        },
        vertical: {
          value: false,
          type: "switch",
          label: "是否垂直模式",
        },
        height: {
          value: "",
          type: "input",
          label: "滑块高度（垂直模式必填）",
        },
        "aria-label": {
          value: "",
          type: "input",
          label: "原生 aria-label 属性",
        },
        "range-start-label": {
          value: "",
          type: "input",
          label: "滑块范围起始标签",
        },
        "range-end-label": {
          value: "",
          type: "input",
          label: "滑块范围结束标签",
        },
        "format-value-text": {
          value: null,
          type: "function",
          label: "屏幕阅读器提示格式",
        },
        debounce: {
          value: 300,
          type: "number",
          label: "输入去抖延迟（毫秒）",
        },
        "tooltip-class": {
          value: "",
          type: "input",
          label: "Tooltip 自定义类名",
        },
        placement: {
          value: "top",
          type: "radio",
          label: "Tooltip 出现的位置",
          options: [
            { label: "顶部", value: "top" },
            { label: "底部", value: "bottom" },
            { label: "左侧", value: "left" },
            { label: "右侧", value: "right" },
          ],
        },
        marks: {
          value: {},
          type: "object",
          label: "标记配置",
        },
        "validate-event": {
          value: true,
          type: "switch",
          label: "是否触发表单验证",
        },
        persistent: {
          value: true,
          type: "switch",
          label: "是否持久化 Tooltip",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "滑块",
            type: "input",
            label: "滑块",
          },
        },
      }),
    },
    {
      tag: "el-switch",
      tagLabel: "开关组件",
      tagIcon: "switch",
      document: "https://element-plus.org/zh-CN/component/switch",
      type: "form",
      attr: {
        "v-model": {
          value: false,
          type: "switch",
          label: "绑定值",
        },
        disabled: {
          value: false,
          type: "switch",
          label: "是否禁用",
        },
        loading: {
          value: false,
          type: "switch",
          label: "是否显示加载中",
        },
        size: {
          value: "",
          type: "radio",
          label: "开关的大小",
          options: [
            { label: "小", value: "small" },
            { label: "默认", value: "default" },
            { label: "大", value: "large" },
          ],
        },
        width: {
          value: "",
          type: "input",
          label: "开关的宽度",
        },
        "inline-prompt": {
          value: false,
          type: "switch",
          label: "是否显示内联提示",
        },
        "active-icon": {
          value: "",
          type: "input",
          label: "on 状态时显示的图标",
        },
        "inactive-icon": {
          value: "",
          type: "input",
          label: "off 状态时显示的图标",
        },
        "active-action-icon": {
          value: "",
          type: "input",
          label: "on 状态下显示的图标组件",
        },
        "inactive-action-icon": {
          value: "",
          type: "input",
          label: "off 状态下显示的图标组件",
        },
        "active-text": {
          value: "",
          type: "input",
          label: "on 状态时的文字描述",
        },
        "inactive-text": {
          value: "",
          type: "input",
          label: "off 状态时的文字描述",
        },
        "active-value": {
          value: true,
          type: "input",
          label: "on 状态时的值",
        },
        "inactive-value": {
          value: false,
          type: "input",
          label: "off 状态时的值",
        },
        name: {
          value: "",
          type: "input",
          label: "switch 对应的 name 属性",
        },
        "validate-event": {
          value: true,
          type: "switch",
          label: "是否触发表单验证",
        },
        "before-change": {
          value: null,
          type: "function",
          label: "状态改变前的钩子函数",
        },
        id: {
          value: "",
          type: "input",
          label: "input 的 id 属性",
        },
        tabindex: {
          value: null,
          type: "input",
          label: "input 的 tabindex 属性",
        },
        "aria-label": {
          value: "",
          type: "input",
          label: "ARIA 标签属性",
        },
        "active-color": {
          value: "",
          type: "color",
          label: "on 状态时的背景颜色（已弃用）",
        },
        "inactive-color": {
          value: "",
          type: "color",
          label: "off 状态时的背景颜色（已弃用）",
        },
        "border-color": {
          value: "",
          type: "color",
          label: "开关的边框颜色（已弃用）",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "开关",
            type: "input",
            label: "开关",
          },
        },
      }),
    },
    {
      tag: "el-cascader",
      tagLabel: "级联选择器",
      tagIcon: "cascader",
      document: "https://element-plus.org/zh-CN/component/cascader",
      type: "form",
      attr: {
        "v-model": {
          value: null,
          type: "input",
          label: "选中项绑定值",
        },
        options: {
          value: [],
          type: "object",
          label: "选项的数据源",
        },
        props: {
          value: {
            expandTrigger: {
              value: "click",
              type: "radio",
              label: "次级菜单的展开方式",
              options: [
                { label: "点击展开", value: "click" },
                { label: "悬停展开", value: "hover" },
              ],
            },
            multiple: {
              value: false,
              type: "switch",
              label: "是否多选",
            },
            checkStrictly: {
              value: false,
              type: "switch",
              label: "是否严格的遵守父子节点不互相关联",
            },
            emitPath: {
              value: true,
              type: "switch",
              label: "是否返回完整路径",
            },
            lazy: {
              value: false,
              type: "switch",
              label: "是否动态加载子节点",
            },
            lazyLoad: {
              value: null,
              type: "function",
              label: "加载动态数据的方法",
            },
            value: {
              value: "value",
              type: "input",
              label: "指定选项的值为选项对象的某个属性值",
            },
            label: {
              value: "label",
              type: "input",
              label: "指定选项标签为选项对象的某个属性值",
            },
            children: {
              value: "children",
              type: "input",
              label: "指定选项的子选项为选项对象的某个属性值",
            },
            disabled: {
              value: "disabled",
              type: "input",
              label: "指定选项的禁用为选项对象的某个属性值",
            },
            leaf: {
              value: "leaf",
              type: "input",
              label: "指定选项的叶子节点的标志位为选项对象的某个属性值",
            },
            hoverThreshold: {
              value: 500,
              type: "number",
              label: "hover 时展开菜单的灵敏度阈值",
            },
          },
          type: "object",
          label: "配置选项",
        },
        size: {
          value: "",
          type: "radio",
          label: "尺寸",
          options: [
            { label: "小", value: "small" },
            { label: "默认", value: "default" },
            { label: "大", value: "large" },
          ],
        },
        placeholder: {
          value: "",
          type: "input",
          label: "输入框占位文本",
        },
        disabled: {
          value: false,
          type: "switch",
          label: "是否禁用",
        },
        clearable: {
          value: false,
          type: "switch",
          label: "是否支持清空选项",
        },
        "show-all-levels": {
          value: true,
          type: "switch",
          label: "是否显示完整路径",
        },
        "collapse-tags": {
          value: false,
          type: "switch",
          label: "多选模式下是否折叠标签",
        },
        "collapse-tags-tooltip": {
          value: false,
          type: "switch",
          label: "鼠标悬停时是否显示所有标签",
        },
        "max-collapse-tags-tooltip-height": {
          value: "",
          type: "input",
          label: "折叠标签的最大高度",
        },
        separator: {
          value: " / ",
          type: "input",
          label: "分隔符",
        },
        filterable: {
          value: false,
          type: "switch",
          label: "是否支持搜索",
        },
        "filter-method": {
          value: null,
          type: "function",
          label: "自定义搜索逻辑",
        },
        debounce: {
          value: 300,
          type: "number",
          label: "搜索去抖延迟（毫秒）",
        },
        "before-filter": {
          value: null,
          type: "function",
          label: "过滤前的钩子函数",
        },
        "popper-class": {
          value: "",
          type: "input",
          label: "弹出内容的自定义类名",
        },
        teleported: {
          value: true,
          type: "switch",
          label: "弹层是否使用 teleport",
        },
        "tag-type": {
          value: "info",
          type: "radio",
          label: "标签类型",
          options: [
            { label: "成功", value: "success" },
            { label: "信息", value: "info" },
            { label: "警告", value: "warning" },
            { label: "危险", value: "danger" },
          ],
        },
        "tag-effect": {
          value: "light",
          type: "radio",
          label: "标签效果",
          options: [
            { label: "浅色", value: "light" },
            { label: "深色", value: "dark" },
          ],
        },
        "validate-event": {
          value: true,
          type: "switch",
          label: "是否触发表单校验",
        },
        "max-collapse-tags": {
          value: 1,
          type: "number",
          label: "需要显示的标签最大数量",
        },
        "empty-values": {
          value: [],
          type: "array",
          label: "空值配置",
        },
        "value-on-clear": {
          value: null,
          type: "input",
          label: "清空选项的值",
        },
        persistent: {
          value: true,
          type: "switch",
          label: "是否持久化弹出框",
        },
        "fallback-placements": {
          value: [],
          type: "array",
          label: "Tooltip 可用的位置列表",
        },
        placement: {
          value: "bottom-start",
          type: "radio",
          label: "下拉框出现的位置",
          options: [
            { label: "顶部", value: "top" },
            { label: "底部", value: "bottom" },
            { label: "左部", value: "left" },
            { label: "右部", value: "right" },
          ],
        },
        "popper-append-to-body": {
          value: true,
          type: "switch",
          label: "是否将弹出内容插入到 body 元素（已弃用）",
        },
      },
      events: {
        change: {
          label: "当绑定值变化时触发的事件",
          type: "function",
        },
        "expand-change": {
          label: "当展开状态发生变化时触发",
          type: "function",
        },
        blur: {
          label: "当失去焦点时触发",
          type: "function",
        },
        focus: {
          label: "当获得焦点时触发",
          type: "function",
        },
        clear: {
          label: "清空时触发",
          type: "function",
        },
        "visible-change": {
          label: "当标签可见性改变时触发",
          type: "function",
        },
        "remove-tag": {
          label: "删除标签时触发",
          type: "function",
        },
      },
      slots: {
        default: {
          label: "默认插槽",
          type: "slot",
        },
        empty: {
          label: "空数据时显示的插槽",
          type: "slot",
        },
        prefix: {
          label: "前缀",
          type: "slot",
        },
        "suggestion-item": {
          label: "建议项",
          type: "slot",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "级联选择",
            type: "input",
            label: "级联选择",
          },
        },
      }),
    },
    {
      tag: "el-cascader-panel",
      tagLabel: "级联面板",
      tagIcon: "cascader-panel",
      document: "https://element-plus.org/zh-CN/component/cascader",
      type: "form",
      attr: {
        "v-model": {
          value: null,
          type: "input",
          label: "选中项绑定值",
        },
        options: {
          value: [],
          type: "object",
          label: "选项的数据源",
        },
        props: {
          value: {
            expandTrigger: {
              value: "click",
              type: "radio",
              label: "次级菜单的展开方式",
              options: [
                { label: "点击展开", value: "click" },
                { label: "悬停展开", value: "hover" },
              ],
            },
            multiple: {
              value: false,
              type: "switch",
              label: "是否多选",
            },
            checkStrictly: {
              value: false,
              type: "switch",
              label: "是否严格的遵守父子节点不互相关联",
            },
            emitPath: {
              value: true,
              type: "switch",
              label: "是否返回完整路径",
            },
            lazy: {
              value: false,
              type: "switch",
              label: "是否动态加载子节点",
            },
            lazyLoad: {
              value: null,
              type: "function",
              label: "加载动态数据的方法",
            },
            value: {
              value: "value",
              type: "input",
              label: "指定选项的值字段名",
            },
            label: {
              value: "label",
              type: "input",
              label: "指定选项标签字段名",
            },
            children: {
              value: "children",
              type: "input",
              label: "指定子节点字段名",
            },
            disabled: {
              value: "disabled",
              type: "input",
              label: "指定禁用字段名",
            },
            leaf: {
              value: "leaf",
              type: "input",
              label: "指定叶子节点标志字段名",
            },
            hoverThreshold: {
              value: 500,
              type: "number",
              label: "hover 展开菜单灵敏度阈值",
            },
          },
          type: "object",
          label: "配置选项",
        },
      },
      events: {
        change: {
          label: "值改变时触发",
        },
        close: {
          label: "关闭时触发",
        },
        "expand-change": {
          label: "展开状态改变时触发",
        },
      },
      slots: {
        default: {
          label: "默认插槽",
        },
        empty: {
          label: "空数据时显示的插槽",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "级联面板",
            type: "input",
            label: "级联面板",
          },
        },
      }),
    },
    {
      tag: "el-select",
      tagLabel: "下拉选择器",
      tagIcon: "select",
      document: "https://element-plus.org/zh-CN/component/select",
      type: "form",
      attr: {
        "v-model": {
          value: null,
          type: "input",
          label: "选中项绑定值",
        },
        multiple: {
          value: false,
          type: "switch",
          label: "是否多选",
        },
        disabled: {
          value: false,
          type: "switch",
          label: "是否禁用",
        },
        "value-key": {
          value: "value",
          type: "input",
          label: "作为 value 唯一标识的键名",
        },
        size: {
          value: "",
          type: "radio",
          label: "输入框尺寸",
          options: [
            { label: "小", value: "small" },
            { label: "默认", value: "default" },
            { label: "大", value: "large" },
          ],
        },
        clearable: {
          value: false,
          type: "switch",
          label: "是否可以清空选项",
        },
        "collapse-tags": {
          value: false,
          type: "switch",
          label: "多选时是否将选中值按文字的形式展示",
        },
        "collapse-tags-tooltip": {
          value: false,
          type: "switch",
          label: "鼠标悬停时是否显示所有标签",
        },
        "multiple-limit": {
          value: 0,
          type: "number",
          label: "用户最多可以选择的项目数",
        },
        name: {
          value: "",
          type: "input",
          label: "原生 name 属性",
        },
        effect: {
          value: "light",
          type: "radio",
          label: "tooltip 主题",
          options: [
            { label: "浅色", value: "light" },
            { label: "深色", value: "dark" },
          ],
        },
        autocomplete: {
          value: "off",
          type: "input",
          label: "原生 autocomplete 属性",
        },
        placeholder: {
          value: "",
          type: "input",
          label: "占位符",
        },
        filterable: {
          value: false,
          type: "switch",
          label: "是否可筛选",
        },
        "allow-create": {
          value: false,
          type: "switch",
          label: "是否允许创建新条目",
        },
        "filter-method": {
          value: null,
          type: "function",
          label: "自定义筛选方法",
        },
        remote: {
          value: false,
          type: "switch",
          label: "是否从服务器远程加载数据",
        },
        "remote-method": {
          value: null,
          type: "function",
          label: "自定义远程搜索方法",
        },
        "remote-show-suffix": {
          value: false,
          type: "switch",
          label: "远程搜索方法显示后缀图标",
        },
        loading: {
          value: false,
          type: "switch",
          label: "是否正在从远程获取数据",
        },
        "loading-text": {
          value: "",
          type: "input",
          label: "加载数据时显示的文本",
        },
        "no-match-text": {
          value: "",
          type: "input",
          label: "无匹配时显示的文字",
        },
        "no-data-text": {
          value: "",
          type: "input",
          label: "无选项时显示的文字",
        },
        "popper-class": {
          value: "",
          type: "input",
          label: "下拉菜单的自定义类名",
        },
        "reserve-keyword": {
          value: true,
          type: "switch",
          label: "是否在选中一个选项后保留当前的搜索关键词",
        },
        "default-first-option": {
          value: false,
          type: "switch",
          label: "是否在输入框按下回车时选择第一个匹配项",
        },
        teleported: {
          value: true,
          type: "switch",
          label: "是否使用 teleport",
        },
        "append-to": {
          value: "",
          type: "input",
          label: "下拉框挂载到哪个 DOM 元素",
        },
        persistent: {
          value: true,
          type: "switch",
          label: "是否持久化选择器",
        },
        "automatic-dropdown": {
          value: false,
          type: "switch",
          label: "不可搜索时是否自动弹出选项菜单",
        },
        "clear-icon": {
          value: "",
          type: "input",
          label: "自定义清除图标",
        },
        "fit-input-width": {
          value: false,
          type: "switch",
          label: "下拉框的宽度是否与输入框相同",
        },
        "suffix-icon": {
          value: "",
          type: "input",
          label: "自定义后缀图标",
        },
        "tag-type": {
          value: "info",
          type: "radio",
          label: "标签类型",
          options: [
            { label: "成功", value: "success" },
            { label: "信息", value: "info" },
            { label: "警告", value: "warning" },
            { label: "危险", value: "danger" },
          ],
        },
        "tag-effect": {
          value: "light",
          type: "radio",
          label: "标签效果",
          options: [
            { label: "浅色", value: "light" },
            { label: "深色", value: "dark" },
          ],
        },
        "validate-event": {
          value: true,
          type: "switch",
          label: "是否触发表单验证",
        },
        offset: {
          value: 12,
          type: "number",
          label: "下拉面板偏移量",
        },
        "show-arrow": {
          value: true,
          type: "switch",
          label: "下拉菜单的内容是否有箭头",
        },
        placement: {
          value: "bottom-start",
          type: "radio",
          label: "下拉框出现的位置",
          options: [
            { label: "顶部", value: "top" },
            { label: "底部", value: "bottom" },
            { label: "左部", value: "left" },
            { label: "右部", value: "right" },
          ],
        },
        "fallback-placements": {
          value: ["bottom-start", "top-start", "right", "left"],
          type: "array",
          label: "dropdown 可用的位置列表",
        },
        "max-collapse-tags": {
          value: 1,
          type: "number",
          label: "需要显示的 Tag 的最大数量",
        },
        "popper-options": {
          value: {},
          type: "object",
          label: "popper.js 参数",
        },
        "aria-label": {
          value: "",
          type: "input",
          label: "ARIA 标签属性",
        },
        "empty-values": {
          value: [],
          type: "array",
          label: "空值配置",
        },
        "value-on-clear": {
          value: null,
          type: "input",
          label: "清空选项的值",
        },
        tabindex: {
          value: "",
          type: "input",
          label: "tabindex 属性",
        },
      },
      opener: [],
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "下拉选择",
            type: "input",
            label: "下拉选择",
          },
        },
      }),
    },
    {
      tag: "el-time-picker",
      tagLabel: "时间选择器",
      tagIcon: "time-picker",
      document: "https://element-plus.org/zh-CN/component/time-picker",
      type: "form",
      attr: {
        "v-model": {
          value: "",
          type: "input",
          label: "绑定值",
        },
        readonly: {
          value: false,
          type: "switch",
          label: "是否完全只读",
        },
        disabled: {
          value: false,
          type: "switch",
          label: "是否禁用",
        },
        editable: {
          value: true,
          type: "switch",
          label: "文本框是否可输入",
        },
        clearable: {
          value: true,
          type: "switch",
          label: "是否显示清除按钮",
        },
        size: {
          value: "",
          type: "radio",
          label: "输入框尺寸",
          options: [
            { label: "小", value: "small" },
            { label: "默认", value: "default" },
            { label: "大", value: "large" },
          ],
        },
        placeholder: {
          value: "",
          type: "input",
          label: "非范围选择时的占位内容",
        },
        "start-placeholder": {
          value: "",
          type: "input",
          label: "范围选择时开始日期的占位内容",
        },
        "end-placeholder": {
          value: "",
          type: "input",
          label: "范围选择时结束日期的占位内容",
        },
        "is-range": {
          value: false,
          type: "switch",
          label: "是否为时间范围选择",
        },
        "arrow-control": {
          value: false,
          type: "switch",
          label: "是否使用箭头进行时间选择",
        },
        "popper-class": {
          value: "",
          type: "input",
          label: "下拉框的自定义类名",
        },
        "range-separator": {
          value: "-",
          type: "input",
          label: "选择范围时的分隔符",
        },
        format: {
          value: "",
          type: "input",
          label: "显示在输入框中的格式",
        },
        "default-value": {
          value: null,
          type: "object",
          label: "选择器打开时默认显示的时间",
        },
        "value-format": {
          value: "",
          type: "input",
          label: "绑定值的格式",
        },
        id: {
          value: "",
          type: "input",
          label: "原生 input id 属性",
        },
        name: {
          value: "",
          type: "input",
          label: "原生 input name 属性",
        },
        "aria-label": {
          value: "",
          type: "input",
          label: "ARIA 标签属性",
        },
        "prefix-icon": {
          value: "Clock",
          type: "input",
          label: "自定义前缀图标",
        },
        "clear-icon": {
          value: "CircleClose",
          type: "input",
          label: "自定义清除图标",
        },
        "disabled-hours": {
          value: null,
          type: "function",
          label: "禁止选择部分小时选项",
        },
        "disabled-minutes": {
          value: null,
          type: "function",
          label: "禁止选择部分分钟选项",
        },
        "disabled-seconds": {
          value: null,
          type: "function",
          label: "禁止选择部分秒选项",
        },
        teleported: {
          value: true,
          type: "switch",
          label: "是否将下拉列表镜像至 body 元素",
        },
        tabindex: {
          value: 0,
          type: "number",
          label: "输入框的 tabindex",
        },
        "empty-values": {
          value: [],
          type: "array",
          label: "空值配置",
        },
        "value-on-clear": {
          value: null,
          type: "input",
          label: "清空选项的值",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "时间选择",
            type: "input",
            label: "时间选择",
          },
        },
      }),
    },
    {
      tag: "el-time-select",
      tagLabel: "时间选择器",
      tagIcon: "time-select",
      document: "https://element-plus.org/zh-CN/component/time-select",
      type: "form",
      attr: {
        "v-model": {
          value: "",
          type: "input",
          label: "选中项绑定值",
        },
        disabled: {
          value: false,
          type: "switch",
          label: "是否禁用",
        },
        editable: {
          value: true,
          type: "switch",
          label: "文本框是否可输入",
        },
        clearable: {
          value: true,
          type: "switch",
          label: "是否显示清除按钮",
        },
        "include-end-time": {
          value: false,
          type: "switch",
          label: "是否在选项中包含结束时间",
        },
        size: {
          value: "default",
          type: "radio",
          label: "输入框尺寸",
          options: [
            { label: "小", value: "small" },
            { label: "默认", value: "default" },
            { label: "大", value: "large" },
          ],
        },
        placeholder: {
          value: "",
          type: "input",
          label: "非范围选择时的占位内容",
        },
        name: {
          value: "",
          type: "input",
          label: "原生 name 属性",
        },
        effect: {
          value: "light",
          type: "radio",
          label: "Tooltip 主题",
          options: [
            { label: "浅色", value: "light" },
            { label: "深色", value: "dark" },
          ],
        },
        "prefix-icon": {
          value: "Clock",
          type: "input",
          label: "自定义前缀图标",
        },
        "clear-icon": {
          value: "CircleClose",
          type: "input",
          label: "自定义清除图标",
        },
        start: {
          value: "09:00",
          type: "input",
          label: "开始时间",
        },
        end: {
          value: "18:00",
          type: "input",
          label: "结束时间",
        },
        step: {
          value: "00:30",
          type: "input",
          label: "间隔时间",
        },
        "min-time": {
          value: "",
          type: "input",
          label: "最早时间点",
        },
        "max-time": {
          value: "",
          type: "input",
          label: "最晚时间点",
        },
        format: {
          value: "HH:mm",
          type: "input",
          label: "设置时间格式",
        },
        "empty-values": {
          value: [],
          type: "array",
          label: "空值配置",
        },
        "value-on-clear": {
          value: null,
          type: "input",
          label: "清空选项的值",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "多选框组",
            type: "input",
            label: "多选框组",
          },
        },
      }),
    },
    {
      tag: "el-transfer",
      tagLabel: "穿梭框",
      tagIcon: "transfer",
      document: "https://element-plus.org/zh-CN/component/transfer",
      type: "form",
      attr: {
        "v-model": {
          value: [],
          type: "array",
          label: "选中项绑定值",
        },
        data: {
          value: [],
          type: "array",
          label: "Transfer 的数据源",
        },
        filterable: {
          value: false,
          type: "switch",
          label: "是否可搜索",
        },
        "filter-placeholder": {
          value: "",
          type: "input",
          label: "搜索框占位符",
        },
        "filter-method": {
          value: null,
          type: "function",
          label: "自定义搜索方法",
        },
        "target-order": {
          value: "original",
          type: "radio",
          label: "右侧列表元素的排序策略",
          options: [
            { label: "保持原顺序", value: "original" },
            { label: "新加入元素排在最后", value: "push" },
            { label: "新加入元素排在最前", value: "unshift" },
          ],
        },
        titles: {
          value: [],
          type: "array",
          label: "自定义列表标题",
        },
        "button-texts": {
          value: [],
          type: "array",
          label: "自定义按钮文案",
        },
        "render-content": {
          value: null,
          type: "function",
          label: "自定义数据项渲染函数",
        },
        format: {
          value: {},
          type: "object",
          label: "列表顶部勾选状态文案",
        },
        props: {
          value: {},
          type: "object",
          label: "数据源的字段别名",
        },
        "left-default-checked": {
          value: [],
          type: "array",
          label: "左侧列表初始已勾选项",
        },
        "right-default-checked": {
          value: [],
          type: "array",
          label: "右侧列表初始已勾选项",
        },
        "validate-event": {
          value: true,
          type: "switch",
          label: "是否触发表单验证",
        },
      },
      hedge: Object.assign({}, defaultHedge, {
        attr: {
          ...defaultHedge.attr,
          label: {
            value: "穿梭框",
            type: "input",
            label: "穿梭框",
          },
        },
      }),
    },
  ],
};
