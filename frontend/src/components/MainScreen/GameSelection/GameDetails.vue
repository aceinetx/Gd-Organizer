<script setup lang="ts">
import { main } from "../../../../wailsjs/go/models";

defineProps<{
    instance: main.GameInstance;
}>();
</script>

<template>
    <div class="game-details">
        <div class="title-section">
            <h1 id="current-game-title">{{ instance.name }}</h1>
            <div
                v-if="instance.hasGeode"
                id="geode-icon"
                class="status-pill geode"
            >
                <img src="../../../assets/geodelogo.png" alt="Geode" />
                <span>Geode</span>
            </div>
            <div
                v-else
                id="geometry-icon"
                class="status-pill geode"
                style="
                    background: rgba(59, 110, 165, 0.1);
                    border-color: rgba(59, 110, 165, 0.2);
                "
            >
                <img src="../../../assets/Geometrylogo.png" alt="GD" />
                <span style="color: #6da4d6">Vanilla</span>
            </div>
            <div class="status-pill version">
                <span id="current-game-version">{{ instance.version }}</span>
            </div>
        </div>

        <p id="current-game-path" class="path-display">
            {{ instance.path }}
        </p>
    </div>
</template>

<style scoped>
.status-pill {
    padding: 4px 10px;
    border-radius: var(--radius-sm);
    font-size: 11px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
}

.status-pill.geode {
    background: var(--bg-card);
    border: 1px solid var(--border);
    color: var(--text-primary);
}

.status-pill.geode img {
    width: 14px;
    height: 14px;
    object-fit: contain;
    background: transparent !important;
    /* Ensure no background on image itself */
    display: block;
}

.status-pill.version {
    background: var(--bg-card);
    border: 1px solid var(--border);
    color: var(--text-secondary);
}

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
