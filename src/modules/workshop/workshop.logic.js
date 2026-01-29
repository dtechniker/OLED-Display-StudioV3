/* src/modules/workshop/workshop.logic.js */

export class WorkshopLogic {
    constructor(app) {
        this.app = app;
        this.states = {};
    }

    // ---------------------------------------------------------
    // STATE ERSTELLEN (vom Manager aufgerufen)
    createState(conf) {
        const grid = Array.from({ length: conf.h }, () =>
            Array(conf.w).fill(0)
        );

        this.states[conf.id] = {
            w: conf.w,
            h: conf.h,
            pixels: grid
        };
    }
    // ---------------------------------------------------------
    // BASIC PIXEL OPERATIONS
    togglePixel(id, x, y) {
        const s = this.states[id];
        s.pixels[y][x] ^= 1;
        return s.pixels[y][x];
    }
    // ---------------------------------------------------------
    setPixel(id, x, y, val) {
        const s = this.states[id];
        s.pixels[y][x] = val ? 1 : 0;
    }
    // ---------------------------------------------------------
    getPixel(id, x, y) { return this.states[id].pixels[y][x];}
    // ---------------------------------------------------------
    getState(id) { return this.states[id];}
    // ---------------------------------------------------------    
    getCurrentPattern() {
        const id = this.app.workshop.activeId;
        const state = this.states[id];
        if (!state) {
            console.warn("WorkshopLogic.getCurrentPattern: no state for id:", id);
            return null;
        }
        const matrix = state.pixels;                                    // 2D-Array der Pixel
        const hex = this.app.utils.patternToHex(matrix);                // HEX konvertieren (nutzt dieselbe Pipeline wie MainGrid)
        return {
            data: hex,
            grid: `${state.w}x${state.h}`
        };
    }
    // ---------------------------------------------------------
    applyFullPattern(id, pattern) {
        const s = this.states[id];
        if (!s) {
            console.warn("applyFullPattern: state not found:", id);
            return;
        }
        const h = s.h;
        const w = s.w;
        for (let y = 0; y < h; y++) { s.pixels[y].fill(0);}             // Reset   
        for (let y = 0; y < h; y++) {                                   // Setzen
            for (let x = 0; x < w; x++) {
                if (pattern[y] && pattern[y][x] === 1) {
                    s.pixels[y][x] = 1;
                }
            }
        }
    }

}
