<template>
  <edit-share :articleContent="articleContent" :articleImg="articleImg" :articleBuild="2">
      <template #thumbnailChoose="{ articleContent,articleImg, maxImg }">
        <thumbnail-choose
          :articleImg="articleImg"
          :articleContent="articleContent"
          :maxImg="maxImg"
          :isPhoto="true"
          @update:articleImg="handleUpdateArticleImg"
        />
      </template>

      <template #editContent="{ articleContent }">
        <photo-choose
          :articleContent="articleContent"
          @update:articleContent="handleUpdateArticleContent"
        />
      </template>
  </edit-share>
</template>

<script setup name="editPhoto777">
import editShare from "@/views/cms/article/components/common/editShare";
import photoChoose from "@/views/cms/article/components/photoChoose";
import thumbnailChoose from "@/views/cms/article/components/common/thumbnailChoose";
const articleContent = ref("");
const articleImg = ref("");
function handleUpdateArticleContent(newValue) {
  articleContent.value = newValue;
}
function handleUpdateArticleImg(newValue) {
  articleImg.value = newValue;
}
</script>
