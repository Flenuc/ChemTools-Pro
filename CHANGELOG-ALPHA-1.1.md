# CHANGELOG - Versión Alpha-1.1  
**ChemTools Pro** | Fecha: 10/03/2025

---

## **Resumen de la Versión**  
La Alpha-1.1 consolida las integraciones fundamentales entre componentes y añade funcionalidades clave para gestión de usuarios y compuestos químicos. Principales avances respecto a Alpha-1.0:

---

## **Novedades y Mejoras**  

### **1. Frontend**  
| **Componente**               | **Cambio**                                                                 |  
|-------------------------------|----------------------------------------------------------------------------|  
| `UserMenu.tsx`               | Menú desplegable con registro/login y gestión de usuario autenticado (nuevo). |  
| `CompoundsPage.tsx`          | Listado interactivo de compuestos con operaciones CRUD (nuevo).             |  
| `Navbar.tsx`                 | Rediseñado con navegación unificada y responsive (mejorado).                |  
| `NotificationSnackbar.tsx`   | Sistema de notificaciones integrado (nuevo).                                |  

---

### **2. Backend Node.js**  
| **Módulo**             | **Implementación**                                                         |  
|------------------------|----------------------------------------------------------------------------|  
| Autenticación          | Registro/login de usuarios con hashing de contraseñas (bcryptjs).          |  
| CRUD Compuestos        | Endpoints para crear, leer, actualizar y eliminar compuestos químicos.     |  
| Middleware             | Validación básica de tokens (sistema temporal con `token-valido`).         |  
| Comunicación Python    | Integración con Backend Python para cálculos químicos en tiempo real.       |  

---

### **3. Backend Python**  
| **Característica**      | **Detalle**                                                                |  
|-------------------------|----------------------------------------------------------------------------|  
| Cálculo masa molar      | Endpoint `/api/calculate/molar-mass` con SymPy y datos atómicos.           |  
| Conversión de unidades  | Endpoint `/api/convert-units` para transformaciones básicas (g ↔ mol).     |  
| Validación fórmulas     | Uso de expresiones regulares y SymPy para verificar fórmulas químicas.     |  

---

### **4. Integraciones Clave**  
| **Entre Componentes**          | **Funcionalidad**                                                     |  
|--------------------------------|------------------------------------------------------------------------|  
| Frontend ↔ Node.js             | Registro de usuarios y gestión completa de compuestos químicos.        |  
| Node.js ↔ Python               | Cálculo automático de masa molar al crear/actualizar compuestos.       |  
| Docker                         | Comunicación entre contenedores mediante red bridge (`chemtools-network`). |  

---

## **Cambios Técnicos Relevantes**  
### **Estructura de Archivos**  
```plaintext
frontend/src/pages/  
├── CompoundsPage.tsx         # CRUD de compuestos (nuevo)  
├── LoginForm.tsx             # Autenticación (nuevo)  
backend-node/src/  
├── middleware/authMiddleware.ts # Gestión de tokens (nuevo)  
backend-python/app/  
├── services/                 # Lógica de cálculos químicos (nuevo)  

Pruebas Realizadas
Escenario	Resultado
Registro de usuario	Usuario almacenado en MongoDB con contraseña hasheada.
Cálculo masa molar (H₂O)	18.02 g/mol recibido desde Python → Mostrado en Frontend.
Eliminación de compuesto	Eliminación persistente en MongoDB.
Comunicación entre backends	Tiempo de respuesta < 500ms para cálculos.
Limitaciones Actuales
Autenticación: Token estático (token-valido) en lugar de JWT.

Seguridad: No se utiliza HTTPS para las comunicaciones.

Validaciones: Fórmulas químicas no se verifican en Frontend.

Docker: Configuración básica sin escalabilidad horizontal.

Próximos Pasos (Alpha-2.0)
Implementar autenticación JWT con refresh tokens.

Añadir validación en tiempo real de fórmulas químicas en formularios.

Mejorar los cálculos químicos con RDKit para estructuras moleculares.

Implementar historial de operaciones por usuario.

Cómo Probar Esta Versión

# Construir y ejecutar
docker-compose up --build

# Accesos:
- Frontend: http://localhost:3000
- Node.js API: http://localhost:4000/api/health
- Python API: http://localhost:5000/api/health