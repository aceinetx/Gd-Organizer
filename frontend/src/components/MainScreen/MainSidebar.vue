<script lang="ts" setup>
import { ref } from "vue";
import { main } from "../../../wailsjs/go/models";
import GameInstance from "../GameInstance.vue";
import SidebarBrand from "../SidebarBrand.vue";

let instances = ref<Array<main.GameInstance>>([
    new main.GameInstance({
        hasGeode: true,
        version: "2.2081",
        name: "Geode instance",
        path: "/home/aceinet/gd",
    }),
    new main.GameInstance({
        hasGeode: false,
        version: "2.2081",
        name: "Vanilla instance",
        path: "/home/aceinet/gd2",
    }),
]);

defineProps<{
    settings?: () => void;
}>();
</script>

<template>
    <div class="sidebar">
        <SidebarBrand />
        <div class="sidebar-header">
            <div class="logo" id="sidebar-logo">Instances</div>
            <button
                class="add-btn"
                id="add-folder-btn"
                title="Add Geometry Dash Instance"
            >
                +
            </button>
        </div>

        <div class="folder-list">
            <GameInstance v-for="instance in instances" :instance="instance" />
        </div>

        <div class="sidebar-footer">
            <div class="settings-entry" id="settings-btn" @click="settings!()">
                <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"
                    />
                    <circle cx="12" cy="12" r="3" />
                </svg>
                <span id="settings-text">Settings</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.add-btn {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    width: 28px;
    height: 28px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.15s ease;
}

.add-btn:hover {
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.06);
}

.folder-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0;
    padding-right: 0;
}

.folder-list::-webkit-scrollbar {
    width: 4px;
}

.folder-list::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 10px;
}
</style>
