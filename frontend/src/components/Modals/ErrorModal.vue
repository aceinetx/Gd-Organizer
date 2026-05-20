<script lang="ts">
export class ErrorModalSettings {
    active: boolean = false;
    title: string = "Error";
    desc: string = "";
    text: string = "Error text";
}
</script>

<script setup lang="ts">
defineProps<{
    onOk?: () => void;
    settings: ErrorModalSettings;
}>();
</script>

<template>
    <div class="modal-overlay" :class="{ active: settings.active }">
        <div class="modal">
            <div class="modal-header">
                <h3 id="instance-modal-title">{{ settings.title }}</h3>
                <p id="instance-modal-desc">
                    {{ settings.desc }}
                </p>
            </div>
            <p>{{ settings.text }}</p>
            <div class="modal-footer">
                <button
                    id="cancel-name-btn"
                    class="btn-secondary"
                    @click="onOk!()"
                >
                    OK
                </button>
            </div>
        </div>
    </div>
</template>
