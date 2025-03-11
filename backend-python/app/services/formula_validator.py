from sympy.parsing.sympy_parser import parse_expr
from sympy import SympifyError

def validate_formula(formula: str) -> bool:
    try:
        # Usar SymPy para validar sintaxis básica
        parsed = parse_expr(formula.replace(' ', ''), evaluate=False)
        return True
    except SympifyError:
        return False