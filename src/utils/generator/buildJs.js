
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
 *   imports:[]
 *   lifecycle:{}
 *   emits:{}
 *   methods:[]
 * 
 * }
 * 
 * @param {*} events 
 * @returns 
 */

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