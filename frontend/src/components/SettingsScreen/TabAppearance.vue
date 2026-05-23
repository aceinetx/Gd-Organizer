<script setup lang="ts">
import AccentColorButton from "./AccentColorButton.vue";
import ThemeCard from "./ThemeCard.vue";
</script>

<template>
    <div class="settings-tab-content" id="tab-appearance">
        <div class="settings-card">
            <div class="setting-item">
                <label id="label-theme">Standard Themes</label>
                <div class="theme-choices">
                    <ThemeCard name="Dark" theme-id="dark" />
                    <ThemeCard name="Light" theme-id="light" />
                    <ThemeCard name="System" theme-id="system" />
                </div>

                <label
                    id="label-live-theme"
                    style="margin-top: 20px; display: block"
                    >Live Themes</label
                >
                <div class="theme-choices">
                    <ThemeCard name="Black hole" theme-id="black-hole" />
                    <ThemeCard name="Nullscapes" theme-id="nullscapes" />
                    <ThemeCard name="Kocmoc" theme-id="kocmoc" :star="true" />
                </div>
            </div>

            <div class="setting-item">
                <label id="label-accent">Accent Color</label>
                <div
                    class="accent-choices"
                    style="display: flex; gap: 10px; margin-top: 10px"
                >
                    <AccentColorButton color-hex="#0084cc" />
                    <AccentColorButton color-hex="#3ba55d" />
                    <AccentColorButton color-hex="#eb459e" />
                    <AccentColorButton color-hex="#a333c8" />
                    <AccentColorButton color-hex="#808080" />
                    <AccentColorButton color-hex="#ed4245" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.theme-choices {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
</style>
