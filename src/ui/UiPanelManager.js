/* src/ui/UiPanelManager.js */

export class UiPanelManager {
    constructor(app) {
        this.app = app;
        this.currentMode = null; // sauber, korrekt
        this.bodies = { t_templates: "t_panel_body", ex_export: "ex_panel_body", im_import: "im_panel_body"};
        this.helpKeys = { t_templates: "t_quicktipp", ex_export: "ex_quicktipp", im_import: "im_quicktipp" };
        this.titleEl = document.querySelector("#t_panel .panelTitle_text");
    }
    init() {
        document.querySelectorAll("input[name='fr_mode']").forEach(radio => {
            radio.addEventListener("change", () => this.switchPanel(radio.id));
        });
        this.switchPanel("t_templates");
    }
    // ---------------------------------------------------------
    switchPanel(mode) {
        this.currentMode = mode; // ✔ korrekt
        document.getElementById(mode).checked = true;
        for (const id of Object.values(this.bodies)) {
            document.getElementById(id).classList.remove("panel_body_active");
        }
        const activeId = this.bodies[mode];
        if (activeId) {
            document.getElementById(activeId).classList.add("panel_body_active");
        }
        this.updateTitle();
        this.updateHelp();
        this.refreshCanvas();
    }
    // ---------------------------------------------------------
    updateTitle() {
        if (!this.titleEl) return;
        this.titleEl.textContent = this.app.lang.get(`${this.currentMode}_title`);
    }
    // ---------------------------------------------------------
    updateHelp() {
        const helpBox = document.getElementById("multi_coment");
        const key = this.helpKeys[this.currentMode];
        if (!key) {
            helpBox.textContent = "";
            return;
        }
        const entry = this.app.lang.data.tooltips[key];
        helpBox.textContent = entry?.d || "";
    }
    // ---------------------------------------------------------
    refreshCanvas() {
        // Falls du später mode-spezifische Refreshes brauchst:
        // if (this.currentMode === "t_templates") this.app.templates.refresh();
        // if (this.currentMode === "ex_export") this.app.export.refresh();
        // if (this.currentMode === "im_import") this.app.import.refresh();
    }
}
