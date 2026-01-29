/* src/core/ErrorSystem.js */

/* --------------------------------------------------------- 
error   ->   this.app.error.error(""); *Console output
warning ->   this.app.warning("");
// ---------------------------------------------------------  */

export class ErrorSystem {
    constructor(app) {
        this.app = app;
        this.shownErrors = new Set();
    }

    _sanitize(msg) {
        if (msg == null) return "";
        if (typeof msg !== "string") return String(msg);
        return msg.replace(/null/g, "");
    }

    error(message, details = null) {
        const clean = this._sanitize(message);

        if (!this.shownErrors.has(clean)) {
            console.error("OLEDStudio Error:", clean, details ?? "");
            this.shownErrors.add(clean);
        }

        this.app.uiOutput.showError(clean);
    }

    warning(message) {
        this.app.uiOutput.showWarning(this._sanitize(message));
    }

    info(message) {
        this.app.uiOutput.showInfo(this._sanitize(message));
    }
}


