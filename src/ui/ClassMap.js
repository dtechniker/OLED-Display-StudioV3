export const ClassMap = {

    // ---------------------------------------------------------
    // PIXEL (generiert)
    // ---------------------------------------------------------
    pixel: {
        base: "pixel",            // generelle Pixel-Basis
        active: "active",         // aktiver Zustand
        main: "pixel_main",       // Pixel im MainGrid
    },
    // ---------------------------------------------------------
    // GRID HEADERS (generiert)
    // ---------------------------------------------------------
    header: {
        cell: "header_cell"
    },
    // ---------------------------------------------------------
    // UI (generiert)
    // ---------------------------------------------------------
    ui_classes: {
        errorBox: "error_box", 
        errorInner: "error_box_inner", 
        fade: "anim-fade", 
        show: "show", 
        isError: "is-error", 
        isWarning: "is-warning", 
        isInfo: "is-info"
    },
    // ---------------------------------------------------------
    // WORKSHOP (generiert + DOM)
    // ---------------------------------------------------------
    workshop: {
        card: "box_card",                 // Rasterkarte
        active: "active_raster",          // aktive Rasterkarte
        miniGrid: "mini_grid",            // Mini-Grid in Karten
        pixel: "pixel",                   // Pixel im Workshop-Kontext
        scrollArea: "workshop_scroll_area",
        outerWrapper: "workshop_outer_wrapper",
        toolbar: "workshop_toolbar",
        stdBlock: "w_std_block",         // Standard-Raster-Block
        specialBlock: "w_special_block", // Spezial-Raster-Block
        specialStart: "w_special_start"  // Marker für Scroll-Offset
    },
    // ---------------------------------------------------------
    // BUTTONS (global)
    // ---------------------------------------------------------
    tools: {
        main: "btn_main",           // EIN Button-Typ für ALLES
        delete: "btn_del",          // EINzige Ausnahme
        help: "btn_help"            // Help toggle Btn
    },
    // ---------------------------------------------------------
    // LAYOUT / PANELS (global, fix im HTML)
    // ---------------------------------------------------------
    layout: {
        panel: "panel",
        panelTitle: "panel_title",
        middleRow: "middle_row",
        bottomRow: "bottom_row",
        stamp_ghost: "stamp_ghost"
    },
    // ---------------------------------------------------------
    // TEMPLATES PANEL (DOM)
    // ---------------------------------------------------------
    templates: {
        list: "template_list",
        content: "elemV_content",
        t_btn_load: "t_btn_load",
        template_item:"template_item",
        preview: "preview",
        t_info: "t_info",
        t_name: "t_name",
        t_btns: "t_btns",
        t_size: "t_size"
    },
    // ---------------------------------------------------------
    // PREVIEW PANEL (DOM)
    // ---------------------------------------------------------
    preview: {
        small: "preview_small"
    },
    // ---------------------------------------------------------
    // EXPORT / IMPORT PANELS (DOM)
    // ---------------------------------------------------------
    export: {
        layout: "export_layout",
        left: "export_left",
        extra: "export_extra",
        textareaHeader: "textarea_header"
    }
};
