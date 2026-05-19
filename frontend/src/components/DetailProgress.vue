<script setup lang="ts">
defineProps<{ progress: number }>();
</script>
<template>
    <div id="detail-progress-wrap" style="margin-bottom: 12px">
        <div
            style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 4px;
            "
        >
            <span style="font-size: 11px; color: var(--text-secondary)"
                >Downloading...</span
            >
            <span id="detail-progress-pct">{{ Math.round(progress) }}%</span>
        </div>
        <div
            style="
                background: rgba(255, 255, 255, 0.06);
                border-radius: 4px;
                height: 6px;
                overflow: hidden;
            "
        >
            <div
                id="detail-progress-bar"
                :style="{ width: Math.round(progress) }"
            ></div>
        </div>
    </div>
</template>

<style scoped>
#detail-progress-bar {
    height: 100%;
    background: var(--accent);
    border-radius: 4px;
    transition: width 0.15s ease;
}

#detail-progress-pct {
    font-size: 11px;
    color: var(--text-primary);
    font-weight: 500;
}
</style>
