/* src/modules/maingrid/MainGrid.renderer.js */

import { ClassMap } from "../../ui/ClassMap.js";

export class MainGridRenderer {
    constructor(app) { this.app = app;}

    // ---------------------------------------------------------
    // MAIN GRID RENDERING
    renderGrid() {
        const root = this.app.dom.mainGrid.grid;
        const data = this.app.grid.data;
        const logic = this.app.grid.logic;
        root.innerHTML = "";
        for (let y = 0; y < logic.height; y++) {
            for (let x = 0; x < logic.width; x++) {
                const px = document.createElement("div");
                px.classList.add(ClassMap.pixel.main);
                px.dataset.x = x;
                px.dataset.y = y;
                if (data[y][x] === 1) {
                    px.classList.add("active");
                }
                root.appendChild(px);
            }
        }
        this.renderAxis();
        this.renderGridBorders();
        this.updatePreview();
    }
    // ---------------------------------------------------------
    // UPDATE SINGLE PIXEL
    updatePixel(x, y) {
        const root = this.app.dom.mainGrid.grid;
        const px = root.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        if (!px) return;
        const val = this.app.grid.data[y][x];
        px.classList.toggle("active", val === 1);
        this.updatePreview();
    }
    // ---------------------------------------------------------
    // AXIS RENDERING
    renderAxis() {
        const cols = this.app.dom.mainGrid.colHeaders;
        const rows = this.app.dom.mainGrid.rowHeaders;
        const logic = this.app.grid.logic;
        const width  = logic.width;
        const height = logic.height;
        cols.innerHTML = "";
        rows.innerHTML = "";
        for (let x = 0; x < width; x++) {                       // Spalten
            const d = document.createElement("div");
            d.classList.add(ClassMap.header.cell);
            d.style.left = (x * 8) + "px";
            d.style.width = "8px";
            d.innerText = (x % 10 === 0) ? x : "·";
            d.addEventListener("click", () => {
                this.app.grid.logic.toggleColumn(x);
                this.updateColumn(x);
            });
            cols.appendChild(d);
        }
        for (let y = 0; y < height; y++) {                      // Zeilen
            const d = document.createElement("div");
            d.classList.add(ClassMap.header.cell);
            d.style.top = (y * 8) + "px";
            d.style.height = "8px";
            d.innerText = (y % 8 === 0) ? y : "·";
            d.addEventListener("click", () => {
                this.app.grid.logic.toggleRow(y);
                this.updateRow(y);
            });
            rows.appendChild(d);
        }
    }
    // ---------------------------------------------------------
    // UPDATE COLUMN
    updateColumn(x) {
        const root = this.app.dom.mainGrid.grid;
        const data = this.app.grid.data;
        const logic = this.app.grid.logic;
        for (let y = 0; y < logic.height; y++) {
            const px = root.querySelector(`[data-x="${x}"][data-y="${y}"]`);
            if (!px) continue;
            px.classList.toggle("active", data[y][x] === 1);
        }
        this.updatePreview();
    }
    // ---------------------------------------------------------
    // UPDATE ROW
    updateRow(y) {
        const root = this.app.dom.mainGrid.grid;
        const data = this.app.grid.data;
        const logic = this.app.grid.logic;
        for (let x = 0; x < logic.width; x++) {
            const px = root.querySelector(`[data-x="${x}"][data-y="${y}"]`);
            if (!px) continue;

            px.classList.toggle("active", data[y][x] === 1);
        }
        this.updatePreview();
    }
    // ---------------------------------------------------------
    // PREVIEW CANVAS (jetzt korrekt aus DATA, nicht DOM)
    updatePreview() {
        const colorClr = getComputedStyle(this.app.dom.preview.canvas).backgroundColor; 
        const colorAkt =getComputedStyle(this.app.dom.header.root).getPropertyValue("--accent").trim();
        const ctx = this.app.dom.preview.ctx;
        if (!ctx) return;
        const data = this.app.grid.data;
        const logic = this.app.grid.logic;
        ctx.fillStyle = colorClr;
        ctx.fillRect(0, 0, logic.width, logic.height);
        ctx.fillStyle = colorAkt;
        for (let y = 0; y < logic.height; y++) {
            for (let x = 0; x < logic.width; x++) {
                if (data[y][x] === 1) {
                    ctx.fillRect(x, y, 1, 1);
                }
            }
        }
    }
    // ---------------------------------------------------------
    // RENDER GRID BORDERS (8/16/32)
    renderGridBorders() {
        const { chk8, chk16, chk32, grid } = this.app.dom.mainGrid;
        const logic = this.app.grid.logic;
        const width  = logic.width;
        const height = logic.height;
        const pixels = grid.querySelectorAll("." + ClassMap.pixel.main);   
        const colorClr = getComputedStyle(grid).getPropertyValue("--base-border-color").trim();
        const color8 = getComputedStyle(chk8).color;
        const color16 = getComputedStyle(chk16).color;
        const color32 = getComputedStyle(chk32).color;
        grid.style.border = "1px solid "+colorClr;                      // Basis-Rahmen
        const active = [];                                              // Aktive Raster sammeln
        if (chk8.checked)  active.push({ size: 8,  color: color8 });
        if (chk16.checked) active.push({ size: 16, color: color16 });
        if (chk32.checked) active.push({ size: 32, color: color32 });
        if (active.length === 0) {                                      // Wenn kein Raster aktiv → Reset
            pixels.forEach(px => {
                px.style.borderRightColor = colorClr;
                px.style.borderBottomColor = colorClr;
            });
            return;}
        // Rahmenfarbe nach Priorität
        if (chk8.checked)  grid.style.border = "1px solid "+color8;
        if (chk16.checked) grid.style.border = "1px solid "+color16;
        if (chk32.checked) grid.style.border = "1px solid "+color32;
        pixels.forEach(px => {                                          // Reset
            px.style.borderRightColor = colorClr;
            px.style.borderBottomColor = colorClr;
        });
        pixels.forEach(px => {                                          // Rasterlinien setzen
            const x = Number(px.dataset.x);
            const y = Number(px.dataset.y);
            active.forEach(({ size, color }) => {
                if ((x + 1) % size === 0 && x !== width - 1) { px.style.borderRightColor = color; }
                if ((y + 1) % size === 0 && y !== height - 1) { px.style.borderBottomColor = color; }
                if (x % size === 0) { px.style.borderLeftColor = color; }
                if (y % size === 0) { px.style.borderTopColor = color; }
            });
        });
    }

}

