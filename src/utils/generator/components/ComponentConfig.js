const configInfo = {
    tag: "el-button-group",//标签
    tagLabel: "按钮组",//标签名
    tagIcon: "button-group",//标签图标
    type: "normal",//组件类型
    document: "https://element-plus.org/zh-CN/component/button",//文档地址
    attr: {
        size: {
            value: "",//属性值
            type: "radio",//操作属性的输入类型
            label: "用于控制该按钮组内按钮的大小",//操作属性的输入类型标签
            options: [
                { label: "大", value: "large" },
                { label: "默认", value: "default" },
                { label: "小", value: "small" },
            ],//条目  非选择标签这里没有
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
    },//属性
    slots: {
        default: {
            label: "默认插槽",//插槽名
            slotType: "childComponent",//插槽类型
            used: true,//是否启用
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
                            value: "按钮1",
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
            ],//插槽内容
        },
    },//插槽
    events: {
        click: {
            used: false,//是否启用
            label: "点击事件",//点击事件
            functionName: "handleClick",//方法名
            usedReturn: false,//返回值
            param: ["event"],//参数
            info: "按下键时触发",//说明
        }
    },//事件 
    styles: {

    }//样式
}