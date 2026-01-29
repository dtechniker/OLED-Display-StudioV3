/* src/modules/import/import.renderer.js */

export class ImportRenderer {
    constructor(app) {
        this.app = app; 
        this.dom = app.dom.import; // ← exakt wie MainGridRenderer
    }
    // ---------------------------------------------------------
    getRawInput() { return this.dom.input.value;}
    // --------------------------------------------------------- 
    clearInput() { this.dom.input.value = "";}
    // ---------------------------------------------------------
    showError(msg) { alert(msg);}
    // ---------------------------------------------------------
    showSuccess(w, h) { /*console.log(`Import erfolgreich: ${w}x${h}`)*/;}
}
