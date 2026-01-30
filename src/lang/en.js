/* src/lang/en.js */

export const LANG_EN = {
    // SystemErrors(err_)
    err_action_noDef: "is not implemented yet.",
    err_stamp_Nogrid: "Pattern not found.",
    err_works_Nogrid: "Workshop grid not found.",
    // =========================
    // TOOLTIP (tp_)
    tp_fallback_title: "Info",
    tp_fallback_desc: "No description available.",
    tp_titel_preview: "1:1 Preview",
    tp_panel_info_desc: "Tips & Tricks",
    tp_info_content: "Select an element...",
    // =========================
    // MAIN GRID (m_)
    m_main_grid: "OLED Display (128x32)",
    m_desc_grid: "Select grid:",
    m_chk_grid_8_title: "Toggle 8x8 grid",
    m_chk_grid_16_title: "Toggle 16x16 grid",
    m_chk_grid_32_title: "Toggle 32x32 grid",
    // =========================
    // WORKSHOP (w_)
    w_panel_workshop_desc: "Icon Workshop",
    w_std_title: "Show standard icon formats",
    w_special_title: "Show special formats",
    w_warning_noscale: "This grid cannot be scaled further.",
    // =========================
    // TEMPLATES (t_)
    t_panel_templates_desc: "Select and insert templates.",
    t_chk_filt_8_title: "Filter templates by 8x8",
    t_chk_filt_16_title: "Filter templates by 16x16",
    t_chk_filt_32_title: "Filter templates by 32x32",
    t_templates_title: "Templates",
    t_templetes_disc: "Filter:",
    t_toworkshop_desc: "Load into workshop",
    // =========================
    // Export (ex_)
    ex_output_code_title: "Generated Output Code",
    ex_code_format_title: "Select output format",
    ex_char_on_title: "Character for active pixels",
    ex_char_off_title: "Character for inactive pixels",
    ex_export_title: "Export & Configuration",
    ex_output_title: "Output format:",
    ex_format_volume: "Usage (RAM/ROM): ",
    ex_code_format: {
        adafruit_gfx: "Adafruit GFX (Hex Array)",
        cpp_binary: "C++ Binary (0b0010...)",
        ssd1306_native: "Native Hardware (Vertical)",
        visual_art: "ASCII View"},
    // =========================
    // Import (im_)
    im_import_title: "Hex / Binary Import [Array]",
    im_txt_tip: "Input (CTRL + V):",
    im_alert_Import: "Invalid format. Please check if the icon name (Icon8x8) is set.",
    im_format_ready: "Format detected: ",
    im_format_un: "Unknown format or system!",
    im_bitMap_error: "but height and width are missing. -> bitmap_WxH[]",
    // =========================
    // ACTION TOOLTIP SYSTEM
    // =========================
    tooltips: {
        // SYSTEM
        tooltip_clr:    { t: "Tips & Tricks", d: "Hover with your mouse to get more information about the functions." },
        helpMode:       { t: "Toggle Help Mode", d: "Show hover tips for the functions." },
        ready:          { t: "<i style=color:var(--btn-c2);>Help Mode</i>", d: "Hover over something to learn more. Press (i) to exit." },
        info_missing:   { t: "Info", d: "No description available." },
        stampEmpty:     { t: "System", d: "No usable content for the stamp tool." },
        errDefault:     { t: "System Error", d: "Unknown error." },
        panel_info:     { t: "Info & Preview", d: "Shows information and a preview of the current icon." },
        setLang:        { t: "Language Selection", d: "Change the browser language to..." },
        // =========================
        // Tipps&Tricks (tt_)
        tt_displ_gnd:   { t: "GND", d: "This is where the ground (-) connects to the display." },
        tt_displ_vcc:   { t: "VCC", d: "For most manufacturers this is 3.3V – 5V." },
        tt_displ_scl:   { t: "SCL", d: "Often used as CLK = SCL / SCLK." },
        tt_displ_sda:   { t: "SDA", d: "Often used as MOSI = SDA / SID." },
        // =========================
        // MAIN GRID (m_)
        m_main_grid:   { t: "Main Grid", d: "This is where you edit the main pixel grid." },
        m_shift_up:    { t: "Move up",    d: "Shift all pixels one row upward. (alternative: Arrow‑Up key)" },
        m_shift_down:  { t: "Move down",  d: "Shift all pixels one row downward. (alternative: Arrow‑Down key)" },
        m_shift_left:  { t: "Move left",  d: "Shift all pixels one column to the left. (alternative: Arrow‑Left key)" },
        m_shift_right: { t: "Move right", d: "Shift all pixels one column to the right. (alternative: Arrow‑Right key)" },
        m_invert:      { t: "Invert", d: "Invert all pixels." },
        m_clear:       { t: "Clear", d: "Clear the entire grid." },
        m_code:        { t: "Generate Code", d: "Generate code for the current grid." },
        m_TxtStamp:    { t: "Text Stamp", d: "Create your text as a stamp." },
        // =========================
        // WORKSHOP (w_)
        w_panel_workshop:{ t: "Workshop", d: "Tools and editing functions for icons." },
        w_shift_up:    { t: "Shift Up", d: "Move all pixels one row up." },
        w_shift_down:  { t: "Shift Down", d: "Move all pixels one row down." },
        w_shift_left:  { t: "Shift Left", d: "Move all pixels one column left." },
        w_shift_right: { t: "Shift Right", d: "Move all pixels one column right." },
        w_invert:      { t: "Invert", d: "Invert all pixels." },
        w_mirror_h:    { t: "Mirror Horizontally", d: "Flip the image horizontally." },
        w_mirror_v:    { t: "Mirror Vertically", d: "Flip the image vertically." },
        w_rotate:      { t: "Rotate", d: "Rotate the image by 90°." },
        w_scale:       { t: "Scale", d: "Double the image size." },
        w_stamp:       { t: "Stamp Mode", d: "Activate the stamp tool. (right mouse button to exit)" },
        w_clear:       { t: "Clear", d: "Clear the workshop." },
        w_code:        { t: "Generate Code", d: "Generate workshop code." },
        w_g8:         { t: "8×8 Icon", d: "Small square icon." },
        w_g16:        { t: "16×16 Icon", d: "Medium square icon." },
        w_g32:        { t: "32×32 Icon", d: "Large square icon." },
        w_g8x16:      { t: "8×16 Icon", d: "Tall vertical icon." },
        w_g16x8:      { t: "16×8 Icon", d: "Wide horizontal icon." },
        // =========================
        // TEMPLATES (t_)
        t_panel_templates: { t: "Templates", d: "Here you can find saved templates." },
        t_stamp: { t: "Stamp Mode", d: "Activate the stamp tool. (right mouse button to exit)" },
        t_quicktipp: { t: "Tips & Tricks", d: "The templates are stored in the file templates.data. You can extend them freely, but make sure every name is unique." },
        // =========================
        // Export (ex_)
        ex_export_section:{ t: "Export", d: "Export your icon in various formats." },
        ex_clr_code:  { t: "Clear", d: "Clear the output field." },
        ex_copyCode:  { t: "Copy", d: "Copy the code to the clipboard." },
        ex_quicktipp: { t: "Tips & Tricks", d: "Always pay attention to the correct spelling required by your development environment." },
        ex_code_png: { t: "Download", d: "Save the pixel pattern as a PNG file on your device." },
        // =========================
        // Import (im_)
        im_import_section: { t: "Import", d: "Import icon data here." },
        im_import:     { t: "Import", d: "Import data into the grid." },
        im_clr:        { t: "Clear", d: "Clear the input field." },
        im_quicktipp: { t: "Tips & Tricks", d: "Make sure your imported code includes the correct icon size (e.g., 8x8) and the matching array length. Export an example first to see the correct format." }
    }
};

