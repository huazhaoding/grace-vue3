<template>
    <div>
    <mainEdit :handleCode="'updateMail'" :formDisabled="false" :mailId="mailId" />
    </div>
</template>

<script setup name="UpdateMail">
import mainEdit from "@/views/server/mail/components/mailEdit";
const route = useRoute();
const mailId = ref(route.params.mailId);


</script>