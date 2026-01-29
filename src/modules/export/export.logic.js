/* src/modules/export/export.logic.js */

export class ExportLogic {
    constructor(app) { this.app = app;}
    // ---------------------------------------------------------
    // export PRE Filter
    export(matrix, grid, format, asciiCfg) {
        switch (format) {
            case "adafruit_gfx":
            case "cpp_binary":
                return this.exportAdafruitOrBinary(matrix, grid, format);
            case "ssd1306_native":
                return this.exportSSD1306(matrix, grid);
            case "visual_art":
                return this.exportAscii(matrix, asciiCfg);
            default:
                return { output: this.app.s("im_alert_Import"), bytesCount: 0 };          // Unknown format
        }
    }
    // ---------------------------------------------------------
    exportAdafruitOrBinary(matrix, grid, format) {
        const h = matrix.length;
        const w = matrix[0].length;
        const bytesPerRow = Math.ceil(w / 8);
        const data = [];
        for (let y = 0; y < h; y++) {
            for (let b = 0; b < bytesPerRow; b++) {
                let byte = 0;
                let bin = "0b";
                for (let bit = 0; bit < 8; bit++) {
                    const x = b * 8 + bit;
                    if (x < w && matrix[y][x] === 1) {
                        byte |= (0x80 >> bit);
                        bin += "1";
                    } else { bin += "0"; }
                }
                if (format === "adafruit_gfx") {
                    data.push("0x" + byte.toString(16).padStart(2, "0").toUpperCase());
                } else { data.push(bin); }
            }
        }
        const output =
            `// ${format === "adafruit_gfx" ? "HEX Array" : "Binary Array"} (${w}x${h}) Horizontal (Adafruit GFX)\n` +
            `const unsigned char bitmap_${w}x${h}[] PROGMEM = {\n` +
            `  ${data.join(", ")}\n` +
            `};`;
        return { output, bytesCount: data.length };
    }
    // ---------------------------------------------------------
    exportAscii(matrix, cfg) {
        const h = matrix.length;
        const w = matrix[0].length;
        const lines = matrix.map(row =>
            "   " + row.map(px => (px ? cfg.on : cfg.off)).join("")
        );
        const output =
            `/* Visual Preview (${w}x${h})\n` +
            lines.join("\n") +
            `\n*/`;
        return { output, bytesCount: w * h };
    }
    // ---------------------------------------------------------
    exportSSD1306(matrix, grid) {
    const h = matrix.length;
    const w = matrix[0].length;
    const pages = Math.ceil(h / 8);
    const lines = [];
    for (let p = 0; p < pages; p++) {
        const row = [];
        for (let x = 0; x < w; x++) {
            let byte = 0;
            for (let bit = 0; bit < 8; bit++) {
                const y = p * 8 + bit;
                if (y < h && matrix[y][x] === 1) { byte |= (1 << bit); }
            }
            row.push("0x" + byte.toString(16).padStart(2, "0").toUpperCase());
        }
        lines.push("  " + row.join(", "));
    }
    const output =
        `// Native SSD1306 Buffer Format (Vertical)\n` +
        `const unsigned char bitmap_${w}x${h}[] PROGMEM = {\n` +
        lines.join(",\n") + "\n" +
        `};`;
    return { output, bytesCount: w * pages };
    }

}
