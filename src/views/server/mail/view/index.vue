<template>
    <div>
      <mainEdit :handleCode="'viewMail'" :formDisabled="true" :mailId="mailId" :mailType="1" :mailUsed="0" />
    </div>
  </template>
  
  <script setup name="viedMail">
  import mainEdit from "@/views/server/mail/components/mailEdit";
  const route = useRoute();
  const mailId = ref(route.params.mailId);
  </script>