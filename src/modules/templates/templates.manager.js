/* src/modules/templates/templates.manager.js */

import { TemplatesLogic } from "./templates.logic.js";
import { TemplatesRenderer } from "./templates.renderer.js";
import { templatesData } from "./templates.data.js";
import { ClassMap } from "../../ui/ClassMap.js";

export class TemplatesManager {
    constructor(app) {
        this.app = app;
        this.logic = new TemplatesLogic(app);
        this.renderer = new TemplatesRenderer(app);
    }
    init() {
        this.logic.loadTemplates(templatesData);
        this.renderer.renderTemplateList(this.logic.templates);
        this.addLoadButtons();
    }
    // ---------------------------------------------------------
    addLoadButtons() {
        this.logic.templates.forEach(t => {
            const el = this.app.dom.templates.list.querySelector(`[data-name="${t.name}"]`);
            if (!el) return;
            const btns = el.querySelector(".t_btns");
            if (!btns) return;
            const btn = document.createElement("button");
            btn.className = ClassMap.templates.t_btn_load;
            btn.title = this.app.s("t_toworkshop_desc");
            btn.dataset.help = "t_toworkshop";
            btn.dataset.action = "t_toworkshop";
            btn.dataset.payload = t.name;
            btn.innerHTML = `<i class="fa fa-qrcode"></i>`;
            btns.appendChild(btn);
        });
    }
    // ---------------------------------------------------------
    loadIntoWorkshop(t) {
        //Passendes Workshop‑Grid finden
        const match = this.app.workshop.config.find(c =>
            c.w === t.grid.w && c.h === t.grid.h
        );
        if (!match) {
            this.app.error.warning(this.app.s("err_works_Nogrid"));
            return;
        }
        const cardId = match.id;
        this.app.workshop.setActive(cardId);
        const grid = this.app.workshop.getGridDescriptor(cardId);
        this.app.stamp.apply(grid, 0, 0);
    }
    // ---------------------------------------------------------
    applyFilter() {
        const dom = this.app.dom.templates;
        const grids = [];
        if (dom.filt8.checked)  grids.push("8x8");
        if (dom.filt16.checked) grids.push("16x16");
        if (dom.filt32.checked) grids.push("32x32");
        const filtered = this.logic.filterByGrids(grids);
        this.renderer.renderTemplateList(filtered);
    }
    // ---------------------------------------------------------
    getTemplateByName(name) {
        return this.logic.templates.find(t => t.name === name) || null;
    }


}
