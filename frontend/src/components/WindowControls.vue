<script lang="ts" setup>
</script>

<template>
	<div class="window-controls">
		<div class="drag-region"></div>
		<button id="min-btn" class="win-btn" title="Minimize">
			<svg width="12" height="12" viewBox="0 0 12 12">
				<rect fill="currentColor" width="10" height="1" x="1" y="6" />
			</svg>
		</button>
		<button id="close-btn" class="win-btn close" title="Close">
			<svg width="12" height="12" viewBox="0 0 12 12">
				<path fill="currentColor"
					d="M10.707 1.293a1 1 0 00-1.414 0L6 4.586 2.707 1.293a1 1 0 00-1.414 1.414L4.586 6l-3.293 3.293a1 1 0 101.414 1.414L6 7.414l3.293 3.293a1 1 0 001.414-1.414L7.414 6l3.293-3.293a1 1 0 000-1.414z" />
			</svg>
		</button>
	</div>
</template>

<style scoped>
.window-controls {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  z-index: 9999;
  height: 32px;
  background: transparent;
}

.window-controls .drag-region {
  position: absolute;
  top: 0;
  right: 80px; /* Leave space for buttons */
  left: -1000vw; /* Drag from far left */
  height: 32px;
  -webkit-app-region: drag;
}

.win-btn {
  width: 45px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--text-dim);
  cursor: default;
  transition: background 0.1s;
  -webkit-app-region: no-drag;
}

.win-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

.win-btn.close:hover {
  background: #e81123;
  color: white;
}
</style>

