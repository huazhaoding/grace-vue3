<template>
    <div>
        <el-card style="margin-bottom: 10px">
            <template #header>
                <div class="card-header">
                    <span>{{ !isAdd ? formData.label : '添加属性' }}</span>
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
                <el-form-item label="属性key" prop="localPropsKey">
                    <el-input v-model="formData.localPropsKey"></el-input>
                </el-form-item>
                <el-form-item label="属性名" prop="label">
                    <el-input v-model="formData.label"></el-input>
                </el-form-item>
                <el-form-item label="属性类型" prop="type">
                    <el-select v-model="formData.type">
                        <!-- 添加选项以供选择 -->
                        <el-option label="let" value="let"></el-option>
                        <el-option label="const" value="const"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="转化类型" prop="restType">
                    <el-select v-model="formData.restType">
                        <!-- 添加选项以供选择 -->
                        <el-option label="normal" value="normal"></el-option>
                        <el-option label="ref" value="ref"></el-option>
                        <el-option label="reactive" value="reactive"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="toRefs" prop="toRefs" v-if="formData.restType === 'reactive'">
                    <el-select v-model="formData.toRefs" mutiple>
                        <!-- 添加选项以供选择 -->
                        <el-option v-for="item in reaKeys" :key="item.key" :label="item.key" :value="item.key"></el-option>
                    </el-select>
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

import { toRefs } from 'vue';

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
    label: props.propsConfig?.label || '', // Use optional chaining
    type: props.propsConfig?.type || '',
    restType: props.propsConfig?.restType,
    toRefs: props.propsConfig?.toRefs||[],
    default: props.propsConfig?.default || ''
});

const reaKeys=computed(() => {
    const keys= Object.keys(JSON.parse(formData.default)) || [];
    formData.toRefs=formData.toRefs.value.filter(item => !keys.includes(item));
    return keys;
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
        emits("updateAttr", formData.localPropsKey, formData, "update");
    });
}

// 删除属性
function removeProp() {
    emits("updateAttr", formData.localPropsKey, {}, "delete");
}

const emits = defineEmits(["updateAttr"]);
</script>