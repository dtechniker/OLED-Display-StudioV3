/* src/modules/maingrid/MainGrid.manager.js */

import { MainGridLogic } from "./MainGrid.logic.js";
import { MainGridRenderer } from "./MainGrid.renderer.js";
import { ClassMap } from "../../ui/ClassMap.js";

export class MainGridManager {
    constructor(app) {
        this.app = app;
        this.data = null;                                   // wird später gefüllt
        this.logic = new MainGridLogic(app);
        this.renderer = new MainGridRenderer(app);
        this.isDrawing = false;                             // Drag-Draw State
        this.drawMode = null;                               // "on" | "off"
    }
    init() {
        this.initGrid(128, 32); // Daten erzeugen
        this.renderer.renderGrid();
        this.bindEvents();
    }
    // ---------------------------------------------------------
    getGridDescriptor() {
        return {
            id: null,
            width: this.logic.width,
            height: this.logic.height,
            setPixel: (x, y, val) => this.logic.setPixel(x, y, val),
            updatePixel: (x, y) => this.renderer.updatePixel(x, y)
        };
    }
    initGrid(width, height) { this.data = Array.from({ length: height }, () => Array(width).fill(0) );}
    // ---------------------------------------------------------
    bindEvents() {
        const grid = this.app.dom.mainGrid.grid;
        grid.addEventListener("mousedown", e => {
            const px = e.target.closest("." + ClassMap.pixel.main);
            if (!px) return;
            const x = Number(px.dataset.x);
            const y = Number(px.dataset.y);
            if (e.button === 2) { e.preventDefault(); return;}          // Rechtsklick → NIE malen             
            if (this.app.state.stampActive) {                           // Stempelmodus → Stempel anwenden
                e.preventDefault();
                this.app.stamp.apply(this.app.grid.getGridDescriptor(), x, y);
                return;
            }
            const newVal = this.logic.toggle(x, y);
            this.renderer.updatePixel(x, y);
            this.isDrawing = true;
            this.drawMode = newVal === 1 ? "on" : "off";
        });     
        grid.addEventListener("mousemove", e => {                       // MOUSEMOVE → Drag‑Drawing
            if (!this.isDrawing) return;
            const px = e.target.closest("." + ClassMap.pixel.main);
            if (!px) return;
            const x = Number(px.dataset.x);
            const y = Number(px.dataset.y);
            const val = this.drawMode === "on" ? 1 : 0;
            this.logic.setPixel(x, y, val);
            this.renderer.updatePixel(x, y);
        });       
        document.addEventListener("mouseup", () => {                    // MOUSEUP → Drawing stoppen
            this.isDrawing = false;
            this.drawMode = null;
        });        
        const { chk8, chk16, chk32 } = this.app.dom.mainGrid;           // Raster-Checkboxen
        chk8.addEventListener("change", () => this.renderer.renderGridBorders());
        chk16.addEventListener("change", () => this.renderer.renderGridBorders());
        chk32.addEventListener("change", () => this.renderer.renderGridBorders());
    }
    // ---------------------------------------------------------
    // TOOL Funktions
    excecuteTool(action, payload){
        const grid = this.app.grid.data; 
        switch (action) {
            case "shift_up": this.app.utils.shift(grid, 0, -1); break;
            case "shift_down": this.app.utils.shift(grid, 0, 1); break;
            case "shift_left": this.app.utils.shift(grid, -1, 0); break;
            case "shift_right": this.app.utils.shift(grid, 1, 0); break;        
            case "invert": this.app.utils.invert(grid); break;
            case "clear": this.app.utils.clear(grid); break;
            case "TxtStamp": this.openTxtStamp(grid); break;
            default:
                this.app.error.warning(`MainGrid: Action '${action}' `+this.app.s("err_action_noDef"));
        }
        this.app.grid.renderer.renderGrid();
    }
    // ---------------------------------------------------------
    // PUBLIC API (für Tools, Stempel, Workshop)
    setPixel(x, y, val) {
        this.logic.setPixel(x, y, val);
        this.renderer.updatePixel(x, y);
    }
    // ---------------------------------------------------------
    togglePixel(x, y) {
        this.logic.toggle(x, y);
        this.renderer.updatePixel(x, y);
    }
    // ---------------------------------------------------------
    applyPattern(x, y, pattern) {
        this.logic.setBlock(x, y, pattern);
        this.renderer.renderGrid();                                 // komplette Aktualisierung
    }
    // ---------------------------------------------------------
    clear() {
        this.logic.clear();
        this.renderer.renderGrid();
    }
    // ---------------------------------------------------------
    openTxtStamp() {
        const text = prompt(this.app.td("m_TxtStamp"));
        if (!text || text.trim() === "") return;
        this.app.stamp.enterTextStampMode(text);
    }



}
