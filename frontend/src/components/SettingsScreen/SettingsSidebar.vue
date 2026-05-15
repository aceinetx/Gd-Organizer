<script lang="ts" setup>
import SidebarBrand from '../SidebarBrand.vue';

</script>

<template>
    <div class="sidebar">
        <SidebarBrand/>
        <div class="sidebar-header">
            <div class="logo" id="sidebar-logo">Settings</div>
        </div>

        <div class="settings-nav" id="settings-nav">
            <div class="settings-nav-item active" data-tab="general" id="nav-general">General</div>
            <div class="settings-nav-item" data-tab="appearance" id="nav-appearance">Appearance</div>
            <div class="settings-nav-item" data-tab="about" id="nav-about">About</div>
        </div>

        <div class="sidebar-footer">
            <div class="settings-entry" id="back-home-btn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5m0 0l7 7m-7-7l7-7" />
                </svg>
                <span id="back-home-text">Back to Instances</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.button-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

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
