<template>
    <el-dialog title="查看关联" v-model="dialogOpen" width="500px" @close="dialogCancel" append-to-body>
        <div class="itm">
            <span>分类</span>
            <el-tag v-for="item in categoryData" :key="item.categoryId" v-show="3 == item.nodeType" effect="success">
                {{ item.categoryName }}
            </el-tag>
        </div>
        <div class="itm">
            <span>标签</span>
            <el-tag v-for="item in categoryData" :key="item.categoryId" v-show="5 == item.nodeType" effect="warning">
                {{ item.categoryName }}
            </el-tag>
        </div>
        <div class="itm">
            <span>自定</span>
            <el-tag v-for="item in categoryData" closable :key="item.categoryId" v-show="7 == item.nodeType" @close="handleClose(item.categoryId)" effect="plain">
                {{ item.categoryName }}
            </el-tag>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogCancel">取 消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { listCategoryByArticleId } from '@/api/cms/category';
const categoryData = ref(undefined);
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    articleId: {
        type: Number,
        default: undefined
    }

})
const dialogOpen = ref(undefined);

watch(
    () => props.modelValue,
    (val) => {
        dialogOpen.value = val;
        if(val){
            listCategoryByArticleId(props.articleId, {}).then((res) => {
            categoryData.value = res.data;
        })
        }
        
    },
    { deep: true, immediate: true }
)
watch(
    () => dialogOpen.value,
    (val) => {
        if (val == false) {
            emit("update:modelValue", false);
        }
    },
    { deep: true, immediate: true }
);

function dialogCancel() {
    dialogOpen.value = false;
}

function handleClose(categoryId){

}

</script>

<style>
.itm{
  margin: 5px;
}
.itm>span{
  margin-right: 15px;
}
</style>