
function buildScript(options) { 
}   

/**
 * 避免重复添加事件
 * 添加时确认是否重复
 * 解析时确认是否重复
 * 
 * 组件
 * 弹窗
 * 页面
 * 
 * { config:[]
 *   events:{}
 *   styles:[]
 *   data:[]
    imports:[]
    lifecycle:{
     onMounted:{
     used:false,
     value:onMounted(() => {
       
      }),
      label:"注册一个回调函数，在组件挂载完成后执行"

 }
 * 
 * 
 * }
 *   emits:{}
 *   methods:[]
 * 
 * }
 * 
 * 
 * 
当前页面的目录
onMounted()
onUpdated()
onUnmounted()
onBeforeMount()
onBeforeUpdate()
onBeforeUnmount()
onErrorCaptured()
onRenderTracked()
onRenderTriggered()
onActivated()
onDeactivated()
onServerPrefetch()
 * 
 * @param {*} events 
 * @returns 
 */

// ... existing code ...
// let lifecycle = {
//     onMounted: {
//         used: false,
//         value: onMounted(() => {}),
//         label: "注册一个回调函数，在组件挂载完成后执行"
//     },
//     onUpdated: {
//         used: false,
//         value: onUpdated(() => {}),
//         label: "注册一个回调函数，在组件更新完成后执行"
//     },
//     onUnmounted: {
//         used: false,
//         value: onUnmounted(() => {}),
//         label: "注册一个回调函数，在组件卸载完成后执行"
//     },
//     onBeforeMount: {
//         used: false,
//         value: onBeforeMount(() => {}),
//         label: "注册一个回调函数，在组件挂载之前执行"
//     },
//     onBeforeUpdate: {
//         used: false,
//         value: onBeforeUpdate(() => {}),
//         label: "注册一个回调函数，在组件更新之前执行"
//     },
//     onBeforeUnmount: {
//         used: false,
//         value: onBeforeUnmount(() => {}),
//         label: "注册一个回调函数，在组件卸载之前执行"
//     },
//     onErrorCaptured: {
//         used: false,
//         value: onErrorCaptured((err, vm, info) => {}),
//         label: "注册一个回调函数，用于捕获发生在后代组件中的错误"
//     },
//     onRenderTracked: {
//         used: false,
//         value: onRenderTracked((e) => {}),
//         label: "调试钩子，追踪虚拟 DOM 重新渲染时作为依赖被追踪的具体响应式属性"
//     },
//     onRenderTriggered: {
//         used: false,
//         value: onRenderTriggered((e) => {}),
//         label: "调试钩子，当虚拟 DOM 重新渲染被触发时调用"
//     },
//     onActivated: {
//         used: false,
//         value: onActivated(() => {}),
//         label: "被 keep-alive 缓存的组件激活时调用"
//     },
//     onDeactivated: {
//         used: false,
//         value: onDeactivated(() => {}),
//         label: "被 keep-alive 缓存的组件停用时调用"
//     }
// };
// ... existing code ...
function buildEvent(events){
    let eventFnc = "";  
    //构建事件
    if (events) { 
     eventFnc= Object.entries(events).filter(([key, value]) => value !== undefined && value.used && value.value )
      .map(([key, value]) => `${value.value}`)
      .join("\n")
    }
    return eventFnc;
}


const events = {
        blur: {
          used: true,
          label: "当选择器的输入框失去焦点时触发",
          functionName: "handleBlur",
          value: function handleBlur (item) {
            return "bl";
          },
        },
        focus: {
          used: true,
          label: "当选择器的输入框获得焦点时触发",
          functionName: "handleFocus",
          value: function handleFocus(item) {
            return "b2";
          },
        },
        change: {
          used: false,
          label: "仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发",
          functionName: "handleChange",
          value: function (item) {
            return "b2";
          },
        },
        input: {
          used: false,
          label: "在 Input 值改变时触发",
          functionName: "handleInput",
          value: function (item) {},
        },
        clear: {
          used: false,
          label: "在点击由 clearable 属性生成的清空按钮时触发",
          functionName: "handleClear",
          value: function (item) {},
        },
        keydown: {
          used: false,
          label: "按下键时触发",
          functionName: "handleKeydown",
          value: function () {},
        },
        mouseleave: {
          used: false,
          label: "当鼠标进入输入框时触发",
          functionName: "handleMouseleave",
          value: function (item) {},
        },
        mouseenter: {
          used: false,
          label: "当鼠标离开输入框时触发",
          functionName: "handleMouseenter",
          value: function (item) {},
        },
        compositionstart: {
          used: false,
          label: "输入法输入开始时触发",
          functionName: "handleCompositionstart",
          value: function (item) {},
        },
        compositionupdate: {
          used: false,
          label: "输入法输入改变时触发",
          functionName: "handleCompositionupdate",
          value: function (item) {},
        },
        compositionend: {
          used: false,
          label: "输入法输入完成时触发",
          functionName: "handleCompositionend",
          value: function (item) {},
        },
      }
console.log(buildEvent(events));