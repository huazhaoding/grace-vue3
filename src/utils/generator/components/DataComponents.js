export const DataComponent = {
  title: "数据组件",
  icon: "",
  list: [
    {
      tag: "el-avatar",
      tagLabel: "头像",
      tagIcon: "avatar",
      document: "https://element-plus.org/zh-CN/component/avatar",
      type: "data",
      attr: {
        icon: {
          value: "",
          type: "input",
          label: "设置 Avatar 的图标类型",
        },
        size: {
          value: "default",
          type: "select",
          label: "Avatar 大小",
          options: [
            { label: "小", value: "small" },
            { label: "默认", value: "default" },
            { label: "大", value: "large" },
          ],
        },
        shape: {
          value: "circle",
          type: "select",
          label: "Avatar 形状",
          options: [
            { label: "圆形", value: "circle" },
            { label: "方形", value: "square" },
          ],
        },
        src: {
          value: "",
          type: "input",
          label: "Avatar 图片的源地址",
        },
        "src-set": {
          value: "",
          type: "input",
          label: "图片 Avatar 的原生 srcset 属性",
        },
        alt: {
          value: "",
          type: "input",
          label: "图片 Avatar 的原生 alt 属性",
        },
        fit: {
          value: "cover",
          type: "select",
          label: "图片如何适应容器",
          options: [
            { label: "填充", value: "fill" },
            { label: "包含", value: "contain" },
            { label: "覆盖", value: "cover" },
            { label: "无", value: "none" },
            { label: "缩放", value: "scale-down" },
          ],
        },
      },
    },
    {
      tag: "el-calendar",
      type: "data",
      tagLabel: "日历",
      tagIcon: "calendar",
      document: "https://element.eleme.cn/#/zh-CN/component/calendar",
      attr: {
        defaultValue: {
          value: null,
          type: "object",
          label: "选中项绑定值",
        },
        range: {
          value: [],
          type: "array",
          label: "时间范围",
        },
      },
    },
  ],
};
