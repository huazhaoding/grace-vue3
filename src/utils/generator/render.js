// render.js - 支持 show-word-limit 和 maxlength 动态处理
import { defineComponent, h } from 'vue'
import { makeMap } from '@/utils/index'

const isAttr = makeMap(
  'accept,accept-charset,accesskey,action,align,alt,async,autocomplete,' +
  'autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset,' +
  'checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv,' +
  'name,contenteditable,contextmenu,controls,coords,data,datetime,default,' +
  'defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for,' +
  'form,formaction,headers,height,hidden,high,href,hreflang,http-equiv,' +
  'icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low,' +
  'manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file,' +
  'muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,' +
  'preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox,' +
  'scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span,' +
  'spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,' +
  'target,title,type,usemap,value,width,wrap,prefix-icon'
)

const isNotProps = makeMap('layout,prepend,regList,tag,document,changeTag,defaultValue')

export default defineComponent({
  props: {
    conf: {
      type: Object,
      required: true
    },
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup() {
    return {}
  },
  render() {
    const dataObject = {
      attrs: {},
      props: {},
      on: {},
      style: {}
    }

    const confClone = { ...this.conf }

    // 动态处理 maxlength 和 show-word-limit
    if (confClone['show-word-limit'] && !confClone.maxlength) {
      confClone.maxlength = 100 // 设置一个默认值
    }

    // 子元素 & 插槽处理
    const children = []
    const slot = {}

    const childObjs = componentChild[confClone.tag]
    if (childObjs) {
      Object.keys(childObjs).forEach(key => {
        const childFunc = childObjs[key]
        if (confClone[key]) {
          children.push(childFunc(h, confClone, key))
        }
      })
    }

    const slotObjs = componentSlot[confClone.tag]
    if (slotObjs) {
      Object.keys(slotObjs).forEach(key => {
        const childFunc = slotObjs[key]
        if (confClone[key]) {
          slot[key] = childFunc(h, confClone, key)
        }
      })
    }

    // 插槽：处理 prepend / append
    if (confClone.prepend || confClone.append) {
      if (confClone.prepend) {
        slot.prepend = () => confClone.prepend
      }
      if (confClone.append) {
        slot.append = () => confClone.append
      }
    }

    if (children.length > 0) {
      slot.default = () => children
    }

    // 属性分类
    Object.keys(confClone).forEach(key => {
      const val = confClone[key]

      // 特殊处理布尔值属性
      if (['show-word-limit', 'clearable', 'readonly', 'disabled'].includes(key)) {
        dataObject.props[key] = typeof val === 'string' ? JSON.parse(val) : !!val
      } else if (dataObject[key]) {
        dataObject[key] = val
      } else if (isAttr(key)) {
        dataObject.attrs[key] = val
      } else if (!isNotProps(key)) {
        dataObject.props[key] = val
      }
    })

    return h(resolveComponent(this.conf.tag), {
      modelValue: this.modelValue,
      'onUpdate:modelValue': (val) => this.$emit('update:modelValue', val),
      ...dataObject.props,
      ...dataObject.attrs,
      style: { ...dataObject.style }
    }, slot ?? null)
  }
})

// 子组件渲染规则（如 el-select、el-checkbox-group 等）
const componentChild = {
  'el-button': {
    default(h, conf, key) {
      return conf[key]
    }
  },
  'el-select': {
    options(h, conf, key) {
      return conf.options.map(item =>
        h(resolveComponent('el-option'), {
          label: item.label,
          value: item.value
        })
      )
    }
  },
  'el-radio-group': {
    options(h, conf, key) {
      return conf.optionType === 'button'
        ? conf.options.map(item =>
            h(resolveComponent('el-checkbox-button'), {
              value: item.value
            }, () => item.label)
          )
        : conf.options.map(item =>
            h(resolveComponent('el-radio'), {
              value: item.value,
              border: conf.border
            }, () => item.label)
          )
    }
  },
  'el-checkbox-group': {
    options(h, conf, key) {
      return conf.optionType === 'button'
        ? conf.options.map(item =>
            h(resolveComponent('el-checkbox-button'), {
              value: item.value
            }, () => item.label)
          )
        : conf.options.map(item =>
            h(resolveComponent('el-checkbox'), {
              value: item.value,
              border: conf.border
            }, () => item.label)
          )
    }
  },
  'el-upload': {
    'list-type': (h, conf, key) => {
      const option = {}
      if (conf['list-type'] === 'picture-card') {
        return h(resolveComponent('el-icon'), option, () => h(resolveComponent('Plus')))
      } else {
        option.type = 'primary'
        option.icon = 'Upload'
        return h(resolveComponent('el-button'), option, () => conf.buttonText)
      }
    }
  }
}

// 插槽渲染规则
const componentSlot = {
  'el-upload': {
    tip: (h, conf) => {
      if (conf.showTip) {
        return () =>
          h(
            'div',
            { class: 'el-upload__tip' },
            `只能上传不超过${conf.fileSize}${conf.sizeUnit}的${conf.accept}文件`
          )
      }
    }
  }
}