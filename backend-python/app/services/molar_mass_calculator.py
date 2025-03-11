import json
import json
from pathlib import Path
import re  # Añadir regex para procesar fórmulas

def calculate_molar_mass(formula: str) -> float:
    data_path = Path(__file__).parent.parent / 'data' / 'atomic_weights.json'
    with open(data_path, 'r') as f:
        atomic_weights = json.load(f)
    
    total = 0.0
    # Usar regex para separar elementos y cantidades (ej: "H2O" → [('H', '2'), ('O', '')]
    elements = re.findall(r'([A-Z][a-z]*)(\d*)', formula)
    
    for element, count in elements:
        count = int(count) if count else 1
        total += atomic_weights.get(element, 0) * count
    
    return round(total, 2)