<template>
    <div>
    <el-card style="margin-bottom: 10px">
        <template #header>
            <div class="card-header">
                <span>{{!isAdd?propsConfig.label:'添加prop' }}</span>
                <el-button-group style="float: right">
                    <el-button type="success"  :icon="show ? 'Hide' : 'View'"
                        @click="changeShow" title="显示|隐藏" />
                    <el-button type="success" v-if="!isAdd" icon="Edit" @click="changeRead"
                        title="编辑" />
                </el-button-group>
            </div>
        </template>
        <el-form v-show="show" :disabled="readonly&&!isAdd" >
            <el-form-item label="参数key">
                <el-input v-model="localPropsKey"></el-input>
            </el-form-item>
            <el-form-item label="参数名">
                <el-input v-model="propsConfig.label"></el-input>
            </el-form-item>
            <el-form-item label="参数类型">
                <el-select v-model="propsConfig.type"></el-select>
            </el-form-item>
            <el-form-item label="必填">
                <el-switch v-model="propsConfig.required" />
            </el-form-item>
            <el-form-item label="默认值">
                <el-input v-model="propsConfig.default"></el-input>
            </el-form-item>
            <el-button type="primary" v-show="!readonly||isAdd" @click="saveProp">保存</el-button>
        </el-form>
        <el-text class="mx-1" type="info">点击眼睛切换状态</el-text>
    </el-card>
    </div>
</template>

<script setup>


const props = defineProps({
    /**
     * {  name:{
     *     type: "string",
     *     default: "",
     *     required: true
     * }
     * 
     * }
     */
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
    },
});

const show = ref(false)
const readonly=ref(true)
const localPropsKey = ref(props.propsKey)
function changeShow() { 
  show.value = !show.value;
}   
function changeRead() { 
  readonly.value = !readonly.value;
} 

</script>