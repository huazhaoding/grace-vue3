export const BaseComponents = [
  {
    tag: "el-button", // 定义组件类型为按钮
    tagLabel: "按钮", // 标签名，用于标识组件
    tagIcon: "icon-button", // 图标名称，用于可视化展示
    document: "https://element.eleme.cn/#/zh-CN/component/button", // 组件文档链接
    attr: {
      size: null, // 按钮尺寸 (large/default/small)
      type: null, // 按钮类型 (primary/success/warning/danger/info/text)
      plain: false, // 是否为朴素按钮样式
      text: false, // 是否为文字按钮样式
      bg: false, // 文字按钮是否有背景色
      link: false, // 是否为链接按钮样式
      round: false, // 是否为圆角按钮
      circle: false, // 是否为圆形按钮
      loading: false, // 是否显示加载状态
      "loading-icon": "Loading", // 自定义加载图标
      disabled: false, // 是否禁用按钮
      icon: null, // 按钮上的图标组件
      autofocus: false, // 是否自动获取焦点
      "native-type": "button", // 原生 type 属性 (button/submit/reset)
      "auto-insert-space": false, // 中文字符间是否自动加空格
      color: null, // 自定义按钮颜色
      dark: false, // 是否启用 dark 模式
      tag: "button", // 自定义元素标签
    },
  },
  {
    tag: "el-row", // 定义组件类型为布局行
    tagLabel: "布局", // 标签名，用于标识组件
    tagIcon: "el-row", // 图标名称，用于可视化展示
    document: "https://element.eleme.cn/#/zh-CN/component/layout", // 组件文档链接
    attr: {
      gutter: 0, // 栅格间隔
      justify: "start", // 主轴对齐方式 (start/end/center/space-around/space-between)
      align: "top", // 交叉轴对齐方式 (top/middle/bottom)
      customTag: "", // 自定义标签名
    },
    children: {
      tagIcon: "el-col", // 子组件图标名称
      tagLabel: "列配置", // 子组件标签名
      tag: "el-col", // 子组件标签类型
      xs: { span: 24, offset: 0, pull: 0, push: 0 }, // 超小屏幕下的栅格配置
      sm: { span: 24, offset: 0, pull: 0, push: 0 }, // 小屏幕下的栅格配置
      md: { span: 24, offset: 0, pull: 0, push: 0 }, // 中等屏幕下的栅格配置
      lg: { span: 24, offset: 0, pull: 0, push: 0 }, // 大屏幕下的栅格配置
      xl: { span: 24, offset: 0, pull: 0, push: 0 }, // 超大屏幕下的栅格配置
      customTag: "", // 自定义标签名
    },
  },
  {
    tag: "el-link", // 定义组件类型为链接
    tagLabel: "链接", // 标签名，用于标识组件
    tagIcon: "icon-link", // 图标名称，用于可视化展示
    document: "https://element.eleme.cn/#/zh-CN/component/link", // 组件文档链接
    attr: {
      type: null, // 链接类型 (primary/success/warning/danger/info)
      underline: true, // 是否显示下划线
      disabled: false, // 是否禁用链接
      href: null, // 链接地址
      icon: null, // 图标组件
      tag: "a", // 自定义元素标签
    },
  },
  {
    tag: "el-text", // 定义组件类型为文本
    tagLabel: "文本", // 标签名，用于标识组件
    tagIcon: "icon-text", // 图标名称，用于可视化展示
    document: "https://element.eleme.cn/#/zh-CN/component/text", // 组件文档链接
    attr: {
      type: "warning", // 文本类型
      size: "small", // 文本尺寸
      truncated: true, // 是否截断文本
      "line-clamp": 2, // 最多显示几行
      tag: "div", // 自定义元素标签
    },
  },
  {
    tag: "el-space", // 定义组件类型为间距
    tagLabel: "间距", // 标签名，用于标识组件
    tagIcon: "icon-space", // 图标名称，用于可视化展示
    document: "https://element.eleme.cn/#/zh-CN/component/space", // 组件文档链接
    attr: {
      alignment: "center", // 对齐方式
      class: "", // 自定义类名
      direction: "horizontal", // 排列方向 (horizontal/vertical)
      "prffix-cls": "", // 前缀类名
      style: "", // 自定义样式
      spacer: "", // 分隔符
      size: "small", // 间距大小
      wrap: false, // 是否换行
      fill: false, // 是否填充父容器
      "fill-radio": 100, // 填充比例
    },
    children: [], // 子组件列表
  },
  {
    tag: "el-splitter", // 定义组件类型为分割面板
    tagLabel: "分割面板", // 标签名，用于标识组件
    tagIcon: "icon-splitter", // 图标名称，用于可视化展示
    document: "https://element.eleme.cn/#/zh-CN/component/splitter", // 组件文档链接
    attr: {
      "resize-start": undefined, // 调整开始事件
      "resize-end": undefined, // 调整结束事件
      resize: undefined, // 调整事件
    },
    children: {
      tag: "el-splitter-panel", // 子组件标签类型
      tagLabel: "子分割面板", // 子组件标签名
      tagIcon: "icon-splitter-panel", // 子组件图标名称
      attr: {
        size: undefined, // 面板尺寸
        min: undefined, // 最小尺寸
        max: undefined, // 最大尺寸
        resizable: true, // 是否可调整大小
        collapsible: false, // 是否可折叠
      },
    },
  },
  {
    tag: "el-autocomplete", // 定义组件类型为自动补全
    tagLabel: "自动补全", // 标签名，用于标识组件
    tagIcon: "icon-autocomplete", // 图标名称，用于可视化展示
    document: "https://element.eleme.cn/#/zh-CN/component/autocomplete", // 组件文档链接
    attr: {
      "model-value": null, // 选中项绑定值
      placeholder: null, // 占位文本
      clearable: false, // 是否可清空
      disabled: false, // 是否禁用
      "value-key": "value", // 输入建议对象中用于显示的键名
      debounce: 300, // 获取输入建议的防抖延时（单位：毫秒）
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