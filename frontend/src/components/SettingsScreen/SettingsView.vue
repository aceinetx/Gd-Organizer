<script lang="ts" setup>
import { Tab } from "./Tab";
import TabAbout from "./TabAbout.vue";
import TabAppearance from "./TabAppearance.vue";
import TabGeneral from "./TabGeneral.vue";

defineProps<{
    tab: Tab;
}>();
</script>

<template>
    <main class="main-content">
        <div class="content-view">
            <div class="game-details">
                <h1
                    id="settings-view-title"
                    style="font-size: 32px; margin-bottom: 8px"
                >
                    Settings
                </h1>
                <p
                    id="settings-view-desc"
                    style="color: var(--text-dim); font-size: 14px"
                >
                    Customize your GD Organizer experience
                </p>
            </div>

            <div class="settings-dashboard" ref="dashboard">
                <TabGeneral v-if="tab == Tab.General" />
                <TabAppearance v-if="tab == Tab.Appearance" />
                <TabAbout v-if="tab == Tab.About" />
            </div>
        </div>
    </main>
</template>

<style scoped>
.settings-dashboard {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-right: 8px;
}

.settings-select {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    color: white;
    padding: 12px;
    border-radius: 12px;
    outline: none;
    font-family: var(--font-main);
    cursor: pointer;
}
</style>
