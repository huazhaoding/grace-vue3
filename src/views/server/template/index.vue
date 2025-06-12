<template>
  <div>
    <!-- 动态渲染可编辑组件和静态文本 -->
    <div class="form-container">
      <template v-for="(item, index) in formItems" :key="index">
        <template v-if="item.type === 'static'">
          <span class="form-item">{{ item.text }}</span>
        </template>
        <component
          v-else
          :is="item.tag"
          v-bind="item.props"
          class="form-item"
        >
          <template v-if="item.children">
            <component
              v-for="(child, childIndex) in item.children"
              :key="childIndex"
              :is="child.tag"
              v-bind="child.props"
            />
          </template>
        </component>
      </template>
    </div>

    <!-- 显示最终渲染结果 -->
    <div v-html="finalRender"></div>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.form-item {
  margin-right: 8px;
}
</style>

<script setup name="Template">
import { reactive, computed, watchEffect } from 'vue';

// 示例输入数据
const inputData = reactive({
  data: {
    userName: {
      form: {
        placeholder: "请输入用户名",
        value: "张三",
        type: 'input',
        style: "width:150px;",
      },
      resultStyle: {
        style: "color:blue",
        tag: "span"
      },
    },
    location: {
      form: {
        placeholder: "请输入地址",
        value: "普安县",  
        type: 'select',
        data: ['普安县', '安平县'],
        style: "width:150px;",
      },
      resultStyle: {
        style: "color:red",
        tag: "span"
      },
    }
  },
  template: "userName去吃饭,在location"
});

// 解析模板并生成 Vue 组件代码和最终渲染结果
function parseTemplate(input) {
  const { data, template } = input;

  // 提取模板中的动态变量
  const variableRegex = /(\w+)/g; // 匹配所有单词
  const variables = Array.from(template.matchAll(variableRegex), match => match[1]);

  // 过滤出实际存在的字段
  const validVariables = variables.filter(variable => data[variable]);

  // 生成表单项，包括静态文本和动态组件
  const formItems = [];
  let lastIndex = 0;

  template.replace(variableRegex, (match, variable, offset) => {
    if (!data[variable]) return match; // 忽略无效变量

    // 添加静态文本
    if (offset > lastIndex) {
      formItems.push({
        type: 'static',
        text: template.slice(lastIndex, offset)
      });
    }

    // 添加动态组件
    const field = data[variable];
    const formConfig = field.form;

    switch (formConfig.type) {
      case 'input':
        formItems.push({
          tag: 'el-input',
          props: {
            modelValue: formConfig.value || '',
            placeholder: formConfig.placeholder,
            style: formConfig.style,
            'onUpdate:modelValue': (val) => (formConfig.value = val)
          }
        });
        break;
      case 'select':
        formItems.push({
          tag: 'el-select',
          props: {
            modelValue: formConfig.value || '',
            placeholder: formConfig.placeholder,
            style: formConfig.style,
            'onUpdate:modelValue': (val) => (formConfig.value = val)
          },
          children: formConfig.data.map(item => ({
            tag: 'el-option',
            props: { label: item, value: item }
          }))
        });
        break;
      default:
        throw new Error(`未知的字段类型 ${formConfig.type}`);
    }

    lastIndex = offset + match.length;
    return match;
  });

  // 添加剩余的静态文本
  if (lastIndex < template.length) {
    formItems.push({
      type: 'static',
      text: template.slice(lastIndex)
    });
  }

  // 生成最终渲染结果
  const finalRender = template.replace(variableRegex, (match, variable) => {
    if (!data[variable]) return match; // 忽略无效变量

    const field = data[variable];
    const resultStyle = field.resultStyle;
    const value = field.form.value || '未填写';

    return `<${resultStyle.tag} style="${resultStyle.style}">${value}</${resultStyle.tag}>`;
  });

  return {
    formItems,
    finalRender
  };
}

// 初始化解析结果
const parsedData = reactive(parseTemplate(inputData));

// 监听输入数据变化，实时更新解析结果
watchEffect(() => {
  Object.assign(parsedData, parseTemplate(inputData));
});

// 表单项（包括静态文本和动态组件）
const formItems = computed(() => parsedData.formItems);

// 最终渲染结果
const finalRender = computed(() => parsedData.finalRender);
</script>

<style scoped>
/* 样式可以根据需要调整 */
</style>