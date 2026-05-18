<script setup lang="ts">
import { ref } from "vue";
import { main } from "../../../../wailsjs/go/models";
import CatalogModal from "../../Modals/CatalogModal.vue";

defineProps<{
    instance: main.GameInstance;
}>();

let showCatalogModal = ref(false);
</script>

<template>
    <div id="mods-section" class="mods-container">
        <div
            class="section-header"
            style="
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                margin-bottom: 24px;
                padding-bottom: 12px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            "
        >
            <div>
                <h3
                    id="mods-header-title"
                    style="margin: 0; font-size: 18px; color: white"
                >
                    Installed Mods
                </h3>
                <p
                    id="mod-stats"
                    style="
                        margin: 4px 0 0 0;
                        font-size: 11px;
                        color: var(--text-dim);
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    "
                >
                    <span
                        id="mod-count"
                        style="
                            color: var(--accent);
                            font-weight: bold;
                            text-align: left;
                        "
                        >0</span
                    >
                    <span id="mods-found-text">MODS FOUND</span>
                </p>
            </div>
            <div style="display: flex; gap: 8px">
                <div class="search-box">
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
                        id="mod-search"
                        placeholder="Search mods..."
                        autocomplete="off"
                    />
                </div>
                <button id="install-mod-btn" class="install-mod-btn">
                    <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="currentColor"
                    >
                        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
                    </svg>
                </button>
                <button
                    id="geode-catalog-btn"
                    class="install-mod-btn"
                    title="Browse Geode Catalog"
                    @click="showCatalogModal = true"
                >
                    <img
                        src="../../../assets/geodelogo.png"
                        style="width: 14px; height: 14px; object-fit: contain"
                    />
                    <span style="font-size: 12px">Catalog</span>
                </button>
            </div>
        </div>
        <div id="mods-list" class="mods-grid"></div>
    </div>

    <Teleport to="body">
        <CatalogModal
            :active="showCatalogModal"
            @close="showCatalogModal = false"
        />
    </Teleport>
</template>

<style scoped>
.mods-container {
    margin-top: 0;
}

.install-mod-btn {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    padding: 6px 14px;
    border-radius: var(--radius-md);
    font-size: 13px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    gap: 6px;
}

.install-mod-btn:hover {
    background: rgba(255, 255, 255, 0.04);
    color: var(--text-primary);
}
</style>
