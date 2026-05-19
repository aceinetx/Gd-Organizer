<script setup lang="tsx">
import { main } from "../../../../wailsjs/go/models";
import ActionArea from "./ActionArea.vue";
import GameDetails from "./GameDetails.vue";
import ModsContainer from "./ModsContainer.vue";

defineProps<{
    instance: main.GameInstance;
}>();
</script>

<template>
    <div id="game-selection">
        <div class="content-view">
            <GameDetails :instance="instance" />
            <ActionArea :instance="instance" />
            <ModsContainer v-if="instance.hasGeode" :instance="instance" />
        </div>
    </div>
</template>

<style>
.section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}

.section-header h3 {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: none;
    letter-spacing: 0.5px;
}
</style>

<style scoped></style>
