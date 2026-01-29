/* src/modules/templates/templates.renderer.js */

import { ClassMap } from "../../ui/ClassMap.js";

export class TemplatesRenderer {
    constructor(app) {
        this.app = app;
    }
    // ---------------------------------------------------------
    renderTemplateList(templates) {
        const container = this.app.dom.templates.list;
        container.innerHTML = "";
        templates.forEach(t => {
            const el = this.createTemplateItem(t);     
            const previewBox = el.querySelector("." + ClassMap.templates.preview);      // Mini‑Preview einfügen
            const canvas = this.app.utils.miniPreview(t.pattern, 32);
            previewBox.appendChild(canvas);
            container.appendChild(el);
        });
    }
    // ---------------------------------------------------------
    createTemplateItem(template) {
        const el = document.createElement("div");
        el.className = ClassMap.templates.template_item;
        el.dataset.name = template.name;
        const colors = { "8x8": "colorC2", "16x16": "colorC1", "32x32": "colorC3" }; 
        const colorClass = colors[template.grid] || "colorC2";
        el.innerHTML = `
            <div class="${ClassMap.templates.preview}"></div>
            <div class="${ClassMap.templates.t_info}">
                <span class="${ClassMap.templates.t_name}">${template.name}</span>
                <div class="${ClassMap.templates.t_btns}"></div>
            </div>
            <span class="${ClassMap.templates.t_size} ${colorClass}">${template.grid}</span>
        `;
        return el;
    }
}
