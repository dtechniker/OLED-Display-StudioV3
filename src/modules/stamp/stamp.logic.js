/* src/modules/stamp/stamp.logic.js */
import { PixelFonts } from "./fonts.data.js";

export class StampLogic {
    constructor(app) {
        this.app = app;
        this._currentPattern = null;   // interne Variable, gekapselt
        this.currentPixelMatrix = null;
    }
    // ---------------------------------------------------------
    getCurrentPattern() {
        if (this.currentPixelMatrix) {
            return {
                type: "pixel",
                matrix: this.currentPixelMatrix
            };
        }
        return this._currentPattern;
    }
    // ---------------------------------------------------------
    setCurrentPattern(pattern) {
        this._currentPattern = {
            name: pattern.name,
            grid: pattern.grid,
            data: pattern.data
        };
    }
    // ---------------------------------------------------------
    setCurrentPatternByName(name) {
        const templates = this.app.templates.logic.templates;
        const pattern = templates.find(t => t.name === name);
        if (!pattern) {
            console.warn(this.app.s("err_stamp_Nogrid"), name);
            this._currentPattern = null;
            return;
        }
        this.setCurrentPattern(pattern);
    }
    // ---------------------------------------------------------
    clearCurrentPattern() { this._currentPattern = null;} 
    // ---------------------------------------------------------
    textToPixels(text) {
        const font = PixelFonts.IBM_PC_8x8_DE;                     // Aktiven Font holen
        const chars = text.split("");
        const matrix = [];
        for (let row = 0; row < font.height; row++) {               // Für jede der 8 Zeilen des Fonts
            const line = [];
            chars.forEach(ch => {
                const glyph = font.glyphs[ch] || font.glyphs["?"];
                const rowData = glyph[row];
                for (let i = 0; i < font.width; i++) {              // 8 Pixel pro Zeichen
                    line.push(rowData[i] === "1" ? 1 : 0);
                }
                //line.push(0);                                     // 1 Pixel Abstand zwischen Zeichen
            });
            matrix.push(line);
        }
    return matrix;}

}