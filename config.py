import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent

class Config:
    """Configuración base de la aplicación"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or f'sqlite:///{BASE_DIR / "fundacion_un_plan_con_cafe.db"}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
