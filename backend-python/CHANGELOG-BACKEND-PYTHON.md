# CHANGELOG - Backend Python (Alpha-1.1)

Este documento detalla los cambios realizados en el backend de Python para la versión Alpha-1.1 de ChemTools Pro, incluyendo nuevos endpoints, correcciones de errores y mejoras técnicas.

---

## Cambios Realizados

### 1. Implementación de Endpoints Químicos  
- **Nuevos endpoints**:  
  - `POST /api/calculate/molar-mass`: Calcula la masa molar de una fórmula química.  
  - `POST /api/convert-units`: Convierte unidades químicas (ej: gramos a moles).  
- **Lógica**:  
  - Validación de fórmulas químicas mediante expresiones regulares.  
  - Cálculo de masa molar usando datos de `atomic_weights.json`.  
  - Conversión de unidades básica (ej: `g` ↔ `mol`).  

---

### 2. Integración de Librerías Científicas  
- **SymPy**: Validación sintáctica de fórmulas químicas.  
- **NumPy**: Operaciones numéricas en conversiones de unidades.  

---

### 3. Correcciones de Errores  
- **Rutas 404**:  
  - Registro correcto de blueprints en Flask.  
  - Prefijo `/api` aplicado a todas las rutas químicas.  
- **Cálculo de masa molar**:  
  - Uso de regex para extraer elementos y cantidades (ej: `H2O` → `[('H', '2'), ('O', '')]`).  
  - Resultados precisos usando datos de `atomic_weights.json`.  

---

### 4. Mejoras en la Estructura  
```plaintext

├── backend-python/
│   ├── app/
│   │   ├── __init__.py           [MODIFICADO]
│   │   ├── __main__.py           [NUEVO]
│   │   ├── data/                 [NUEVO]
│   │   │   └── atomic_weights.json [NUEVO]
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── chemistry_routes.py [NUEVO]
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── formula_validator.py [NUEVO]
│   │   │   ├── molar_mass_calculator.py [NUEVO]
│   │   │   └── unit_converter.py   [NUEVO]
│   │   ├── utils/
│   │   │   ├── __init__.py
│   │   │   └── exceptions.py       [NUEVO]
│   │   └── config.py              [MODIFICADO]
│   ├── CHANGELOG-BACKEND-PYTHON.md [NUEVO]
│   ├── Dockerfile
│   ├── README.md
│   └── requirements.txt           [MODIFICADO]

Pruebas Realizadas
1. Cálculo de Masa Molar
Comando (PowerShell):

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/calculate/molar-mass" `
    -Method POST `
    -Headers @{ "Content-Type" = "application/json" } `
    -Body '{"formula": "H2O"}' `
    -UseBasicParsing
$response.Content

Resultado Esperado:

{"result": 18.02}

2. Conversión de Unidades
Comando (PowerShell):

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/convert-units" `
    -Method POST `
    -Headers @{ "Content-Type" = "application/json" } `
    -Body '{"value": 18, "from_unit": "g", "to_unit": "mol"}' `
    -UseBasicParsing
$response.Content

Resultado Esperado:

{"result": 1.0}  # Asumiendo masa molar de 18.02 g/mol

3. Errores Controlados
Escenario	Respuesta
Fórmula inválida (H2X)	{"error": "Fórmula inválida"} (400)
Unidades no soportadas	{"error": "Unidades no compatibles"} (400)
Próximos Pasos
Integrar JWT para autenticación en endpoints.

Implementar conexión a MongoDB para cargar datos de masa atómica dinámicamente.

Mejorar la conversión de unidades con factores reales (ej: densidad, volumen).