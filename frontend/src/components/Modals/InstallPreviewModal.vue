<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { main } from "../../../wailsjs/go/models";
import { formatDownloads } from "../../util";
import { InstallMod } from "../../../wailsjs/go/main/App";
import DetailProgress from "../DetailProgress.vue";
import { EventsOff, EventsOn } from "../../../wailsjs/runtime/runtime";

const props = defineProps<{
    onClose?: () => void;
    onInstall?: () => void;
    active: boolean;
    mod: main.CatalogModInfo;
    installed: boolean;
    instance: main.GameInstance;
}>();

let progress = ref(0);

onMounted(() => {
    EventsOn("install-progress", (percentage: number) => {
        progress.value = percentage;
    });
});

onUnmounted(() => {
    EventsOff("install-prorgess");
});

function install() {
    InstallMod(props.instance, props.mod.DownloadLink, props.mod.Id);
}
</script>

<template>
    <div
        id="install-preview-modal"
        class="modal-overlay"
        :class="{ active: active }"
    >
        <div class="modal" style="width: 480px">
            <div class="modal-header" style="margin-bottom: 0">
                <div
                    style="
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        margin-bottom: 4px;
                    "
                >
                    <span
                        id="preview-name"
                        style="font-size: 18px; font-weight: 600"
                        >{{ mod.Name }}</span
                    >
                </div>
                <p
                    id="preview-meta"
                    style="
                        font-size: 12px;
                        color: var(--text-dim);
                        margin: 0 0 16px 0;
                    "
                >
                    {{ mod.Developer }} · {{ mod.Version }} ·
                    {{ formatDownloads(mod.Downloads) }} downloads
                </p>
            </div>
            <div
                style="
                    background: rgba(255, 255, 255, 0.03);
                    padding: 16px;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--border);
                    margin-bottom: 16px;
                    max-height: 200px;
                    overflow-y: auto;
                "
            >
                <p
                    id="preview-desc"
                    style="
                        font-size: 13px;
                        line-height: 1.6;
                        color: var(--text-secondary);
                        margin: 0;
                    "
                >
                    {{ mod.Desc }}
                </p>
            </div>
            <div
                v-if="installed"
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
                <span style="color: #ed4245; font-size: 11px; font-weight: 600"
                    >Mod already exists in this instance.</span
                >
            </div>
            <DetailProgress :progress="progress" />
            <p
                id="install-instance-target"
                style="
                    font-size: 11px;
                    color: var(--text-dim);
                    margin-bottom: 12px;
                "
            >
                Will install to: {{ instance.name }}
            </p>
            <div class="modal-footer" style="justify-content: space-between">
                <button
                    id="cancel-install-btn"
                    class="btn-secondary"
                    style="border: none"
                    @click="onClose!()"
                >
                    Cancel
                </button>
                <button
                    id="confirm-install-btn"
                    class="btn-primary"
                    style="padding: 10px 24px"
                    @click="install()"
                >
                    Intall to {{ instance.name }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    text-align: left;
}
</style>
