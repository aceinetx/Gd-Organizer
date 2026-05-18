<script lang="ts" setup>
import { ref } from "vue";

defineProps<{
    onClose?: () => void;
    active: boolean;
}>();
</script>

<template>
    <div id="catalog-modal" class="modal-overlay" :class="{ active: active }">
        <div
            class="modal"
            style="
                width: 600px;
                max-height: 80vh;
                display: flex;
                flex-direction: column;
            "
        >
            <div class="modal-header" style="flex-shrink: 0; margin-bottom: 0">
                <div
                    style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 8px;
                    "
                >
                    <div style="display: flex; align-items: center; gap: 8px">
                        <img
                            src="../../assets/geodelogo.png"
                            style="
                                width: 20px;
                                height: 20px;
                                object-fit: contain;
                            "
                        />
                        <h3 style="margin: 0">Geode Catalog</h3>
                    </div>
                    <button
                        id="close-catalog-btn"
                        class="btn-secondary"
                        style="border: none; padding: 6px 12px"
                        @click="onClose!()"
                    >
                        ✕
                    </button>
                </div>
                <p
                    id="catalog-target"
                    style="
                        font-size: 11px;
                        color: var(--accent);
                        margin: 0 0 10px 0;
                    "
                ></p>
                <div
                    class="search-box"
                    style="width: 100%; margin-bottom: 12px"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        id="catalog-search"
                        placeholder="Search Geode mods..."
                        autocomplete="off"
                    />
                </div>
                <p
                    id="catalog-status"
                    style="
                        font-size: 11px;
                        color: var(--text-dim);
                        margin: 8px 0 0 0;
                    "
                ></p>
            </div>
            <div
                id="catalog-list"
                class="mods-grid"
                style="
                    flex: 1;
                    overflow-y: auto;
                    margin-top: 10px;
                    min-height: 200px;
                "
            ></div>
            <div
                style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    margin-top: 12px;
                    flex-shrink: 0;
                "
            >
                <button
                    id="catalog-prev"
                    class="btn-secondary"
                    style="padding: 6px 14px; font-size: 12px"
                >
                    ← Prev
                </button>
                <span
                    id="catalog-page-info"
                    style="font-size: 12px; color: var(--text-dim)"
                ></span>
                <button
                    id="catalog-next"
                    class="btn-secondary"
                    style="padding: 6px 14px; font-size: 12px"
                >
                    Next →
                </button>
            </div>
        </div>
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
</style>
