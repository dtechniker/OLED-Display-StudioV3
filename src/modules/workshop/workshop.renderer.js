/* src/modules/workshop/workshop.renderer.js */

import { ClassMap } from "../../ui/ClassMap.js";

export class WorkshopRenderer {
    constructor(app) { this.app = app;}

    // ---------------------------------------------------------
    // RENDER WORKSHOP (CARDS + MINI-GRIDS)
    render(config) {
        const dom = this.app.dom.workshop;
        dom.stdBlock.innerHTML = "";
        dom.specialBlock.innerHTML = "";

        config.forEach(conf => {
            const card = this.createCard(conf);
            if (conf.w === conf.h) {
                dom.stdBlock.appendChild(card);
            } else {
                dom.specialBlock.appendChild(card);
            }
        });
    }
    // ---------------------------------------------------------
    createCard(conf) {
        const card = document.createElement("div");
        card.classList.add(ClassMap.workshop.card);
        card.dataset.id = conf.id;
        // Tooltip
        card.addEventListener("mouseenter", () => { 
            if (!this.app.helpMode) return;                     // Nur im HelpMode aktiv
            this.app.info.show("w_" + conf.id);});
        card.addEventListener("mouseleave", () => { 
            if (!this.app.helpMode) return;                     // Nur im HelpMode aktiv
            this.app.info.show("ready");});
        // Label
        const label = document.createElement("span");
        label.textContent = `${conf.w}×${conf.h}`;
        card.appendChild(label);
        // Mini-Grid
        const grid = document.createElement("div");
        grid.classList.add(ClassMap.workshop.miniGrid);
        grid.style.gridTemplateColumns = `repeat(${conf.w}, ${conf.pxSize}px)`;
        card.appendChild(grid);
        this.renderMiniGrid(grid, conf);
        return card;
    }
    // ---------------------------------------------------------
    renderMiniGrid(grid, conf) {
        const state = this.app.workshop.logic.getState(conf.id);
        grid.innerHTML = "";                                            // wichtig bei Re-Render
        for (let y = 0; y < conf.h; y++) {
            for (let x = 0; x < conf.w; x++) {
                const px = document.createElement("div");
                px.classList.add(ClassMap.workshop.pixel);
                px.dataset.x = x;
                px.dataset.y = y;
                px.style.width = conf.pxSize + "px";
                px.style.height = conf.pxSize + "px";
                if (state.pixels[y][x] === 1) { px.classList.add("active");}
                grid.appendChild(px);
            }
        }
    }
    // ---------------------------------------------------------
    // RE-RENDER A FULL MINI-GRID (z. B. nach shift)
    rerenderGrid(conf) {
        const dom = this.app.dom.workshop;
        const card =
            dom.stdBlock.querySelector(`.${ClassMap.workshop.card}[data-id="${conf.id}"]`) ||
            dom.specialBlock.querySelector(`.${ClassMap.workshop.card}[data-id="${conf.id}"]`);
        if (!card) return;
        const grid = card.querySelector("." + ClassMap.workshop.miniGrid);
        this.renderMiniGrid(grid, conf);
    }
    // ---------------------------------------------------------
    updatePixel(confId, x, y) {
        const dom = this.app.dom.workshop;
        const card =
            dom.stdBlock.querySelector(`.${ClassMap.workshop.card}[data-id="${confId}"]`) ||
            dom.specialBlock.querySelector(`.${ClassMap.workshop.card}[data-id="${confId}"]`);
        if (!card) return;
        const grid = card.querySelector("." + ClassMap.workshop.miniGrid);
        const px = grid.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        if (!px) return;
        const val = this.app.workshop.logic.getPixel(confId, x, y);
        px.classList.toggle("active", val === 1);
    }
    // ---------------------------------------------------------
    activateCard(confId) {
        const dom = this.app.dom.workshop;
        dom.stdBlock.querySelectorAll("." + ClassMap.workshop.card)
            .forEach(c => c.classList.remove(ClassMap.workshop.active));
        dom.specialBlock.querySelectorAll("." + ClassMap.workshop.card)
            .forEach(c => c.classList.remove(ClassMap.workshop.active));
        const card =
            dom.stdBlock.querySelector(`.${ClassMap.workshop.card}[data-id="${confId}"]`) ||
            dom.specialBlock.querySelector(`.${ClassMap.workshop.card}[data-id="${confId}"]`);
        if (card) {
            card.classList.add(ClassMap.workshop.active);
        }
    }
}
