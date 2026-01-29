# OLED-Display-StudioV3

<img src="OLED Studio V3_byDTech.jpg" alt="OLED Studio Interface" width="800">

<div align="center">

📘 OLED Studio V3.0

Web-based LED Matrix Toolkit & Pixel Editor

English Version | Deutsche Version

</div>

<!--
ENGLISH SECTION
Standard for GitHub projects. Focuses on technical vocabulary.
-->

🔧 Overview

OLED Studio is a comprehensive web-based toolkit designed for embedded developers, makers, and UI designers. It combines a high-performance pixel editor, a flexible import system, and a template/stamp engine into a unified workflow.

The project was born from the need to simplify the workflow with microcontrollers (ESP32, Arduino, STM32). It eliminates the frustration of manual bit-shifting and provides instant visual feedback.

Note for Recruiters & Reviewers:
While this started as a passion project, it serves as a demonstration of professional, modular software architecture. It showcases the transition from monolithic "hobby code" to a decoupled, testable, and scalable system.

✨ Features

🎨 Advanced Pixel Editor & Workshop

Canvas: Interactive 128×32 drawing surface (SSD1306 optimized) with 1:1 Mini-Preview.

Tools:

Text Stamping: Convert text input directly into positionable icon stamps.

Transformation: Mirror (H/V), Rotate (90° steps), Scale, and Invert patterns.

Toggle: Bulk toggle rows or columns.

Export Formats:

C-Arrays: Compact Hex (0xFF) for direct code usage.

Binary: Visual bit representation (0b1010...).

ASCII Art: Text-based export for documentation.

🧩 Grids & Layout

Flexible Geometries: Supports 8×8, 16×16, 32×32, 8×16, and 16×8 layouts.

Navigation: Fast content shifting using Arrow Keys.

Independence: Each grid functions as an independent workspace.

🔍 Intelligent Import System

OLED Studio features a robust parsing engine that automatically detects and processes various input formats:

Smart Detection: Identifies RowHex, Binary, and native SSD1306 Bitmaps.

Vertical Paging: Correctly decodes the specific memory structure of SSD1306 displays.

Auto-Dimension: Infers width and height from input data strings.

🌐 Workflow & Internationalization

Offline Capable: No backend required. All assets are embedded locally.

Languages: 🇩🇪 German, 🇬🇧 English, 🇪🇸 Spanish, 🇫🇷 French, 🖖 Klingon.

Secret Features: Try Ctrl+K for the hidden Theme Switcher.

🧱 Architecture & Engineering

This project demonstrates a strict separation of concerns, moving away from spaghetti code to a maintainable enterprise-grade structure.
The V3.0 refactoring focused on:

✅ Encapsulation: Logic is strictly isolated from UI.

✅ Standardization: Unified module interfaces.

✅ Performance: Optimized rendering pipeline.

Module

Responsibility

ImportLogic

Pure logic layer. Handles format detection, parsing, dimension calculation, and matrix conversion. Zero UI dependencies. Fully unit-testable.

ImportManager

Orchestrator. Routes data to appropriate handlers, manages the Stamp System, and handles error/success states.

UI-Renderer

Presentation layer. Responsible for rendering the DOM, pixel grids, and visual feedback. Contains no business logic.

ErrorManager

Centralized exception handling. Provides user-friendly error messages and debug traces for invalid tokens.

📂 Project Structure

The codebase enforces the MVC pattern (Manager/View/Logic) across all modules:

/src
 ├── main.js                  # Entry point<br>
 ├── /core                    # Core Systems (Singleton patterns)<br>
 │    ├── App.js<br>
 │    ├── DomMap.js<br>
 │    ├── ErrorSystem.js<br>
 │    ├── InfoSystem.js<br>
 │    ├── LangSystem.js<br>
 │    ├── MasterBindings.js<br>
 │    └── MasterUtils.js<br>
 ├── /modules                 # Feature Modules (Strict Separation)<br>
 │    ├── /export<br>
 │    │    ├── Export.logic.js<br>
 │    │    ├── Export.renderer.js<br>
 │    │    └── Export.manager.js<br>
 │    ├── /import<br>
 │    │    ├── Import.logic.js<br>
 │    │    ├── Import.renderer.js<br>
 │    │    └── Import.manager.js<br>
 │    ├── /mainGrid<br>
 │    ├── /stamp<br>
 │    │    ├── font.data.js<br>
 │    │    ├── Stamp.logic.js<br>
 │    │    ├── Stamp.renderer.js<br>
 │    │    └── Stamp.manager.js<br>
 │    ├── /templates<br>
 │    └── /workshop<br>
 └── /ui                      # Assets & Shared UI Components<br>
      ├── /fontawesome<br>
      ├── /pics<br>
      ├── ClassMap.js<br>
      ├── style.css<br>
      ├── UiOutput.js<br>
      └── UiPanelManager.js<br>
<br>

🚀 Deployment & Usage

OLED Studio is a client-side application (HTML/JS/CSS).

Installation:

