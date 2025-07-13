//模板
export function vueTemplate(components) {
  let str = listGenerateComponent(components);
  return `<template>
    <div class="app-container">
      ${str}
    </div>
  </template>`;
}
// 脚本
export function vueScript(events, lifeCycles) {
  let str = generateJavaScript(events) + "\n";
  str += generateJavaScript(lifeCycles);
  return `<script setup>
    ${str}
  </script>`;
}

// 样式
export function cssStyle(cssStr) {
  return `<style>
    ${cssStr}
  </style>`;
}

export function makeUpHtml(config) {
  let html = "";
  html += vueTemplate(config.list) + "\n";
  html += vueScript(config.events, config.lifeCycle);
  return html;
}

/**
 * 列表生成组件
 * @param {Array} components - 组件列表
 * @returns {string} - 生成的 HTML 列表
 */
function listGenerateComponent(components) {
  let componentStr = "";
  for (let i = 0; i < components.length; i++) {
    let component = components[i];
    componentStr += generateComponent(component);
  }
  return componentStr;
}

/**
 * 通用组件生成器
 * @param {Object} config - 组件配置对象
 * @returns {string} - 生成的 HTML 代码
 */
function generateComponent(config) {
  if (config.hedge) {
    let hedgeItem = Object.assign({}, config.hedge);
    delete config.hedge;
    hedgeItem.slots = {
      default: {
        used: true,
        slotType: "childComponent",
        slotOptions: [],
      },
    };
    hedgeItem.slots.default.slotOptions.push(config);
    return generateComponent(hedgeItem);
  } else {
    const { tag, attr, slots, events } = config;
    const simplify = simplifyItemAttr(attr);
    // 构建插槽内容
    let slotContent = "";
    // 构建组件属性
    const attributes = Object.entries(simplify)
      .filter(([key, value]) => value !== undefined && value !== "")
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");
    //构建插槽
    if (slots) {
      for (const [key, value] of Object.entries(slots)) {
        if (value.used) {
          if (key === "default" && value.slotType !== "normal") {
            slotContent += listGenerateComponent(value.slotOptions);
          } else {
            slotContent += `<template #${key}>${value.value}</template>`;
          }
        }
      }
    }
    let eventStr = "";
    //构建事件
    if (events) {
      eventStr = Object.entries(events)
        .filter(
          ([key, value]) => value !== undefined && value.used
        )
        .map(([key, value]) => `@${key}="${value.functionName}"`)
        .join(" ");
    }
    // 返回完整的组件代码
    return `<${tag} ${attributes} ${eventStr}>
    ${slotContent}
</${tag}>`;
  }
}

// 转换函数：将复杂结构简化为简单结构
function simplifyItemAttr(item) {
  const simplified = {};
  for (const key in item) {
    if (key === "v-model" && item["vModel"]) {
      simplified[key] = item["vModel"];
    } else if (item[key].append) {
      simplified[key] = item[key].value + item[key].append;
    } else {
      simplified[key] = item[key].value;
    }
  }
  return simplified;
}

function generateJavaScript(methods) {
  const jsContent = Object.entries(methods)
    .filter(([key, value]) => value !== undefined && value.used)
    .map(([key, value]) => value.value)
    .join("\n");
  return jsContent;
}

/**
 * 事件监听 events
 * 自定义方法  methods
 * 生命周期
 * 内置函数
 * 插槽
 *
 * 表单
 * 表单数据
 * 表单地址
 * 表单验证
 * 表单提交
 * 表单重置
 *
 *
 * 生成组件类型
 * 弹窗组件
 * 普通组件
 *
 * 去除一些默认配置或者无效输入 空  undefined
 *
 *
 *
 *
 * 脚本文件
 * 引入组件
 * 定义组件属性
 * 定义事件发射器emit
 * 数据模型  响应式和非响应式
 * 定义方法
 * 生命周期函数
 * 内置函数
 *
 * 暴露给模板的方法和变量
 *
 */

