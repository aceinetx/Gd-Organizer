<script setup lang="ts">
import { main } from "../../../../wailsjs/go/models";
import StatusPillModded from "./StatusPillModded.vue";
import StatusPillVersion from "./StatusPillVersion.vue";

defineProps<{
    instance: main.GameInstance;
}>();
</script>

<template>
    <div class="game-details">
        <div class="title-section">
            <h1 id="current-game-title">{{ instance.name }}</h1>
            <StatusPillModded :has-geode="instance.hasGeode" />
            <StatusPillVersion :version="instance.version" />
        </div>

        <p id="current-game-path" class="path-display">
            {{ instance.path }}
        </p>
    </div>
</template>

<style scoped>
.title-section {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 8px;
}

.title-section h1 {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 0;
}

.path-display {
    font-size: 12px;
    color: var(--text-dim);
    margin-top: 6px;
    text-align: left;
}

.game-details {
    margin-bottom: 13px;
}
</style>
