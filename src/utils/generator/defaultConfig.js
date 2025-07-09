export const  defaultConfig = {
  methods: {},
  lifecycles: {
    onMounted: {
        used: false,
        value: onMounted(() => {}),
        label: "注册一个回调函数，在组件挂载完成后执行"
    },
    onUpdated: {
        used: false,
        value: onUpdated(() => {}),
        label: "注册一个回调函数，在组件更新完成后执行"
    },
    onUnmounted: {
        used: false,
        value: onUnmounted(() => {}),
        label: "注册一个回调函数，在组件卸载完成后执行"
    },
    onBeforeMount: {
        used: false,
        value: onBeforeMount(() => {}),
        label: "注册一个回调函数，在组件挂载之前执行"
    },
    onBeforeUpdate: {
        used: false,
        value: onBeforeUpdate(() => {}),
        label: "注册一个回调函数，在组件更新之前执行"
    },
    onBeforeUnmount: {
        used: false,
        value: onBeforeUnmount(() => {}),
        label: "注册一个回调函数，在组件卸载之前执行"
    },
    onErrorCaptured: {
        used: false,
        value: onErrorCaptured((err, vm, info) => {}),
        label: "注册一个回调函数，用于捕获发生在后代组件中的错误"
    },
    onRenderTracked: {
        used: false,
        value: onRenderTracked((e) => {}),
        label: "调试钩子，追踪虚拟 DOM 重新渲染时作为依赖被追踪的具体响应式属性"
    },
    onRenderTriggered: {
        used: false,
        value: onRenderTriggered((e) => {}),
        label: "调试钩子，当虚拟 DOM 重新渲染被触发时调用"
    },
    onActivated: {
        used: false,
        value: onActivated(() => {}),
        label: "被 keep-alive 缓存的组件激活时调用"
    },
    onDeactivated: {
        used: false,
        value: onDeactivated(() => {}),
        label: "被 keep-alive 缓存的组件停用时调用"
    }
},
  emits: [],
  componentType: {}
}