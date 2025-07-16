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

事件->

属性计算

最终数据
{ components: [],
  events: {},
  methods: {},
  lifecycles: {}
  emits: [],
  componentType: {},

}

支持大多数element plus组件及组件配置,事件,插槽
编辑组件与实际生成结果基本一致

非容器组件

- 普通组件
- 父子组件->可单独编辑slot

容器组件

- 普通容器->可往里面拖动组件
- 父子容器->可往子组件内拖动组件

组件说明文档
组件类型
系统支持多种类型的组件，包括单组件、父子组件和可拖拽组件。每种组件类型具有不同的功能和特性。

1. 单组件
   独立的组件，没有子组件或内容部分。
   示例：el-input（不存在默认插槽）
2. 包含子组件
   组件内部嵌套了其他子组件。
   示例：el-select 包含 el-option 或 el-option-group。
3. 组件内有内容
   组件内部包含可拖拽的内容区域。
   示例：el-form 支持任意内容拖入。
4. 子组件内还有内容
   子组件内部也包含可拖拽的内容区域。
   示例：el-col 和 el-row 的组合。
   插槽类型
   插槽类型根据其内容是否固定分为以下几类：

无默认插槽：如 el-input。
存在默认插槽但内容不固定：如 el-form，支持动态拖拽内容。
存在默认插槽但内容固定：如 el-select，子插槽为固定的 el-option。
存在默认插槽且子插槽内容可拖拽：如 el-col，支持任意内容拖入。
功能与特性

1. 支持大多数 Element Plus 组件
   提供对组件属性、事件、插槽的全面支持。
   编辑组件时，实际生成结果与编辑界面保持一致。
2. 拖拽区域样式
   激活状态下：
   可拖拽区域（如 el-row、el-col、el-form）由虚线变为实线。
   其他组件一律显示实线。
3. 表单验证
   每个表单会主动获取子组件的验证规则。
   支持默认验证规则和自定义验证规则。
4. 数据模型
   最终生成的数据结构如下：

javascript
{
  components: [],   // 组件列表
  methods: {},       // 事件配置
  methods: {},      // 方法集合
  lifecycles: {},   // 生命周期方法
  emits: [],        // 自定义事件
  componentType: {} // 组件类型映射
}

初步支持代码生成
如果需要进一步补充或调整文档内容，请告诉我
