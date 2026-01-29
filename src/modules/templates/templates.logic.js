/* src/modules/templates/templates.logic.js */

export class TemplatesLogic {
    constructor(app) {
        this.app = app;
        this.templates = [];
    }
    // ---------------------------------------------------------
    loadTemplates(data) {
        this.templates = data.map(t => ({ ...t, pattern: this.app.utils.hexToPattern(t.data, t.grid) }));
    }
    // ---------------------------------------------------------
    getTemplateByName(name) { return this.templates.find(t => t.name === name);}
    // ---------------------------------------------------------
    filterByGrids(grids) {
        // grids = ["8x8", "16x16", "32x32"] oder []
        if (!grids || grids.length === 0) {
            return this.templates; // keine Filter → alle
        }
        return this.templates.filter(t => grids.includes(t.grid));
    }

}
