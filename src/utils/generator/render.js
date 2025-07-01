import { defineComponent, h } from "vue";
import { makeMap } from "@/utils/index";

const isAttr = makeMap(
  "accept,accept-charset,accesskey,action,align,alt,async,autocomplete," +
    "autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset," +
    "checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv," +
    "name,contenteditable,contextmenu,controls,coords,data,datetime,default," +
    "defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for," +
    "form,formaction,headers,height,hidden,high,href,hreflang,http-equiv," +
    "icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low," +
    "manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file," +
    "muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster," +
    "preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox," +
    "scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span," +
    "spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex," +
    "target,title,type,usemap,value,width,wrap,prefix-icon,suffix-icon"
);

// 转换函数：将复杂结构简化为简单结构
function simplifyItem(item) {
  const simplified = {};
  for (const key in item) {
    simplified[key] = item[key].value;
  }
  return simplified;
}

const isNotProps = makeMap(
  "layout,prepend,regList,tag,document,changeTag,defaultValue"
);
// ... existing code ...
function buildSlot(h, cloneSlot, key, activeItem) {
  return () =>
    cloneSlot.slotOptions.map((item, index) =>
      h(
        resolveComponent(item.tag),
        {
          ...simplifyItem(item.attr),
          onClick: (event) => {
            event.stopPropagation(); // 阻止事件冒泡
            if (activeItem) {
              activeItem(item); // 调用从父组件传入的 activeItem 方法
            }
          },
        },
        item.slots ? buildChildSlot(h, item.slots) : undefined // 处理子插槽
      )
    );
}

function buildChildSlot(h, slots) {
  const childSlots = {};
  Object.keys(slots).forEach((key) => {
    if (slots[key]&&slots[key].value) {
      childSlots[key] = () => h("div",  { innerHTML: slots[key].value }) ; // 返回函数形式的插槽
    }
  });
  return childSlots;
}

function buildDragSlot(h, slots) {
  const childSlots = {};
  Object.keys(slots).forEach((key) => {
    if (slots[key]&&slots[key].value) {
      childSlots[key] = () => h("div",  { innerHTML: slots[key].value }) ; // 返回函数形式的插槽
    }
  });
  return childSlots;
}

function buildNormalSlot(h, slots) {
  const childSlots = {};
  Object.keys(slots).forEach((key) => {
    if (slots[key]&&slots[key].value) {
      childSlots[key] = () => h("div",  { innerHTML: slots[key].value }) ; // 返回函数形式的插槽
    }
  });
  return childSlots;
}
// ... existing code ...
export default defineComponent({
  props: {
    conf: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: null,
    },
    // 新增：接收 activeItem 方法作为 prop
    activeItem: {
      type: Function,
      required: false,
      default: null,
    },
  },

  emits: ["update:modelValue"],
  setup() {
    return {};
  },
  render() {
    const dataObject = {
      attrs: {},
      props: {},
      on: {},
      slots: [],
      style: {},
      tag: this.conf.tag,
      modelValue: this.modelValue || undefined,
    };

    const component = { ...this.conf };

    const cloneAttr = component.attr;

    const cloneSlots = component.slots;
    
    // 插槽处理 normal componentChild  comoponentDrag
    let slots = {};

    if (cloneSlots) {
      Object.keys(cloneSlots).forEach((key) => {
        if (cloneSlots[key]) {
          slots[key] = buildSlot(h, cloneSlots[key], key, this.activeItem);
        }
      });
    }
    else if (cloneSlots&&component.slotType==="normal") { 
         slots = buildChildSlot(h, cloneSlots);
         
    }

    // 属性分类
    Object.keys(cloneAttr).forEach((key) => {
      const val = cloneAttr[key].value;
      if (dataObject[key]) {
        dataObject[key] = val;
      } else if (isAttr(key)) {
        dataObject.attrs[key] = val;
      } else if (!isNotProps(key)) {
        dataObject.props[key] = val;
      }
    });

    const nodeConfig = {
      ...dataObject.props,
      ...dataObject.attrs,
      style: { ...dataObject.style },
    };

    if (dataObject.modelValue) {
      nodeConfig.modelValue = dataObject.modelValue;
      nodeConfig["onUpdate:modelValue"] = (val) =>
        this.$emit("update:modelValue", val);
    }

    // 生成虚拟 DOM
    const vNode = h(
      resolveComponent(this.conf.tag),
      nodeConfig,
      slots ?? null
    );

    return vNode;
  },
});
