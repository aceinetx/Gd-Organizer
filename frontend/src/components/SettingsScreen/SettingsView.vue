<script lang="ts" setup>
import { Tab } from "./Tab";

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
                <div
                    class="settings-tab-content"
                    id="tab-general"
                    v-if="tab == Tab.General"
                >
                    <div class="settings-card">
                        <div class="setting-item">
                            <label id="label-lang">Language (Beta)</label>
                            <select class="settings-select" id="lang-select">
                                <option value="en-EN">English</option>
                                <option value="ru-RU">Russian (Русский)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div
                    class="settings-tab-content"
                    id="tab-appearance"
                    v-if="tab == Tab.Appearance"
                >
                    <div class="settings-card">
                        <div class="setting-item">
                            <label id="label-theme">Standard Themes</label>
                            <div class="theme-choices">
                                <div class="theme-card" id="theme-dark-btn">
                                    Dark
                                </div>
                                <div class="theme-card" id="theme-light-btn">
                                    Light
                                </div>
                                <div class="theme-card" id="theme-system-btn">
                                    System
                                </div>
                            </div>

                            <label
                                id="label-live-theme"
                                style="margin-top: 20px; display: block"
                                >Live Themes</label
                            >
                            <div class="theme-choices">
                                <div
                                    class="theme-card"
                                    id="theme-black-hole-btn"
                                >
                                    Black Hole
                                </div>
                                <div
                                    class="theme-card"
                                    id="theme-nullscapes-btn"
                                >
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
                                style="
                                    display: flex;
                                    gap: 10px;
                                    margin-top: 10px;
                                "
                            >
                                <div
                                    class="accent-color-btn"
                                    data-color="#0084cc"
                                    data-rgb="0, 132, 204"
                                    style="background: #0084cc"
                                ></div>
                                <div
                                    class="accent-color-btn"
                                    data-color="#3ba55d"
                                    data-rgb="59, 165, 93"
                                    style="background: #3ba55d"
                                ></div>
                                <div
                                    class="accent-color-btn"
                                    data-color="#eb459e"
                                    data-rgb="235, 69, 158"
                                    style="background: #eb459e"
                                ></div>
                                <div
                                    class="accent-color-btn"
                                    data-color="#a333c8"
                                    data-rgb="163, 51, 200"
                                    style="background: #a333c8"
                                ></div>
                                <div
                                    class="accent-color-btn"
                                    data-color="#808080"
                                    data-rgb="128, 128, 128"
                                    id="accent-gray-btn"
                                    style="background: #808080"
                                ></div>
                                <div
                                    class="accent-color-btn"
                                    data-color="#ed4245"
                                    data-rgb="237, 66, 69"
                                    style="background: #ed4245"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="settings-tab-content"
                    id="tab-about"
                    v-if="tab == Tab.About"
                >
                    <div class="about-section">
                        <h3 id="about-title">GD Organizer</h3>
                        <p id="about-version">Client Version : v1.0.0</p>
                        <div
                            class="about-description"
                            style="
                                margin-top: 12px;
                                font-size: 13px;
                                line-height: 1.6;
                                color: var(--text-secondary);
                            "
                        >
                            <p>
                                GD Organizer is a lightweight launcher and mod
                                manager for Geometry Dash. It helps you easily
                                install, manage, and update mods with a simple
                                and modern interface, providing powerful mod
                                management tools and a clean user experience.
                            </p>
                        </div>
                        <div
                            class="contributors"
                            style="
                                margin-top: 20px;
                                padding-top: 16px;
                                border-top: 1px solid rgba(255, 255, 255, 0.05);
                            "
                        >
                            <span
                                style="
                                    font-size: 11px;
                                    font-weight: 700;
                                    color: var(--accent);
                                    text-transform: uppercase;
                                "
                                >Contributors</span
                            >
                            <div
                                style="
                                    margin-top: 8px;
                                    display: flex;
                                    align-items: center;
                                    gap: 10px;
                                "
                            >
                                <img
                                    src="../../assets/logo.png"
                                    style="
                                        width: 32px;
                                        height: 32px;
                                        border-radius: 8px;
                                        object-fit: contain;
                                        background: rgba(255, 255, 255, 0.03);
                                    "
                                />
                                <div>
                                    <div
                                        style="
                                            font-size: 13px;
                                            font-weight: 600;
                                        "
                                    >
                                        drmilooo
                                    </div>
                                    <a
                                        href="https://github.com/drmilooo"
                                        target="_blank"
                                        style="
                                            font-size: 11px;
                                            color: var(--accent);
                                            text-decoration: none;
                                        "
                                        >github.com/drmilooo</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

.accent-color-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    border: 4px solid transparent;
    transition: all 0.2s;
}

.accent-color-btn:hover {
    transform: scale(1.1);
}

.accent-color-btn.active {
    border-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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

.about-section,
.settings-card {
    margin-top: 10px;
    padding: 24px;
    background: var(--bg-card);
    border-radius: 16px;
    border: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.about-section h3 {
    font-size: 16px;
    margin-bottom: 4px;
    color: white;
}

.about-section p {
    font-size: 13px;
    color: var(--text-secondary);
}
</style>
