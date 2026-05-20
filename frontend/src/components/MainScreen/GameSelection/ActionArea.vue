<script setup lang="ts">
import { reactive } from "vue";
import { main } from "../../../../wailsjs/go/models";
import ErrorModal, { ErrorModalSettings } from "../../Modals/ErrorModal.vue";
import { LaunchGame } from "../../../../wailsjs/go/main/App";

const props = defineProps<{
    instance: main.GameInstance;
}>();

let errorModalSettings = reactive(new ErrorModalSettings());

function launch() {
    LaunchGame(props.instance).catch((error) => {
        errorModalSettings.title = "Launch error";
        errorModalSettings.text = error;
        errorModalSettings.active = true;
    });
}
</script>

<template>
    <div class="action-area">
        <div class="button-group">
            <button id="play-btn" class="primary-btn" @click="launch()">
                <span id="play-btn-text">Launch</span>
                <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                >
                    <path d="M8 5v14l11-7z" />
                </svg>
            </button>
            <button
                id="delete-instance-btn"
                class="icon-btn delete"
                title="Delete Instance"
            >
                <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
            </button>
        </div>
    </div>

    <Teleport to="body">
        <ErrorModal
            @ok="errorModalSettings.active = false"
            :settings="errorModalSettings"
        />
    </Teleport>
</template>

<style scoped>
.action-area {
    margin-top: 12px;
    margin-bottom: 16px;
}

.icon-btn {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-dim);
    width: 42px;
    height: 42px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.15s;
}

.icon-btn:hover {
    background: rgba(237, 66, 69, 0.1);
    color: #ed4245;
    border-color: rgba(237, 66, 69, 0.3);
}

.button-group {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
