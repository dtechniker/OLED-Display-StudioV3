/* src/core/DomMap.js */

export class DomMap {
    constructor() {
        this.header = {                         // HEADER
            root: document.querySelector(".headerDisplay"),
            credits: document.getElementById("creditsLink")
        };
        this.mainGrid = {                       // MAIN GRID PANEL
            panel: document.getElementById("m_panel"),
            colHeaders: document.getElementById("col_headers"),
            rowHeaders: document.getElementById("row_headers"),
            grid: document.getElementById("grid_main"),
            chk8: document.getElementById("m_chk_grid_8"),
            chk16: document.getElementById("m_chk_grid_16"),
            chk32: document.getElementById("m_chk_grid_32"),
            tools: document.querySelectorAll("[data-action^='m_']")
        };
        this.workshop = {                       // WORKSHOP PANEL
            panel: document.getElementById("w_panel"),
            toolbar: document.querySelector(".workshop_toolbar"),
            scrollArea: document.querySelector(".workshop_scroll_area"),
            container: document.getElementById("workshop_container"),
            stdBlock: document.querySelector(".w_std_block"),
            specialBlock: document.querySelector(".w_special_block"),
            specialStart: document.getElementById("w_special_start"),
            radioStd: document.getElementById("w_std"),
            radioSpecial: document.getElementById("w_special"),
            tools: document.querySelectorAll("[data-action^='w_']")
        };     
        this.templates = {                      // TEMPLATES PANEL
            panel: document.getElementById("t_panel"),
            filt8: document.getElementById("t_chk_filt_8"),
            filt16: document.getElementById("t_chk_filt_16"),
            filt32: document.getElementById("t_chk_filt_32"),
            list: document.getElementById("elemV_content")
        };
        this.preview = {                        // PREVIEW PANEL
            title: document.getElementById("tp_titel_preview"),
            canvas: document.getElementById("preview1x"),
            ctx: document.getElementById("preview1x")?.getContext("2d")
        };
        this.export = {                         // EXPORT PANEL
            panel: document.getElementById("ex_panel"),
            formatSelect: document.getElementById("ex_code_format"),
            memoryUsage: document.getElementById("ex_format_volume"),
            asciiConfig: document.getElementById("ex_ascii_config"),
            charOn: document.getElementById("ex_char_on"),
            charOff: document.getElementById("ex_char_off"),
            output: document.getElementById("ex_outputArea"),
            btnClear: document.querySelector("[data-action='ex_clr_code']"),
            btnCopy: document.querySelector("[data-action='ex_copyCode']")
        };
        this.import = {                         // IMPORT PANEL
            panel: document.getElementById("im_panel"),
            input: document.getElementById("im_importArea"),
            btnClear: document.querySelector("[data-action='im_clr']"),
            btnImport: document.querySelector("[data-action='im_import']")
        };
        this.footer = {                         // FOOTER / SYSTEM DOCK
            panel_help: document.getElementById("panel_help"),
            root: document.getElementById("app_footer"),
            stampGhost: document.getElementById("stamp_ghost")
        };
    }
}
