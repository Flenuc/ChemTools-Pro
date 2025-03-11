# backend-python\app\__main__.py

from app import create_app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=5000)

# backend-python\app\config.py

import os
from pymongo import MongoClient

MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/chemtools')

def get_db_connection():
    client = MongoClient(MONGO_URI)
    db = client.get_database()
    return db

# backend-python\app\__init__.py

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    from .routes.chemistry_routes import chemistry_bp
    # Registrar Blueprints
    app.register_blueprint(chemistry_bp, url_prefix="/api")
    
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return {'status': 'OK', 'message': 'Python API running'}
    
    @app.route('/api/calculate/simple', methods=['POST'])
    def simple_calculation():
        return {'result': 'Calculation placeholder'}
    
    return app

# backend-python\app\data\atomic_weights.json

{
    "H": 1.008,
    "O": 16.00,
    "C": 12.01,
    "Na": 22.99,
    "Cl": 35.45
  }

# backend-python\app\routes\chemistry_routes.py

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

# backend-python\app\services\formula_validator.py

from sympy.parsing.sympy_parser import parse_expr
from sympy import SympifyError

def validate_formula(formula: str) -> bool:
    try:
        # Usar SymPy para validar sintaxis básica
        parsed = parse_expr(formula.replace(' ', ''), evaluate=False)
        return True
    except SympifyError:
        return False

# backend-python\app\services\molar_mass_calculator.py

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

# backend-python\app\services\unit_converter.py 

import numpy as np

def convert_units(value: float, from_unit: str, to_unit: str, molar_mass: float = 18.02) -> float:
    if from_unit == "g" and to_unit == "mol":
        return value / molar_mass  # Ejemplo: 18 g de H2O → 1 mol
    elif from_unit == "mol" and to_unit == "g":
        return value * molar_mass
    else:
        raise ValueError("Unidades no soportadas")