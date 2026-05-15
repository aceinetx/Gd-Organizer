<script setup lang="tsx">
import MainSidebar from './MainSidebar.vue';
import MainView from './MainView.vue';

const onSettings = () => {
    console.warn(123)
}
</script>

<template>
    <MainSidebar :settings="onSettings"/>
    <MainView/>
</template>