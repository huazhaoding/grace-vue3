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
    attr: {},
    attr: {
      gutter: 0,
      justify: "start",
      align: "top",
      customTag: "",
    },
    children: {
      tagIcon: "el-col",
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
  { el: "el-space",
    tagLabel: "间距",
    tagIcon: "icon-space",
    document: "https://element.eleme.cn/#/zh-CN/component/space",
    attr: {
      alignment: "center",
      class: "",    
      direction: "horizontal",
      "prffix-cls":'',
      style: "",    
      spacer: "",
      size: "small",
      wrap: false,
      fill: false,
      "fill-radio":100
    },
    children: [
     
    ]
   },{
    el:"el-splitter",
    tagLabel: "分割面板",
    tagIcon: "icon-splitter",
    document: "https://element.eleme.cn/#/zh-CN/component/splitter",
    attr: {
      "resize-start": undefined,
      "resize-end":undefined,
      resize:undefined
    }
   }
];
