# Documentación de Integración Backend Node.js ↔ Backend Python  
**ChemTools Pro** | Versión: Alpha-1.1  

---

## **Descripción General**  
Esta integración permite calcular propiedades químicas en tiempo real (ej: masa molar) mediante la comunicación entre el Backend Node.js (gestión de datos) y el Backend Python (cálculos científicos). Los resultados se muestran automáticamente en el Frontend.  

---

## **Arquitectura Técnica**  
```plaintext
[Frontend] → [Node.js] → [Python] → [MongoDB]  
                ↑          ↓  
                └─────Datos calculados────┘  

Componentes Clave
1. Backend Node.js
Rol: Coordina solicitudes, gestiona compuestos en MongoDB y actúa como intermediario con Python.

Endpoints Relevantes:

Endpoint	Acción
POST /api/compounds	Crea compuesto y solicita masa molar a Python.
GET /api/compounds	Devuelve compuestos con masa molar calculada.
2. Backend Python
Rol: Ejecuta cálculos químicos usando SymPy y RDKit.

Endpoints:

Endpoint	Cálculo
POST /api/calculate/molar-mass	Masa molar (ej: H₂O → 18.02).
3. Frontend
Componentes:

CompoundsPage.tsx: Muestra lista de compuestos con masa molar.

CompoundForm.tsx: Envía fórmulas químicas para cálculo.

Flujo de Trabajo
1. Creación de un Compuesto

sequenceDiagram
    Frontend->>Node.js: POST /api/compounds (name, formula)
    Node.js->>Python: POST /api/calculate/molar-mass (formula)
    Python-->>Node.js: { result: 18.02 }
    Node.js->>MongoDB: Guarda compuesto + masa molar
    Node.js-->>Frontend: { name: "Agua", molarMass: 18.02 }

Código de Integración (Node.js → Python)

// Solicitud a Python desde Node.js
const response = await axios.post(
  'http://backend-python:5000/api/calculate/molar-mass',
  { formula: "H2O" }
);

Pruebas Realizadas
Fórmula	Masa Molar Esperada	Resultado
H₂O	18.02	        ✅ 18.02
CO₂	44.01	        ✅ 44.01
Fe₂(CO₃)₃	    	✅ 291.72

Límites Actuales
Dependencia de Python: Si el servicio Python está caído, no se calculan masas molares.

Precisión: Redondeo a 2 decimales en el Frontend.

Validación: No se verifica la validez de fórmulas antes del cálculo.

Próximas Mejoras
Caché de Resultados: Almacenar cálculos frecuentes en Redis.

Tolerancia a Fallos: Reintentar solicitudes a Python si fallan.

Cálculos en Paralelo: Usar RabbitMQ para procesar múltiples fórmulas simultáneamente.


Ejecución del Sistema

# Iniciar todos los servicios
docker-compose up --build

# Acceder al Frontend
http://localhost:3000/compounds