/* src/core/App.js */

import { DomMap } from "./DomMap.js";
import { LangSystem } from "./LangSystem.js";
import { ErrorSystem } from "./ErrorSystem.js";
import { MasterUtils } from "./MasterUtils.js";
import { MasterBindings } from "./MasterBindings.js";
import { InfoSystem } from "./InfoSystem.js";
import { UiOutput } from "../ui/UiOutput.js";
import { UiPanelManager } from "../ui/UiPanelManager.js";
import { MainGridManager } from "../modules/MainGrid/MainGrid.manager.js";
import { WorkshopManager } from "../modules/workshop/workshop.manager.js";
import { TemplatesManager } from "../modules/templates/templates.manager.js";
import { StampManager } from "../modules/stamp/stamp.manager.js";
import { ImportManager } from "../modules/import/import.manager.js";
import { ExportManager } from "../modules/export/export.manager.js";

export class App {
    constructor() {
        this.state = {
            lastGenerated: null,						// Global -
            activeTool: null,							// Global -
			stampActive: false,							// globaler Stempelmodus
			helpMode: false								// globaler Hilfemodus
        };
        this.dom = new DomMap();						// DomMap
		this.uiOutput = new UiOutput(this); 			// Ui-Text-Ausgabe
		this.uiPanels = new UiPanelManager(this); 		// Ui-Panels Manager
		this.lang = new LangSystem(this);				// Sprachsystem
		this.error = new ErrorSystem(this);				// Errorsystem
		this.utils = new MasterUtils(this);				// Globale Funktionen
		this.info = new InfoSystem(this);				// Tips&Tricks anzeige
		this.grid = new MainGridManager(this);			// Modul MainGrid
		this.workshop = new WorkshopManager(this);		// Modul Workshop
        this.templates = new TemplatesManager(this);	// Modul Templates
		this.stamp = new StampManager(this);			// Modul Stempelmodus
		this.import = new ImportManager(this);			// Modul Import
		this.export = new ExportManager(this);			// Modul Export
		this.bindings = new MasterBindings(this); 		// Die globalen Event-Auslöser
		this.s = this.lang.s.bind(this.lang);         	// Kurzform für Lokalisierung
		this.t = this.lang.t.bind(this.lang);         	// Tooltipp nur 1 Teil.
		this.td = this.lang.td.bind(this.lang);         // Tooltipp nur 2 Teil.
	}
	init() {
		try {
			this.lang.init();							// Sprache laden → UiOutput.applyLanguage()
			this.bindings.init(); 						// Globale Listener
			this.grid.init();							// Hauptgrid erstellen
			this.workshop.init(); 						// Workshop
			this.templates.init();						// Vorlagen
			this.stamp.init();							// Stempelsystem
			this.uiPanels.init();						// Panels anzeigen
		//this.info.show("tooltip_clr");				// Info anzeigen
        } catch (err) {
            this.error.error(err.message, err);
        }
	}
}
