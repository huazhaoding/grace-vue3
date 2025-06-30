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

不存在默认插槽default的组件 
存在默认插槽default的组件,但是插槽内容不是固定的 el-form 
存在默认插槽default的组件,但是默认插槽内容是固定的,  el-select el-option
存在默认插槽default的组件,但是默认插槽内容是固定的,但是默认子插槽可以是任意内容(可拖拽)  el-col el-row 


          el-option-group  el-option
el-select 
          el-option


el-radio

el-radio-button

               el-radio-button
el-radio-group 
               el-radio