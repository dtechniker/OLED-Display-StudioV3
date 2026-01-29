/* src/core/InfoSystem.js */

export class InfoSystem {
    constructor(app) {
        this.app = app;
        this.locked = false;
    }
    // ---------------------------------------------------------
    lock(key) { this.locked = true; this.lockKey = key; }
    unlock() { this.locked = false; this.lockKey = null;}
    // ---------------------------------------------------------
    show(action = "ready") {
        try {
            if (this.locked && action !== this.lockKey) { return;}
            let tip = this.app.lang.getTooltip(action);
            if (!tip) {
                tip = this.app.lang.getTooltip("info_missing");
                if (!tip) return;
            }
            let iconHTML = "";                                              // ICON ERKENNUNG
            const btn = document.querySelector(`[data-action="${action}"]`);
            if (btn) {
                const iconEl = btn.querySelector("i");
                if (iconEl) {
                    iconHTML = iconEl.outerHTML;                            // HTML des Icons
                }
            }
            const output = iconHTML
                ? `${iconHTML} :  ${tip.d}`                                   // Icon vorhanden
                : `${tip.t} :  ${tip.d}`;                                     // Kein Icon vorhanden

            this.app.uiOutput.showInfo(output);
            this.app.state.activeTool = action;
        } catch (err) {
            this.app.error.error("InfoSystem Error: " + err.message);
        }
    }

}
