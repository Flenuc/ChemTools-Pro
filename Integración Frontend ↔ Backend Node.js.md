# Documentación de Integración Frontend ↔ Backend Node.js (Alpha-1.1)  
**ChemTools Pro** | Versión: Alpha-1.1  

---

## **Descripción General**  
Esta documentación detalla la integración entre el Frontend (React/TypeScript) y el Backend Node.js para las funcionalidades de:  
- Registro y autenticación de usuarios.  
- Operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en compuestos químicos.  

---

## **Componentes Clave**  
### **1. Frontend**  
| **Componente**               | **Función**                                                                 |  
|------------------------------|-----------------------------------------------------------------------------|  
| `UserMenu.tsx`               | Menú desplegable para registro/login (no autenticado) o perfil/logout (autenticado). |  
| `RegistrationForm.tsx`       | Formulario de registro de usuarios.                                         |  
| `LoginForm.tsx`              | Formulario de autenticación de usuarios.                                    |  
| `CompoundsPage.tsx`          | Lista y gestiona compuestos químicos (CRUD).                                |  
| `CompoundForm.tsx`           | Formulario para crear/editar compuestos.                                    |  

---

### **2. Backend Node.js**  
| **Endpoint**                  | **Método** | **Descripción**                                  |  
|-------------------------------|------------|--------------------------------------------------|  
| `/api/users/register`         | POST       | Registra un nuevo usuario.                       |  
| `/api/users/login`            | POST       | Autentica un usuario existente.                  |  
| `/api/compounds`              | GET        | Obtiene todos los compuestos.                    |  
| `/api/compounds`              | POST       | Crea un nuevo compuesto.                         |  
| `/api/compounds/:id`          | PUT        | Actualiza un compuesto existente.                |  
| `/api/compounds/:id`          | DELETE     | Elimina un compuesto.                            |  

---

## **Flujo de Integración**  
### **1. Registro de Usuario**  
```typescript
// Ejemplo de solicitud (Frontend)
await fetch("/api/users/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "test_user",
    email: "test@chem.com",
    password: "password123"
  }),
});

// Respuesta exitosa (Backend)
HTTP 201: { "success": true, "message": "Usuario registrado" }

2. Creación de Compuesto

// Ejemplo de solicitud (Frontend)
await fetch("/api/compounds", {
  method: "POST",
  headers: { 
    "Content-Type": "application/json",
    "Authorization": "token-valido" 
  },
  body: JSON.stringify({ name: "Agua", formula: "H2O" }),
});

// Respuesta exitosa (Backend)
HTTP 201: { "_id": "123", "name": "Agua", "formula": "H2O" }

Pruebas Realizadas
Escenario	                            Resultado Esperado
Registro exitoso	                    Usuario creado en MongoDB. Mensaje: "Usuario registrado exitosamente".
Registro con email duplicado	        Error: "El email ya está registrado".
Creación de compuesto	                Compuesto aparece en /compounds.
Eliminación de compuesto	            Compuesto desaparece de la lista.

Limitaciones Actuales
* Autenticación:

    Uso de un token estático (token-valido) en lugar de JWT dinámico.

* Validación:

    No hay validación en tiempo real de fórmulas químicas en el Frontend.

* Seguridad:

    Las contraseñas se transmiten en texto plano (sin HTTPS).

Próximos Pasos (Alpha-2.0)

Reemplazar el token estático por JWT para autenticación segura.

Añadir validación de fórmulas químicas usando SymPy o Regex.

Implementar HTTPS para cifrar las comunicaciones.

Mejorar la interfaz de usuario con carga de estados y mensajes detallados.

Ejecución del Proyecto

# Iniciar servicios con Docker
docker-compose up --build

# Acceder al Frontend
http://localhost:3000

# Acceder al Backend Node.js
http://localhost:4000/api/health