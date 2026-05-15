<script lang="ts" setup>
</script>

<template>
	<div id="confirm-modal" class="modal-overlay">
		<div class="modal">
			<h3 style="margin: 0; color: var(--accent);">ARE YOU SURE?</h3>
			<p id="confirm-msg">Do you really want to delete this?</p>
			<div class="confirm-btns">
				<button id="confirm-no" class="btn-secondary" style="border:none;">Cancel</button>
				<button id="confirm-yes" class="btn-primary" style="padding: 10px 24px; background: #ed4245;">Confirm</button>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>
