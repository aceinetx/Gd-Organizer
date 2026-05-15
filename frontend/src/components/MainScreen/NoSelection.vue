<script setup lang="tsx">
</script>

<template>
    <div id="no-selection">
        <div class="hero-content">
            <h2 id="no-selection-title">Select an Instance</h2>
            <p id="no-selection-desc">Choose a folder from the sidebar to manage and play.</p>
        </div>
    </div>
</template>

<style scoped>
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
</style>