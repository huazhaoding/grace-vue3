<template>
  <edit-share :articleContent="articleContentActive" :articleImg="articleImgActive" :articleBuild="2">
    <template #thumbnailChoose="{ formData, maxImg }">
      <div style="display: none;"> {{ articleImgActive=formData.articleImg }}</div>
      <thumbnail-choose :articleImg="articleImgActive" :articleContent="formData.articleContent" :maxImg="maxImg"
        :isPhoto="true" />
    </template>

    <template #editContent="{ formData }">
      <div style="display: none;"> {{ articleContentActive=formData.articleContent }}</div>
      <vue3-tinymce v-model="articleContentActive"></vue3-tinymce>
    </template>
  </edit-share>
</template>

<script setup name="editTin">
import editShare from "@/views/cms/article/components/common/editShare";
import Vue3Tinymce from "@/components/Editor/TinymceEdit";
import thumbnailChoose from "@/views/cms/article/components/common/thumbnailChoose";
const articleContentActive = ref("");
const articleImgActive = ref("");

</script>
