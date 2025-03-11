import numpy as np

def convert_units(value: float, from_unit: str, to_unit: str, molar_mass: float = 18.02) -> float:
    if from_unit == "g" and to_unit == "mol":
        return value / molar_mass  # Ejemplo: 18 g de H2O → 1 mol
    elif from_unit == "mol" and to_unit == "g":
        return value * molar_mass
    else:
        raise ValueError("Unidades no soportadas")