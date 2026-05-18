<script lang="ts" setup>
import { nextTick, onMounted, ref } from "vue";
import MainScreen from "./MainScreen/MainScreen.vue";
import SettingsScreen from "./SettingsScreen/SettingsScreen.vue";

let screen = ref(0);
let main_screen = ref<InstanceType<typeof MainScreen>>();
let settings_screen = ref<InstanceType<typeof SettingsScreen>>();
</script>

<template>
    <div class="app-container">
        <MainScreen
            v-if="screen == 0"
            ref="main_screen"
            :settings="
                async () => {
                    screen = 1;
                    await nextTick();
                    settings_screen?.sidebar?.doAnimation();
                }
            "
        />
        <SettingsScreen
            v-if="screen == 1"
            ref="settings_screen"
            :back="
                () => {
                    screen = 0;
                }
            "
        />
    </div>
</template>

<style scoped>
.app-container {
    display: flex;
    height: 100vh;
    overflow: hidden;
}
</style>
