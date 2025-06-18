export const BaseComponents = [
  {
    el: "el-button",
    tagLabel: "按钮",
    tagIcon: "icon-button",
    document: "https://element.eleme.cn/#/zh-CN/component/button",
    attr: {
      size: null, // 按钮尺寸 (large/default/small)
      type: null, // 按钮类型 (primary/success/warning/danger/info/text)
      plain: false, // 朴素按钮样式
      text: false, // 文字按钮样式
      bg: false, // 文字按钮背景色
      link: false, // 链接按钮样式
      round: false, // 圆角按钮
      circle: false, // 圆形按钮
      loading: false, // 加载状态
      "loading-icon": "Loading", // 自定义加载图标
      disabled: false, // 禁用状态
      icon: null, // 图标组件
      autofocus: false, // 原生 autofocus 属性
      "native-type": "button", // 原生 type 属性 (button/submit/reset)
      "auto-insert-space": false, // 中文字符自动加空格
      color: null, // 自定义按钮颜色
      dark: false, // dark 模式
      tag: "button", // 自定义元素标签
    },
  },
  {
    el: "el-row",
    tagLabel: "布局",
    tagIcon: "el-row",
    document: "https://element.eleme.cn/#/zh-CN/component/layout",
    attr: {
      gutter: 0,
      justify: "start",
      align: "top",
      customTag: "",
    },
    children: {
      tagIcon: "el-col",
      tagLabel: "列配置",
      tag: "el-col",
      xs: { span: 24, offset: 0, pull: 0, push: 0 },
      sm: { span: 24, offset: 0, pull: 0, push: 0 },
      md: { span: 24, offset: 0, pull: 0, push: 0 },
      lg: { span: 24, offset: 0, pull: 0, push: 0 },
      xl: { span: 24, offset: 0, pull: 0, push: 0 },
      customTag: "",
    },
  },
  {
    el: "el-link",
    tagLabel: "链接",
    tagIcon: "icon-link",
    document: "https://element.eleme.cn/#/zh-CN/component/link",
    attr: {
      type: null, // 按钮类型 (primary/success/warning/danger/info)
      underline: true, // 链接是否下划线
      disabled: false, // 禁用状态
      href: null, // 链接地址
      icon: null, // 图标组件
      tag: "a", // 自定义元素标签
    },
  },
  {
    el: "el-text",
    tagLabel: "文本",
    tagIcon: "icon-text",
    document: "https://element.eleme.cn/#/zh-CN/component/text",
    attr: {
      type: "warning",
      size: "small",
      truncated: true,
      "line-clamp": 2,
      tag: "div",
    },
  },
  {
    el: "el-space",
    tagLabel: "间距",
    tagIcon: "icon-space",
    document: "https://element.eleme.cn/#/zh-CN/component/space",
    attr: {
      alignment: "center",
      class: "",
      direction: "horizontal",
      "prffix-cls": "",
      style: "",
      spacer: "",
      size: "small",
      wrap: false,
      fill: false,
      "fill-radio": 100,
    },
    children: [],
  },
  {
    el: "el-splitter",
    tagLabel: "分割面板",
    tagIcon: "icon-splitter",
    document: "https://element.eleme.cn/#/zh-CN/component/splitter",
    attr: {
      "resize-start": undefined,
      "resize-end": undefined,
      resize: undefined,
    },
    children: {
      tag: "el-splitter-panel",
      tagLabel: "子分割面板",
      tagIcon: "icon-splitter-panel",
      attr: {
        size: undefined,
        min: undefined,
        max: undefined,
        resizable: true,
        collapsible: false,
      },
    },
  },
  {
    el: "el-autocomplete",
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
];
