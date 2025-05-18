<template>
    <el-dialog title="查看关联" v-model="dialogOpen" width="500"   @close="dialogCancel">
        <div class="itm">
            <span>分类</span>
            <el-tag v-for="item in categoryData" :key="item.categoryId"
                v-show="3 == item.nodeType || 2 == item.nodeType">
                {{ item.categoryName }}
            </el-tag>
        </div>
        <div class="itm">
            <span>标签</span>
            <el-tag v-for="item in categoryData" :key="item.categoryId" v-show="5 == item.nodeType || 4 == item.nodeType"
                effect="warning">
                {{ item.categoryName }}
            </el-tag>
        </div>
        <div class="itm">
            <span>自定</span>
            <el-tag v-for="item in categoryData" closable :key="item.categoryId"
                v-show="7 == item.nodeType || 6 == item.nodeType" @close="handleClose(item.categoryId)" effect="plain">
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
import { deleteArticleCategory } from '@/api/cms/article';
const { proxy } = getCurrentInstance();
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
        if (val) {
            getData();
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

function handleClose(categoryId) {
    deleteArticleCategory(props.articleId, categoryId).then((res) => {
        proxy.$modal.msgSuccess("移除成功");
        getData();
    })
}

function getData() {
    listCategoryByArticleId(props.articleId, {}).then((res) => {
        categoryData.value = res.data;
    })
}



</script>

<style>
.itm {
    margin: 5px;
}

.itm>span {
    margin-right: 15px;
}
</style>