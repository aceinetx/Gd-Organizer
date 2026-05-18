<script setup lang="tsx">
import { onMounted, ref } from "vue";
import MainSidebar from "./MainSidebar.vue";
import MainView from "./MainView.vue";
import { main } from "../../../wailsjs/go/models";

defineProps<{
    settings?: () => void;
}>();

let instance = ref<main.GameInstance | undefined>();
</script>

<template>
    <MainSidebar
        @game-selected="(game) => (instance = game)"
        :settings="settings"
        :selected-instance="instance"
    />
    <MainView :instance="instance" />
</template>
