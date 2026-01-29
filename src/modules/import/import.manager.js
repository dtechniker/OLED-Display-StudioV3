/* src/modules/import/import.manager.js */

import { ImportLogic } from "./import.logic.js";
import { ImportRenderer } from "./import.renderer.js";

export class ImportManager {
    constructor(app) {
        this.app = app;
        this.logic = new ImportLogic(app);
        this.renderer = new ImportRenderer(app);
        this.utils = app.utils;
        this.tempPattern = null;
    }
    // ---------------------------------------------------------      
    excecuteTool(action, payload) {
        switch (action) {
            case "clr": this.renderer.clearInput(); break;
            case "import": this.executeImport(); break;
            default:
                this.app.error.warning(`Import: Action '${action}' `+this.app.s("err_action_noDef"));
        }
    }
    // ---------------------------------------------------------
    importRowHex(tokens, raw) {
        const { w, h } = this.logic.detectRowHexDimensions(raw, tokens);
        const matrix = this.logic.tokensToMatrix(tokens, w, h);
        return { matrix, w, h };
    }
    // ---------------------------------------------------------
    executeImport() {
        const raw = this.app.import.renderer.getRawInput();
        const format = this.logic.detectFormat(raw);
        let result = null;
        switch (format) {
            case "ssd1306": result = this.handleSSD1306(raw);break;
            case "rowhex":  result = this.handleRowHex(raw);break;
            case "binary":  result = this.handleRowHex(raw);break;
            default:
                this.app.error.warning(this.app.s("im_format_un"));
                return;
        }
        if (!result) return;
        this.tempPattern = result;
        const hex = this.app.utils.patternToHex(result.matrix);
        const pattern = {
            name: "__imported__",
            data: hex,
            grid: `${result.w}x${result.h}`
        };
        this.app.stamp.logic.setCurrentPattern(pattern);
        this.app.bindings.enterStampMode?.();
    }
    // ---------------------------------------------------------
    handleSSD1306(raw) {
        const info = this.logic.detectSSD1306(raw);
        if (!info.w || !info.h) {
            this.app.error.warning("SSD1306: "+this.app.s("im_alert_Import"));
            return null;
        }
        const tokens = this.logic.parseTokens(raw);
        const bytes = tokens.map(t => parseInt(t, 16));
        const matrix = this.logic.SSD1306ToMatrix(bytes, info.w, info.h);
        return {
            isSSD1306: true,
            w: info.w,
            h: info.h,
            matrix
        };
    }
    // ---------------------------------------------------------
    handleRowHex(raw) {
        const tokens = this.logic.parseTokens(raw);
        const { w, h } = this.logic.detectRowHexDimensions(raw, tokens);
        const matrix = this.logic.tokensToMatrix(tokens, w, h);
        return {
            isSSD1306: false,
            w,
            h,
            matrix
        };
    }
}
