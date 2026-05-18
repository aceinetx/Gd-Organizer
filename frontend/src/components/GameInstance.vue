<script setup lang="ts">
import { main } from "../../wailsjs/go/models";

defineProps<{
    instance: main.GameInstance;
    active: boolean;
    onClick?: (instance: main.GameInstance) => void;
}>();
</script>

<template>
    <div
        style="display: flex; align-items: center; gap: 12px; min-width: 0"
        id="game-instance"
        :class="{ active: active }"
        class="folder-item"
        @click="onClick!(instance)"
    >
        <img
            src="../assets/geodelogo.png"
            class="icon"
            v-if="instance.hasGeode"
        />
        <img
            src="../assets/Geometrylogo.png"
            class="icon"
            v-if="!instance.hasGeode"
        />
        <div style="min-width: 0; flex: 1">
            <h4
                style="
                    margin: 0;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                "
            >
                {{ instance.name }}
            </h4>
            <p
                style="
                    margin: 2px 0 0 0;
                    font-size: 10px;
                    opacity: 0.5;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                "
            >
                {{ instance.path }}
            </p>
        </div>
    </div>
</template>

<style scoped>
div {
    text-align: left;
}

.icon {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    object-fit: contain;
    flex-shrink: 0;
}

#game-instance {
    padding: 12px 16px;
    border-radius: 0;
    cursor: pointer;
    transition: all 0.1s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.02);
}

.folder-item {
    padding: 12px 16px;
    border-radius: 0;
    cursor: pointer;
    transition: all 0.1s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.02);
}

.folder-item:hover {
    background: rgba(255, 255, 255, 0.04);
}

.folder-item.active {
    background: var(--bg-card);
    border-left: 3px solid var(--accent);
    border-bottom: 1px solid var(--border);
    color: var(--text-primary);
}

.folder-item.active h4 {
    color: var(--accent);
    font-weight: 700;
}

.folder-item.active p {
    color: var(--text-dim);
}
</style>
