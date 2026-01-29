/* src/modules/import/import.logic.js */

export class ImportLogic {
    constructor(app) { this.app = app;}
    // ---------------------------------------------------------
    detectFormat(raw) {
        const text = raw.toLowerCase();
        if (text.includes("ssd1306")) return "ssd1306";                 // SSD1306 hat immer Vorrang
        if (text.includes("0x")) return "rowhex";                       // RowHex (0xAA, 0x1F, ...)
        if (text.includes("0b")) return "binary";                       // Binär (0b00101010, 0b11110000, ...)
        return this.app.s("im_format_un");                                // ungekannt
    }
    // ---------------------------------------------------------
    detectSSD1306(raw) {
        const text = raw.toLowerCase();
        if (!text.includes("ssd1306")) {return { isSSD1306: false }; }  // Erst nach dem Wort "ssd1306" suchen
        const match = text.match(/bitmap_(\d+)x(\d+)\s*\[/);            // Wenn "ssd1306" gefunden → Format suchen
        if (!match) {
            return {
                isSSD1306: true,
                w: null,
                h: null,
                reason: this.app.s("im_format_ready")+" ssd1306, "+ this.app.s("im_bitMap_error")
            };
        } return {
            isSSD1306: true,
            w: parseInt(match[1], 10),
            h: parseInt(match[2], 10),
            reason: this.app.s("im_format_ready")+" ssd1306."
        };
    }
    // ---------------------------------------------------------
    SSD1306ToMatrix(bytes, w, h) {
        const pages = h / 8;
        const matrix = Array.from({ length: h }, () =>
            Array.from({ length: w }, () => 0)
        );
        let index = 0;
        for (let p = 0; p < pages; p++) {
            for (let x = 0; x < w; x++) {
                const byte = bytes[index++];
                for (let bit = 0; bit < 8; bit++) {
                    const y = p * 8 + bit;
                    if (y < h && (byte & (1 << bit))) {
                        matrix[y][x] = 1;
                    }
                }
            }
        } return matrix;}
    // ---------------------------------------------------------
    // --- ROWHEX ---
    parseTokens(raw) { return this.app.utils.parseTokens(raw); }
    detectRowHexDimensions(raw, tokens) { return this.app.utils.detectDimensions(raw, tokens); }
    tokensToMatrix(tokens, w, h) { return this.app.utils.tokensToMatrix(tokens, w, h); }
}
