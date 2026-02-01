/* src/core/MasterBindings.js */

export class MasterBindings {
    constructor(app) {
        this.app = app;
        this._blockNextContextMenu = false;
    }
    init() {
        this.bindTemplateFilterEvents();
        this.bindMouseEvents();
        this.bindGlobalActionEvents();
    }
    // -------------------------------------------------------
    bindTemplateFilterEvents() {
        const dom = this.app.dom.templates;
        dom.filt8.addEventListener("change", () => this.onFilterChanged());
        dom.filt16.addEventListener("change", () => this.onFilterChanged());
        dom.filt32.addEventListener("change", () => this.onFilterChanged());
    }
    onFilterChanged() {
        this.app.templates.applyFilter();
        this.app.templates.addLoadButtons();
        this.app.stamp.addStampButtons();
    }
    // -------------------------------------------------------
    // GLOBAL ACTION (HOVER + CLICK)
    bindGlobalActionEvents() {
        // Geheimer Klingon Modus
        window.addEventListener("keydown", (e) => {
            if (e.shiftKey && e.key.toLowerCase() === "k") {
                this.toggleKlingonMode();
            }
            switch (e.key) { 
                case "ArrowUp": this.app.grid.excecuteTool("shift_up"); break; 
                case "ArrowDown": this.app.grid.excecuteTool("shift_down"); break; 
                case "ArrowLeft": this.app.grid.excecuteTool("shift_left"); break; 
                case "ArrowRight": this.app.grid.excecuteTool("shift_right"); break; 
            }
        });
        // HELP-MODE: Hover für ALLE Elemente mit data-help
        document.addEventListener("mouseover", (e) => {
            if (!this.app.helpMode) return;
            const el = e.target.closest("[data-help]");
            if (!el) return;
            const helpKey = el.dataset.help;
            this.app.state.activeTool = helpKey;
            this.app.info.show(helpKey);
        });
        document.addEventListener("mouseout", (e) => {
            if (!this.app.helpMode) return;
            const el = e.target.closest("[data-help]");
            if (!el) return;
            // Nur wenn Maus wirklich das Element verlässt
            if (!el.contains(e.relatedTarget)) {
                this.app.state.activeTool = "ready";
                this.app.info.show("ready");
            }
        });
        // ACTION-MODE: Klicks für echte Aktionen (Buttons)
        document.addEventListener("click", (e) => {
            const el = e.target.closest("[data-action]");
            if (!el) return;
            const action = el.dataset.action;
            const payload = el.dataset.payload || null;
            this.executeAction(action, payload, el);
        });
    }
    // -------------------------------------------------------
    // GLOBAL ACTION EXECUTE
    executeAction(action, payload, target) {
        if (!action) return;
        if (action.startsWith("setLang")) {                             // Spracheinstellung
            this.app.lang.set(payload);
            this.app.uiPanels.updateHelp(); return;}
        if (action.startsWith("tt_")) {                                 // Tipp darstellungen
            this.app.uiOutput.showInfo("Tipp: "+this.app.t(action)+ " -> "+this.app.td(action)); return;}
        if (action.startsWith("m_")) {                                  // MainGrid-Tools
            if (action === "m_code") {
                this.app.uiPanels.switchPanel("ex_export");
                this.app.export.excecuteTool(action.slice(2), "main"); return;}
            this.app.grid.excecuteTool(action.slice(2), payload); return; }
        if (action.startsWith("w_")) {                                  // Workshop-Tools
            if (action === "w_code") {
                this.app.uiPanels.switchPanel("ex_export");
                this.app.export.excecuteTool(action.slice(2), "workshop"); return;}
            this.app.workshop.excecuteTool(action.slice(2), payload); return; }
        if (action.startsWith("t_")) {                                  // Templates-Tools
            if (action === "t_toworkshop") {
                let temp = this.app.templates.getTemplateByName(payload);
                this.app.workshop.setInGrid(temp); return;}
            if (action === "t_stamp") {
                let temp = this.app.templates.getTemplateByName(payload);
                this.app.stamp.enterStampModeWithTemplate(temp);return;}
        }
        if (action.startsWith("im_")) {                                 // Import-Tools
            this.app.import.excecuteTool(action.slice(3), payload); return; }
        if (action.startsWith("ex_")) {                                 // Export-Tools
            this.app.export.excecuteTool(action.slice(3), payload); return; }
        if (action === "helpMode") {                                    // Enter helpMode
            this.toggleDebugMode();
            this.app.helpMode = !this.app.helpMode;
            target.classList.toggle("active");
            document.body.classList.toggle("help-mode");
            if (this.app.helpMode === true){
                this.app.uiOutput.showInfo(this.app.t("ready")+": "+this.app.td("ready"));
            }else{ this.app.uiOutput.hideNow();}
            return; }
        if (action === "errDefault") {                              // Sonderfall zeig ein Fehler
            this.app.error.error(`Action: '${action}' `+this.app.s("err_action_noDef")+this.app.s("Simulierter Fehler")); return; }
        this.app.error.warning(`Action: '${action}' `+this.app.s("err_action_noDef"));
    }
    // -------------------------------------------------------
    // STAMP MODE
    enterStampMode() {
        this.app.state.stampActive = true;
        this.app.stamp.activate();
        document.body.style.overflow = "hidden";
    }
    exitStampMode() {
        this.app.state.stampActive = false;
        this.app.stamp.logic.clearCurrentPattern();
        this.app.stamp.deactivate();
        document.body.style.overflow = "auto";
    }
    // -------------------------------------------------------
    // GLOBAL MOUSE EVENTS
    bindMouseEvents() {
        window.addEventListener("mousemove", e => {                 // Stempel-Voransicht bewegen
            if (this.app.state.stampActive) { this.app.stamp.renderer.moveGhost(e);}
        });
        window.addEventListener("mousedown", e => {                 // Rechte-Maustaste Stempelmodus verlassen
            if (e.button === 2 && this.app.state.stampActive) {
                e.preventDefault();
                this._blockNextContextMenu = true;
                this.exitStampMode();
            }
        });
        window.addEventListener("contextmenu", e => {               // Verhindere das contextmenü beim verlassen
            if (this._blockNextContextMenu) {
                e.preventDefault();
                this._blockNextContextMenu = false;
                return;}
            if (this.app.state.stampActive) { e.preventDefault();}
        });
    }
    // -------------------------------------------------------
    toggleTheme() {
        const html = document.documentElement;
        const current = html.getAttribute("data-theme");
        const next = current === "klingon" ? "darkBlue" : "klingon";
        html.setAttribute("data-theme", next);
    }
    // -------------------------------------------------------
    toggleKlingonMode() {
        this.klingonMode = !this.klingonMode;
        if (this.klingonMode) {
            this.app.lang.set("tlh");                               // Sprache auf Klingonisch
        } else {
            this.app.lang.set("de");                                // Zurück zu Deutsch (oder vorherige Sprache)
        }
        this.toggleTheme();                                         // Theme aktivieren
        this.app.grid.renderer.updatePreview();
        this.app.grid.renderer.renderGridBorders();
        this.app.uiPanels.updateHelp();
        this.app.templates.renderer.renderTemplateList(this.app.templates.logic.templates);
        this.app.templates.addLoadButtons();
        this.app.stamp.addStampButtons();
    }
    // -------------------------------------------------------
    toggleDebugMode() {
      const panel = document.getElementById("panel_debug"); 
      if (!panel) return; 
      panel.classList.toggle("isHidden");
    }


}

