<script setup lang="ts">
defineProps<{
    isGeode: boolean;
    name: string;
    path: string;
}>();
</script>

<template>
    <div style="display: flex; align-items: center; gap: 12px; min-width: 0">
        <img src="../assets/geodelogo.png" class="icon" v-if="isGeode" />
        <img src="../assets/Geometrylogo.png" class="icon" v-if="!isGeode" />
        <div style="min-width: 0; flex: 1">
            <h4
                style="
                    margin: 0;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                "
            >
                {{ name }}
            </h4>
            <p
                style="
                    margin: 2px 0 0 0;
                    font-size: 10px;
                    opacity: 0.5;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                "
            >
                {{ path }}
            </p>
        </div>
    </div>
</template>

<style scoped>
div {
    text-align: left;
}

img .icon {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    object-fit: contain;
    flex-shrink: 0;
}
</style>
