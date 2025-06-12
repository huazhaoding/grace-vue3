/**
 * 解析模板并生成 Vue 组件代码和最终渲染结果
 * @param {object} input - 输入对象，包含 data 和 template
 * @returns {object} 包含可编辑组件和最终渲染结果的对象
 */
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
        return `
          <el-input 
            v-model="${variable}.value" 
            :placeholder="${variable}.placeholder" 
            :style="${variable}.style" 
          />
        `.trim();
      case 'select':
        return `
          <el-select 
            v-model="${variable}.value" 
            :placeholder="${variable}.placeholder" 
            :style="${variable}.style"
          >
            <el-option 
              v-for="item in ${variable}.data" 
              :key="item" 
              :label="item" 
              :value="item" 
            />
          </el-select>
        `.trim();
      default:
        throw new Error(`未知的字段类型 ${field.type}`);
    }
  }).join('');

  // 生成最终渲染结果
  const finalRender = template.replace(variableRegex, (match, variable) => {
    const field = data[variable];
    return `<span style="${field.style}">${field.value}</span>`;
  });

  return {
    editableComponents,
    finalRender,
  };
}

// 示例调用
const input = {
  data: {
    userName: {
      value: '小红',
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

const result = parseTemplate(input);

console.log('可编辑组件:', result.editableComponents);
console.log('最终渲染结果:', result.finalRender);