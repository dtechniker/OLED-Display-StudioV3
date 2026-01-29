/* src/core/LangSystem.js */

/* --------------------------------------------------------- 
Text  ->   s(key);   [ "X" ]                    // normaler String
Text  ->   t(key);   [ key:{ t: "X", d: "" } ]  // Tooltip title (kurz)
Text  ->   td(key);   [ key:{ t: "", d: "X" } ] // Tooltip description (lang)
// ---------------------------------------------------------  */

import { LANG_DE } from "../lang/de.js";
import { LANG_EN } from "../lang/en.js";
import { LANG_ES } from "../lang/es.js";
import { LANG_FR } from "../lang/fr.js";
import { LANG_KLINGON } from "../lang/tlh.js";

export class LangSystem {
    constructor(app) {
        this.app = app;
        this.languages = {
            de: LANG_DE,
            en: LANG_EN,
            es: LANG_ES,
            fr: LANG_FR,
            tlh: LANG_KLINGON
        };
        this.supported = Object.keys(this.languages);
        this.current = null;
        this.data = null;
    }
    // ---------------------------------------------------------
    // SPRACHE MANUELL SETZEN
    set(lang) {
        if (!this.supported.includes(lang)) {
            this.app.error.error(`Language Error: Unsupported language '${lang}'`);
            return;
        }
        this.load(lang);
        try {
            localStorage.setItem("forceLang", lang);
        } catch (e) {
            // localStorage unavailable → einfach ignorieren
        }
        this.app.uiOutput.applyLanguage(this);
        const credits = document.getElementById("creditsLink");
        if (credits) {
        const map = {
            de: "lang/credits_de.html",
            en: "credits_en.html",
            fr: "lang/credits_fr.html",
            es: "lang/credits_es.html",
            tlh: "lang/credits_tlh.html"
        };
        credits.href = map[lang] || map.en; // Fallback: Englisch
        }
    }
    // ---------------------------------------------------------
    detectBrowserLanguage() {
        const raw = navigator.languages?.[0] || navigator.language || "en";
        return raw.split("-")[0].toLowerCase();
    }
    // ---------------------------------------------------------
    load(lang) {
        this.current = lang;
        this.data = this.languages[lang];
    }
    // ---------------------------------------------------------
    getTooltip(action) {
        if (!action) {
            this.app.error.error("Language Error: Empty tooltip action requested");
            return null;
        }
        // 1) TOOLTIP vorhanden?
        const tip = this.data.tooltips[action];
        if (tip) {
            return tip;
        }
        // 2) NORMALER STRING vorhanden?
        const title = this.data[action];
        const desc  = this.data[action + "_desc"];
        if (title || desc) {
            return {
                t: title || this.data.tp_fallback_title,
                d: desc  || ""
            };
        }
        // 3) FALLBACK
        this.app.error.error(`Language Warning: No tooltip or string found for '${action}'`);
        return {
            t: this.data.tp_fallback_title, d: this.data.tp_fallback_desc };
    }
    // ---------------------------------------------------------
    get(key) {
        if (!key) {
            this.app.error.error("Language Error: Empty key requested");
            return null;
        }

        let value = null;

        if (key.includes(".")) {
            value = key.split(".").reduce((obj, part) => obj?.[part], this.data) || null;
        } else {
            value = this.data[key] || null;
        }

        if (value === null) {
            this.app.error.error(`Language Error: Key '${key}' not found`);
        }

        return value;
    }
    // ---------------------------------------------------------
    init() {
        let forced = null;
        try {
            forced = localStorage.getItem("forceLang");
        } catch (e) {
            forced = null;
        }
        const browser = this.detectBrowserLanguage();
        const chosen = forced || browser;
        const finalLang = this.supported.includes(chosen) ? chosen : "en";
        this.load(finalLang);
        try {
            localStorage.setItem("forceLang", finalLang);
        } catch (e) {
            // localStorage unavailable → ignorieren
        }
        this.app.uiOutput.applyLanguage(this);
    }

    // ---------------------------------------------------------
    s(key) { return this.get(key); }                                            // normaler String
    t(key) { const tip = this.getTooltip(key); return tip ? tip.t : ""; }       // Tooltip title (kurz)
    td(key) { const tip = this.getTooltip(key); return tip ? tip.d : ""; }      // Tooltip description (lang)
}
