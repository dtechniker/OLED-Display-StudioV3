/* src/modules/workshop/workshop.manager.js */

import { WorkshopLogic } from "./workshop.logic.js";
import { WorkshopRenderer } from "./workshop.renderer.js";
import { ClassMap } from "../../ui/ClassMap.js";

export class WorkshopManager {
    constructor(app) {
        this.app = app;
        this.logic = new WorkshopLogic(app);
        this.renderer = new WorkshopRenderer(app);
        this.config = [
            { id: "g8",    w: 8,  h: 8,  scale:"g16", pxSize: 10 },
            { id: "g16",   w: 16, h: 16, scale:"g32", pxSize: 10 },
            { id: "g32",   w: 32, h: 32, scale:null, pxSize: 7  },
            { id: "g8x16", w: 8,  h: 16, scale:null, pxSize: 10 },
            { id: "g16x8", w: 16, h: 8,  scale:null, pxSize: 10 }
        ];
        this.activeId = null;
        this.isDrawing = false;                             // Drag-Draw State
        this.drawMode = null;                               // "on" | "off"
    }
    init() {
        this.config.forEach(conf => this.logic.createState(conf));
        this.renderer.render(this.config);
        this.bindScrollToggles();
        this.bindCardEvents();
        this.bindPixelEvents();
        this.activateFirst();
    }
    // --------------------------------------------------------- 
    getGridDescriptor(id) {
        const state = this.logic.getState(id);
        return {
            id,
            width: state.w,
            height: state.h,
            setPixel: (x, y, val) => this.logic.setPixel(id, x, y, val),
            updatePixel: (x, y) => this.renderer.updatePixel(id, x, y)
        };
    }
    // ---------------------------------------------------------
    setInGrid(template) {
        let [w, h] = template.grid.split("x").map(Number);
        const match = this.config.find(c => c.w === w && c.h === h);
        if (!match) {
            this.app.error.warning(this.app.s("err_works_Nogrid"));
            return;
        }
        this.setActive(match.id);
        this.logic.applyFullPattern(match.id, template.pattern);
        this.renderer.rerenderGrid(match);
    }
    // ---------------------------------------------------------
    // Auto Scroll Workshop-GRIDS
    bindScrollToggles() {
        const dom = this.app.dom.workshop;
        if (!dom.scrollArea || !dom.specialStart) return;
        if (dom.radioStd) {
            dom.radioStd.addEventListener("change", () => {
                if (dom.radioStd.checked) {
                    dom.scrollArea.scrollTo({
                        left: 0,
                        behavior: "smooth"
                    });
                }
            });
        }
        if (dom.radioSpecial) {
            dom.radioSpecial.addEventListener("change", () => {
                if (dom.radioSpecial.checked) {
                    dom.scrollArea.scrollTo({
                        left: dom.specialStart.offsetLeft,
                        behavior: "smooth"
                    });
                }
            });
        }
    }
    // ---------------------------------------------------------
    bindCardEvents() {
        const dom = this.app.dom.workshop;
        dom.container.addEventListener("click", e => {
            const card = e.target.closest("." + ClassMap.workshop.card);
            if (!card) return;
            this.setActive(card.dataset.id);
        });
    }
    // ---------------------------------------------------------
    bindPixelEvents() {
        const dom = this.app.dom.workshop;
        dom.container.addEventListener("mousedown", e => {
            const px = e.target.closest("." + ClassMap.workshop.pixel);
            if (!px) return;
            const card = px.closest("." + ClassMap.workshop.card);
            const id = card.dataset.id;
            const x = Number(px.dataset.x);
            const y = Number(px.dataset.y);
            if (e.button === 2) { e.preventDefault(); return; }
            if (this.app.state.stampActive) {
                e.preventDefault();
                this.app.stamp.apply(this.app.workshop.getGridDescriptor(id), x, y);
                return;
            }
            const newVal = this.logic.togglePixel(id, x, y);            // Erster Klick → toggeln
            this.renderer.updatePixel(id, x, y);     
            this.drawMode = newVal === 1 ? "on" : "off";                // Paint‑Modus merken
            this.isDrawing = true;
        });
        dom.container.addEventListener("mousemove", e => {
            if (!this.isDrawing) return;
            const px = e.target.closest("." + ClassMap.workshop.pixel);
            if (!px) return;
            const card = px.closest("." + ClassMap.workshop.card);
            const id = card.dataset.id;
            const x = Number(px.dataset.x);
            const y = Number(px.dataset.y);           
            const val = this.drawMode === "on" ? 1 : 0;                 // Beim Ziehen → NICHT toggeln, sondern setzen
            this.logic.setPixel(id, x, y, val);
            this.renderer.updatePixel(id, x, y);
        });
        window.addEventListener("mouseup", () => {
            this.isDrawing = false;
            this.drawMode = null;
        });
        dom.container.addEventListener("mouseleave", () => {
            this.isDrawing = false;
            this.drawMode = null;
        });
    }
    // ---------------------------------------------------------
    // ACTIVE CARD HANDLING
    activateFirst() {
        const dom = this.app.dom.workshop;
        const first = dom.stdBlock.querySelector("." + ClassMap.workshop.card);
        if (first) this.setActive(first.dataset.id);
    }
    // ---------------------------------------------------------
    setActive(id) {
        this.activeId = id;
        this.activeGridEl = document.querySelector(`[data-id="${id}"]`);    // DOM-Element des Grids holen
        this.renderer.activateCard(id);
    }
    // ---------------------------------------------------------
    // TOOL Funktions
    excecuteTool(action) {
        const id = this.activeId;
        const state = this.logic.getState(id);
        const grid = state.pixels;
        switch (action) {
            case "shift_up":   this.app.utils.shift(grid, 0, -1);  break;
            case "shift_down": this.app.utils.shift(grid, 0, 1);   break;
            case "shift_left": this.app.utils.shift(grid, -1, 0);  break;
            case "shift_right":this.app.utils.shift(grid, 1, 0);   break;
            case "invert":     this.app.utils.invert(grid);        break;
            case "mirror_h":   this.app.utils.mirrorH(grid);       break;
            case "mirror_v":   this.app.utils.mirrorV(grid);       break;
            case "rotate":     this.app.utils.rotate90(grid);      break;
            case "scale":      this.scaleActiveGrid();             break;
            case "stamp":      this.transferToStamp();             break;
            case "clear":      this.app.utils.clear(grid);         break;
            default:
                this.app.error.warning(`Workshop: Action '${action}' `+this.app.s("err_action_noDef"));
                return;
        }
        // Renderer aktualisieren
        const conf = this.config.find(c => c.id === id);
        this.renderer.rerenderGrid(conf);
    }
    // --------------------------------------------------------- 
    scaleActiveGrid() {
        const id = this.activeId;
        const conf = this.config.find(c => c.id === id);
        if (!conf.scale) {                                              // kein scale möglich?
            this.app.error.warning(this.app.s("w_warning_noscale"));
            return;
        }
        const targetId = conf.scale;
        const targetConf = this.config.find(c => c.id === targetId);
        const state = this.logic.getState(id);
        const grid = state.pixels;
        const scaled = this.app.utils.scale2(grid);
        const targetState = this.logic.getState(targetId);
        targetState.pixels = scaled;
        this.setActive(targetId);
        this.renderer.rerenderGrid(targetConf);
    }
    // --------------------------------------------------------- 
    transferToStamp() {
        const id = this.activeId;
        const state = this.logic.getState(id);
        const conf = this.config.find(c => c.id === id);
        const matrix = state.pixels.map(row => [...row]);
        const hex = this.app.utils.patternToHex(matrix);
        const pattern = {
            name: "__workshop_stamp__",
            data: hex,
            grid: `${conf.w}x${conf.h}`   // ← WICHTIG!
        };
        this.app.stamp.logic.setCurrentPattern(pattern);
        this.app.bindings.enterStampMode();
    }
    // ---------------------------------------------------------
    getActiveId() { return this.activeId; }
    // --------------------------------------------------------- 
    getActiveState() { return this.logic.getState(this.activeId);}
    // --------------------------------------------------------- 
    getPattern(id = this.activeId) { return this.logic.getState(id).pixels;}
}
