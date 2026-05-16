<script lang="ts" setup>
import MainScreen from './MainScreen/MainScreen.vue';
import SettingsScreen from './SettingsScreen/SettingsScreen.vue';

</script>

<template>
    <div class="app-container">
        <SettingsScreen/>
    </div>
</template>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.logo {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.add-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  width: 28px;
  height: 28px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.add-btn:hover {
  color: var(--text-primary);
  background: rgba(255,255,255,0.06);
}

.folder-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-right: 0;
}

.folder-list::-webkit-scrollbar {
  width: 4px;
}

.folder-list::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 10px;
}

.folder-item {
  padding: 12px 16px;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.1s ease;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.02);
}

.folder-item:hover {
  background: rgba(255,255,255,0.04);
}

.folder-item.active {
  background: var(--bg-card);
  border-left: 3px solid var(--accent);
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
}

.folder-item.active h4 {
  color: var(--accent);
  font-weight: 700;
}

.folder-item.active p {
  color: var(--text-dim);
}

.sidebar-footer {
  margin-top: auto;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.settings-entry {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.1s ease;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  border-bottom: 1px solid rgba(255,255,255,0.02);
}

.settings-entry:hover {
  background: rgba(255,255,255,0.04);
  color: var(--text-primary);
}

.main-content {
  flex: 1;
  position: relative;
  background-color: var(--bg-app);
}

/* No Selection Screen */
.hero-content {
  margin: auto;
  text-align: center;
  max-width: 400px;
}

.hero-content h2 {
  font-size: 20px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.hero-content p {
  color: var(--text-dim);
  font-size: 13px;
  line-height: 1.6;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.title-section h1 {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0;
}

.status-pill {
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-pill.geode {
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-primary);
}

.status-pill.geode img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  background: transparent !important;
  /* Ensure no background on image itself */
  display: block;
}

.status-pill.version {
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-secondary);
}

.path-display {
  font-size: 12px;
  color: var(--text-dim);
  margin-top: 6px;
}

.action-area {
  margin-top: 12px;
  margin-bottom: 16px;
}

.button-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-dim);
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
}

.icon-btn:hover {
  background: rgba(237, 66, 69, 0.1);
  color: #ed4245;
  border-color: rgba(237, 66, 69, 0.3);
}

.mods-container {
  margin-top: 0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.section-header h3 {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: none;
  letter-spacing: 0.5px;
}

.install-mod-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 6px 14px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.install-mod-btn:hover {
  background: rgba(255,255,255,0.04);
  color: var(--text-primary);
}
</style>