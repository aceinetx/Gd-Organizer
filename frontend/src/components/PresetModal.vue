<script lang="ts" setup>
</script>

<template>
	<div id="preset-modal" class="modal-overlay">
		<div class="modal" style="width: 320px;">
			<div class="modal-header">
				<h3 style="margin-bottom: 8px;" id="preset-modal-title">New Preset</h3>
				<p style="font-size: 11px; color: var(--text-dim);" id="preset-modal-desc">Enter a name for this mod snapshot:
				</p>
			</div>
			<input type="text" id="preset-name-input" placeholder="e.g. Building Mods"
				style="width: 100%; padding: 12px; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; border-radius: var(--radius-sm); margin-bottom: 20px; outline: none;"
				autocomplete="off">
			<div class="modal-footer">
				<button id="cancel-preset-btn" class="btn-secondary" style="border: none;">Cancel</button>
				<button class="btn-primary" style="padding: 10px 24px;" id="preset-add-btn">Add</button>
			</div>
		</div>
	</div>
</template>
