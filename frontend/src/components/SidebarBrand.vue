<script lang="ts" setup></script>

<template>
    <div class="sidebar-brand">
        <img src="../assets/logo.png" alt="Logo">
        <span>GDOrganizer</span>
    </div>
</template>

<style scoped>
.sidebar-brand {
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.sidebar-brand img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.sidebar-brand span {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}
</style>