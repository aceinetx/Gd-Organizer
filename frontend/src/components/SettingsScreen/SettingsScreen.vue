<script setup lang="tsx">
import { Ref, ref } from "vue";
import SettingsSidebar from "./SettingsSidebar.vue";
import SettingsView from "./SettingsView.vue";
import { Tab } from "./Tab";

const tab = ref(Tab.General);

function tabChanged(newTab: Tab) {
    tab.value = newTab;
}
</script>

<template>
    <SettingsSidebar :tab="tab" :tab-changed="tabChanged" />
    <SettingsView :tab="tab" />
</template>
