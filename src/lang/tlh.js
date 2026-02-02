/* src/lang/tlh.js */

export const LANG_KLINGON = {
    // SystemErrors(err_)
    err_action_noDef: "vaj chenmoHlu’be’.",
    err_stamp_Nogrid: "ghun mIllogh tu’lu’be’.",
    err_works_Nogrid: "QapwI’ mIllogh pat tu’lu’be’.",
    // =========================
    // TOOLTIP (tp_)
    tp_fallback_title: "De’",
    tp_fallback_desc: "tu’lu’be’ De’ vIja’laH.",
    tp_titel_preview: "mIllogh 1:1",
    tp_panel_info_desc: "qeSmey & ghobmey",
    tp_info_content: "Doch yIwIv...",
    // =========================
    // MAIN GRID (m_)
    m_main_grid: "OLED mIllogh (128x32)",
    m_desc_grid: "pat yIwIv:",
    m_chk_grid_8_title: "8x8 pat chu’/teHHa’",
    m_chk_grid_16_title: "16x16 pat chu’/teHHa’",
    m_chk_grid_32_title: "32x32 pat chu’/teHHa’",
    // =========================
    // WORKSHOP (w_)
    w_panel_workshop_desc: "mIllogh jonwI’",
    w_std_title: "motlh mIllogh patmey",
    w_special_title: "le’ patmey",
    w_warning_noscale: "patvam tInmoHlaHbe’ vay’.",
    // =========================
    // TEMPLATES (t_)
    t_panel_templates_desc: "mIllogh chenmoHwI’ yIwIv.",
    t_chk_filt_8_title: "8x8 mIlloghmey neH",
    t_chk_filt_16_title: "16x16 mIlloghmey neH",
    t_chk_filt_32_title: "32x32 mIlloghmey neH",
    t_templates_title: "mIllogh chenmoHwI’",
    t_templetes_disc: "mIw:",
    t_toworkshop_desc: "jonwI’Daq chel",
    // =========================
    // Export (ex_)
    ex_output_code_title: "Qum De’ chenmoHlu’",
    ex_code_format_title: "mIw yIwIv",
    ex_char_on_title: "tIH chu’ mIwvam",
    ex_char_off_title: "tIH tam mIwvam",
    ex_export_title: "Qum & SeH",
    ex_output_title: "mIw:",
    ex_format_volume: "lo’ (RAM/ROM): ",
    ex_code_format: {
        adafruit_gfx: "Adafruit GFX (Hex pat)",
        cpp_binary: "C++ mI’pat (0b0010...)",
        ssd1306_native: "SSD1306 pat motlh (vertical)",
        visual_art: "ASCII mIllogh"},
    ex_code_png: "mIlloghHom.png ngeH",
    ex_png_bg_trans_title:"moQmoH Hutlhbogh Qor",
    ex_png_pixel_trans_title:"pIxelmey moQmoH",
    // =========================
    // Import (im_)
    im_import_title: "Hex / Binary ngevwI’ [Array]",
    im_txt_tip: "De’ (CTRL + V):",
    im_alert_Import: "mIw lughHa’. Icon pong (Icon8x8) tu’lu’be’.",
    im_format_ready: "mIw tu’lu’: ",
    im_format_un: "mIw lughbe’!",
    im_bitMap_error: "‘ab ‘ej latlh joq tu’lu’be’. -> bitmap_WxH[]",
    // =========================
    // ACTION TOOLTIP SYSTEM
    // =========================
    tooltips: {
        // SYSTEM
        tooltip_clr:    { t: "qeS & ghob", d: "Dochmey yIHotlh, De’ DaHev." },
        helpMode:       { t: "QaH-mode on/off", d: "Doch yIHotlh, Qu'mey DaSovmeH." },
        ready:          { t: "<i style=color:var(--btn-c2);>QaH-mode</i>", d: "Doch yIHotlh, De' DaSuq. (i) yIngaSmeH." },
        info_missing:   { t: "De’", d: "De’ tu’lu’be’." },
        stampEmpty:     { t: "pat", d: "ghun mIllogh tu’lu’be’." },
        errDefault:     { t: "Qagh", d: "Qagh Sovbe’lu’." },
        panel_info:     { t: "De’ & mIllogh", d: "mIllogh DaQIj ‘ej DaLegh." },
        setLang:        { t: "Hol wIv", d: "Browser Hol choH..." },
        // =========================
        // Tipps&Tricks (tt_)
        tt_displ_gnd:   { t: "GND", d: "naDev Display‑vaD ‘eS (‑) rarwI’." },
        tt_displ_vcc:   { t: "VCC", d: "nIvbogh chenmoHwI’pu’vaD 3.3V – 5V motlh." },
        tt_displ_scl:   { t: "SCL", d: "povHa’ CLK = SCL / SCLK lo’lu’." },
        tt_displ_sda:   { t: "SDA", d: "povHa’ MOSI = SDA / SID lo’lu’." },
        // =========================
        // MAIN GRID (m_)
        m_main_grid:   { t: "pat wa’DIch", d: "patvamDaq tIHmey Da’ogh." },
        m_shift_up:    { t: "Dung ghoS",      d: "ngoqHom Hoch ravDaq yIghoS. (cha' DoS: leQ Dung)" },
        m_shift_down:  { t: "bIng ghoS",      d: "ngoqHom Hoch bIngDaq yIghoS. (cha' DoS: leQ bIng)" },
        m_shift_left:  { t: "poS ghoS",       d: "ngoqHom Hoch poSDaq yIghoS. (cha' DoS: leQ poS)" },
        m_shift_right: { t: "nIH ghoS",       d: "ngoqHom Hoch nIHDaq yIghoS. (cha' DoS: leQ nIH)" },
        m_invert:      { t: "choH", d: "tIHmey Hoch yIchoH." },
        m_clear:       { t: "teq", d: "pat Hoch yIteq." },
        m_code:        { t: "Qum De’", d: "patvam Qum De’ chenmoH." },
        m_TxtStamp:    { t: "text‑stamp", d: "textlIj stamp chenmoH." },
        // =========================
        // WORKSHOP (w_)
        w_panel_workshop:{ t: "jonwI’", d: "mIllogh tIchoHmeH janmey." },
        w_shift_up:    { t: "Dung", d: "tIHmey retlh yIcha’." },
        w_shift_down:  { t: "bIng", d: "tIHmey bIngDaq yIcha’." },
        w_shift_left:  { t: "poS", d: "tIHmey poSDaq yIcha’." },
        w_shift_right: { t: "nIH", d: "tIHmey nIHDaq yIcha’." },
        w_invert:      { t: "choH", d: "tIHmey Hoch yIchoH." },
        w_mirror_h:    { t: "poS-nIH", d: "mIllogh Dopmey yIchoH." },
        w_mirror_v:    { t: "Dung-bIng", d: "mIllogh retlhmey yIchoH." },
        w_rotate:      { t: "jIr", d: "mIllogh 90° yIjIr." },
        w_scale:       { t: "tInmoH", d: "mIllogh tInmoH cha’logh." },
        w_stamp:       { t: "ghun", d: "ghun jan yIchu’." },
        w_clear:       { t: "teq", d: "jonwI’ yIteq." },
        w_code:        { t: "Qum De’", d: "jonwI’ Qum De’ chenmoH." },
        w_g8:         { t: "8×8 mIllogh", d: "mIllogh mach." },
        w_g16:        { t: "16×16 mIllogh", d: "mIllogh tIn." },
        w_g32:        { t: "32×32 mIllogh", d: "mIllogh tInqu’." },
        w_g8x16:      { t: "8×16 mIllogh", d: "mIllogh jen." },
        w_g16x8:      { t: "16×8 mIllogh", d: "mIllogh tIq." },
        // =========================
        // TEMPLATES (t_)
        t_panel_templates:  { t: "mIllogh chenmoHwI’", d: "mIllogh chenmoHwI’ tu’lu’." },
        t_stamp:            { t: "ghun", d: "ghun jan yIchu’." },
        t_quicktipp: { t: "qeSmey", d: "templates.data–Daq ngermey lanlu’. DatIvnISchugh, ngermey tIchel, ’ach pongmey motlh ghajbe’lu’." },
        // =========================
        // Export (ex_)
        ex_export_section:{ t: "Qum", d: "mIllogh patmey yIQum." },
        ex_clr_code:      { t: "teq", d: "Qum pat yIteq." },
        ex_copyCode:      { t: "jIghItlh", d: "Qum pat De’ yIghItlh." },
        ex_quicktipp: { t: "qeSmey", d: "De’ghomlIj lo’meH, mu’ghom lugh lo’taHghach yIqIm." },
        ex_code_png:      { t: "nagh beQ", d: "mIllogh pixel PNG‑ghach ghoS De’wI’lIjDaq nItlh."},
        // =========================
        // Import (im_)
        im_import_section: { t: "ngev", d: "mIllogh De’ yIngev." },
        im_import:         { t: "ngev", d: "De’ patDaq yIngev." },
        im_clr:            { t: "teq", d: "ngev pat yIteq." },
        im_quicktipp: { t: "qeSmey", d: "ImportmeylIjDaq nger qech lugh (8×8 rur) ’ej mI’ghom tIq lugh ghajlu’ ’e’ yInID. Format lugh leghmeH, wa’ Doch bIexportnIS." }
    }
};



