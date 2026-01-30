/* src/modules/export/export.manager.js */

import { ExportLogic } from "./export.logic.js";
import { ExportRenderer } from "./export.renderer.js";

export class ExportManager {
    constructor(app) {
        this.app = app;
        this.logic = new ExportLogic(app);
        this.renderer = new ExportRenderer(app);
        this.lastSource = null;
        this.bindEvents();
    }
    init(){ this.renderer.setNewExports();}
    bindEvents() {
        const dom = this.app.dom.export;
        dom.formatSelect?.addEventListener("change", () => {
        this.renderer.updateAsciiVisibility();
        this.generateFrom("selectbox");
        });
    ["charOn", "charOff"].forEach(id => {
        dom[id]?.addEventListener("input", () => this.generateFrom("selectbox"));
        });
    }
    // ---------------------------------------------------------
    excecuteTool(action, payload) {
        switch (action) {
            case "clr_code": this.renderer.clearOutput(); break;
            case "copyCode": this.renderer.copyToClipboard(); break;
            case "code": this.generateFrom(payload); break;
            default: this.app.error.warning(`Export: Action '${action}' `+this.app.s("err_action_noDef"));
        }
    }
     // ---------------------------------------------------------
        generateFrom(source) {
        if (source === "selectbox") { source = this.lastSource; }       // Wenn Formatwechsel ("selectbox") → letztes Grid erneut exportieren
        this.lastSource = source;                                       // Speichern, welches Grid zuletzt exportiert wurde
        let pattern;
        if (source === "main") { pattern = this.app.grid.logic.getCurrentPattern(); }
        else if (source === "workshop") { pattern = this.app.workshop.logic.getCurrentPattern(); }
        if (!pattern) return;
        const asciiCfg = this.renderer.getAsciiConfig();
        const matrix = this.app.utils.hexToPattern(pattern.data, pattern.grid);
        const formatObj = this.renderer.getFormat();                    // format kann String ODER Objekt sein
        const format = typeof formatObj === "string" ? formatObj : formatObj.type;
        if (format === "png") {
            this.renderer.exportPNG(matrix, pattern.grid);              // PNG Sonderfall
            return;
        }
        const { output, bytesCount } =
            this.logic.export(matrix, pattern.grid, format, asciiCfg);// Standard-Textformate
        this.renderer.setOutput(output);
        this.renderer.setMemoryUsage(bytesCount);
    }

}

