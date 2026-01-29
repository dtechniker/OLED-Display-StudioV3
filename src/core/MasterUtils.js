/* src/core/MasterUtils.js */

/* --------------------------------------------------------- 
    GLOBALE FUNKTION
// ---------------------------------------------------------  */

export class MasterUtils {
    constructor(app) {
        this.app = app;
    }
    // ---------------------------------------------------------
    // IMPORT: Token Parsing
    parseTokens(raw) {
        return raw.match(/(0x[0-9A-Fa-f]{2}|0b[01]{8})/g) || [];
    }
    // ---------------------------------------------------------
    // IMPORT: Dimensionserkennung
    detectDimensions(raw, tokens) {
        const dimMatch = raw.match(/(\d+)x(\d+)/);
        if (dimMatch) {
            return {
                w: parseInt(dimMatch[1], 10),
                h: parseInt(dimMatch[2], 10)
            };
        }
        if (tokens.length <= 8)        return { w: 8,  h: 8  };
        if (tokens.length <= 32)       return { w: 16, h: 16 };
        if (tokens.length <= 128)      return { w: 32, h: 32 };
        return { w: 128, h: 32 };
    }
    // ---------------------------------------------------------
    // IMPORT: Tokens → Matrix
    tokensToMatrix(tokens, w, h) {
        const matrix = Array.from({ length: h }, () =>
            Array.from({ length: w }, () => 0)
        );
        const bytesPerRow = Math.ceil(w / 8);
        tokens.forEach((token, idx) => {
            const val = token.startsWith("0x")
                ? parseInt(token, 16)
                : parseInt(token.substring(2), 2);
            const row = Math.floor(idx / bytesPerRow);
            const colInRow = idx % bytesPerRow;
            for (let bit = 0; bit < 8; bit++) {
                const x = colInRow * 8 + bit;
                const y = row;
                if (x < w && y < h) {
                    matrix[y][x] = (val >> (7 - bit)) & 1;
                }
            }
        }); return matrix;
    }
    // ---------------------------------------------------------
    // miniPreview standard size = 32
    miniPreview(pattern, size = 32) {
        const color = getComputedStyle(document.documentElement)
            .getPropertyValue('--accent')
            .trim();
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        const rows = pattern.length;
        const cols = pattern[0].length;
        const cellSize = size / Math.max(rows, cols);
        ctx.clearRect(0, 0, size, size);
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (pattern[y][x] === 1) {
                    ctx.fillStyle = color;                      // Theme‑Farbe
                    ctx.fillRect(
                        x * cellSize,
                        y * cellSize,
                        cellSize,
                        cellSize
                    );
                }
            }
        } return canvas;
    }
    // ---------------------------------------------------------
    // hexToPattern
    hexToPattern(hexString, grid) {
        const [w, h] = grid.split("x").map(Number);
        const bytes = hexString.split(",").map(v => parseInt(v, 16));
        const pattern = [];
        let row = [];
        for (let i = 0; i < bytes.length; i++) {
            const byte = bytes[i];
            for (let bit = 7; bit >= 0; bit--) {
                const pixel = (byte >> bit) & 1;
                row.push(pixel);
                if (row.length === w) {
                    pattern.push(row);
                    row = [];
                }
            }
        } return pattern;
    }
    // ---------------------------------------------------------
    // patternToHex
    patternToHex(matrix) {
        const h = matrix.length;
        const w = matrix[0].length;
        const bytesPerRow = w / 8;
        const hexParts = [];
        for (let y = 0; y < h; y++) {
            const row = matrix[y];
            for (let b = 0; b < bytesPerRow; b++) {
                let byteValue = 0;

                for (let bit = 0; bit < 8; bit++) {
                    const pixel = row[b * 8 + bit] ? 1 : 0;
                    byteValue = (byteValue << 1) | pixel;
                }
                hexParts.push(byteValue.toString(16).padStart(2, "0"));
            }
        } return hexParts.join(",");
    }
    // ---------------------------------------------------------
    rgbToHex(rgb) {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
    }
    // ---------------------------------------------------------
    // TOOL Funktions
    shift(pattern, dx, dy) {
        const rows = pattern.length;
        const cols = pattern[0].length;
        const newPattern = Array.from({ length: rows }, () =>  // Neues leeres Grid
            Array(cols).fill(0)
        );
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (pattern[y][x] === 1) {
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {// Nur setzen, wenn innerhalb des Grids
                        newPattern[ny][nx] = 1;
                    }
                }
            }
        }
        for (let y = 0; y < rows; y++) {// Original überschreiben
            pattern[y] = newPattern[y];
        } return pattern;
    }
    // ---------------------------------------------------------
    invert(pattern) {
        const rows = pattern.length;
        const cols = pattern[0].length;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                pattern[y][x] = pattern[y][x] ? 0 : 1;
            }
        }
    }
    // ---------------------------------------------------------
    clear(pattern) {
        const rows = pattern.length;
        const cols = pattern[0].length;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                pattern[y][x] = 0;
            }
        }
    }
    // ---------------------------------------------------------
    mirrorH(pattern) {
        const rows = pattern.length;
        const cols = pattern[0].length;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols / 2; x++) {
                const opposite = cols - 1 - x;
                [pattern[y][x], pattern[y][opposite]] =
                    [pattern[y][opposite], pattern[y][x]];
            }
        }
    }
    // ---------------------------------------------------------
    mirrorV(pattern) {
        const rows = pattern.length;
        const cols = pattern[0].length;
        for (let y = 0; y < rows / 2; y++) {
            const opposite = rows - 1 - y;
            [pattern[y], pattern[opposite]] =
                [pattern[opposite], pattern[y]];
        }
    }
    // ---------------------------------------------------------
    rotate90(pattern) {
        const rows = pattern.length;
        const cols = pattern[0].length;
        const copy = pattern.map(row => [...row]);
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const srcY = rows - 1 - x;
                const srcX = y;
                if (srcY >= 0 && srcY < rows && srcX >= 0 && srcX < cols) {
                    pattern[y][x] = copy[srcY][srcX];
                } else {
                    pattern[y][x] = 0; // abgeschnitten → leer
                }
            }
        }
    }
    // ---------------------------------------------------------
    scale2(pattern) {
        const rows = pattern.length;
        const cols = pattern[0].length;
        const scaled = Array.from({ length: rows * 2 }, () =>
            Array(cols * 2).fill(0)
        );
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const v = pattern[y][x];
                const sy = y * 2;
                const sx = x * 2;
                scaled[sy][sx] = v;
                scaled[sy][sx + 1] = v;
                scaled[sy + 1][sx] = v;
                scaled[sy + 1][sx + 1] = v;
            }
        } return scaled;}
}
