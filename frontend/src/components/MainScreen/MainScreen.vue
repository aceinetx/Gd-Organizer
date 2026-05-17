<script setup lang="tsx">
import { onMounted, ref } from "vue";
import MainSidebar from "./MainSidebar.vue";
import MainView from "./MainView.vue";

defineProps<{
    settings?: () => void;
}>();
</script>

<template>
    <MainSidebar :settings="settings" />
    <MainView />
</template>
