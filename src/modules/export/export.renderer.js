/* src/modules/export/export.renderer.js */

export class ExportRenderer {
    constructor(app) {
        this.app = app;
        this.dom = app.dom.export;
    }
    // ---------------------------------------------------------
    setOutput(text) { this.dom.output.value = text; }
    // ---------------------------------------------------------
    clearOutput() {
        this.dom.output.value = "";
        this.dom.memoryUsage.innerHTML = this.app.s("ex_format_volume")+"<strong>0 byte</strong>";
    }
    // ---------------------------------------------------------
    setMemoryUsage(bytes) { this.dom.memoryUsage.innerHTML = this.app.s("ex_format_volume")+"</strong>"+bytes+" byte</strong>"; }
    // ---------------------------------------------------------
    setNewExports() {
        const select = document.getElementById("ex_code_format");
        select.insertAdjacentHTML(                                                      // PNG-Format hinzufügen
            "beforeend",
            `<option value="png" data-lang="ex_code_png" data-help="ex_code_png">
                ${this.app.s("ex_code_png")}
            </option>`
        );
        const parent = this.app.dom.export.asciiConfig.closest(".toggles_left");        // PNG-Config-Container direkt unter toggles_left einfügen
        parent.insertAdjacentHTML("beforeend", `<div id="ex_png_config"></div>`);
        this.app.dom.export.pngConfig = document.getElementById("ex_png_config");       // In DOM-Map aufnehmen
        const dom = this.app.dom.export;                                                // Inhalt erzeugen
        const container = dom.pngConfig;
        container.innerHTML = `
            <label>
                Color -> <i class="fa fa-address-book-o"></i> --> [
                <input type="color" id="ex_png_fg" value="#000000" title="Pixel-Color">
                <input type="checkbox" id="ex_png_pixel_trans" title="Transparent"> ]
            </label>
            |---|
            <label>
                Color -> <i class="fa fa-address-book"></i> --> [
                <input type="color" id="ex_png_bg" value="#ffffff" title="Backgrund-Color">
                <input type="checkbox" id="ex_png_bg_trans" title="Transparent" checked> ]
            </label>
        `;
    }
    // ---------------------------------------------------------
    getFormat() {
        const type = this.dom.formatSelect.value;
        if (type === "visual_art") {
            return {
                type,
                asciiOn: this.dom.charOn.value,
                asciiOff: this.dom.charOff.value
            };
        }
        return { type };}
    // ---------------------------------------------------------
    getAsciiConfig() {
        return {
            on: this.dom.charOn.value || "#",
            off: this.dom.charOff.value || "_"
        };
    }
    // ---------------------------------------------------------
    updateConfigVisibility() {
        const formatObj = this.getFormat();
        const format = typeof formatObj === "string" ? formatObj : formatObj.type;
        if (format === "visual_art") { this.dom.asciiConfig.classList.add("visible");
        } else { this.dom.asciiConfig.classList.remove("visible");}
        if (format === "png") {this.dom.pngConfig.classList.add("visible");
        } else {this.dom.pngConfig.classList.remove("visible");}
    }
    // ---------------------------------------------------------
    copyToClipboard() { navigator.clipboard.writeText(this.dom.output.value);}
    // ---------------------------------------------------------
    exportPNG(matrix, grid) {
        const [w, h] = grid.split("x").map(Number);
        const scale = 10;
        const { fg, bg } = this.getPngColors();
        const canvas = document.createElement("canvas");
        canvas.width = w * scale;
        canvas.height = h * scale;
        const ctx = canvas.getContext("2d");
                if (bg !== "#00000000") {                                           // Hintergrund
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else { ctx.clearRect(0, 0, canvas.width, canvas.height);}
        if (fg === "#00000000") {                                                   // Pixel
            ctx.globalCompositeOperation = "destination-out";                         // Transparente Pixel → ausschneiden
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    if (matrix[y][x] === 1) {
                        ctx.fillRect(x * scale, y * scale, scale, scale);
                    }
                }
            }
            ctx.globalCompositeOperation = "source-over";                             // Normalmodus wiederherstellen
        } else {
            ctx.fillStyle = fg;                                                       // Normale farbige Pixel
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    if (matrix[y][x] === 1) {
                        ctx.fillRect(x * scale, y * scale, scale, scale);
                    }
                }
            }
        }
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `OLED-StudioV3_byDTech_${w}x${h}.png`;
        a.click();
    }
    // ---------------------------------------------------------
    getPngColors() {
        const fgInput = document.getElementById("ex_png_fg");
        const fgTrans = document.getElementById("ex_png_pixel_trans");
        const bgInput = document.getElementById("ex_png_bg");
        const bgTrans = document.getElementById("ex_png_bg_trans");
        return {
            fg: fgTrans?.checked ? "#00000000" : fgInput?.value ?? "#000000",
            bg: bgTrans?.checked ? "#00000000" : bgInput?.value ?? "#00000000"
        };
    }

}

