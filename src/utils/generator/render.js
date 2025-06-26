// render.js - 支持生成字符串形式的 HTML 并修复 vnode.children 类型问题
import { defineComponent, h } from "vue";
import { makeMap } from "@/utils/index";

// <render :key="element.tag" :conf="element.attr" v-model="element.attr.defaultValue" />

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
    "target,title,type,usemap,value,width,wrap,prefix-icon"
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



// 子组件渲染规则（如 el-select、el-checkbox-group 等）
const componentChild = {
  "el-button": {
    default(h, conf, key) {
      return conf[key];
    },
  },
  "el-select": {
    options(h, conf, key) {
      return conf.children.map((item) =>
        h(resolveComponent("el-option"), {
          label: item.label,
          value: item.value,
        })
      );
    },
  },
  "el-radio-group": {
    options(h, conf, key) {
      return conf.attr.type.value === "button"
        ? conf.options.map((item) =>
            h(
              resolveComponent("el-radio-button"),
              simplifyItem(item),
              () => item.label.value
            )
          )
        : conf.options.map((item) =>
            h(
              resolveComponent("el-radio"),
               simplifyItem(item),
              () => item.label.value
            )
          );
    },
  },
  "el-checkbox-group": {
    options(h, conf, key) {
      return conf.attr.type.value === "button"
        ? conf.options.map((item) =>
            h(
              resolveComponent("el-checkbox-button"),
              simplifyItem(item),
              () => item.label.value
            )
          )
        : conf.options.map((item) =>
            h(
              resolveComponent("el-checkbox"),
              simplifyItem(item),
              () => item.label.value
            )
          );
    },
  },
  "el-upload": {
    "list-type": (h, conf, key) => {
      const option = {};
      if (conf["list-type"] === "picture-card") {
        return h(resolveComponent("el-icon"), option, () =>
          h(resolveComponent("Plus"))
        );
      } else {
        option.type = "primary";
        option.icon = "Upload";
        return h(resolveComponent("el-button"), option, () => conf.buttonText);
      }
    },
  }
};

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
      style: {},
    };

    const component = { ...this.conf };

    const cloneAttr = component.attr;

    const cloneTag = component.tag;

    const cloneChildren = component.children;



    
    // 区分 label 和 aria-label
    // if (cloneAttr.label) {
    //   if (['el-input'].includes(cloneTag)) {
    //     cloneAttr['aria-label'] = cloneAttr.label
    //     delete cloneAttr.label
    //   } else {
    //     dataObject.props.label = cloneAttr.label
    //   }
    // }

    // 子元素 & 插槽处理
    const children = [];
    const slot = {};
    
    //获取子元素对象
    const childObjs = componentChild[cloneTag];

    // 子元素对象
    if (childObjs) {
      Object.keys(childObjs).forEach((key) => {
        const childFunc = childObjs[key];
        if (component[key]) {
          children.push(childFunc(h, component, key));
        }
      });

    }
    //插槽内容
    const slotObjs = componentSlot[cloneTag];
    if (slotObjs) {
      Object.keys(slotObjs).forEach((key) => {
        const childFunc = slotObjs[key];
        if (cloneAttr[key]) {
          slot[key] = childFunc(h, component, key);
        }
      });
    }

    // 插槽：处理 prepend / append
    if (cloneAttr.prepend || cloneAttr.append) {
      if (cloneAttr.prepend.value) {
        slot.prepend = () => cloneAttr.prepend.value;
      }
      if (cloneAttr.append.value) {
        slot.append = () => cloneAttr.append.value;
      }
    }
    
    //子元素处理
    if (children.length > 0) {
      slot.default = () => children;
    }

    // 属性分类 处理组件的attr
    Object.keys(cloneAttr).forEach((key) => {
      const val = cloneAttr[key].value;
      // 特殊处理布尔值属性
      if (
        ["show-word-limit", "clearable", "readonly", "disabled"].includes(key)
      ) {
        dataObject.props[key] =
          typeof val === "string" ? JSON.parse(val) : !!val;
      } else if (dataObject[key]) {
        dataObject[key] = val;
      } else if (isAttr(key)) {
       
        dataObject.attrs[key] = val;
      } else if (!isNotProps(key)) {
        dataObject.props[key] = val;
      }
    });

    if (this.conf.attr.defaultLabel) {
      slot.default = () => this.conf.attr.defaultLabel.value; // 设置默认插槽内容
    }

    // 生成虚拟 DOM
    const vnode = h(
      resolveComponent(this.conf.tag),
      {
       modelValue: this.modelValue,
        "onUpdate:modelValue": (val) => this.$emit("update:modelValue", val),
        ...dataObject.props,
        ...dataObject.attrs,
        style: { ...dataObject.style },
      },
      slot ?? null
    );

    return vnode;
  },
});

// 插槽渲染规则
const componentSlot = {
  "el-upload": {
    tip: (h, conf) => {
      if (conf.showTip) {
        return () =>
          h(
            "div",
            { class: "el-upload__tip" },
            `只能上传不超过${conf.fileSize}${conf.sizeUnit}的${conf.accept}文件`
          );
      }
    },
  },
};
