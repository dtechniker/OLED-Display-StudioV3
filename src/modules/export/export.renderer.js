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
            { value: "png", lang: "ex_code_format.png" }
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
}

