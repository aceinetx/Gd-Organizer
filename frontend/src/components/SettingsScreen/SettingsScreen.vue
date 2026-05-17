<script setup lang="tsx">
import { nextTick, Ref, ref, useTemplateRef } from "vue";
import SettingsSidebar from "./SettingsSidebar.vue";
import SettingsView from "./SettingsView.vue";
import { Tab } from "./Tab";

const tab = ref(Tab.General);
const sidebar = ref<InstanceType<typeof SettingsSidebar>>();

function tabChanged(newTab: Tab) {
    tab.value = newTab;
}

defineProps<{
    back?: () => void;
}>();

defineExpose({
    sidebar,
});
</script>

<template>
    <SettingsSidebar
        :tab="tab"
        :tab-changed="tabChanged"
        v-on:back="back"
        ref="sidebar"
    />
    <SettingsView :tab="tab" />
</template>
