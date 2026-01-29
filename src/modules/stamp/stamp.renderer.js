/* src/modules/stamp/stamp.renderer.js */

import { DomMap } from "../../core/DomMap.js";
import { ClassMap } from "../../ui/ClassMap.js";

export class StampRenderer {
    constructor(app) {
        this.app = app;
        this.ghost = this.app.dom.footer.stampGhost;
    }
    // ---------------------------------------------------------
    renderGhost(matrix) {
        if (!this.ghost) return;
        const h = matrix.length;
        const w = matrix[0].length;
        this.ghost.classList.add(ClassMap.layout.stamp_ghost);
        this.ghost.innerHTML = "";
        this.ghost.style.gridTemplateColumns = `repeat(${w}, 9px)`;
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const div = document.createElement("div");
                div.style.width = "9px";
                div.style.height = "9px";
                if (matrix[y][x] === 1) {
                    div.style.background = "var(--accent)";
                }
                this.ghost.appendChild(div);
            }
        }
        this.ghost.style.display = "grid";
    }
    // ---------------------------------------------------------
    moveGhost(e) {
        if (!this.ghost) return;
        const x = e.clientX + window.scrollX;
        const y = e.clientY + window.scrollY;
        this.ghost.style.left = (x + 2) + "px";
        this.ghost.style.top = (y + 2) + "px";
    }
    // ---------------------------------------------------------
    clearGhost() {
        if (!this.ghost) return;
        this.ghost.innerHTML = "";
        this.ghost.style = "";
        this.ghost.style.display = "none";
    }
}
