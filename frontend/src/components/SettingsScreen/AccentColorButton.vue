<script setup lang="ts">
import { data, saveData } from "../../user_data";

const props = defineProps<{
    colorHex: string;
}>();

function switchColor() {
    data.AccentColor = props.colorHex;
    data.AccentHover = props.colorHex;
    saveData();
}
</script>

<template>
    <div
        class="accent-color-btn"
        :style="{ background: colorHex }"
        @click="switchColor()"
    ></div>
</template>

<style scoped>
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
</style>
