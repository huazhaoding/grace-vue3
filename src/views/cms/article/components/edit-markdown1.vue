<template>
  <edit-share :articleContent="articleContent">
    <template #leftBox="{contentData,maxTag}">
      <thumbnail-choose :articleImg="contentData.articleImg" :articleContent="contentData.articleContent" :maxTag="maxTag" @update:contentData="handleUpdate"/>   
    </template>

    <template #mainBox="{contentData}">
      <photo-choose :contentData="contentData" @update:contentData="handleUpdate"/>
    </template>
  </edit-share>
</template>

<script setup name="editPhoto777">
import editShare from "@/views/cms/article/components/editShare";
import photoChoose from "@/views/cms/article/components/photoChoose";
import thumbnailChoose from "@/views/cms/article/components/common/thumbnailChoose";
const articleContent=ref("");

function handleUpdate(newValue) {
  articleContent.value=JSON.stringify(newValue);
}

</script>

