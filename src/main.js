document.documentElement.classList.remove("no-js"); // JS-Warnung entfernen

import { App } from "./core/App.js";

window.addEventListener("DOMContentLoaded", () => {
    // ---------------------------------------------------------
    // Sprache bestimmen (HTML lang → Browser → Fallback: en)
    let lang = document.documentElement.lang;
    if (!lang || lang.trim() === "") {
        const browserLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
        const supported = ["de", "en", "fr", "es", "tlh"];
        const base = browserLang.split("-")[0];
        lang = supported.includes(base) ? base : "en";
        document.documentElement.lang = lang;
    }
    // ---------------------------------------------------------
    // Credits-Link dynamisch setzen (nur EIN Link im HTML nötig)
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
    // ---------------------------------------------------------
    // Falls du mehrere <a>-Tags verwendest → Sprachlink sichtbar machen
    const creditLinks = {
        de: document.getElementById("creditsLinkDE"),
        en: document.getElementById("creditsLinkEN"),
        fr: document.getElementById("creditsLinkFR"),
        es: document.getElementById("creditsLinkES"),
        tlh: document.getElementById("creditsLinkTLH")
    };
    Object.values(creditLinks).forEach(link => {                            // Alle Links ausblenden
        if (link) link.style.display = "none";
    });
    if (creditLinks[lang]) {                                                // Passenden Link einblenden (oder Fallback: EN)
        creditLinks[lang].style.display = "inline";
    } else if (creditLinks.en) {
        creditLinks.en.style.display = "inline";
    }
    // ---------------------------------------------------------
    // App starten
    window.app = new App();
    window.app.init();
});


