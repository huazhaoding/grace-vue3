<template>
    <div class="app-container">
        <!-- 主题个性化配置 -->
        <theme-config :configGroup="configGroup" :updateConfigUrl="updateConfigUrl" :configForm="configForm"
            @submit="submit"></theme-config>
    </div>
</template>

<script setup name="themeSetting">
import themeConfig from "@/components/FormConfig";
import { getThemeConfigForm } from "@/api/cms/theme";
const { proxy } = getCurrentInstance();
function submit() {
    // 关闭当前tab页签，打开新页签
    const obj = { path: "/cms/web/theme/"+route.params.webName, name: "Theme" };
    proxy.$tab.closeOpenPage(obj).then(() => {
        proxy.$tab.refreshPage(obj);
    });
}

const route = useRoute();
const updateConfigUrl = ref(undefined);
const configGroup = ref(undefined);
const configForm = ref(undefined);
if (route.params && route.params.webName && route.params.themeName) {
    configGroup.value = route.params.webName + "_" + route.params.themeName;
    // 表单更新地址
    updateConfigUrl.value = "cms/theme/updateConfig/" + configGroup.value;
    getThemeConfigForm(route.params.webName, route.params.themeName).then(
        (response) => {
            configForm.value = response.data;
        }
    );
}
</script>
