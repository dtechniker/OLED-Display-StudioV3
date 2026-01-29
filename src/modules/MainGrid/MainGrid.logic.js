/* src/modules/maingrid/MainGrid.logic.js */

export class MainGridLogic {
    constructor(app) {
        this.app = app;
        // Feste OLED-Auflösung
        this.width = 128;
        this.height = 32;
    }
    // ---------------------------------------------------------
    // BASIC PIXEL OPERATIONS
    toggle(x, y) {
        const grid = this.app.grid.data;
        grid[y][x] ^= 1;
        return grid[y][x];
    }
    // ---------------------------------------------------------
    clear() {
        const grid = this.app.grid.data;
        for (let y = 0; y < this.height; y++) {
            grid[y].fill(0);
        }
    }
    // ---------------------------------------------------------
    setPixel(x, y, val) {
        const grid = this.app.grid.data;
        grid[y][x] = val ? 1 : 0;
        return grid[y][x];
    }
    // ---------------------------------------------------------
    getPixel(x, y) { return this.app.grid.data[y][x];}
    // ---------------------------------------------------------
    // COLUMN OPERATIONS
    toggleColumn(x) {
        const grid = this.app.grid.data;
        for (let y = 0; y < this.height; y++) {
            grid[y][x] ^= 1;
        }
    }
    // ---------------------------------------------------------
    setColumn(x, val) {
        const grid = this.app.grid.data;
        const v = val ? 1 : 0;
        for (let y = 0; y < this.height; y++) {
            grid[y][x] = v;
        }
    }
    // ---------------------------------------------------------
    // ROW OPERATIONS
    toggleRow(y) {
        const grid = this.app.grid.data;
        for (let x = 0; x < this.width; x++) {
            grid[y][x] ^= 1;
        }
    }
    // ---------------------------------------------------------
    setRow(y, val) {
        const grid = this.app.grid.data;
        const v = val ? 1 : 0;
        for (let x = 0; x < this.width; x++) {
            grid[y][x] = v;
        }
    }
    // ---------------------------------------------------------
    // BLOCK OPERATIONS (für Stempel, Füller, Tools)
    setBlock(x, y, pattern) {
        const grid = this.app.grid.data;
        const h = pattern.length;
        const w = pattern[0].length;
        for (let yy = 0; yy < h; yy++) {
            for (let xx = 0; xx < w; xx++) {
                const gx = x + xx;
                const gy = y + yy;
                if (gx < 0 || gy < 0 || gx >= this.width || gy >= this.height) {
                    continue;
                }
                grid[gy][gx] = pattern[yy][xx] ? 1 : 0;
            }
        }
    }
    // ---------------------------------------------------------
    getCurrentPattern() {
        const matrix = this.exportMatrix(); // liefert 2D-Array
        const hex = this.app.utils.patternToHex(matrix); // konvertiert zu HEX
        return {
            data: hex,
            grid: `${this.width}x${this.height}`
        };
    }
    // ---------------------------------------------------------
    // EXPORT (für Preview, Save, Templates)
    exportMatrix() { return this.app.grid.data.map(row => [...row]);}
}
