/* src/lang/de.js */

export const LANG_DE = {
    // SystemErrors(err_)
    err_action_noDef: "ist noch nicht implementiert.",
    err_stamp_Nogrid: "Muster nicht gefunden.",
    err_works_Nogrid: "Workshop Raster nicht gefunden.",
    // =========================
    // TOOLTIP (tp_)
    tp_fallback_title: "Info",
    tp_fallback_desc: "Keine Beschreibung verfügbar.",
    tp_titel_preview: "1:1 Vorschau",
    tp_panel_info_desc: "Tipps&Tricks",
    tp_info_content: "Wähle ein Element...",
    // =========================
    // MAIN GRID (m_)
    m_main_grid: "OLED Display (128x32)",
    m_desc_grid: "Raster auswählen:",
    m_chk_grid_8_title: "8x8 Raster ein-/ausschalten",
    m_chk_grid_16_title: "16x16 Raster ein-/ausschalten",
    m_chk_grid_32_title: "32x32 Raster ein-/ausschalten",
    // =========================
    // WORKSHOP (w_)
    w_panel_workshop_desc: "Iconworkshop",
    w_std_title: "Standard-Iconformate anzeigen",
    w_special_title: "Sonderformate anzeigen",
    w_warning_noscale: "Dieses Grid kann nicht weiter skaliert werden.",
    // =========================
    // TEMPLATES (t_)
    t_panel_templates_desc: "Vorlagen auswählen und einfügen.",
    t_chk_filt_8_title: "Vorlagen nach 8x8 filtern",
    t_chk_filt_16_title: "Vorlagen nach 16x16 filtern",
    t_chk_filt_32_title: "Vorlagen nach 32x32 filtern",
    t_templates_title: "Vorlagen",
    t_templetes_disc: "Filter:",
    t_toworkshop_desc: "In Workshop laden",
    // =========================
    // Export (ex_)
    ex_output_code_title: "Generierter Ausgabecode",
    ex_code_format_title: "Ausgabeformat wählen",
    ex_char_on_title: "Zeichen für aktive Pixel",
    ex_char_off_title: "Zeichen für inaktive Pixel",
    ex_export_title: "Export & Konfiguration",
    ex_output_title: "Ausgabeformat:",
    ex_format_volume: "Verbrauch (RAM/ROM): ",
    ex_code_format: {
        adafruit_gfx: "Adafruit GFX (Hex Array)",
        cpp_binary: "C++ Binär (0b0010...)",
        ssd1306_native: "Native Hardware (Vertikal)",
        visual_art: "ASCII Ansicht"},
    // =========================
    // Import (im_)
    im_import_title: "Hex / Binär Import [Array]",
    im_txt_tip: "Eingabe (STRG + V):",
    im_alert_Import: "Falsches Format. Bitte prüfen, ob der Icon-Name (Icon8x8) gesetzt ist.",
    im_format_ready: "Format erkannt: ",
    im_format_un: "Format oder System unbekannt!",
    im_bitMap_error: "aber höhe und Breite fehlen. -> bitmap_WxH[]",
    // =========================
    // ACTION TOOLTIP SYSTEM
    // =========================
    tooltips: {
        // SYSTEM
        tooltip_clr:    { t: "Tipps & Tricks", d: "Nutze den Mauszeiger, um mehr Infos zu den Funktionen zu erhalten." },
        helpMode:       { t: "Hilfe-Modus an/aus", d: "Zeige hover-Tipps zu den Funktionen." },
        ready:          { t: "<i style=color:var(--btn-c2);>Hilfe-Modus</i>", d: "Zeige auf etwas um mehr zu erfahren. (i) zum Beenden." },
        info_missing:   { t: "Info", d: "Keine Beschreibung verfügbar." },
        stampEmpty:     { t: "System", d: "Kein verwertbarer Inhalt für den Stempel." },
        errDefault:     { t: "Systemfehler", d: "Fehler auslösetest." },
        panel_info:     { t: "Info & Vorschau", d: "Zeigt Informationen und eine Vorschau des aktuellen Icons." },
        setLang:        { t: "Sprachauswahl",d:"Ändere die Browsersprache auf..."},
        // =========================
        // Tipps&Tricks (tt_)
        tt_displ_gnd:   { t: "GND", d: "Hier kommt die Masse (-) an das Display." },
        tt_displ_vcc:   { t: "VCC", d: "Bei den meisten Herstellern ist dies 3,3V - 5V." },
        tt_displ_scl:   { t: "SCL", d: "Wird auch oft am CLK = SCL / SCLK betrieben." },
        tt_displ_sda: { t: "SDA", d: "Wird auch oft am MOSI = SDA / SID betrieben." },
        // =========================
        // MAIN GRID (m_)
        m_main_grid:   { t: "Hauptgitter", d: "Hier bearbeitest du das Hauptpixelraster." },
        m_shift_up:    { t: "Nach oben", d: "Alle Pixel eine Zeile nach oben verschieben. (alternativ: Pfeiltaste-hoch)" },
        m_shift_down:  { t: "Nach unten", d: "Alle Pixel eine Zeile nach unten verschieben. (alternativ: Pfeiltaste-runter)" },
        m_shift_left:  { t: "Nach links", d: "Alle Pixel eine Spalte nach links verschieben. (alternativ: Pfeiltaste-links)" },
        m_shift_right: { t: "Nach rechts", d: "Alle Pixel eine Spalte nach rechts verschieben. (alternativ: Pfeiltaste-rechts)" },
        m_invert:      { t: "Invertieren", d: "Alle Pixel invertieren." },
        m_clear:       { t: "Löschen", d: "Raster vollständig löschen." },
        m_code:        { t: "Code generieren", d: "Code für das aktuelle Raster erzeugen." },
        m_TxtStamp:    { t: "Text Stempel", d: "Erstelle deinen Text als Stempel." },
        // =========================
        // WORKSHOP (w_)
        w_panel_workshop:{ t: "Workshop", d: "Werkzeuge und Bearbeitungsfunktionen für Icons." },
        w_shift_up:    { t: "Nach oben", d: "Alle Pixel eine Zeile nach oben verschieben." },
        w_shift_down:  { t: "Nach unten", d: "Alle Pixel eine Zeile nach unten verschieben." },
        w_shift_left:  { t: "Nach links", d: "Alle Pixel eine Spalte nach links verschieben." },
        w_shift_right: { t: "Nach rechts", d: "Alle Pixel eine Spalte nach rechts verschieben." },
        w_invert:      { t: "Invertieren", d: "Alle Pixel invertieren." },
        w_mirror_h:    { t: "Horizontal spiegeln", d: "Bild horizontal spiegeln." },
        w_mirror_v:    { t: "Vertikal spiegeln", d: "Bild vertikal spiegeln." },
        w_rotate:      { t: "Rotieren", d: "Bild um 90° drehen." },
        w_scale:       { t: "Skalieren", d: "Bildgröße verdoppeln." },
        w_stamp:       { t: "Stempelmodus", d: "Stempelwerkzeug. (rechte Maustaste zum beenden)" },
        w_clear:       { t: "Löschen", d: "Workshop löschen." },
        w_code:        { t: "Code generieren", d: "Workshop-Code erzeugen." },
        w_g8:         { t: "8×8 Icon", d: "Kleines quadratisches Icon." },
        w_g16:        { t: "16×16 Icon", d: "Mittleres quadratisches Icon." },
        w_g32:        { t: "32×32 Icon", d: "Großes quadratisches Icon." },
        w_g8x16:      { t: "8×16 Icon", d: "Hohes vertikales Icon." },
        w_g16x8:      { t: "16×8 Icon", d: "Breites horizontales Icon." },  
        // =========================
        // TEMPLATES (t_)
        t_panel_templates:  { t: "Vorlagen", d: "Hier findest du gespeicherte Templates." },
        t_stamp:            { t: "Stempelmodus", d: "Stempelwerkzeug. (rechte Maustaste zum beenden)" },
        t_quicktipp:        {t: "Tipps&Tricks", d: "Die Vorlagen werden in der Datei templates.data hinterlegt. Diese könnten hier beliebig erweitert werden. Achten Sie aber darauf das jeder Name einzigartig sein muss."},
        // =========================
        // Export (ex_)
        ex_export_section:  { t: "Export", d: "Hier exportierst du dein Icon in verschiedene Formate." },
        ex_clr_code:        { t: "Löschen", d: "Ausgabefeld leeren." },
        ex_copyCode:        { t: "Kopieren", d: "Code in die Zwischenablage kopieren." },
        ex_quicktipp:       {t: "Tipps&Tricks", d: "Achten Sie immer auf die korrekten schreibweisen Ihere Benutzten Entwicklungsumgebung."},
        // =========================
        // Import (im_)
        im_import_section:  { t: "Import", d: "Hier kannst du Icon-Daten importieren." },
        im_import:          { t: "Importieren", d: "Daten ins Raster importieren." },
        im_clr:             { t: "Löschen", d: "Eingabefeld leeren." },
        im_quicktipp:       {t: "Tipps&Tricks", d: "Es ist wichtig das Ihr eingefügter Code auch die Icon größe beinhaltet z.B. 8x8 und die passende array anzahl. Exprotieren Sie ein Beispiel zur Ansicht der korrekten Form."}
    }
};
