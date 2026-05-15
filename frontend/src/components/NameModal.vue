<script lang="ts" setup>
</script>

<template>
	<div id="name-modal" class="modal-overlay">
		<div class="modal">
			<div class="modal-header">
				<h3 id="instance-modal-title">New Instance</h3>
				<p id="instance-modal-desc">Give this folder a recognizable name.</p>
			</div>
			<input type="text" id="instance-name" placeholder="e.g. Geode 2.204" autocomplete="off" />
			<div class="modal-footer">
				<button id="cancel-name-btn" class="btn-secondary">Cancel</button>
				<button class="btn-primary" id="instance-add-btn">Add Instance</button>
			</div>
		</div>
	</div>
</template>
