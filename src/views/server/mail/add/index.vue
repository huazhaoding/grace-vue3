<template>
  <div>
    <mainEdit :handleCode="'addMail'" :formDisabled="true" :mailId="null" :mailType="1" :mailUsed="0" />
  </div>
</template>

<script setup name="AddMail">
import mainEdit from "@/views/server/mail/components/mailEdit";
</script>