<script setup lang="tsx">
</script>

<template>
    <div id="game-selection" class="screen">
        <div class="content-view">
            <div class="game-details">
                <div class="title-section">
                    <h1 id="current-game-title">Geometry Dash</h1>
                    <div id="geode-icon" class="status-pill geode">
                        <img src="../assets/geodelogo.png" alt="Geode" />
                        <span>Geode</span>
                    </div>
                    <div id="geometry-icon" class="status-pill geode"
                        style="background: rgba(59, 110, 165, 0.1); border-color: rgba(59, 110, 165, 0.2);">
                        <img src="../assets/Geometrylogo.png" alt="GD" />
                        <span style="color: #6da4d6;">Vanilla</span>
                    </div>
                    <div class="status-pill version">
                        <span id="current-game-version">Checking...</span>
                    </div>
                </div>

                <p id="current-game-path" class="path-display"></p>
            </div>

            <div class="action-area">
                <div class="button-group">
                    <button id="play-btn" class="primary-btn">
                        <span id="play-btn-text">PLAY</span>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                    <button id="delete-instance-btn" class="icon-btn delete" title="Delete Instance">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                            <path
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            <div id="mods-section" class="mods-container">
                <div class="section-header"
                    style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <div>
                        <h3 id="mods-header-title" style="margin: 0; font-size: 18px; color: white;">Installed Mods</h3>
                        <p id="mod-stats"
                            style="margin: 4px 0 0 0; font-size: 11px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 1px;">
                            <span id="mod-count" style="color: var(--accent); font-weight: bold;">0</span> <span
                                id="mods-found-text">MODS FOUND</span>
                        </p>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div class="search-box">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input type="text" id="mod-search" placeholder="Search mods..." autocomplete="off">
                        </div>
                        <button id="install-mod-btn" class="install-mod-btn">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
                            </svg>
                        </button>
                        <button id="geode-catalog-btn" class="install-mod-btn" title="Browse Geode Catalog">
                            <img src="../assets/geodelogo.png" style="width: 14px; height: 14px; object-fit: contain;">
                            <span style="font-size: 12px;">Catalog</span>
                        </button>
                    </div>
                </div>
                <div id="mods-list" class="mods-grid">
                </div>
            </div>
        </div>
    </div>
</template>