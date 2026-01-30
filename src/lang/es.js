/* src/lang/es.js */

export const LANG_ES = {
    // SystemErrors(err_)
    err_action_noDef: "aún no está implementado.",
    err_stamp_Nogrid: "Patrón no encontrado.",
    err_works_Nogrid: "No se encontró la cuadrícula del taller.",
    // =========================
    // TOOLTIP (tp_)
    tp_fallback_title: "Info",
    tp_fallback_desc: "No hay descripción disponible.",
    tp_titel_preview: "Vista previa 1:1",
    tp_panel_info_desc: "Consejos y trucos",
    tp_info_content: "Selecciona un elemento...",
    // =========================
    // MAIN GRID (m_)
    m_main_grid: "Pantalla OLED (128x32)",
    m_desc_grid: "Seleccionar cuadrícula:",
    m_chk_grid_8_title: "Activar/desactivar cuadrícula 8x8",
    m_chk_grid_16_title: "Activar/desactivar cuadrícula 16x16",
    m_chk_grid_32_title: "Activar/desactivar cuadrícula 32x32",
    // =========================
    // WORKSHOP (w_)
    w_panel_workshop_desc: "Taller de iconos",
    w_std_title: "Mostrar formatos estándar",
    w_special_title: "Mostrar formatos especiales",
    w_warning_noscale: "Esta cuadrícula no se puede escalar más.",
    // =========================
    // TEMPLATES (t_)
    t_panel_templates_desc: "Seleccionar e insertar plantillas.",
    t_chk_filt_8_title: "Filtrar plantillas por 8x8",
    t_chk_filt_16_title: "Filtrar plantillas por 16x16",
    t_chk_filt_32_title: "Filtrar plantillas por 32x32",
    t_templates_title: "Plantillas",
    t_templetes_disc: "Filtro:",
    t_toworkshop_desc: "Cargar en el taller",
    // =========================
    // Export (ex_)
    ex_output_code_title: "Código generado",
    ex_code_format_title: "Seleccionar formato de salida",
    ex_char_on_title: "Carácter para píxeles activos",
    ex_char_off_title: "Carácter para píxeles inactivos",
    ex_export_title: "Exportación y configuración",
    ex_output_title: "Formato de salida:",
    ex_format_volume: "Uso (RAM/ROM): ",
    ex_code_format: {
        adafruit_gfx: "Adafruit GFX (Arreglo Hex)",
        cpp_binary: "C++ Binario (0b0010...)",
        ssd1306_native: "Hardware nativo (Vertical)",
        visual_art: "Vista ASCII"
    },
    // =========================
    // Import (im_)
    im_import_title: "Importar Hex / Binario [Array]",
    im_txt_tip: "Entrada (CTRL + V):",
    im_alert_Import: "Formato inválido. Verifica si el nombre del icono (Icon8x8) está configurado.",
    im_format_ready: "Formato detectado: ",
    im_format_un: "Formato o sistema desconocido.",
    im_bitMap_error: "pero faltan altura y anchura. -> bitmap_WxH[]",
    // =========================
    // ACTION TOOLTIP SYSTEM
    // =========================
    tooltips: {
        // SYSTEM
        tooltip_clr:    { t: "Consejos y trucos", d: "Pasa el ratón para obtener más información sobre las funciones." },
        helpMode:       { t: "Activar/desactivar modo de ayuda", d: "Muestra consejos al pasar el cursor sobre las funciones." },
        ready:          { t: "<i style=color:var(--btn-c2);>Modo de ayuda</i>", d: "Pasa el cursor sobre algo para obtener más información. Pulsa (i) para salir." },
        info_missing:   { t: "Info", d: "No hay descripción disponible." },
        stampEmpty:     { t: "Sistema", d: "No hay contenido utilizable para el sello." },
        errDefault:     { t: "Error del sistema", d: "Error desconocido." },
        panel_info:     { t: "Info y vista previa", d: "Muestra información y una vista previa del icono actual." },
        setLang:        { t: "Selección de idioma", d: "Cambiar el idioma del navegador a..." },
        // =========================
        // Tipps&Tricks (tt_)
        tt_displ_gnd:   { t: "GND", d: "Aquí se conecta la masa (-) del display." },
        tt_displ_vcc:   { t: "VCC", d: "En la mayoría de fabricantes es 3,3V – 5V." },
        tt_displ_scl:   { t: "SCL", d: "A menudo se usa como CLK = SCL / SCLK." },
        tt_displ_sda:   { t: "SDA", d: "A menudo se usa como MOSI = SDA / SID." },
        // =========================
        // MAIN GRID (m_)
        m_main_grid:   { t: "Cuadrícula principal", d: "Aquí editas la cuadrícula principal de píxeles." },
        m_shift_up:    { t: "Mover arriba",    d: "Desplaza todos los píxeles una fila hacia arriba. (alternativa: flecha arriba)" },
        m_shift_down:  { t: "Mover abajo",     d: "Desplaza todos los píxeles una fila hacia abajo. (alternativa: flecha abajo)" },
        m_shift_left:  { t: "Mover a la izquierda", d: "Desplaza todos los píxeles una columna a la izquierda. (alternativa: flecha izquierda)" },
        m_shift_right: { t: "Mover a la derecha",   d: "Desplaza todos los píxeles una columna a la derecha. (alternativa: flecha derecha)" },
        m_invert:      { t: "Invertir", d: "Invertir todos los píxeles." },
        m_clear:       { t: "Borrar", d: "Borrar toda la cuadrícula." },
        m_code:        { t: "Generar código", d: "Generar código para la cuadrícula actual." },
        m_TxtStamp:    { t: "Sello de texto", d: "Crea tu texto como un sello." },
        // =========================
        // WORKSHOP (w_)
        w_panel_workshop:{ t: "Taller", d: "Herramientas y funciones de edición para iconos." },
        w_shift_up:    { t: "Mover arriba", d: "Mover todos los píxeles una fila hacia arriba." },
        w_shift_down:  { t: "Mover abajo", d: "Mover todos los píxeles una fila hacia abajo." },
        w_shift_left:  { t: "Mover izquierda", d: "Mover todos los píxeles una columna a la izquierda." },
        w_shift_right: { t: "Mover derecha", d: "Mover todos los píxeles una columna a la derecha." },
        w_invert:      { t: "Invertir", d: "Invertir todos los píxeles." },
        w_mirror_h:    { t: "Espejo horizontal", d: "Reflejar la imagen horizontalmente." },
        w_mirror_v:    { t: "Espejo vertical", d: "Reflejar la imagen verticalmente." },
        w_rotate:      { t: "Rotar", d: "Rotar la imagen 90°." },
        w_scale:       { t: "Escalar", d: "Duplicar el tamaño de la imagen." },
        w_stamp:       { t: "Modo sello", d: "Activar la herramienta de sello. (botón derecho para salir)" },
        w_clear:       { t: "Borrar", d: "Borrar el taller." },
        w_code:        { t: "Generar código", d: "Generar código del taller." },
        w_g8:         { t: "Icono 8×8", d: "Icono cuadrado pequeño." },
        w_g16:        { t: "Icono 16×16", d: "Icono cuadrado mediano." },
        w_g32:        { t: "Icono 32×32", d: "Icono cuadrado grande." },
        w_g8x16:      { t: "Icono 8×16", d: "Icono vertical alto." },
        w_g16x8:      { t: "Icono 16×8", d: "Icono horizontal ancho." },
        // =========================
        // TEMPLATES (t_)
        t_panel_templates: { t: "Plantillas", d: "Aquí puedes encontrar plantillas guardadas." },
        t_stamp: { t: "Modo Sello", d: "Activar la herramienta de sello. (botón derecho para salir)" },
        t_quicktipp: { t: "Consejos", d: "Las plantillas se guardan en el archivo templates.data. Puedes ampliarlas libremente, pero cada nombre debe ser único." },
        // =========================
        // Export (ex_)
        ex_export_section:{ t: "Exportar", d: "Exporta tu icono en varios formatos." },
        ex_clr_code:  { t: "Borrar", d: "Vaciar el campo de salida." },
        ex_copyCode:  { t: "Copiar", d: "Copiar el código al portapapeles." },
        ex_quicktipp: { t: "Consejos", d: "Presta siempre atención a la ortografía correcta requerida por tu entorno de desarrollo." },
        ex_code_png: { t: "Descargar", d: "Guarda el patrón de píxeles como un archivo PNG en tu dispositivo." },
        // =========================
        // Import (im_)
        im_import_section: { t: "Importar", d: "Importa datos de iconos aquí." },
        im_import:     { t: "Importar", d: "Importar datos a la cuadrícula." },
        im_clr:        { t: "Borrar", d: "Vaciar el campo de entrada." },
        im_quicktipp: { t: "Consejos", d: "Asegúrate de que el código importado incluya el tamaño correcto del icono (por ejemplo, 8x8) y la longitud adecuada del arreglo. Exporta un ejemplo para ver el formato correcto." }
    }
};