git clone [https://github.com/YOUR_USERNAME/OLED-Studio.git](https://github.com/YOUR_USERNAME/OLED-Studio.git)


Run:
Simply open index.html in any modern web browser. Works completely offline.

<!--
GERMAN SECTION
Tailored for German employers looking for precision and structure.
-->

🔧 Überblick

OLED Studio ist ein webbasiertes LED-Matrix-Toolkit für Entwickler, Maker und UI-Designer. Es vereint einen leistungsfähigen Pixel-Editor, ein flexibles Import-System und eine Template-Engine in einer modularen Anwendung.

Das Projekt entstand aus dem Wunsch heraus, die Arbeit mit Mikrocontrollern zu vereinfachen: Schnelle Vorschau, automatisierte Umrechnung und ein klar strukturierter Workflow sparen Zeit und vermeiden Frust bei der Entwicklung von Embedded GUIs.

Hinweis zur Architektur:
OLED Studio dient als Arbeitsprobe für professionelle Software-Architektur. Es demonstriert, wie man eine komplexe Frontend-Anwendung modular, wartbar und zukunftssicher gestaltet.

✨ Hauptfunktionen

🎨 Pixel-Editor & Workshop-Tools

Canvas: 128×32 Zeichenfläche, optimiert für SSD1306, mit 1:1 Mini-Vorschau.

Werkzeuge:

Text-Stempel: Verwandelt Texteingaben direkt in platzierbare Icons.

Transformation: Spiegeln (H/V), Rotieren (90°), Skalieren und Invertieren.

Pixel-Verschiebung: Präzises Positionieren via Pfeiltasten.

Export: Generierung von Hex-Arrays (0xFF), Binär-Strings (0b1010) und ASCII-Art.

🧩 Grids & Templates

Formate: Unterstützt Raster wie 8×8, 16×16, 32×32 und mehr.

Stempel-System: Speichern von Mustern als wiederverwendbare Stempel. Drag & Drop Logik.

Template-Engine: Gleichzeitige Arbeit mit mehreren Referenz-Assets.

🔍 Intelligentes Import-System

Das System erkennt Eingabedaten automatisch und verarbeitet sie:

Format-Agnostisch: Liest RowHex, Binary und natives SSD1306 Vertical Paging.

Auto-Dimension: Berechnet Breite und Höhe automatisch aus dem Datenstrom.

Robust: Fehlerhafte Tokens werden abgefangen und gemeldet.

🌐 Workflow

Offline-Fähig: Keine Server-Abhängigkeit, Assets sind lokal eingebettet.

Themes: Versteckter Theme-Switcher über Strg+K.

I18n: Volle Lokalisierung in Deutsch, Englisch, Französisch, Spanisch & Klingonisch.

🧱 Architektur & Design Patterns

Das Update auf Version 3.0 folgte strikten Engineering-Prinzipien, um "Hobby-Code" in eine professionelle Struktur zu überführen:

✅ Logik gekapselt: Algorithmen sind strikt von DOM/UI getrennt.

✅ Rendering getrennt: Die View-Schicht enthält keinerlei Business-Logik.

✅ Manager-Pattern: Zentrale Orchestrierung statt Spaghetti-Code.

✅ Einheitliche Module: Standardisierte Schnittstellen für Export, Import und Tools.

📂 Projektstruktur

Die Dateistruktur belegt die konsequente Umsetzung des MVC-Patterns (Manager/View/Logic):

/src
 ├── main.js                  # Einstiegspunkt<br>
 ├── /core                    # Core Systeme (Singleton Pattern)<br>
 │    ├── App.js<br>
 │    ├── DomMap.js<br>
 │    ├── ErrorSystem.js<br>
 │    ├── InfoSystem.js<br>
 │    ├── LangSystem.js<br>
 │    ├── MasterBindings.js<br>
 │    └── MasterUtils.js<br>
 ├── /modules                 # Feature Module (Strikte Trennung)<br>
 │    ├── /export<br>
 │    │    ├── Export.logic.js<br>
 │    │    ├── Export.renderer.js<br>
 │    │    └── Export.manager.js<br>
 │    ├── /import<br>
 │    │    ├── Import.logic.js<br>
 │    │    ├── Import.renderer.js<br>
 │    │    └── Import.manager.js<br>
 │    ├── /mainGrid<br>
 │    ├── /stamp<br>
 │    │    ├── font.data.js<br>
 │    │    ├── Stamp.logic.js<br>
 │    │    ├── Stamp.renderer.js<br>
 │    │    └── Stamp.manager.js<br>
 │    ├── /templates<br>
 │    └── /workshop<br>
 └── /ui                      # Assets & UI Komponenten<br>
      ├── /fontawesome<br>
      ├── /pics<br>
      ├── ClassMap.js<br>
      ├── style.css<br>
      ├── UiOutput.js<br>
      └── UiPanelManager.js<br>
<br>

📜 Lizenz & Credits

Lizenz: AGPL-3.0

Copyright: (c) 2026 DTechniker

Autor: DTechniker Modularer Denker. UI-Architekt. Pixel-Perfektionist.
