/* src/modules/stamp/stamp.manager.js */

import { StampLogic } from "./stamp.logic.js";
import { StampRenderer } from "./stamp.renderer.js";

export class StampManager {
    constructor(app) {
        this.app = app;
        this.logic = new StampLogic(app);
        this.renderer = new StampRenderer(app);
    }
    init() { this.addStampButtons();}
    // -------------------------------------------------------
    addStampButtons() {
        const templates = this.app.templates.logic.templates;
        templates.forEach(t => {
            const el = this.app.dom.templates.list.querySelector(`[data-name="${t.name}"]`);
            if (!el) return;
            const btns = el.querySelector(".t_btns");
            if (!btns) return;
            const btn = document.createElement("button");
            btn.title = this.app.t("t_stamp");
            btn.dataset.help = "t_stamp";
            btn.dataset.action = "t_stamp";
            btn.dataset.payload = t.name;
            btn.innerHTML = `<i class="fa fa-gavel"></i>`;
            btns.appendChild(btn);
        });
    }
    // -------------------------------------------------------
    // START / STOP Stempelmode
    activate() {
        const pattern = this.logic.getCurrentPattern();
        if (!pattern) return;
        let matrix;
        if (pattern.type === "pixel") {
            matrix = pattern.matrix; // Text-Stempel
        } else {
            matrix = this.app.utils.hexToPattern(pattern.data, pattern.grid); // Template
        }
        this.renderer.renderGhost(matrix);
        this.app.info.lock("w_stamp");
        this.app.info.show("w_stamp");
    }
    deactivate() {
        this.logic.currentPixelMatrix = null;
        this.renderer.clearGhost();
        this.app.info.unlock();
        this.app.uiOutput.hideNow();
    }
    // -------------------------------------------------------
    enterStampModeWithTemplate(t) {
        this.logic.setCurrentPatternByName(t.name);                         // Stempel setzen
        this.app.bindings.enterStampMode();                                 // Stamp-Mode aktivieren
    }
    enterTextStampMode(text) {
        const pixelData = this.logic.textToPixels(text); 
        this.logic.currentPixelMatrix = pixelData;
        this.app.bindings.enterStampMode();                                 // Stamp-Mode aktivieren
    }
    // -------------------------------------------------------
    // APPLY TO GRID
    apply(grid, baseX, baseY) {
        const pattern = this.logic.getCurrentPattern();
        if (!pattern) return;
        let matrix;
        if (pattern.type === "pixel") {
            matrix = pattern.matrix;               // Text-Stempel
        } else {
            matrix = this.app.utils.hexToPattern(pattern.data, pattern.grid); // Template
        }        
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[0].length; x++) {
                if (matrix[y][x] !== 1) continue;
                const gx = baseX + x;
                const gy = baseY + y;
                if (gx < 0 || gy < 0 || gx >= grid.width || gy >= grid.height) continue;
                grid.setPixel(gx, gy, 1);
                grid.updatePixel(gx, gy);
            }
        }
    }

}
