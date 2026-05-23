<script setup lang="ts">
import { data, saveData } from "../../user_data";

const props = defineProps<{ name: string; themeId: string; star?: boolean }>();

function apply() {
    data.Theme = props.themeId;
    saveData();
}
</script>

<template>
    <div
        class="theme-card"
        :class="{ active: data.Theme == themeId }"
        id="theme-dark-btn"
        @click="apply()"
        v-if="!star"
    >
        {{ name }}
    </div>
    <div
        class="theme-card"
        :class="{ active: data.Theme == themeId }"
        id="theme-dark-btn"
        style="
            display: flex;
            align-items: center;
            gap: 8px;
            justify-content: center;
        "
        @click="apply()"
        v-else
    >
        <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="currentColor"
            style="
                color: #000;
                filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
            "
        >
            <path
                d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"
            />
        </svg>
        {{ name }}
    </div>
</template>

<style scoped>
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
