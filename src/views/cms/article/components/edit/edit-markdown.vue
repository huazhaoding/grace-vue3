<template>
  <edit-share :articleContent="articleContentActive" :articleMd="articleMdActive" :articleImg="articleImgActive" :articleBuild="1">
    <template #thumbnailChoose="{ formData, maxImg }">
      <div style="display: none;"> {{ articleImgActive=formData.articleImg }}</div>
      <thumbnail-choose v-model="articleImgActive" :articleContent="formData.articleContent" :maxImg="maxImg"
        :isPhoto="false" />
    </template>

    <template #editContent="{ formData }">
      <div style="display: none;"> {{ articleMdActive=formData.articleMd }}</div>
      <vue3-tinymce v-model="articleContentActive"></vue3-tinymce>
      <md-editor ref="mdRef" v-model="articleMdActive" />
    </template>
  </edit-share>
</template>

<script setup name="editMd">
import editShare from "@/views/cms/article/components/common/editShare";
import MdEditor from "@/components/Editor/MdEditor";
import thumbnailChoose from "@/views/cms/article/components/common/thumbnailChoose";
const { proxy } = getCurrentInstance();
const articleContentActive = ref("");
const articleMdActive = ref("");
const articleImgActive = ref("");

watch(()=>articleMdActive.value, (val) => { 
   if(val){
    articleContentActive.value = getHtml();
   }
},
  { deep: true, immediate: true }
);

function getHtml() {
return proxy.$refs["mdRef"].getHtml();
}

</script>
