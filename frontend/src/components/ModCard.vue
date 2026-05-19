<script setup lang="ts">
import { main } from "../../wailsjs/go/models";

defineProps<{
    mod: main.CatalogModInfo;
    installed: boolean;
}>();

function formatDownloads(n: number) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return String(n);
}
</script>

<template>
    <div class="mod-info-box mod-card" style="flex: 1; min-width: 0">
        <div style="min-width: 0">
            <div style="display: flex; align-items: center; gap: 6px">
                <span class="mod-name">{{ mod.Name }}</span>
                <span
                    v-if="mod.Featured"
                    style="
                        background: #f59e0b;
                        color: #000;
                        font-size: 8px;
                        padding: 1px 5px;
                        border-radius: 3px;
                        font-weight: 600;
                    "
                    >★</span
                >
                <span
                    v-if="installed"
                    style="
                        background: rgba(59, 165, 93, 0.2);
                        color: #3ba55d;
                        font-size: 8px;
                        padding: 1px 5px;
                        border-radius: 3px;
                        font-weight: 600;
                    "
                    >Installed</span
                >
            </div>
            <div
                style="font-size: 11px; color: var(--text-dim); margin-top: 2px"
            >
                {{ mod.Developer }} · v{{ mod.Version }} ·
                {{ formatDownloads(mod.Downloads) }} downloads
            </div>
        </div>

        <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="var(--text-dim)"
            stroke-width="2"
            style="flex-shrink: 0"
        >
            <path d="M9 18l6-6-6-6" />
        </svg>
    </div>
</template>

<style scoped>
.mods-grid {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    padding-right: 12px;
    margin-bottom: 20px;
}

.mods-grid::-webkit-scrollbar {
    width: 4px;
}

.mods-grid::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 10px;
}

.mod-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border);
    padding: 10px 14px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.1s ease;
    width: 100%;
    position: relative;
    z-index: 1;
    text-align: left;
}

.mod-card:hover {
    background: rgba(255, 255, 255, 0.04);
}

.mod-info-box {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
}

.mod-icon {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
}

.mod-icon.enabled {
    background: var(--accent);
    box-shadow: 0 0 8px rgba(var(--accent-rgb), 0.5);
}

.mod-icon.disabled {
    background: #ed4245;
}

.mod-name {
    font-size: 13px;
    font-weight: 400;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mod-info-btn {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid var(--text-dim);
    color: var(--text-dim);
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: help;
    transition: all 0.2s;
    font-family: serif;
    font-style: italic;
    font-weight: bold;
}

.mod-info-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: scale(1.1);
}
</style>
