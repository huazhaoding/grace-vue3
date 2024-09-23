<template>
    <mainEdit :handleCode="'addMail'" :formDisabled="true" :mailId="null" />
</template>

<script setup name="UpdateMail">
import mainEdit from "@/views/server/mail/components/mailEdit";
const mailId = ref(route.params.mailId);
if (route.params && route.params.mailId) {
    mailId.value = route.params.mailId;
}
</script>