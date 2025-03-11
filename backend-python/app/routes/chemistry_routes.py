from flask import Blueprint, request, jsonify
from ..services.formula_validator import validate_formula
from ..services.molar_mass_calculator import calculate_molar_mass
from ..services.unit_converter import convert_units

chemistry_bp = Blueprint('chemistry', __name__)

@chemistry_bp.route("/calculate/molar-mass", methods=["POST"])
def molar_mass():
    data = request.get_json()
    formula = data.get('formula', '')
    
    if not validate_formula(formula):
        return jsonify({"error": "Fórmula inválida"}), 400
    
    mass = calculate_molar_mass(formula)
    return jsonify({"result": mass}), 200

@chemistry_bp.route("/convert-units", methods=["POST"])
def unit_conversion():
    data = request.get_json()
    try:
        value = float(data["value"])
        from_unit = data["from_unit"]
        to_unit = data["to_unit"]
        result = convert_units(value, from_unit, to_unit)
        return jsonify({"result": round(result, 2)}), 200
    except (KeyError, ValueError) as e:
        return jsonify({"error": str(e)}), 400