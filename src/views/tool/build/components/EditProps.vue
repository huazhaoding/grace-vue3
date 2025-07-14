<template>
    <div>
        <el-card style="margin-bottom: 10px">
            <template #header>
                <div class="card-header">
                    <span>{{ !isAdd ? propsData.label : '添加prop' }}</span>
                    <el-button-group style="float: right">
                        <el-button type="success" :icon="show ? 'Hide' : 'View'" @click="changeShow" title="显示|隐藏" />
                        <el-button type="success" v-if="!isAdd" icon="Edit" @click="changeRead" title="编辑" />
                        <el-button type="success" v-if="!isAdd" icon="Remove" @click="removeProp" title="删除" />
                    </el-button-group>
                </div>
            </template>
            <el-form 
                v-show="show" 
                :disabled="readonly && !isAdd" 
                :model="formData" 
                :rules="formRules" 
                ref="formRef"
            >
                <el-form-item label="参数key" prop="localPropsKey">
                    <el-input v-model="formData.localPropsKey"></el-input>
                </el-form-item>
                <el-form-item label="参数名" prop="label">
                    <el-input v-model="formData.label"></el-input>
                </el-form-item>
                <el-form-item label="参数类型" prop="type">
                    <el-select v-model="formData.type">
                        <!-- 添加选项以供选择 -->
                        <el-option label="字符串" value="string"></el-option>
                        <el-option label="数字" value="number"></el-option>
                        <el-option label="布尔值" value="boolean"></el-option>
                        <el-option label="数组" value="array"></el-option>
                        <el-option label="对象" value="object"></el-option>
                        <el-option label="日期" value="date"></el-option>
                        <el-option label="函数" value="function"></el-option>
                        <el-option label="空值" value="null"></el-option>
                        <el-option label="未定义" value="undefined"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="必填">
                    <el-switch v-model="formData.required" />
                </el-form-item>
                <el-form-item label="默认值" prop="default">
                    <el-input v-model="formData.default"></el-input>
                </el-form-item>
                <el-button type="primary" v-show="!readonly || isAdd" @click="saveProp">保存</el-button>
            </el-form>
            <el-text class="mx-1" type="info">点击眼睛切换状态</el-text>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
    propsConfig: {
        type: Object,
        default: () => ({})
    },
    propsKey: {
        type: String,
        default: undefined
    },
    isAdd: {
        type: Boolean,
        default: false
    }
});

const show = ref(false);
const readonly = ref(true);
const formRef = ref(null);

// 表单数据模型
const formData = reactive({
    localPropsKey: props.propsKey || '',
    label: props.propsConfig.label || '',
    type: props.propsConfig.type || '',
    required: !!props.propsConfig.required,
    default: props.propsConfig.default || ''
});

// 表单验证规则
const formRules = reactive({
    localPropsKey: [
        { required: true, message: '参数key必填', trigger: ['blur', 'change'] },
        { max: 16, message: '参数key最多16个字符', trigger: ['blur', 'change'] }
    ],
    label: [
        { required: true, message: '参数名必填', trigger: ['blur', 'change'] },
        { max: 32, message: '参数名最多32个字符', trigger: ['blur', 'change'] }
    ],
    type: [
        { required: true, message: '参数类型必填', trigger: ['blur', 'change'] }
    ],
    default: [
        { required: true, message: '默认值必填', trigger: ['blur', 'change'] }
    ]
});

// 默认值类型验证方法
function validateDefaultValue() {
    const { type, default: defaultValue } = formData;

    // 验证逻辑
    let isValid = true;
    let errorMessage = '';

    if (defaultValue === null || defaultValue === undefined) {
        return { isValid: true, errorMessage: '' }; // 允许空值
    }

    try {
        switch (type) {
            case 'string':
                isValid = typeof defaultValue === 'string';
                errorMessage = isValid ? '' : '默认值必须是字符串类型';
                break;
            case 'number':
                isValid = !isNaN(defaultValue) && typeof Number(defaultValue) === 'number';
                errorMessage = isValid ? '' : '默认值必须是数字类型';
                break;
            case 'boolean':
                isValid = defaultValue === 'true' || defaultValue === 'false' || typeof defaultValue === 'boolean';
                errorMessage = isValid ? '' : '默认值必须是布尔类型';
                break;
            case 'array':
                isValid = Array.isArray(JSON.parse(defaultValue));
                errorMessage = isValid ? '' : '默认值必须是数组类型';
                break;
            case 'object':
                isValid = typeof JSON.parse(defaultValue) === 'object' && !Array.isArray(JSON.parse(defaultValue));
                errorMessage = isValid ? '' : '默认值必须是对象类型';
                break;
            case 'date':
                isValid = !isNaN(Date.parse(defaultValue));
                errorMessage = isValid ? '' : '默认值必须是有效日期格式';
                break;
            case 'function':
                isValid = typeof eval(`(${defaultValue})`) === 'function'; // 使用 eval 检查是否为函数
                errorMessage = isValid ? '' : '默认值必须是函数类型';
                break;
            case 'null':
                isValid = defaultValue === null || defaultValue === 'null';
                errorMessage = isValid ? '' : '默认值必须是 null 类型';
                break;
            case 'undefined':
                isValid = defaultValue === undefined || defaultValue === 'undefined';
                errorMessage = isValid ? '' : '默认值必须是 undefined 类型';
                break;
            default:
                isValid = false;
                errorMessage = '未知的参数类型';
        }
    } catch (error) {
        isValid = false;
        errorMessage = '默认值格式无效或无法解析';
    }

    return { isValid, errorMessage };
}

// 切换显示/隐藏
function changeShow() {
    show.value = !show.value;
}

// 切换只读/编辑模式
function changeRead() {
    readonly.value = !readonly.value;
}

// 保存表单
function saveProp() {
    formRef.value.validate((valid) => {
        if (!valid) {
            proxy.$modal.msgError("表单验证失败");
            return;
        }

        // 验证默认值类型
        const { isValid, errorMessage } = validateDefaultValue();
        if (!isValid) {
            proxy.$modal.msgError('默认值验证失败:', errorMessage);
            alert(errorMessage); // 提示用户错误信息
            return;
        }

      
        emits("updateProps", formData.localPropsKey, formData, "update");
    });
}

// 删除属性
function removeProp() {
    emits("updateProps", formData.localPropsKey, {}, "delete");
}

const emits = defineEmits(["updateProps"]);
</script>