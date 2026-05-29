<script lang="ts" setup>
import { data } from "../user_data";
</script>

<template>
    <div id="theme-bg-container">
        <video
            id="black-hole-video"
            class="theme-bg-video black-hole-bg"
            muted
            loop
            playsinline
            autoplay
            :class="{ inactive: data.Theme != 'black-hole' }"
        >
            <source src="../assets/bhppr.mp4" type="video/mp4" />
        </video>
        <video
            id="nullscapes-video"
            class="theme-bg-video nullscapes-bg"
            muted
            loop
            playsinline
            autoplay
            :class="{ inactive: data.Theme != 'nullscapes' }"
        >
            <source src="../assets/nullscapes.webm" type="video/webm" />
        </video>
        <video
            id="kocmoc-video"
            class="theme-bg-video kocmoc-bg"
            muted
            loop
            playsinline
            autoplay
            :class="{ inactive: data.Theme != 'kocmoc' }"
        >
            <source src="../assets/kocmoc.mp4" type="video/mp4" />
        </video>
    </div>
</template>

<style scoped>
.theme-bg-video {
    position: absolute;
    top: 0;
    left: 260px; /* Default sidebar width offset */
    width: calc(100% - 260px);
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.theme-bg-video.inactive {
    display: none;
}
</style>
