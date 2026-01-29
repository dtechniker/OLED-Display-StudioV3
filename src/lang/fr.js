/* src/lang/fr.js */

export const LANG_FR = {
    // SystemErrors(err_)
    err_action_noDef: "n’est pas encore implémenté.",
    err_stamp_Nogrid: "Motif introuvable.",
    err_works_Nogrid: "Grille de l’atelier introuvable.",
    // =========================
    // TOOLTIP (tp_)
    tp_fallback_title: "Info",
    tp_fallback_desc: "Aucune description disponible.",
    tp_titel_preview: "Aperçu 1:1",
    tp_panel_info_desc: "Astuces & conseils",
    tp_info_content: "Sélectionnez un élément...",
    // =========================
    // MAIN GRID (m_)
    m_main_grid: "Écran OLED (128x32)",
    m_desc_grid: "Sélectionner une grille :",
    m_chk_grid_8_title: "Activer/désactiver la grille 8x8",
    m_chk_grid_16_title: "Activer/désactiver la grille 16x16",
    m_chk_grid_32_title: "Activer/désactiver la grille 32x32",
    // =========================
    // WORKSHOP (w_)
    w_panel_workshop_desc: "Atelier d’icônes",
    w_std_title: "Afficher les formats standards",
    w_special_title: "Afficher les formats spéciaux",
    w_warning_noscale: "Cette grille ne peut pas être agrandie davantage.",
    // =========================
    // TEMPLATES (t_)
    t_panel_templates_desc: "Sélectionner et insérer des modèles.",
    t_chk_filt_8_title: "Filtrer les modèles par 8x8",
    t_chk_filt_16_title: "Filtrer les modèles par 16x16",
    t_chk_filt_32_title: "Filtrer les modèles par 32x32",
    t_templates_title: "Modèles",
    t_templetes_disc: "Filtre :",
    t_toworkshop_desc: "Charger dans l’atelier",
    // =========================
    // Export (ex_)
    ex_output_code_title: "Code généré",
    ex_code_format_title: "Choisir le format de sortie",
    ex_char_on_title: "Caractère pour les pixels actifs",
    ex_char_off_title: "Caractère pour les pixels inactifs",
    ex_export_title: "Exportation & configuration",
    ex_output_title: "Format de sortie :",
    ex_format_volume: "Utilisation (RAM/ROM) : ",
    ex_code_format: {
        adafruit_gfx: "Adafruit GFX (Tableau Hex)",
        cpp_binary: "C++ Binaire (0b0010...)",
        ssd1306_native: "Matériel natif (Vertical)",
        visual_art: "Vue ASCII"},
    // =========================
    // Import (im_)
    im_import_title: "Importation Hex / Binaire [Array]",
    im_txt_tip: "Entrée (CTRL + V) :",
    im_alert_Import: "Format invalide. Vérifiez si le nom de l’icône (Icon8x8) est défini.",
    im_format_ready: "Format détecté : ",
    im_format_un: "Format ou système inconnu.",
    im_bitMap_error: "mais la hauteur et la largeur sont manquantes. -> bitmap_WxH[]",
    // =========================
    // ACTION TOOLTIP SYSTEM
    // =========================
    tooltips: {
        // SYSTEM
        tooltip_clr:    { t: "Astuces & conseils", d: "Survolez avec la souris pour obtenir plus d’informations sur les fonctions." },
        helpMode:       { t: "Activer/désactiver le mode aide", d: "Affiche des infos au survol des fonctions." },
        ready:          { t: "<i style=color:var(--btn-c2);>Mode aide</i>", d: "Survolez un élément pour en savoir plus. Appuyez sur (i) pour quitter." },
        info_missing:   { t: "Info", d: "Aucune description disponible." },
        stampEmpty:     { t: "Système", d: "Aucun contenu utilisable pour l’outil tampon." },
        errDefault:     { t: "Erreur système", d: "Erreur inconnue." },
        panel_info:     { t: "Infos & aperçu", d: "Affiche des informations et un aperçu de l’icône actuelle." },
        setLang:        { t: "Sélection de la langue", d: "Changer la langue du navigateur en..." },
        // =========================
        // Tipps&Tricks (tt_)
        tt_displ_gnd:   { t: "GND", d: "C’est ici que la masse (-) est connectée à l’écran." },
        tt_displ_vcc:   { t: "VCC", d: "Chez la plupart des fabricants, c’est 3,3V – 5V." },
        tt_displ_scl:   { t: "SCL", d: "Souvent utilisé comme CLK = SCL / SCLK." },
        tt_displ_sda:   { t: "SDA", d: "Souvent utilisé comme MOSI = SDA / SID." },
        // =========================
        // MAIN GRID (m_)
        m_main_grid:   { t: "Grille principale", d: "Ici, vous modifiez la grille principale de pixels." },
        m_shift_up:    { t: "Déplacer vers le haut",    d: "Déplace tous les pixels d’une ligne vers le haut. (alternative : flèche haut)" },
        m_shift_down:  { t: "Déplacer vers le bas",     d: "Déplace tous les pixels d’une ligne vers le bas. (alternative : flèche bas)" },
        m_shift_left:  { t: "Déplacer à gauche",        d: "Déplace tous les pixels d’une colonne vers la gauche. (alternative : flèche gauche)" },
        m_shift_right: { t: "Déplacer à droite",        d: "Déplace tous les pixels d’une colonne vers la droite. (alternative : flèche droite)" },
        m_invert:      { t: "Inverser", d: "Inverser tous les pixels." },
        m_clear:       { t: "Effacer", d: "Effacer entièrement la grille." },
        m_code:        { t: "Générer le code", d: "Générer le code pour la grille actuelle." },
        m_TxtStamp:    { t: "Tampon de texte", d: "Crée ton texte sous forme de tampon." },
        // =========================
        // WORKSHOP (w_)
        w_panel_workshop:{ t: "Atelier", d: "Outils et fonctions d’édition pour les icônes." },
        w_shift_up:    { t: "Déplacer vers le haut", d: "Déplacer tous les pixels d’une ligne vers le haut." },
        w_shift_down:  { t: "Déplacer vers le bas", d: "Déplacer tous les pixels d’une ligne vers le bas." },
        w_shift_left:  { t: "Déplacer à gauche", d: "Déplacer tous les pixels d’une colonne vers la gauche." },
        w_shift_right: { t: "Déplacer à droite", d: "Déplacer tous les pixels d’une colonne vers la droite." },
        w_invert:      { t: "Inverser", d: "Inverser tous les pixels." },
        w_mirror_h:    { t: "Miroir horizontal", d: "Retourner l’image horizontalement." },
        w_mirror_v:    { t: "Miroir vertical", d: "Retourner l’image verticalement." },
        w_rotate:      { t: "Rotation", d: "Faire pivoter l’image de 90°." },
        w_scale:       { t: "Agrandir", d: "Doubler la taille de l’image." },
        w_stamp:       { t: "Mode tampon", d: "Activer l’outil tampon. (clic droit pour quitter)" },
        w_clear:       { t: "Effacer", d: "Effacer l’atelier." },
        w_code:        { t: "Générer le code", d: "Générer le code de l’atelier." },
        w_g8:         { t: "Icône 8×8", d: "Petite icône carrée." },
        w_g16:        { t: "Icône 16×16", d: "Icône carrée moyenne." },
        w_g32:        { t: "Icône 32×32", d: "Grande icône carrée." },
        w_g8x16:      { t: "Icône 8×16", d: "Icône verticale haute." },
        w_g16x8:      { t: "Icône 16×8", d: "Icône horizontale large." },
        // =========================
        // TEMPLATES (t_)
        t_panel_templates: { t: "Modèles", d: "Ici, vous trouverez les modèles enregistrés." },
        t_stamp: { t: "Mode Tampon", d: "Activer l’outil tampon. (clic droit pour quitter)" },
        t_quicktipp: { t: "Astuces", d: "Les modèles sont enregistrés dans le fichier templates.data. Vous pouvez les étendre librement, mais chaque nom doit être unique." },
        // =========================
        // Export (ex_)
        ex_export_section:{ t: "Exporter", d: "Exporter votre icône dans différents formats." },
        ex_clr_code:  { t: "Effacer", d: "Vider le champ de sortie." },
        ex_copyCode:  { t: "Copier", d: "Copier le code dans le presse‑papiers." },
        ex_quicktipp: { t: "Astuces", d: "Veillez toujours à respecter l’orthographe exigée par votre environnement de développement." },
        // =========================
        // Import (im_)
        im_import_section: { t: "Importer", d: "Importer des données d’icône ici." },
        im_import:     { t: "Importer", d: "Importer les données dans la grille." },
        im_clr:        { t: "Effacer", d: "Vider le champ d’entrée." },
        im_quicktipp: { t: "Astuces", d: "Assurez-vous que le code importé contient la bonne taille d’icône (par ex. 8x8) ainsi que la longueur de tableau correspondante. Exportez d’abord un exemple pour voir le format correct." }
    }
};
