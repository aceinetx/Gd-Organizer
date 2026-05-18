<script setup lang="ts">
defineProps<{ hasGeode: boolean }>();
</script>

<template>
    <div v-if="hasGeode" id="geode-icon" class="status-pill geode">
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
</template>

<style scoped>
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
</style>
