
export const BaseComponents = {
  title: "基础组件",
  icon: "",
  list: [
    {
      tag: "el-button", // 定义组件类型为按钮
      tagLabel: "按钮", // 标签名，用于标识组件
      tagIcon: "button", // 图标名称，用于可视化展示
      type:"normal",
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
          slotType: "normal",
          used: true,
          label: "按钮内容default",
          type: "textarea",
        },
        loading: {
          value: undefined,
          slotType: "normal",
          label: "加载中内容loading",
          used: false,
          type: "textarea",
        },
        icon: {
          value: undefined,
          slotType: "normal",
          label: "图标icon",
          used: false,
          type: "input",
        },
      },
    },
    {
      tag: "el-button-group",
      tagLabel: "按钮组",
      tagIcon: "button-group",
      type:"normal",
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
    },
    {
      tag: "el-row", // 定义组件类型为布局行
      tagLabel: "布局", // 标签名，用于标识组件
      tagIcon: "row", // 图标名称，用于可视化展示
      document: "https://element.eleme.cn/#/zh-CN/component/layout", // 组件文档链接
      type: "layout",
      template: {
        "el-col": {
          tagIcon: "el-col", // 子组件图标名称
          tagLabel: "列配置", // 子组件标签名
          tag: "el-col", // 子组件标签类型
          attr: {
            span: {
              value: 12,
              label: "栅格占据的列数",
              type: "slider",
              min: 0,
              max: 24,
            },
            offset: {
              value: 0,
              label: "栅格左侧的间隔格数",
              type: "slider",
              min: 0,
              max: 24,
            },
            pull: {
              value: 0,
              label: "栅格向左移动格数",
              type: "slider",
              min: 0,
              max: 24,
            },
            push: {
              value: 0,
              label: "栅格向右移动格数",
              type: "slider",
              min: 0,
              max: 24,
            },
            xs: {
              value: { span: 12, offset: 0, pull: 0, push: 0 },
              label: "超小屏幕",
              type: "object",
            }, // 超小屏幕下的栅格配置
            sm: {
              value: { span: 12, offset: 0, pull: 0, push: 0 },
              label: "小屏幕",
              type: "object",
            }, // 小屏幕下的栅格配置
            md: {
              value: { span: 12, offset: 0, pull: 0, push: 0 },
              label: "中等屏幕",
              type: "object",
            },
            // 中等屏幕下的栅格配置
            lg: {
              value: { span: 12, offset: 0, pull: 0, push: 0 },
              label: "大屏幕",
              type: "object",
            }, // 大屏幕下的栅格配置
            xl: {
              value: { span: 12, offset: 0, pull: 0, push: 0 },
              label: "超大屏幕",
              type: "object",
            }, // 超大屏幕下的栅格配置,
            tag: {
              value: "div",
              label: "自定义标签",
              type: "input",
              placeholder: "请输入自定义标签",
            },
          },
          slots: {
            default: {
              label: "el-col默认插槽",
              slotType: "dragComponent",
              used: true,
              slotOptions: [
                {
                  tag: "el-button", // 定义组件类型为按钮
                  tagLabel: "按钮", // 标签名，用于标识组件
                  tagIcon: "button", // 图标名称，用于可视化展示
                  document:
                    "https://element.eleme.cn/#/zh-CN/component/button", // 组件文档链接
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
                      type: "textarea",
                    },
                    icon: {
                      value: undefined,
                      label: "图标",
                      slotType: "normal",
                      type: "input",
                    },
                  },
                },
              ],
            },
          },
        }
      },
      attr: {
        gutter: {
          value: 0,
          label: "栅格间隔",
          type: "number",
          min: 0,
        }, // 栅格间隔
        justify: {
          value: "start", // 默认值
          label: "对齐方式",
          type: "radio",
          options: [
            { value: "start", label: "左对齐" },
            { value: "end", label: "右对齐" },
            { value: "center", label: "居中" },
            { value: "space-around", label: "均等分布" },
            { value: "space-between", label: "两端对齐" },
          ],
        }, // 主轴对齐方式 (start/end/center/space-around/space-between)
        align: {
          value: "top",
          type: "radio",
          label: "侧轴对齐方式",
          options: [
            { label: "顶部对齐", value: "top" },
            { label: "居中对齐", value: "middle" },
            { label: "底部对齐", value: "bottom" },
          ],
        }, // 交叉轴对齐方式 (top/middle/bottom)
        tag: {
          value: "div",
          type: "input",
          label: "自定义标签名",
          placeholder: "请输入自定义标签名",
        }, // 自定义标签名
      },
      slots: {
        default: {
          slotType: "childDragComponent",
          label: "默认插槽",
          used: true,
          slotOptions: [
            {
              tagIcon: "el-col", // 子组件图标名称
              tagLabel: "列配置", // 子组件标签名
              tag: "el-col", // 子组件标签类型
              attr: {
                span: {
                  value: 12,
                  label: "栅格占据的列数",
                  type: "slider",
                  min: 0,
                  max: 24,
                },
                offset: {
                  value: 0,
                  label: "栅格左侧的间隔格数",
                  type: "slider",
                  min: 0,
                  max: 24,
                },
                pull: {
                  value: 0,
                  label: "栅格向左移动格数",
                  type: "slider",
                  min: 0,
                  max: 24,
                },
                push: {
                  value: 0,
                  label: "栅格向右移动格数",
                  type: "slider",
                  min: 0,
                  max: 24,
                },
                xs: {
                  value: { span: 12, offset: 0, pull: 0, push: 0 },
                  label: "超小屏幕",
                  type: "object",
                }, // 超小屏幕下的栅格配置
                sm: {
                  value: { span: 12, offset: 0, pull: 0, push: 0 },
                  label: "小屏幕",
                  type: "object",
                }, // 小屏幕下的栅格配置
                md: {
                  value: { span: 12, offset: 0, pull: 0, push: 0 },
                  label: "中等屏幕",
                  type: "object",
                },
                // 中等屏幕下的栅格配置
                lg: {
                  value: { span: 12, offset: 0, pull: 0, push: 0 },
                  label: "大屏幕",
                  type: "object",
                }, // 大屏幕下的栅格配置
                xl: {
                  value: { span: 12, offset: 0, pull: 0, push: 0 },
                  label: "超大屏幕",
                  type: "object",
                }, // 超大屏幕下的栅格配置,
                tag: {
                  value: "div",
                  label: "自定义标签",
                  type: "input",
                  placeholder: "请输入自定义标签",
                },
              },
              slots: {
                default: {
                  label: "el-col默认插槽",
                  slotType: "dragComponent",
                  used: true,
                  slotOptions: [
                    {
                      tag: "el-button", // 定义组件类型为按钮
                      tagLabel: "按钮", // 标签名，用于标识组件
                      tagIcon: "button", // 图标名称，用于可视化展示
                      document:
                        "https://element.eleme.cn/#/zh-CN/component/button", // 组件文档链接
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
                          type: "textarea",
                        },
                        icon: {
                          value: undefined,
                          label: "图标",
                          slotType: "normal",
                          type: "input",
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
    {
      tag: "el-link", // 定义组件类型为链接
      tagLabel: "链接", // 标签名，用于标识组件
      tagIcon: "link", // 图标名称，用于可视化展示
      type:"normal",
      document: "https://element.eleme.cn/#/zh-CN/component/link", // 组件文档链接
      attr: {
        type: {
          value: "primary",
          label: "类型",
          options: [
            { value: "primary", label: "主要" },
            { value: "success", label: "成功" },
            { value: "warning", label: "警告" },
            { value: "danger", label: "危险" },
            { value: "info", label: "信息" },
          ],
          type: "radio",
        }, // 链接类型 (primary/success/warning/danger/info)
        underline: {
          value: "never",
          label: "是否显示下划线",
          options: [
            { value: "always", label: "总是" },
            { value: "hover", label: "悬停" },
            { value: "never", label: "从不" },
          ],
          type: "radio",
        }, // 是否显示下划线
        disabled: {
          value: false,
          label: "是否禁用",
          type: "switch",
        }, // 是否禁用链接
        href: {
          value: "",
          label: "链接地址",
          type: "input",
          placeholder: "请输入链接地址",
        }, // 链接地址
        icon: {
          value: "",
          label: "图标组件",
          type: "icon",
        }, // 图标组件
        target: {
          value: "",
          label: "打开方式",
          type: "radio",
          options: [
            { label: "当前窗口", value: "_self" },
            { label: "新窗口", value: "_blank" },
            { label: "父窗口", value: "_parent" },
            { label: "框架", value: "_top" },
          ],
        }
      },
      slots: {
        default: {
          value: "链接内容",
          label: "链接内容",
          slotType: "normal",
          used: true,
          type: "textarea",
        },
        icon: {
          value: undefined,
          label: "图标",
          used: false,
          slotType: "normal",
          type: "textarea",
        },
      },
    },
    {
      tag: "el-text", // 定义组件类型为文本
      tagLabel: "文本", // 标签名，用于标识组件
      tagIcon: "language", // 图标名称，用于可视化展示
      type:"normal",
      document: "https://element.eleme.cn/#/zh-CN/component/text", // 组件文档链接
      attr: {
        type: {
          value: "primary",
          label: "文本类型",
          type: "radio",
          options: [
            { value: "primary", label: "主要" },
            { value: "success", label: "成功" },
            { value: "warning", label: "警告" },
            { value: "danger", label: "危险" },
            { value: "info", label: "信息" },
          ],
        }, // 文本类型
        size: {
          value: "default",
          label: "文本尺寸",
          type: "radio",
          options: [
            { value: "default", label: "默认" },
            { value: "small", label: "小" },
            { value: "large", label: "大" },
          ],
        }, // 文本尺寸
        truncated: {
          value: false,
          label: "是否截断文本",
          type: "switch",
        }, // 是否截断文本
        "line-clamp": {
          value: 1,
          label: "最多显示几行",
          type: "inputNumber",
          min: 1,
        }, // 最多显示几行
        defaultLabel: {
          value: "我是文本，请修改我",
          label: "文本内容",
          type: "textarea",
          rows: 3,
          placeholder: "请输入内容",
        },
        tag: {
          value: "span",
          label: "自定义元素标签",
          type: "input",
          placeholder: "请输入自定义元素标签",
        }, // 自定义元素标签
      },
      slots: {
        default: {
          slotType: "normal",
          value: "我是文本，请修改我",
          used: true,
          label: "文本内容",
          type: "textarea",
          rows: 3,
          placeholder: "请输入内容",
        },
      },
    },
    {
      tag: "el-space", // 定义组件类型为间距
      tagLabel: "间距", // 标签名，用于标识组件
      tagIcon: "swagger", // 图标名称，用于可视化展示
      document: "https://element.eleme.cn/#/zh-CN/component/space", // 组件文档链接
      type: "not-drag-layout",
      attr: {
        alignment: {
          value: "center",
          label: "对齐方式",
          options: [
            { label: "居中", value: "center" },
            { label: "顶部对齐", value: "top" },
            { label: "底部对齐", value: "bottom" },
            { label: "伸展", value: "stretch" },
          ],
        }, // 对齐方式
        class: {
          value: "",
          label: "自定义类名",
          type: "input",
          placeholder: "请输入自定义类名",
        }, // 自定义类名
        direction: {
          value: "horizontal",
          label: "排列方向",
          options: [
            { label: "水平", value: "horizontal" },
            { label: "垂直", value: "vertical" },
          ],
          type: "radio",
        }, // 排列方向 (horizontal/vertical)
        "prffix-cls": {
          value: "",
          label: "前缀类名",
          type: "input",
          placeholder: "请输入前缀类名",
        }, // 前缀类名
        style: {
          value: "",
          label: "自定义样式",
          type: "input",
          placeholder: "请输入自定义样式",
          info: "请输入自定义样式，如：{color: red;}",
        }, // 自定义样式
        spacer: {
          value: "",
          label: "分隔符",
          type: "input",
          placeholder: "请输入分隔符",
        }, // 分隔符
        size: {
          label: "间距大小",
          value: 10,
          type: "slider",
        }, // 间距大小
        wrap: {
          value: false,
          label: "是否换行",
          type: "switch",
        }, // 是否换行
        fill: {
          value: false,
          label: "是否填充父容器",
          type: "switch",
        }, // 是否填充父容器
        "fill-radio": {
          value: 100,
          label: "填充比例",
          type: "number",
          min: 0,
          max: 100,
        }, // 填充比例
      },
      slots: {
        default: {
          label: "子组件列表",
          used: true,
          slotType: "itemComponent",
          slotOptions: [],
        },
      }, // 子组件列表
    },
    {
      tag: "el-splitter", // 定义组件类型为分割面板
      tagLabel: "分割面板", // 标签名，用于标识组件
      tagIcon: "nested", // 图标名称，用于可视化展示
      document: "https://element.eleme.cn/#/zh-CN/component/splitter", // 组件文档链接
      attr: {
        "resize-start": {
          value: undefined,
          type: "function",
          label: "调整开始事件",
        }, // 调整开始事件
        "resize-end": {
          value: undefined,
          type: "function",
          label: "调整结束事件",
        }, // 调整结束事件
        resize: {
          value: undefined,
          type: "function",
          label: "调整事件",
        }, // 调整事件
      },
      slotType: "component",
      slots: {
        default: {
          label: "子组件列表",
          type: "component",
          slotOptions: [
            {
              tag: "el-splitter-panel", // 子组件标签类型
              tagLabel: "子分割面板", // 子组件标签名
              tagIcon: "icon-splitter-panel", // 子组件图标名称
              attr: {
                size: {
                  value: undefined,
                  type: "number",
                  label: "面板尺寸",
                }, // 面板尺寸
                min: {
                  value: undefined,
                  type: "number",
                  label: "最小尺寸",
                }, // 最小尺寸
                max: {
                  value: undefined,
                  type: "number",
                  label: "最大尺寸",
                }, // 最大尺寸
                resizable: {
                  value: true,
                  type: "switch",
                  label: "是否可调整",
                }, // 是否可调整大小
                collapsible: {
                  value: false,
                  type: "switch",
                  label: "是否可折叠",
                }, // 是否可折叠
              },
              slots: {
                default: {
                  label: "子组件列表",
                  type: "dragComponent",
                  slotOptions: [],
                },
              },
            },
          ],
        },
      },
    },
  ],
};
