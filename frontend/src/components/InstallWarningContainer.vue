<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
    <div
        id="install-warning-container"
        style="
            padding: 12px;
            background: rgba(237, 66, 69, 0.1);
            border: 1px solid rgba(237, 66, 69, 0.2);
            border-radius: var(--radius-md);
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        "
    >
        <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="#ed4245"
            stroke-width="2"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span style="color: #ed4245; font-size: 11px; font-weight: 600">{{
            text
        }}</span>
    </div>
</template>

<style scoped>
#install-warning-container {
    text-align: left;
}
</style>
