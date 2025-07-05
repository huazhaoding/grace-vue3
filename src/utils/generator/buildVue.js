//模板
export function vueTemplate(str) {
  return `<template>
    <div class="app-container">
      ${str}
    </div>
  </template>`;
}
// 脚本
export function vueScript(str) {
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

export function makeUpHtml(conf, type) {
  let html = "";
  html += vueTemplate(conf.children);
  html += cssStyle(conf.style);
  html += vueScript(conf.script);
  return html;
}

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
  const { tag, attr, slots, hedge } = config;
  const simplify = simplifyItemAttr(attr);

  // 构建插槽内容
  let slotContent = "";
  // 构建组件属性
  const attributes = Object.entries(simplify)
    .filter(([key, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

  if (slots) {
    for (const [key, value] of Object.entries(slots)) {
      if (value.used) {
        if (key === "default") {
          slotContent += listGenerateComponent(value.slotOptions);
        } else {
          slotContent += `<template #${key}>${value.value}</template>`;
        }
      }
    }
  }

  // 返回完整的组件代码
  return `<${tag} ${attributes}>
    ${slotContent}
</${tag}>`;
}

// 转换函数：将复杂结构简化为简单结构
function simplifyItemAttr(item) {
  const simplified = {};
  for (const key in item) {
    if (key === "v-model" && item['vModel']) {
     simplified[key] = item['vModel'];
    } else if (item[key].append) {
      simplified[key] = item[key].value + item[key].append;
    } else {
      simplified[key] = item[key].value;
    }
  }
  return simplified;
}

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
console.log(listGenerateComponent(components));
