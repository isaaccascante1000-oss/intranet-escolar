# Guía de Contribución

Agradecemos las contribuciones al proyecto **Intranet Escolar**. Sigue estos estándares para mantener una colaboración organizada y profesional.

---

## Estrategia de Ramas

Trabajamos con el modelo **Git Flow simplificado**:
- `main`: Código estable e integración final.
- `feature/nombre-funcionalidad`: Para desarrollo de nuevas características.
- `docs/nombre-documento`: Para actualización de documentación.

---

## Convención de Commits

Utilizamos **Conventional Commits** para mantener un historial claro:

* `feat:` Nuevas funcionalidades (ej: `feat: agrega módulo de calificaciones`).
* `fix:` Corrección de errores (ej: `fix: corrige error de inicio de sesión`).
* `docs:` Cambios en la documentación Markdown (ej: `docs: crea README.md`).
* `style:` Ajustes visuales o de formato CSS sin alterar lógica.

---

## Flujo de Pull Requests (PR)

1. Crea una rama dedicada para tu trabajo:
   ```bash
   git checkout -b feature/tablon-avisos