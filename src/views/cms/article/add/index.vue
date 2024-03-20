<template>
  <div class="app-container">
    <component :is="componentName"></component>
  </div>
</template>

<script setup name="AddArticle">
import { defineAsyncComponent } from 'vue'
const route = useRoute();

let componentName = reactive({});
const active=ref('tinymce');
if (route.params && route.params.editType) {
  
       active.value=route.params.editType
}
componentName = defineAsyncComponent(() => 
    import(`../components/edit-${active.value}.vue`)
)
</script>