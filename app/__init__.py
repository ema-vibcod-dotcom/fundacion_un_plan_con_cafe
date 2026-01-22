from flask import Flask, g
from config import Config
from app.models import db
from app.translations import translate, get_language

def create_app(config_class=Config):
    """App factory para crear instancias de Flask"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Inicializar SQLAlchemy
    db.init_app(app)
    
    # Crear tablas de base de datos
    with app.app_context():
        db.create_all()
    
    # Contexto de template para traducciones
    @app.context_processor
    def inject_translations():
        """Inyecta la función translate en todos los templates"""
        return dict(translate=translate, current_language=get_language())
    
    # Registrar blueprints
    from app.routes.main import bp as main_bp
    app.register_blueprint(main_bp)
    
    from app.routes.donations import bp as donations_bp
    app.register_blueprint(donations_bp)
    
    from app.routes.store import bp as store_bp
    app.register_blueprint(store_bp)
    
    from app.routes.learn import bp as learn_bp
    app.register_blueprint(learn_bp)
    
    from app.routes.podcast import bp as podcast_bp
    app.register_blueprint(podcast_bp)
    
    return app
