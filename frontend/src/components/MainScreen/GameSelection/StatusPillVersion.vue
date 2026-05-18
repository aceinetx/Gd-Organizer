<script setup lang="ts">
defineProps<{ version: string }>();
</script>

<template>
    <div class="status-pill version">
        <span id="current-game-version">{{ version }}</span>
    </div>
</template>

<style scoped>
.status-pill.version {
    background: var(--bg-card);
    border: 1px solid var(--border);
    color: var(--text-secondary);
}
</style>
