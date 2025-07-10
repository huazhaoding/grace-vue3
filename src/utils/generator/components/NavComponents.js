export const NavComponent = {
    title: "导航组件",
    icon: "",
    list: [
        // ... existing code ...
        {
            tag: "el-tabs", // 定义组件类型为选项卡
            tagLabel: "选项卡", // 标签名，用于标识组件
            tagIcon: "tabs", // 图标名称，用于可视化展示
            type: "layout",
            document: "https://element.eleme.cn/#/zh-CN/component/tabs", // 组件文档链接
            attr: {
                "v-model": {
                    value: "",
                    type: "input",
                    label: "绑定值"
                }, // 绑定值，选中选项卡的 name，默认值是第一个 tab 的 name
                type: {
                    value: "",
                    type: "radio",
                    label: "风格类型",
                    options: [
                        { label: "卡片", value: "card" },
                        { label: "边框", value: "border-card" }
                    ]
                }, // 风格类型 (card/border-card)
                closable: {
                    value: false,
                    label: "标签是否可关闭",
                    type: "switch"
                }, // 是否允许关闭标签
                addable: {
                    value: false,
                    label: "标签是否可增加",
                    type: "switch"
                }, // 是否允许增加标签
                editable: {
                    value: false,
                    label: "标签是否同时可增加和关闭",
                    type: "switch"
                }, // 是否允许同时增加和关闭标签
                tabPosition: {
                    value: "top",
                    type: "radio",
                    label: "选项卡所在位置",
                    options: [
                        { label: "顶部", value: "top" },
                        { label: "右侧", value: "right" },
                        { label: "底部", value: "bottom" },
                        { label: "左侧", value: "left" }
                    ]
                }, // 选项卡所在位置 (top/right/bottom/left)
                stretch: {
                    value: false,
                    label: "标签的宽度是否自撑开",
                    type: "switch"
                }, // 标签的宽度是否自撑开
               
            },
            template: {
                "el-tab-pane": {
                    tag: "el-tab-pane", // 定义组件类型为选项卡面板
                    tagLabel: "选项卡面板", // 标签名，用于标识组件
                    tagIcon: "tab-pane", // 图标名称，用于可视化展示
                    document: "https://element.eleme.cn/#/zh-CN/component/tabs", // 组件文档链接
                    attr: {
                        label: {
                            value: "tab-"+new Date().getTime(),
                            type: "input",
                            label: "选项卡标题"
                        }, // 选项卡标题
                        disabled: {
                            value: false,
                            label: "是否禁用",
                            type: "switch"
                        }, // 是否禁用
                        name: {
                            value: "",
                            type: "input",
                            label: "与选项卡绑定值 value 对应的标识符，表示选项卡别名。默认值是tab面板的序列号，如第一个 tab 是 0"
                        }, // 与选项卡绑定值 value 对应的标识符
                        closable: {
                            value: false,
                            label: "标签是否可关闭",
                            type: "switch"
                        }, // 标签是否可关闭
                        lazy: {
                            value: false,
                            label: "标签是否延迟渲染",
                            type: "switch"
                        } // 标签是否延迟渲染
                    },
                    slots: {
                        default: {
                            slotType: "dragComponent",
                            used: true,
                            label: "默认插槽",
                            slotOptions: []
                        }, // Tab-pane 的内容
                        label: {
                            value: "",
                            slotType: "normal",
                            used: false,
                            label: "Tab-pane 的标题内容",
                            type: "input"
                        } // Tab-pane 的标题内容
                    }
                }
            },
            slots: {
                default: {
                    slotType: "childDragComponent",
                    used: true,
                    label: "默认插槽",
                    slotOptions: [
                        {
                            tag: "el-tab-pane", // 定义组件类型为选项卡面板
                            tagLabel: "选项卡面板", // 标签名，用于标识组件
                            tagIcon: "tab-pane", // 图标名称，用于可视化展示
                            document: "https://element.eleme.cn/#/zh-CN/component/tabs", // 组件文档链接
                            attr: {
                                label: {
                                   value: "tab-"+new Date().getTime(),
                                    type: "input",
                                    label: "选项卡标题"
                                }, // 选项卡标题
                                disabled: {
                                    value: false,
                                    label: "是否禁用",
                                    type: "switch"
                                }, // 是否禁用
                                name: {
                                    value: "",
                                    type: "input",
                                    label: "与选项卡绑定值 value 对应的标识符，表示选项卡别名。默认值是tab面板的序列号，如第一个 tab 是 0"
                                }, // 与选项卡绑定值 value 对应的标识符
                                closable: {
                                    value: false,
                                    label: "标签是否可关闭",
                                    type: "switch"
                                }, // 标签是否可关闭
                                lazy: {
                                    value: false,
                                    label: "标签是否延迟渲染",
                                    type: "switch"
                                } // 标签是否延迟渲染
                            },
                            slots: {
                                default: {
                                    slotType: "dragComponent",
                                    used: true,
                                    label: "默认插槽",
                                    slotOptions: []
                                }, // Tab-pane 的内容
                                label: {
                                    value: "",
                                    slotType: "normal",
                                    used: false,
                                    label: "Tab-pane 的标题内容",
                                    type: "input"
                                } // Tab-pane 的标题内容
                            }
                        }]
                }, // 默认插槽，用于放置 Tab-pane
                "add-icon": {
                    value: "",
                    slotType: "normal",
                    used: false,
                    label: "自定义添加按钮图标",
                    type: "input"
                }, // 自定义添加按钮图标
                "addIcon": {
                    value: "",
                    slotType: "normal",
                    used: false,
                    label: "自定义添加按钮图标（已弃用）",
                    type: "input"
                } // 自定义添加按钮图标（已弃用）
            },
            style: {},
            events: {
                "tab-click": {
                    used: false,
                    label: "tab 被选中时触发",
                    functionName: "handleTabClick",
                    info: "tab 被选中时触发"
                }, // tab 被选中时触发
                "tab-change": {
                    used: false,
                    label: "activeName 改变时触发",
                    functionName: "handleTabChange",
                    info: "activeName 改变时触发"
                }, // activeName 改变时触发
                "tab-remove": {
                    used: false,
                    label: "点击 tab 移除按钮时触发",
                    functionName: "handleTabRemove",
                    info: "点击 tab 移除按钮时触发"
                }, // 点击 tab 移除按钮时触发
                "tab-add": {
                    used: false,
                    label: "点击 tab 新增按钮时触发",
                    functionName: "handleTabAdd",
                    info: "点击 tab 新增按钮时触发"
                }, // 点击 tab 新增按钮时触发
                edit: {
                    used: false,
                    label: "点击 tab 的新增或移除按钮后触发",
                    functionName: "handleEdit",
                    info: "点击 tab 的新增或移除按钮后触发"
                } // 点击 tab 的新增或移除按钮后触发
            }
        },


    ]
}