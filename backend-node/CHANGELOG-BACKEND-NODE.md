# CHANGELOG - Backend Node.js (Alpha-1.1)

Este documento describe los cambios realizados en el backend de Node.js para la versión Alpha-1.1 de ChemTools Pro. La versión Alpha-1.1 se enfoca en la implementación de un sistema de autenticación funcional, incluyendo registro y login de usuarios, con hashing seguro de contraseñas, y la creación de un módulo para gestionar compuestos químicos.

---

## Cambios realizados

### 1. Implementación del sistema de autenticación

Se implementó un sistema de autenticación que incluye registro y login de usuarios, con hashing seguro de contraseñas utilizando `bcryptjs`.

#### a. **Registro de usuarios:**
- **Controlador `registerUser` en `userController.ts`:**
  - Validación de campos obligatorios (username, email, password).
  - Verificación de que el usuario no exista previamente en la base de datos.
  - Creación de un nuevo usuario con la contraseña hasheada automáticamente mediante un middleware `pre-save`.

#### b. **Login de usuarios:**
- **Controlador `loginUser` en `userController.ts`:**
  - Validación de credenciales (email y password).
  - Comparación de la contraseña proporcionada con el hash almacenado en la base de datos utilizando el método `comparePassword` del modelo `User`.

---

### 2. Mejoras en el modelo de usuario (`User.ts`)

Se realizaron mejoras en el modelo de usuario para garantizar la seguridad y consistencia de los datos.

#### a. **Middleware `pre-save`:**
- Se añadió un middleware que se ejecuta antes de guardar un usuario en la base de datos.
- Este middleware hashea la contraseña utilizando `bcryptjs` antes de almacenarla.

#### b. **Método `comparePassword`:**
- Se implementó un método personalizado en el esquema de usuario para comparar la contraseña proporcionada durante el login con el hash almacenado en la base de datos.

#### c. **Validaciones adicionales:**
- Validación de formato de email.
- Validación de longitud mínima y máxima para el username y la contraseña.

---

### 3. Implementación del módulo de compuestos químicos

Se implementó un módulo para gestionar compuestos químicos, incluyendo operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

#### a. **Modelo de compuesto (`Compound.ts`):**
- **Interfaz `ICompound`:** Define la estructura de un compuesto químico, incluyendo propiedades como nombre, fórmula y propiedades físicas (masa molar, densidad, punto de fusión, punto de ebullición).
- **Esquema `CompoundSchema`:** Define la estructura del documento en MongoDB, con validaciones y campos opcionales para las propiedades físicas.
- **Timestamps:** Se añadieron campos `createdAt` y `updatedAt` para rastrear la creación y actualización de los compuestos.

#### b. **Controlador de compuestos (`compoundController.ts`):**
- **Crear un compuesto (`createCompound`):** Permite crear un nuevo compuesto en la base de datos.
- **Obtener todos los compuestos (`getCompounds`):** Devuelve una lista de todos los compuestos almacenados.
- **Actualizar un compuesto (`updateCompound`):** Permite actualizar los datos de un compuesto existente.
- **Eliminar un compuesto (`deleteCompound`):** Elimina un compuesto de la base de datos.

#### c. **Rutas de compuestos (`compoundRoutes.ts`):**
- **POST `/api/compounds`:** Crea un nuevo compuesto.
- **GET `/api/compounds`:** Obtiene todos los compuestos.
- **PUT `/api/compounds/:id`:** Actualiza un compuesto existente.
- **DELETE `/api/compounds/:id`:** Elimina un compuesto.

#### Se implementó un middleware de autenticación temporal que valida tokens en las rutas protegidas.  
**Funcionalidad actual**:
- Valida que el token enviado en el header `Authorization` sea exactamente `token-valido`.
- Si el token es válido, permite el acceso a la ruta protegida.
- Si el token es inválido o no se proporciona, devuelve un error `401 Unauthorized`.

**Código del middleware**:
```typescript
export const validateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;
  if (!token || token !== "token-valido") {
    res.status(401).json({ message: "Acceso no autorizado" });
    return;
  }
  next();
};
---

### 4. Ruta de salud (`healthRoutes.ts`)

Se implementó una ruta de salud para verificar el estado del servidor.

- **GET `/api/health`:** Devuelve un mensaje indicando que el servidor está en funcionamiento.
  ```json
  { "status": "OK", "message": "Node.js API running" }

├── backend-node/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts         [NUEVO]
│   │   ├── controllers/
│   │   │   ├── userController.ts   [NUEVO]
│   │   │   └── compoundController.ts [NUEVO]
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts   [NUEVO]
│   │   ├── models/
│   │   │   ├── User.ts            [NUEVO]
│   │   │   └── Compound.ts        [NUEVO]
│   │   ├── routes/
│   │   │   ├── healthRoutes.ts    [NUEVO]
│   │   │   ├── userRoutes.ts      [NUEVO]
│   │   │   └── compoundRoutes.ts  [NUEVO]
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.ts                 [MODIFICADO]
│   ├── CHANGELOG-BACKEND-NODE.md   [NUEVO]
│   ├── Dockerfile
│   ├── package.json               [MODIFICADO]
│   ├── tsconfig.json             [NUEVO]
│   └── tsconfig.esm.json         [NUEVO]

6. Pruebas realizadas

    1. Ruta de salud (/api/health):
    Invoke-WebRequest -Uri http://localhost:4000/api/health -Method GET

    Debería devolver:

    { "status": "OK", "message": "Node.js API running" }

    2. Registro de usuario (/api/users/register):
    Invoke-WebRequest -Uri http://localhost:4000/api/users/register -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"username": "test", "email": "test@example.com", "password": "password123"}'

    Debería devolver:

    { "success": true, "message": "Usuario registrado" }


    3. Autenticación de usuario (/api/users/login):

    Invoke-WebRequest -Uri http://localhost:4000/api/users/login -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"email": "test@example.com", "password": "password123"}'

    Debería devolver:

    { "success": true, "message": "Autenticación exitosa" }

    4. Operaciones CRUD de compuestos
        * Crear un compuesto:
            Invoke-WebRequest -Uri "http://localhost:4000/api/compounds" -Method POST -Headers @{ "Content-Type"="application/json"; "Authorization"="token-valido"} -Body '{"name": "Agua", "formula": "H2O"}'

        * Obtener todos los compuestos:

        Invoke-WebRequest -Uri "http://localhost:4000/api/compounds" -Method GET -Headers @{ "Authorization"="token-valido" }

        * Actualizar un compuesto (reemplazar :id con el ID real):

        Invoke-WebRequest -Uri "http://localhost:4000/api/compounds/:id" -Method PUT -Headers @{ "Content-Type"="application/json"; "Authorization"="token-valido"} -Body '{"name":"Agua", "formula": "H2O", "properties": { "molarMass": 18.015 }}'

        * Eliminar un compuesto (reemplazar :id con el ID real):

        Invoke-WebRequest -Uri "http://localhost:4000/api/compounds/:id" -Method DELETE -Headers @{ "Authorization"="token-valido"}

        * Notas importantes
        Propósito del token estático:
        El token token-valido es una implementación temporal para pruebas. En futuras versiones se reemplazará por un sistema de autenticación JWT dinámico.

        * Errores comunes:

            Si el token no se envía, se recibirá 401 Unauthorized.

            Si el token es incorrecto, se recibirá 401 Unauthorized.