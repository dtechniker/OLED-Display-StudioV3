/* src/ui/UiOutput.js */

import { ClassMap } from "./ClassMap.js";

export class UiOutput {
    constructor(app) {
        this.app = app;
        this.locked = false;        
        this.errorBox = document.createElement("div");                          // Error-Box (dynamisch erzeugt)
        this.errorBox.classList.add(
            ClassMap.ui_classes.errorBox,
            ClassMap.ui_classes.fade
        );
        this.errorInner = document.createElement("div");
        this.errorInner.classList.add(ClassMap.ui_classes.errorInner);
        this.errorBox.appendChild(this.errorInner);
        this.app.dom.header.root.appendChild(this.errorBox);
        this.app.dom.errorBox = this.errorBox;                                  // Dynamisch in DomMap registrieren
        this.app.dom.errorInner = this.errorInner;
    }
    lock(key) { this.locked = true; this.lockKey = key; }
    unlock() { this.locked = false; this.lockKey = null; }
    // ---------------------------------------------------------
    // Sprache anwenden
    applyLanguage(langSystem) {
        document.querySelectorAll("[data-lang]").forEach(el => {
            const key = el.dataset.lang;
            const txt = langSystem.get(key) || langSystem.data.tp_fallback_desc;
            const span = el.querySelector(".panelTitle_text");
            if (span) { span.textContent = txt; return; }
            el.textContent = txt;
        });
        document.querySelectorAll("[data-action]").forEach(btn => {
            const action = btn.dataset.action;
            const tip = langSystem.getTooltip(action);
            btn.title = tip ? tip.t : langSystem.data.tp_fallback_title;
        });
        document.querySelectorAll("input[type='checkbox']").forEach(chk => {
            const key = chk.id + "_title";
            const txt = langSystem.get(key);
            chk.title = txt || langSystem.data.tp_fallback_title;
        });
        document.querySelectorAll("input[type='radio']").forEach(rad => {
            const key = rad.id + "_title";
            const txt = langSystem.get(key);
            rad.title = txt || langSystem.data.tp_fallback_title;
        });
    }
    // ---------------------------------------------------------
    // Fehler/Warnung/Info (animiert)
    _show(type, html) {
        clearTimeout(this.hideTimer);
        // Kein Flackern, wenn Text gleich bleibt
        if (this.lastText === html && this.lastType === type) {
            return;
        }
        this.lastText = html;
        this.lastType = type;
        // Klassen zurücksetzen
        this.errorBox.classList.remove(
            ClassMap.ui_classes.show,
            ClassMap.ui_classes.isError,
            ClassMap.ui_classes.isWarning,
            ClassMap.ui_classes.isInfo
        );
        // Typ setzen
        this.errorBox.classList.add(
            type === "error"   ? ClassMap.ui_classes.isError   :
            type === "warning" ? ClassMap.ui_classes.isWarning :
                                 ClassMap.ui_classes.isInfo
        );
        // HTML statt TextContent
        this.errorInner.innerHTML = html;
        // Animation nur starten, wenn Box gerade NICHT sichtbar ist
        if (!this.errorBox.classList.contains(ClassMap.ui_classes.show)) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.errorBox.classList.add(ClassMap.ui_classes.show);
                });
            });
        }
        // Auto-Hide nur wenn NICHT im HelpMode
        if (!this.app.helpMode && !this.app.info.locked) {
            this.hideTimer = setTimeout(() => {
                this.errorBox.classList.remove(ClassMap.ui_classes.show);
            }, 4000);
        }

    }
    hideNow() {
    clearTimeout(this.hideTimer);
    this.lastText = "";
    this.lastType = "";

    // Sofort ausblenden
    this.errorBox.classList.remove(ClassMap.ui_classes.show);

    // Optional: Inhalt leeren
    this.errorInner.innerHTML = "";
}

    showError(text)   { this._show("error", text); }
    showWarning(text) { this._show("warning", text); }
    showInfo(text)    { this._show("info", text); }
}
