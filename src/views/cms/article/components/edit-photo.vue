<template>
  <edit-share :articleContent="articleContent">
    <template #contentBox="{contentData}">
      <photo-choose :articleContent="contentData.articleContent" @update:contentData="handleUpdate"/>
    </template>
  </edit-share>
</template>

<script setup name="editPhoto777">
import editShare from "@/views/cms/article/components/editShare";
import photoChoose from "@/views/cms/article/components/photoChoose";

const articleContent=ref("");

function handleUpdate(newValue) {
  articleContent.value=JSON.stringify(newValue);
}

</script>

