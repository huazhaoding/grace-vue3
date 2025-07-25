# 止戈内容管理前端

本系统基于RuoRi-Vue3开发,部分模块代码有改动,同时独立出存储模块并添加邮件模块和内容模块,内容模块目前已经基本完成，后续会进行小修小补,有时间会同步主线代码。

储存模块
邮件模块
内容模块

此项目目前作为管理前端，不做内容展示，内容展示部分需要独立部署。

* [不分离](https://gitee.com/Getawy/zhige "止戈")
* [分离后端](https://gitee.com/Getawy/zg-admin "zg-admin")
* [示例主题](https://gitee.com/Getawy/view-zgblog "view-zgblog")

这里需要注意的是分离后端已经包含展示服务，需要独立部署，主题需要手动安装。

* [X] 添加代码编辑器codemirror
* [X] tinymce  （源码未高亮）
* [X] md-editor-v3(markdown)编辑器 （源码已经添加高亮）
* [X] 图片编辑器

### 原有修改

* [X] 配置添加配置组

### 添加模块

* [X] 储存模块
* [X] 邮件模块
* [X] 内容模块
* [X] 资源组分配

组件构建模块

### 内容模块

* [X] 组件列表
* [X] 编辑区
* [X] 属性编辑区

### 组件构造

支持大多数element plus组件，可通过拖拉拽的的方式快速构建组件原型或者是不那么复杂的组件。其中配置主要包含二个部分，组件以及全局配置

组件配置 {
      tag: "el-button", // 定义组件类型为按钮
      tagLabel: "按钮", // 标签名，用于标识组件
      tagIcon: "button", // 图标名称，用于可视化展示
      type: "normal",//组件类型
      document: "https://element.eleme.cn/#/zh-CN/component/button", // 组件文档链接
      //属性
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
      //插槽
      slots: {
        default: {
          value: "按钮",//如果是其他的slotOprions:[] 子组件列表
          //插槽类型
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
      //样式
      style: {},
      //事件
      events: {
        click: {
          used: false,
          label: "点击事件",
          functionName: "handleFocus",
          info: "点击事件",
        },
      }
    }
