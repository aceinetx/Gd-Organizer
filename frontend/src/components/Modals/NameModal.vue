<script lang="ts" setup>
import { ref } from "vue";

defineProps<{
    active: boolean;
    onClose?: () => void;
    onAdd?: (name: string) => void;
}>();

let name = ref("");
</script>

<template>
    <div id="name-modal" class="modal-overlay" :class="{ active: active }">
        <div class="modal">
            <div class="modal-header">
                <h3 id="instance-modal-title">New Instance</h3>
                <p id="instance-modal-desc">
                    Give this folder a recognizable name.
                </p>
            </div>
            <input
                type="text"
                id="instance-name"
                placeholder="e.g. Geode 2.204"
                autocomplete="off"
                v-model="name"
            />
            <div class="modal-footer">
                <button
                    id="cancel-name-btn"
                    class="btn-secondary"
                    @click="onClose!()"
                >
                    Cancel
                </button>
                <button
                    class="btn-primary"
                    id="instance-add-btn"
                    @click="onAdd!(name)"
                >
                    Add Instance
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal input:not([type="checkbox"]) {
    width: 100%;
    background: var(--bg-card);
    border: 1px solid var(--border);
    padding: 10px 14px;
    border-radius: var(--radius-md);
    color: white;
    font-size: 14px;
    outline: none;
    margin-bottom: 16px;
    transition: border-color 0.2s;
}
</style>
