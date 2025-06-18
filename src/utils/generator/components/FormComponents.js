export const FormComponents = [
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
      }
]