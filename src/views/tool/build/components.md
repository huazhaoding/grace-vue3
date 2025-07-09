组件类型

单组件 可拖入指定区域

父子组件-》父组件只允许拖入指定组件

可拖入组件   可允许任何组件拖入

数据datas

属性attr

事件events

插槽slots

组件类型type

可拖拽drag

单组件：独立的组件，没有子组件或内容部分。
包含子组件：组件内部嵌套了其他子组件。
组件内有内容：组件内部包含可拖拽的内容区域。
子组件内还有内容：子组件内部也包含可拖拽的内容区域。

不存在默认插槽default的组件，比如el-input
存在默认插槽default的组件,但是插槽内容不是固定的 el-form  comoponentDrop
存在默认插槽default的组件,但是默认插槽内容是固定的,  el-select(componentChild) el-option(normal)
存在默认插槽default的组件,但是默认插槽内容是固定的,但是默认子插槽可以是任意内容(可拖拽)  el-col(componentChild) el-row(comoponentDrop)

版本计划支持大多数element plus 组件

    el-option-group  el-option
el-select
          el-option

el-radio

el-radio-button

    el-radio-button
el-radio-group
               el-radio

可拖拽区域, 元素及子元素一律虚线 激活时变实线 el-row el-col el-form

其它激活时一律实线


多个表单 
每个表单会主动获取子组件的验证规则


默认验证规则



自定义验证规则



最终数据
{ components: [],
  events: {},
  methods: {},
  lifecycles: {}
  emits: [],
  componentType: {},

}
