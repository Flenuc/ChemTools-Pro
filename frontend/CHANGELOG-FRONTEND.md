# CHANGELOG - Frontend (Alpha-1.1)

Este documento describe los cambios realizados en el Frontend para la versión Alpha-1.1 de ChemTools Pro. La versión Alpha-1.1 se enfoca en la creación de componentes básicos, la implementación de la navegación y el diseño responsivo.

---

## Cambios realizados

### 1. Creación de componentes estructurales
Se crearon los siguientes componentes en la carpeta `src/components/common/`:

- **Navbar.tsx**: Barra de navegación superior con enlaces a la página de inicio y la tabla periódica.
- **Footer.tsx**: Pie de página con información de derechos de autor.
- **FormularioEjemplo.tsx**: Componente base para formularios, con campos de texto y un botón de envío.

### 2. Diseño de la página de la tabla periódica básica
Se implementó la página de la tabla periódica en `src/pages/PeriodicTablePage.tsx`:
- Muestra una versión estática de la tabla periódica usando datos de un archivo JSON (`src/data/elements.json`).
- Utiliza `Grid` y `Paper` de Material-UI para un diseño responsivo y visualmente atractivo.

### 3. Configuración de la navegación y diseño responsivo
Se configuró la navegación en `src/App.tsx`:
- Se integró `react-router-dom` para manejar las rutas de la aplicación.
- Se definieron las siguientes rutas:
  - `/`: Página de inicio (`HomePage.tsx`).
  - `/periodic-table`: Página de la tabla periódica (`PeriodicTablePage.tsx`).
  - `*`: Página de error 404 (`NotFoundPage.tsx`).

### 4. Creación de la página de inicio
Se implementó la página de inicio en `src/pages/HomePage.tsx`:
- Muestra un mensaje de bienvenida y un botón para acceder a la tabla periódica.
- Diseño centrado y responsivo usando Material-UI.

### 5. Instalación de dependencias
Se instalaron las siguientes dependencias necesarias:
- `@mui/material`, `@emotion/react`, `@emotion/styled`: Para el diseño y los componentes de Material-UI.
- `react-router-dom`: Para la navegación entre páginas.

---

## Estructura de archivos actualizada

├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── common/
│   │   │       ├── Navbar.tsx        [NUEVO]
│   │   │       ├── Footer.tsx        [NUEVO]
│   │   │       └── FormularioEjemplo.tsx [NUEVO]
│   │   ├── config/
│   │   ├── data/                     [NUEVO]
│   │   │   └── elements.json         [NUEVO]
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── HomePage.tsx          [NUEVO]
│   │   │   ├── NotFoundPage.tsx      [NUEVO]
│   │   │   └── PeriodicTablePage.tsx [NUEVO]
│   │   ├── services/
│   │   │   └── api.ts               [NUEVO]
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.css
│   │   ├── App.tsx                  [MODIFICADO]
│   │   ├── App.test.tsx
│   │   ├── index.css
│   │   ├── index.tsx
│   │   ├── react-app-env.d.ts
│   │   ├── reportWebVitals.ts
│   │   └── setupTests.ts
│   ├── .gitignore
│   ├── CHANGELOG-FRONTEND.md        [NUEVO]
│   ├── Dockerfile
│   ├── package.json                [MODIFICADO]
│   ├── README.md
│   └── tsconfig.json


---

## Pruebas realizadas

1. **Navegación:**
   - Se verificó que las rutas `/`, `/periodic-table` y rutas no existentes funcionen correctamente.
   - Se confirmó que el botón de la página de inicio redirige a la tabla periódica.

2. **Diseño responsivo:**
   - Se comprobó que los componentes se adaptan correctamente a diferentes tamaños de pantalla (móvil, tablet, escritorio).

3. **Componentes visuales:**
   - Se validó que el Navbar y Footer aparecen en todas las páginas.
   - Se aseguró que los estilos de Material-UI se aplican correctamente.

---

## Próximos pasos

Para la versión Alpha-2.0, se planea:
- Agregar interactividad a la tabla periódica (ej. mostrar detalles al hacer clic en un elemento).
- Implementar la página de la calculadora de disoluciones.
- Integrar el Frontend con el Backend para cargar datos dinámicos.

---

## Notas adicionales

- Se recomienda mantener actualizado el archivo `elements.json` con datos completos de los elementos químicos.
- Se sugiere agregar pruebas unitarias para los componentes en futuras versiones.
