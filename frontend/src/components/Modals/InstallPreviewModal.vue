<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { main } from "../../../wailsjs/go/models";
import { formatDownloads } from "../../util";
import { InstallMod } from "../../../wailsjs/go/main/App";
import DetailProgress from "../DetailProgress.vue";
import { EventsOff, EventsOn } from "../../../wailsjs/runtime/runtime";
import InstallWarningContainer from "../InstallWarningContainer.vue";

const props = defineProps<{
    onClose?: () => void;
    onInstall?: () => void;
    active: boolean;
    mod: main.CatalogModInfo;
    installed: boolean;
    instance: main.GameInstance;
}>();

let progress = ref(0);
let error = ref("");

onMounted(() => {
    EventsOn("install-progress", (percentage: number) => {
        if (!props.active) return;
        console.log(progress.value);
        progress.value = percentage;
    });
});

onUnmounted(() => {
    EventsOff("install-prorgess");
});

function install() {
    error.value = "";
    InstallMod(props.instance, props.mod.DownloadLink, props.mod.Id).catch(
        (err) => {
            error.value = err;
        },
    );
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
            <DetailProgress :progress="progress" />
            <InstallWarningContainer
                v-if="installed"
                text="Mod is already installed in this instance"
            />
            <InstallWarningContainer v-if="error.length > 0" :text="error" />
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
