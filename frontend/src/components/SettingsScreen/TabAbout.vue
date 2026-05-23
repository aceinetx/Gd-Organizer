<template>
    <div class="settings-tab-content" id="tab-about">
        <div class="about-section">
            <h3 id="about-title">GD Organizer</h3>
            <p id="about-version">Client Version : v1.0.0</p>
            <div
                class="about-description"
                style="
                    margin-top: 12px;
                    font-size: 13px;
                    line-height: 1.6;
                    color: var(--text-secondary);
                "
            >
                <p>
                    GD Organizer is a lightweight launcher and mod manager for
                    Geometry Dash. It helps you easily install, manage, and
                    update mods with a simple and modern interface, providing
                    powerful mod management tools and a clean user experience.
                </p>
            </div>
            <div
                class="contributors"
                style="
                    margin-top: 20px;
                    padding-top: 16px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                "
            >
                <span
                    style="
                        font-size: 11px;
                        font-weight: 700;
                        color: var(--accent);
                        text-transform: uppercase;
                    "
                    >Contributors</span
                >
                <div
                    style="
                        margin-top: 8px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    "
                >
                    <img
                        src="../../assets/logo.png"
                        style="
                            width: 32px;
                            height: 32px;
                            border-radius: 8px;
                            object-fit: contain;
                            background: rgba(255, 255, 255, 0.03);
                        "
                    />
                    <div>
                        <div style="font-size: 13px; font-weight: 600">
                            drmilooo
                        </div>
                        <a
                            href="https://github.com/drmilooo"
                            target="_blank"
                            style="
                                font-size: 11px;
                                color: var(--accent);
                                text-decoration: none;
                            "
                            >github.com/drmilooo</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.about-section h3 {
    font-size: 16px;
    margin-bottom: 4px;
    color: var(--text-primary);
}

.about-section p {
    font-size: 13px;
    color: var(--text-secondary);
}

* {
    text-align: left;
}
</style>
