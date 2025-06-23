export const BaseComponents = {
  title: "基础组件",
  icon: "",
  list: [
    {
      tag: "el-button", // 定义组件类型为按钮
      tagLabel: "按钮", // 标签名，用于标识组件
      tagIcon: "button", // 图标名称，用于可视化展示
      document: "https://element.eleme.cn/#/zh-CN/component/button", // 组件文档链接
      attr: {
        size: {
          value: "default",
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
        }, // 按钮类型 (primary/success/warning/danger/info/text)
        defaultLabel: {
          value: "按钮",
          label: "按钮文字",
          placeholder: "请输入按钮文字",
          type: "input",
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
    },
    {
      tag: "el-row", // 定义组件类型为布局行
      tagLabel: "布局", // 标签名，用于标识组件
      tagIcon: "row", // 图标名称，用于可视化展示
      document: "https://element.eleme.cn/#/zh-CN/component/layout", // 组件文档链接
      attr: {
        gutter: 10, // 栅格间隔
        justify: "start", // 主轴对齐方式 (start/end/center/space-around/space-between)
        align: "top", // 交叉轴对齐方式 (top/middle/bottom)
        customTag: "", // 自定义标签名
      },
      optionChild: {
        tagIcon: "el-col", // 子组件图标名称
        tagLabel: "列配置", // 子组件标签名
        tag: "el-col", // 子组件标签类型
        attr: [
          {
            xs: { span: 24, offset: 0, pull: 0, push: 0 }, // 超小屏幕下的栅格配置
            sm: { span: 24, offset: 0, pull: 0, push: 0 }, // 小屏幕下的栅格配置
            md: { span: 24, offset: 0, pull: 0, push: 0 }, // 中等屏幕下的栅格配置
            lg: { span: 24, offset: 0, pull: 0, push: 0 }, // 大屏幕下的栅格配置
            xl: { span: 24, offset: 0, pull: 0, push: 0 }, // 超大屏幕下的栅格配置,
            data: [
              {
                tag: "el-button", // 定义组件类型为按钮
                tagLabel: "按钮", // 标签名，用于标识组件
                tagIcon: "button", // 图标名称，用于可视化展示
                document: "https://element.eleme.cn/#/zh-CN/component/button", // 组件文档链接
                attr: {
                  size: undefined, // 按钮尺寸 (large/default/small)
                  type: undefined, // 按钮类型 (primary/success/warning/danger/info/text)
                  defaultLabel: "主要按钮",
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
            ],
            tag: "div", //自定义默认内容
          },
          {
            xs: { span: 12, offset: 0, pull: 0, push: 0 }, // 超小屏幕下的栅格配置
            sm: { span: 12, offset: 0, pull: 0, push: 0 }, // 小屏幕下的栅格配置
            md: { span: 12, offset: 0, pull: 0, push: 0 }, // 中等屏幕下的栅格配置
            lg: { span: 12, offset: 0, pull: 0, push: 0 }, // 大屏幕下的栅格配置
            xl: { span: 12, offset: 0, pull: 0, push: 0 }, // 超大屏幕下的栅格配置],
            data: [
              {
                tag: "el-button", // 定义组件类型为按钮
                tagLabel: "按钮", // 标签名，用于标识组件
                tagIcon: "button", // 图标名称，用于可视化展示
                document: "https://element.eleme.cn/#/zh-CN/component/button", // 组件文档链接
                attr: {
                  size: undefined, // 按钮尺寸 (large/default/small)
                  type: undefined, // 按钮类型 (primary/success/warning/danger/info/text)
                  defaultLabel: "主要按钮",
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
            ],
            tag: "div", //自定义默认内容
          },
          {
            xs: { span: 24, offset: 0, pull: 0, push: 0 }, // 超小屏幕下的栅格配置
            sm: { span: 24, offset: 0, pull: 0, push: 0 }, // 小屏幕下的栅格配置
            md: { span: 24, offset: 0, pull: 0, push: 0 }, // 中等屏幕下的栅格配置
            lg: { span: 24, offset: 0, pull: 0, push: 0 }, // 大屏幕下的栅格配置
            xl: { span: 24, offset: 0, pull: 0, push: 0 }, // 超大屏幕下的栅格配置],
            data: [
              {
                tag: "el-button", // 定义组件类型为按钮
                tagLabel: "按钮", // 标签名，用于标识组件
                tagIcon: "button", // 图标名称，用于可视化展示
                document: "https://element.eleme.cn/#/zh-CN/component/button", // 组件文档链接
                attr: {
                  size: undefined, // 按钮尺寸 (large/default/small)
                  type: undefined, // 按钮类型 (primary/success/warning/danger/info/text)
                  defaultLabel: "主要按钮",
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
            ],
            tag: "div", //自定义默认内容
          },
        ],
      },
    },
    {
      tag: "el-link", // 定义组件类型为链接
      tagLabel: "链接", // 标签名，用于标识组件
      tagIcon: "link", // 图标名称，用于可视化展示
      document: "https://element.eleme.cn/#/zh-CN/component/link", // 组件文档链接
      attr: {
        type: null, // 链接类型 (primary/success/warning/danger/info)
        underline: true, // 是否显示下划线
        disabled: false, // 是否禁用链接
        href: null, // 链接地址
        icon: null, // 图标组件
        defaultLabel: "我是链接",
        tag: "a", // 自定义元素标签
      },
    },
    {
      tag: "el-text", // 定义组件类型为文本
      tagLabel: "文本", // 标签名，用于标识组件
      tagIcon: "language", // 图标名称，用于可视化展示
      document: "https://element.eleme.cn/#/zh-CN/component/text", // 组件文档链接
      attr: {
        type: "warning", // 文本类型
        size: "small", // 文本尺寸
        truncated: true, // 是否截断文本
        "line-clamp": 2, // 最多显示几行
        defaultLabel: "我是文本",
        tag: "div", // 自定义元素标签
      },
    },
    {
      tag: "el-space", // 定义组件类型为间距
      tagLabel: "间距", // 标签名，用于标识组件
      tagIcon: "swagger", // 图标名称，用于可视化展示
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
      options: [], // 子组件列表
    },
    {
      tag: "el-splitter", // 定义组件类型为分割面板
      tagLabel: "分割面板", // 标签名，用于标识组件
      tagIcon: "nested", // 图标名称，用于可视化展示
      document: "https://element.eleme.cn/#/zh-CN/component/splitter", // 组件文档链接
      attr: {
        "resize-start": undefined, // 调整开始事件
        "resize-end": undefined, // 调整结束事件
        resize: undefined, // 调整事件
      },
      options: {
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
  ],
};
