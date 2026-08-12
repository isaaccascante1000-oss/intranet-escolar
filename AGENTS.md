# AGENTS.md — Memoria del Agente de IA

## 1. Contexto
Este proyecto consiste en el desarrollo de un prototipo funcional de **Intranet Escolar** para un centro educativo o colegio público. El sistema permite gestionar roles de usuario (administración, docentes, estudiantes/familias), consultar y registrar calificaciones, así como publicar avisos institucionales. 

El proyecto vive en una arquitectura *Frontend Vanilla* (HTML5, CSS3, JavaScript ES6+) e incluye una infraestructura completa de documentación en Markdown dentro del mismo repositorio Git.

## 2. Requerimientos

### Requerimientos Funcionales
- [x] **Autenticación por roles:** Sistema de inicio de sesión que identifique si el usuario es `admin`, `docente` o `estudiante`.
- [x] **Gestión de usuarios:** Módulo exclusivo para administración donde se pueda simular el alta, baja y edición de personas.
- [x] **Módulo académico:** Interfaz para que los docentes registren calificaciones o asistencia, y los estudiantes las consulten.
- [x] **Tablón de comunicados:** Espacio público interno para publicar y leer circulares u avisos oficiales del colegio.
- [x] **Consulta según rol:** Restricción visual de componentes según el tipo de usuario autenticado.

### Requerimientos No Funcionales
- [x] **Interfaz accesible:** Alto contraste, navegación limpia y etiquetas semánticas HTML5.
- [x] **Protección de datos:** No exponer información personal innecesaria o sensible.
- [x] **Control de versiones:** Commits frecuentes y significativos usando sintaxis Conventional Commits.

## 3. Reglas
- **Sintaxis de código:** Usar JavaScript moderno (ES6+), evitando var y utilizando `const` o `let`.
- **Estructura HTML:** Utilizar etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- **Nombres descriptivos:** Aplicar `camelCase` para variables y funciones en JS, y `kebab-case` para clases CSS y archivos.
- **Documentación:** Mantener todos los archivos `.md` sincronizados conforme el código evolucione.

## 4. Restricciones
- **Sin frameworks pesados:** No usar React, Angular o Vue; el proyecto se resuelve con HTML, CSS y JS vanilla para evaluar lógica pura.
- **Sin datos sensibles reales:** Usar exclusivamente datos ficticios de prueba (mock data).
- **Prohibido commit único:** No subir todo el trabajo en un solo commit al finalizar. Se requiere un historial limpio y progresivo.
- **Consistencia en Markdown:** Utilizar únicamente un encabezado principal `#` (H1) por documento.

## 5. Objetivos
- Alcanzar el 100% de cobertura en los requerimientos mínimos del prototipo web.
- Construir un repositorio de nivel profesional con la documentación Markdown completamente estructurada bajo estándares GFM (GitHub Flavored Markdown).
- Demostrar el uso adecuado de Git en la administración de ramas y registro de historial.

## 6. Memoria del Proyecto
- **Persistencia de sesión:** Se decidió utilizar `localStorage` del navegador para simular la persistencia de la sesión activa y los datos cargados de usuarios/notas, evitando la complejidad de configurar un servidor Backend completo.
- **Separación de documentos:** Se optó por mantener los requerimientos y la arquitectura en la carpeta `docs/` para no saturar la raíz del repositorio, dejando en la raíz únicamente los archivos de estándar abierto (`README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `AGENTS.md`).

## 7. Buenas Prácticas
- **Formato Markdown:** Dejar siempre una línea en blanco entre bloques de texto, listas y tablas para garantizar legibilidad en texto plano (crudo).
- **Etiquetado de código:** Especificar el lenguaje en cada bloque de código (ej. ```js, ```html, ```bash).
- **Control de Cambios:** Escribir mensajes de commit concisos y descriptivos en tiempo presente imperativo (ej. `feat: agrega formulario de notas`).