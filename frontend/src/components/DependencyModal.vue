<script lang="ts" setup>
</script>

<template>
	<div id="dependency-modal" class="modal-overlay">
		<div class="modal">
			<div class="modal-header">
				<h3 id="dep-modal-title">Dependency Warning</h3>
				<p id="dep-modal-desc">The following mods depend on this and might stop working:</p>
			</div>
			<div id="dependent-mods-list" class="mods-grid" style="margin-bottom: 24px; max-height: 150px;">
			</div>
			<div class="modal-footer" style="flex-direction: column; gap: 10px;">
				<button id="disable-all-btn" class="btn-primary" style="width: 100%;">Close All Dependent Mods</button>
				<button id="disable-only-btn" class="btn-secondary" style="width: 100%;">Close Only Selected Mod</button>
				<button id="cancel-dep-btn" class="btn-secondary" style="width: 100%; border: none;">Cancel</button>
			</div>
		</div>
	</div>
</template>
