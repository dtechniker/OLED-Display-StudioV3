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
        const formats = [
            { value: "png", lang: "ex_code_png" }
        ];
        formats.forEach(f => {
            select.insertAdjacentHTML(
                "beforeend",
                `<option value="${f.value}" data-lang="${f.lang}" data-help="${f.lang}">Download -> .png <- Format</option>`
            );
        });
    }
    // ---------------------------------------------------------
    getFormat() {
    const format = this.dom.formatSelect.value;
    if (format === "visual_art") {
        return {
            type: "visual_art",
            asciiOn: this.dom.charOn.value,
            asciiOff: this.dom.charOff.value
        };
    }
    return format;}
    // ---------------------------------------------------------
    getAsciiConfig() {
        return {
            on: this.dom.charOn.value || "#",
            off: this.dom.charOff.value || "."
        };
    }
    // ---------------------------------------------------------
    updateAsciiVisibility() {
        const formatObj = this.getFormat();
        const format = typeof formatObj === "string" ? formatObj : formatObj.type;
        if (format === "visual_art") {
            this.dom.asciiConfig.classList.add("visible");
        } else {
            this.dom.asciiConfig.classList.remove("visible");
        }
    }
    // ---------------------------------------------------------
    copyToClipboard() { navigator.clipboard.writeText(this.dom.output.value);}
    // ---------------------------------------------------------
    exportPNG(matrix, grid) {
        const [w, h] = grid.split("x").map(Number);
        const scale = 10;
        const canvas = document.createElement("canvas");
        canvas.width = w * scale;
        canvas.height = h * scale;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);            // Kein Hintergrund → transparent
        ctx.fillStyle = "#000000";                                 // Aktive Pixel = Schwarz
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                if (matrix[y][x] === 1) {
                    ctx.fillRect(x * scale, y * scale, scale, scale);
                }
            }
        }
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `OLED-StudioV3_byDTech_${w}x${h}.png`;
        a.click();
    }
}



