# Arquitectura del Sistema

Este documento describe la estructura técnica y las decisiones de diseño del prototipo de la **Intranet Escolar**.

---

## Stack Tecnológico

| Capa | Tecnología | Justificación |
| :--- | :--- | :--- |
| **Documentación** | Markdown (GFM) | Estándar portátil para repositorios y agentes de IA |
| **Estructura Web** | HTML5 Semántico | Accesibilidad y compatibilidad sin dependencias |
| **Estilos Visuales** | CSS3 / Flexbox / Grid | Interfaz clara y diseño responsivo |
| **Lógica / Estado** | JavaScript Vanilla (ES6+) | Gestión de eventos, manipulación del DOM y roles |
| **Persistencia Local** | LocalStorage API | Simulación ligera de almacenamiento de datos sin servidor |

---

## Estructura de Directorios

```text
intranet-escolar/
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── AGENTS.md
├── docs/
│   ├── arquitectura.md
│   └── requerimientos.md
└── src/
    ├── index.html
    ├── css/
    │   └── styles.css
    └── js/
        ├── app.js
        └── auth.js