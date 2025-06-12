<template>
  <div>
    <!-- 动态渲染可编辑组件 -->
    <div v-for="(component, index) in editableComponents" :key="index">
      <component :is="component.tag" v-bind="component.props" />
    </div>

    <!-- 显示最终渲染结果 -->
    <div v-html="finalRender"></div>
  </div>
</template>

<script setup>

// 示例输入数据
const inputData = {
  data: {
    userName: {
      value: '',
      style: "width:100px;",
      placeholder: "请输入用户名",
      type: 'input'
    },
    location: {
      value: '普安县',
      placeholder: "请输入地址",
      type: 'select',
      data: ['普安县', '安平县'],
      style: "color:red"
    }
  },
  template: "{{userName}}去吃饭,在{{location}}"
};

// 解析模板并生成 Vue 组件代码和最终渲染结果
function parseTemplate(input) {
  const { data, template } = input;

  // 提取模板中的动态变量
  const variableRegex = /{{(\w+)}}/g;
  const variables = [...template.matchAll(variableRegex)].map(match => match[1]);

  // 生成可编辑组件代码
  const editableComponents = variables.map((variable) => {
    const field = data[variable];
    if (!field) throw new Error(`未找到字段 ${variable}`);

    switch (field.type) {
      case 'input':
        return {
          tag: 'el-input',
          props: {
            modelValue: field.value,
            placeholder: field.placeholder,
            style: field.style,
            'onUpdate:modelValue': (val) => (field.value = val)
          }
        };
      case 'select':
        return {
          tag: 'el-select',
          props: {
            modelValue: field.value,
            placeholder: field.placeholder,
            style: field.style,
            'onUpdate:modelValue': (val) => (field.value = val)
          },
          children: field.data.map(item => ({
            tag: 'el-option',
            props: { label: item, value: item }
          }))
        };
      default:
        throw new Error(`未知的字段类型 ${field.type}`);
    }
  });

  // 生成最终渲染结果
  const finalRender = template.replace(variableRegex, (match, variable) => {
    const field = data[variable];
    return `<span style="${field.style}">${field.value}</span>`;
  });

  return {
    editableComponents,
    finalRender
  };
}

// 初始化解析结果
const parsedData = reactive(parseTemplate(inputData));

// 可编辑组件
const editableComponents = computed(() => parsedData.editableComponents);

// 最终渲染结果
const finalRender = computed(() => parsedData.finalRender);
</script>
<script setup>
/**
 * 
 * 假设模板为
 * {data:{userName:{
 *  value:''
 * ,style:"width:100px;"
 * ,placeholder:"请输入用户名"
 * ,type:'input'
 * },location:{value:'普安县',
 *   placeholder:"请输入地址",
 *   type:'select'
 *   data:['普安县','安平县'],
 *   style:"color:red"
 * }
 * 
 * }
 * ,template:"{{userName}}小红去吃饭,在{{location}}"
 * }
 * 
 * 
 * 
 * 
 * 
 * 
 * 先解析为vue组件代码,给用户输入
 * 
 * 可编辑  
 *<el-input v-model="userName.value" :placeholder="userName.placeholder"  />明天去吃饭，在
  <el-select v-model="location.value" :placeholder="location.placeholder" >
    <el-option v-for="item in location.data" :key="item" :label="item" :value="item" />
  </el-select>
 * 
 *
 * 假设用户输入小红,选择为普安县
 * 
 * 最后的结果为
 * <span style="width:100px;">小红</span>明天去吃饭,在<span style="color:red">普安县</span>
 */

 

</script>