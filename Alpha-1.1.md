# Documentación de la Versión Alpha-1.1 (Articulaciones)

## 1. Introducción

La versión Alpha-1.1 tiene como objetivo articular los cimientos establecidos en Alpha-1.0, agregando funcionalidades básicas de interacción y ampliando la infraestructura para que los módulos del frontend, backend (Node.js y Python) y la base de datos trabajen en conjunto. Esta etapa se centra en implementar componentes UI más avanzados, endpoints funcionales y la creación y poblamiento de esquemas en la base de datos.

## 2. Objetivos de la Versión Alpha-1.1

### Frontend
- Desarrollar componentes UI avanzados (ej. navbar, footer, formularios).
- Crear páginas visuales para la tabla periódica básica y formularios de entrada de datos.
- Implementar navegación completa y diseño responsivo usando Material-UI o Bootstrap.

### Backend Node.js
- Desarrollar endpoints funcionales:
  - Registro y autenticación básica de usuarios.
  - Operaciones CRUD para compuestos químicos.
  - Validación de datos mediante middleware de seguridad.

### Backend Python
- Implementar endpoints para cálculos químicos básicos:
  - Conversión de unidades.
  - Cálculo de masa molar.
  - Validación de fórmulas químicas.
- Integrar librerías científicas (NumPy, SymPy) para los cálculos.

### Base de Datos
- Crear e implementar esquemas completos para:
  - Usuarios (perfil, preferencias).
  - Compuestos químicos básicos.
  - Historial de cálculos.
- Poblar la base de datos con datos iniciales para pruebas.

## 3. Flujo de Trabajo General

1. **Planificación y Definición de Requerimientos**
2. **Diseño de la Arquitectura y Esquemas**
3. **Desarrollo Paralelo** (Frontend, Backend Node.js, Backend Python, Base de Datos)
4. **Integración y Pruebas**
5. **Contenedorización y Despliegue**

## 4. Descripción de Tareas y Pseudocódigo

### 4.1. Frontend

```pseudo
Función RenderMainLayout():
    Mostrar(Navbar)
    Mostrar(Contenido basado en la Ruta Actual)
    Mostrar(Footer)
```

### 4.2. Backend Node.js

```pseudo
Función Endpoint_RegistroUsuario(request):
    datosUsuario = ExtraerDatos(request)
    Si Validar(datosUsuario) es True:
         Crear nuevo usuario en BaseDeDatos
         Devolver { success: True, message: "Usuario registrado" }
    Sino:
         Devolver { success: False, message: "Error en la validación" }
```

### 4.3. Backend Python

```pseudo
Función Endpoint_CalcularMasaMolar(request):
    fórmula = ExtraerFormula(request)
    Si ValidarFormula(fórmula):
         masaMolar = CalcularMasa(fórmula)
         Devolver { result: masaMolar }
    Sino:
         Devolver { error: "Fórmula inválida" }
```

### 4.4. Base de Datos

```pseudo
Definir Esquema_Usuario:
    username: String
    email: String
    password: String
    fechaCreacion: Date
```

## 5. Integración y Pruebas

```pseudo
Función Test_EndpointHealth():
    respuesta = EnviarPeticion(GET, "/api/health")
    Verificar(respuesta.status == "OK")
```

## 6. Contenedorización y Despliegue

```pseudo
Definir servicios en docker-compose.yml:
    servicio_frontend: construir desde ./frontend, exponer puerto 80
    servicio_backend_node: construir desde ./backend-node, exponer puerto 4000
    servicio_backend_python: construir desde ./backend-python, exponer puerto 5000
    servicio_mongodb: imagen de mongo, exponer puerto 27017
```

## 7. Plan para la Siguiente Versión: Alpha-2.0

- Desarrollo de la tabla periódica interactiva con datos dinámicos.
- Implementación de la calculadora de disoluciones en Python.
- Almacenamiento optimizado de datos en MongoDB.

```pseudo
Función CalcularDisolucion():
    entrada = ExtraerDatosFormulario()
    resultado = AplicarFormulaDisolucion(entrada)
    Devolver(resultado)
```

## 8. Conclusiones

La versión Alpha-1.1 sienta las bases para la interacción y articulación de los módulos del proyecto ChemTools Pro, asegurando una integración coherente y organizada para futuras mejoras.

