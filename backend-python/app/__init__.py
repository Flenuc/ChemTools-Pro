from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
  # Importación relativa

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