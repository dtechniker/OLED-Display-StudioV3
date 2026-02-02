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
    init(){
        this.renderer.setNewExports();
    }
    bindEvents() {
        const dom = this.app.dom.export;
        dom.formatSelect?.addEventListener("change", (e) => {
        this.renderer.updateConfigVisibility();
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
            case "copyCode":
                const { type: format } = this.renderer.getFormat();
                if (format === "png") {
                    this.renderer.exportPNG( this.lastSource.matrix,this.lastSource.grid);
                } else {
                    this.renderer.copyToClipboard();
                }
            break;
            case "code": this.generateFrom(payload); break;
            default: this.app.error.warning(`Export: Action '${action}' `+this.app.s("err_action_noDef"));
        }
    }
     // ---------------------------------------------------------
    generateFrom(source) {
        if (source === "selectbox") { source = this.lastSource?.source ?? "main";}
        let pattern;
        if (source === "main") {
            pattern = this.app.grid.logic.getCurrentPattern();
        } else if (source === "workshop") {
            pattern = this.app.workshop.logic.getCurrentPattern();
        }
        if (!pattern) return;
        const asciiCfg = this.renderer.getAsciiConfig();
        const matrix = this.app.utils.hexToPattern(pattern.data, pattern.grid);
        const { type: format } = this.renderer.getFormat();
        this.lastSource = {source,matrix,grid: pattern.grid };                      // HIER speichern wir ALLES  
        if (format === "png") {                                                     // Grafik/Icon Ausgabe
            this.renderer.setOutput(`[${this.app.td("ex_code_png")}]`);
            this.renderer.setMemoryUsage(0);
            this.app.dom.export.btnCopy.title = this.app.t("ex_code_png");
        return;}
        const { output, bytesCount } =                                              // Textformate                                    
        this.logic.export(matrix, pattern.grid, format, asciiCfg);
        this.renderer.setOutput(output);
        this.renderer.setMemoryUsage(bytesCount);
        this.app.dom.export.btnCopy.title = this.app.t("ex_copyCode");
    }
}
