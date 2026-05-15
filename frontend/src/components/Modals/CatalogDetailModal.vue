<script lang="ts" setup>
</script>

<template>
	<div id="catalog-detail-modal" class="modal-overlay">
		<div class="modal" style="width: 480px;">
			<div class="modal-header" style="margin-bottom: 0;">
				<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
					<span id="detail-mod-name" style="font-size: 18px; font-weight: 600;"></span>
					<span id="detail-featured-badge"
						style="background: #f59e0b; color: #000; font-size: 8px; padding: 1px 5px; border-radius: 3px; font-weight: 600;">★</span>
				</div>
				<p id="detail-mod-meta" style="font-size: 12px; color: var(--text-dim); margin: 0 0 16px 0;"></p>
			</div>
			<div
				style="background: rgba(255,255,255,0.03); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border); margin-bottom: 16px; max-height: 200px; overflow-y: auto;">
				<p id="detail-mod-desc" style="font-size: 13px; line-height: 1.6; color: var(--text-secondary); margin: 0;"></p>
			</div>
			<div id="detail-progress-wrap" style="margin-bottom: 12px;">
				<div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
					<span style="font-size: 11px; color: var(--text-secondary);">Downloading...</span>
					<span id="detail-progress-pct"
						style="font-size: 11px; color: var(--text-primary); font-weight: 500;">0%</span>
				</div>
				<div style="background: rgba(255,255,255,0.06); border-radius: 4px; height: 6px; overflow: hidden;">
					<div id="detail-progress-bar"
						style="height: 100%; width: 0%; background: var(--accent); border-radius: 4px; transition: width 0.15s ease;">
					</div>
				</div>
			</div>
			<p id="detail-install-target" style="font-size: 11px; color: var(--text-dim); margin-bottom: 12px;"></p>
			<div class="modal-footer" style="justify-content: space-between;">
				<button id="detail-close-btn" class="btn-secondary" style="border: none;">Cancel</button>
				<button id="detail-install-btn" class="btn-primary" style="padding: 10px 24px;">Install</button>
			</div>
		</div>
	</div>
</template>
