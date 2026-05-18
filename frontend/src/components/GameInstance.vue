<script setup lang="ts">
import { main } from "../../wailsjs/go/models";

defineProps<{
    instance: main.GameInstance;
}>();
</script>

<template>
    <div
        style="display: flex; align-items: center; gap: 12px; min-width: 0"
        id="game-instance"
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
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.02);
}
</style>
