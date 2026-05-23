<script setup lang="ts">
import AccentColorButton from "./AccentColorButton.vue";
</script>

<template>
    <div class="settings-tab-content" id="tab-appearance">
        <div class="settings-card">
            <div class="setting-item">
                <label id="label-theme">Standard Themes</label>
                <div class="theme-choices">
                    <div class="theme-card" id="theme-dark-btn">Dark</div>
                    <div class="theme-card" id="theme-light-btn">Light</div>
                    <div class="theme-card" id="theme-system-btn">System</div>
                </div>

                <label
                    id="label-live-theme"
                    style="margin-top: 20px; display: block"
                    >Live Themes</label
                >
                <div class="theme-choices">
                    <div class="theme-card" id="theme-black-hole-btn">
                        Black Hole
                    </div>
                    <div class="theme-card" id="theme-nullscapes-btn">
                        Nullscapes
                    </div>
                    <div
                        class="theme-card"
                        id="theme-kocmoc-btn"
                        style="
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            justify-content: center;
                        "
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            fill="currentColor"
                            style="
                                color: #000;
                                filter: drop-shadow(
                                    0 0 2px rgba(255, 255, 255, 0.3)
                                );
                            "
                        >
                            <path
                                d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"
                            />
                        </svg>
                        <span>Kocmoc</span>
                    </div>
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

.theme-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    padding: 10px;
    border-radius: var(--radius-md);
    text-align: center;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.15s ease;
}

.theme-card:hover {
    background: rgba(255, 255, 255, 0.06);
}

.theme-card.active {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
    font-weight: 700;
}
</style>