const components = [
  {
    tagLabel: "多选框组",
    tag: "el-checkbox-group",
    tagIcon: "checkbox",
    document: "https://element-plus.org/zh-CN/component/checkbox",
    type: "form",
    template: {
      "el-checkbox": {
        tagIcon: "el-checkbox",
        tagLabel: "多选框",
        tag: "el-checkbox",
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
            type: "switch",
            label: "选中时的值",
          },
          "false-value": {
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
              {
                value: "large",
                label: "大尺寸",
              },
              {
                value: "default",
                label: "中尺寸",
              },
              {
                value: "small",
                label: "小尺寸",
              },
            ],
          },
          name: {
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
            type: "input",
            label: "与 aria-control 一致，当 indeterminate 为 true 时生效",
          },
          tabindex: {
            value: 0,
            type: "input",
            label: "输入框的 tabindex",
          },
          id: {
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
        tagLabel: "多选框",
        tag: "el-checkbox-button",
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
            type: "switch",
            label: "选中时的值",
          },
          "false-value": {
            type: "switch",
            label: "未选中时的值",
          },
          disabled: {
            value: false,
            type: "switch",
            label: "是否禁用",
          },
          name: {
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
          {
            value: "large",
            label: "大尺寸",
          },
          {
            value: "default",
            label: "中尺寸",
          },
          {
            value: "small",
            label: "小尺寸",
          },
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
      vModel: "user.userName",
    },
    hedge: {
      tag: "el-form-item",
      attr: {
        label: {
          value: "多选框组",
          type: "input",
          label: "多选框组",
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
            {
              value: "large",
              label: "大尺寸",
            },
            {
              value: "default",
              label: "中尺寸",
            },
            {
              value: "small",
              label: "小尺寸",
            },
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
            {
              value: "left",
              label: "左侧",
            },
            {
              value: "right",
              label: "右侧",
            },
            {
              value: "top",
              label: "顶部",
            },
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
    },
    slots: {
      default: {
        label: "默认插槽",
        slotType: "childComponent",
        used: true,
        slotOptions: [
          {
            tagIcon: "el-checkbox",
            tagLabel: "列配置",
            tag: "el-checkbox",
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
                type: "switch",
                label: "选中时的值",
              },
              "false-value": {
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
                  {
                    value: "large",
                    label: "大尺寸",
                  },
                  {
                    value: "default",
                    label: "中尺寸",
                  },
                  {
                    value: "small",
                    label: "小尺寸",
                  },
                ],
              },
              name: {
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
                type: "input",
                label: "与 aria-control 一致，当 indeterminate 为 true 时生效",
              },
              tabindex: {
                value: 0,
                type: "input",
                label: "输入框的 tabindex",
              },
              id: {
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
    id: 102,
    renderKey: 1751729566610,
  },
];

const components2 = [
  {
    tag: "el-button-group",
    tagLabel: "按钮组",
    tagIcon: "button-group",
    document: "https://element-plus.org/zh-CN/component/button",
    attr: {
      size: {
        value: "",
        type: "radio",
        label: "用于控制该按钮组内按钮的大小",
        options: [
          { label: "大", value: "large" },
          { label: "默认", value: "default" },
          { label: "小", value: "small" },
        ],
      },
      type: {
        value: "",
        type: "radio",
        label: "用于控制该按钮组内按钮的类型",
        options: [
          { label: "主要", value: "primary" },
          { label: "成功", value: "success" },
          { label: "警告", value: "warning" },
          { label: "危险", value: "danger" },
          { label: "信息", value: "info" },
        ],
      },
    },
    slots: {
      default: {
        label: "默认插槽",
        slotType: "childComponent",
        used: true,
        slotOptions: [
          {
            tag: "el-button", // 定义组件类型为按钮
            tagLabel: "按钮", // 标签名，用于标识组件
            tagIcon: "button", // 图标名称，用于可视化展示
            document: "https://element.eleme.cn/#/zh-CN/component/button", // 组件文档链接
            attr: {
              size: {
                value: undefined,
                type: "radio",
                label: "尺寸",
                options: [
                  { label: "大", value: "large" },
                  { label: "默认", value: "default" },
                  { label: "小", value: "small" },
                ],
              }, // 按钮尺寸 (large/default/small)
              type: {
                value: "primary",
                type: "radio",
                label: "样式",
                info: "按钮类型，在设置color时，后者优先。",
                options: [
                  { label: "主要", value: "primary" },
                  { label: "成功", value: "success" },
                  { label: "警告", value: "warning" },
                  { label: "危险", value: "danger" },
                  { label: "信息", value: "info" },
                  { label: "文本", value: "text" },
                ],
              },
              plain: {
                value: false,
                label: "朴素按钮",
                type: "switch",
              }, // 是否为朴素按钮样式
              text: {
                value: false,
                label: "文字按钮",
                type: "switch",
              }, // 是否为文字按钮样式
              bg: {
                value: true,
                label: "背景色",
                type: "switch",
              }, // 文字按钮是否有背景色
              link: {
                value: false,
                label: "链接按钮",
                type: "switch",
              }, // 是否为链接按钮样式
              round: {
                value: false,
                label: "圆角按钮",
                type: "switch",
              }, // 是否为圆角按钮
              circle: {
                value: false,
                label: "圆形按钮",
                type: "switch",
              }, // 是否为圆形按钮
              loading: {
                value: false,
                label: "加载状态",
                type: "switch",
              }, // 是否显示加载状态
              "loading-icon": {
                value: "Loading",
                label: "加载图标",
                type: "icon",
              }, // 自定义加载图标
              disabled: {
                value: false,
                label: "禁用按钮",
                type: "switch",
              }, // 是否禁用按钮
              icon: {
                value: undefined,
                label: "按钮图标",
                type: "icon",
              }, // 按钮上的图标组件
              autofocus: {
                value: false,
                label: "自动获取焦点",
                type: "switch",
              }, // 是否自动获取焦点
              "native-type": {
                value: "button",
                label: "原生按钮类型",
                type: "radio",
                options: [
                  {
                    value: "button",
                    label: "按钮",
                  },
                  {
                    value: "submit",
                    label: "表单提交",
                  },
                  {
                    value: "reset",
                    label: "重置",
                  },
                ],
              }, // 原生 type 属性 (button/submit/reset)
              "auto-insert-space": {
                value: false,
                label: "自动插入空格",
                type: "switch",
              }, // 中文字符间是否自动加空格
              color: {
                value: "",
                label: "自定义按钮颜色",
                type: "color",
              }, // 自定义按钮颜色
              dark: {
                value: false,
                label: "dark 模式",
                type: "switch",
              }, // 是否启用 dark 模式
              tag: {
                value: "button",
                label: "自定义元素标签",
                type: "input",
              }, // 自定义元素标签
            },
            slots: {
              default: {
                value: "按钮",
                label: "按钮内容",
                slotType: "normal",
                used: true,
                type: "textarea",
              },
              loading: {
                value: undefined,
                label: "加载中内容",
                slotType: "normal",
                used: false,
                type: "textarea",
              },
              icon: {
                value: undefined,
                label: "图标",
                slotType: "normal",
                used: false,
                type: "input",
              },
            },
          },
        ],
      },
    },
    events: {
      blur: {
        used: true,
        label: "当选择器的输入框失去焦点时触发",
        functionName: "handleBlur",
        value: function (item) {},
      },
      focus: {
        used: false,
        label: "当选择器的输入框获得焦点时触发",
        functionName: "handleFocus",
        value: function (item) {},
      },
      change: {
        used: false,
        label: "仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发",
        functionName: "handleChange",
        value: function (item) {},
      },
      input: {
        used: false,
        label: "在 Input 值改变时触发",
        functionName: "handleInput",
        value: function (item) {},
      },
      clear: {
        used: false,
        label: "在点击由 clearable 属性生成的清空按钮时触发",
        functionName: "handleClear",
        value: function (item) {},
      },
      keydown: {
        used: false,
        label: "按下键时触发",
        functionName: "handleKeydown",
        value: function () {},
      },
      mouseleave: {
        used: false,
        label: "当鼠标进入输入框时触发",
        functionName: "handleMouseleave",
        value: function (item) {},
      },
      mouseenter: {
        used: false,
        label: "当鼠标离开输入框时触发",
        functionName: "handleMouseenter",
        value: function (item) {},
      },
      compositionstart: {
        used: false,
        label: "输入法输入开始时触发",
        functionName: "handleCompositionstart",
        value: function (item) {},
      },
      compositionupdate: {
        used: false,
        label: "输入法输入改变时触发",
        functionName: "handleCompositionupdate",
        value: function (item) {},
      },
      compositionend: {
        used: false,
        label: "输入法输入完成时触发",
        functionName: "handleCompositionend",
        value: function (item) {},
      },
    },
  },
];

/**
 * {
 * list:[],
 * lifecycle:{},
 * props:{},
 * emits:{},
 * exports:{},
 * methods:{},
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

let vue = {
  list: [
    {
      tag: "el-button-group",
      tagLabel: "按钮组",
      tagIcon: "button-group",
      document: "https://element-plus.org/zh-CN/component/button",
      attr: {
        size: {
          value: "",
          type: "radio",
          label: "用于控制该按钮组内按钮的大小",
          options: [
            { label: "大", value: "large" },
            { label: "默认", value: "default" },
            { label: "小", value: "small" },
          ],
        },
        type: {
          value: "",
          type: "radio",
          label: "用于控制该按钮组内按钮的类型",
          options: [
            { label: "主要", value: "primary" },
            { label: "成功", value: "success" },
            { label: "警告", value: "warning" },
            { label: "危险", value: "danger" },
            { label: "信息", value: "info" },
          ],
        },
      },
      slots: {
        default: {
          label: "默认插槽",
          slotType: "childComponent",
          used: true,
          slotOptions: [
            {
              tag: "el-button", // 定义组件类型为按钮
              tagLabel: "按钮", // 标签名，用于标识组件
              tagIcon: "button", // 图标名称，用于可视化展示
              document: "https://element.eleme.cn/#/zh-CN/component/button", // 组件文档链接
              attr: {
                size: {
                  value: undefined,
                  type: "radio",
                  label: "尺寸",
                  options: [
                    { label: "大", value: "large" },
                    { label: "默认", value: "default" },
                    { label: "小", value: "small" },
                  ],
                }, // 按钮尺寸 (large/default/small)
                type: {
                  value: "primary",
                  type: "radio",
                  label: "样式",
                  info: "按钮类型，在设置color时，后者优先。",
                  options: [
                    { label: "主要", value: "primary" },
                    { label: "成功", value: "success" },
                    { label: "警告", value: "warning" },
                    { label: "危险", value: "danger" },
                    { label: "信息", value: "info" },
                    { label: "文本", value: "text" },
                  ],
                },
                plain: {
                  value: false,
                  label: "朴素按钮",
                  type: "switch",
                }, // 是否为朴素按钮样式
                text: {
                  value: false,
                  label: "文字按钮",
                  type: "switch",
                }, // 是否为文字按钮样式
                bg: {
                  value: true,
                  label: "背景色",
                  type: "switch",
                }, // 文字按钮是否有背景色
                link: {
                  value: false,
                  label: "链接按钮",
                  type: "switch",
                }, // 是否为链接按钮样式
                round: {
                  value: false,
                  label: "圆角按钮",
                  type: "switch",
                }, // 是否为圆角按钮
                circle: {
                  value: false,
                  label: "圆形按钮",
                  type: "switch",
                }, // 是否为圆形按钮
                loading: {
                  value: false,
                  label: "加载状态",
                  type: "switch",
                }, // 是否显示加载状态
                "loading-icon": {
                  value: "Loading",
                  label: "加载图标",
                  type: "icon",
                }, // 自定义加载图标
                disabled: {
                  value: false,
                  label: "禁用按钮",
                  type: "switch",
                }, // 是否禁用按钮
                icon: {
                  value: undefined,
                  label: "按钮图标",
                  type: "icon",
                }, // 按钮上的图标组件
                autofocus: {
                  value: false,
                  label: "自动获取焦点",
                  type: "switch",
                }, // 是否自动获取焦点
                "native-type": {
                  value: "button",
                  label: "原生按钮类型",
                  type: "radio",
                  options: [
                    {
                      value: "button",
                      label: "按钮",
                    },
                    {
                      value: "submit",
                      label: "表单提交",
                    },
                    {
                      value: "reset",
                      label: "重置",
                    },
                  ],
                }, // 原生 type 属性 (button/submit/reset)
                "auto-insert-space": {
                  value: false,
                  label: "自动插入空格",
                  type: "switch",
                }, // 中文字符间是否自动加空格
                color: {
                  value: "",
                  label: "自定义按钮颜色",
                  type: "color",
                }, // 自定义按钮颜色
                dark: {
                  value: false,
                  label: "dark 模式",
                  type: "switch",
                }, // 是否启用 dark 模式
                tag: {
                  value: "button",
                  label: "自定义元素标签",
                  type: "input",
                }, // 自定义元素标签
              },
              slots: {
                default: {
                  value: "按钮",
                  label: "按钮内容",
                  slotType: "normal",
                  used: true,
                  type: "textarea",
                },
                loading: {
                  value: undefined,
                  label: "加载中内容",
                  slotType: "normal",
                  used: false,
                  type: "textarea",
                },
                icon: {
                  value: undefined,
                  label: "图标",
                  slotType: "normal",
                  used: false,
                  type: "input",
                },
              },
              events: {
                click: {
                  used: true,
                  label: "点击事件",
                  functionName: "handleClick",
                  usedReturn: false,
                  param: ["value"],
                },
              },
            },
          ],
        },
      },
    },
  ],
  lifeCycle: {
    onMounted: {
      used: true,
      value: "onMounted(() => {})",
      label: "注册一个回调函数，在组件挂载完成后执行",
    },
    onUpdated: {
      used: true,
      value: "onUpdated(() => {})",
      label: "注册一个回调函数，在组件更新完成后执行",
    },
  },
  props: {},
  emits: {},
  exports: {},
  events: {
    handleClick: {
      value: "function handleClick(){return handleClick';}",
      label: "测试方法",
      info: "测试方法",
      used: true,
    },
  },
};

// console.log(listGenerateComponent(components));
// console.log(listGenerateComponent(components2));
// console.log(generateJavaScript(components2[0].events));
console.log(makeUpHtml(vue));
