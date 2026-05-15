<script lang="ts" setup>
</script>

<template>
	<div class="settings-nav" id="settings-nav">
		<div class="settings-nav-item active" data-tab="general" id="nav-general">General</div>
		<div class="settings-nav-item" data-tab="appearance" id="nav-appearance">Appearance</div>
		<div class="settings-nav-item" data-tab="about" id="nav-about">About</div>
	</div>
</template>

<style scoped>
.settings-nav {
  display: flex;
  flex-direction: column;
  flex: 1;
  animation: fadeInSidebar 0.3s ease;
}

.settings-nav-item {
  padding: 12px 24px;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.1s ease;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  border-bottom: 1px solid rgba(255,255,255,0.02);
  border-left: 3px solid transparent;
}

.settings-nav-item:hover {
  background: rgba(255,255,255,0.04);
}

.settings-nav-item.active {
  background: var(--bg-card);
  border-left-color: var(--accent);
  color: var(--accent);
  font-weight: 700;
}
</style>
