<script setup lang="tsx">
import { main } from "../../../wailsjs/go/models";
import GameSelection from "./GameSelection/GameSelection.vue";
import NoSelection from "./NoSelection.vue";

defineProps<{
    instance?: main.GameInstance;
}>();
</script>

<template>
    <main class="main-content">
        <NoSelection v-if="!instance" />
        <GameSelection v-else :instance="instance" />
    </main>
</template>
