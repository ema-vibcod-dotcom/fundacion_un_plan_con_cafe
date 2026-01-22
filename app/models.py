from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Donation(db.Model):
    """Modelo para donaciones"""
    __tablename__ = 'donations'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    amount_usd = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    def __repr__(self):
        return f'<Donation {self.id}: {self.name} - ${self.amount_usd}>'
    
    def to_dict(self):
        """Convierte el modelo a diccionario"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'amount_usd': float(self.amount_usd),
            'created_at': self.created_at.isoformat()
        }


class Product(db.Model):
    """Modelo para productos de la tienda"""
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price_usd = db.Column(db.Numeric(10, 2), nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    active = db.Column(db.Boolean, default=True, nullable=False)
    
    def __repr__(self):
        return f'<Product {self.id}: {self.name} - ${self.price_usd}>'
    
    def to_dict(self):
        """Convierte el modelo a diccionario"""
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price_usd': float(self.price_usd),
            'image_url': self.image_url,
            'active': self.active
        }


class PodcastEpisode(db.Model):
    """Modelo para episodios de podcast"""
    __tablename__ = 'podcast_episodes'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    audio_url = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    def __repr__(self):
        return f'<PodcastEpisode {self.id}: {self.title}>'
    
    def to_dict(self):
        """Convierte el modelo a diccionario"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'audio_url': self.audio_url,
            'created_at': self.created_at.isoformat()
        }


class Lesson(db.Model):
    """Modelo para lecciones de bilingüismo"""
    __tablename__ = 'lessons'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    level = db.Column(db.String(50), nullable=False)  # Ej: 'beginner', 'intermediate', 'advanced'
    active = db.Column(db.Boolean, default=True, nullable=False)
    
    def __repr__(self):
        return f'<Lesson {self.id}: {self.title} - {self.level}>'
    
    def to_dict(self):
        """Convierte el modelo a diccionario"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'level': self.level,
            'active': self.active
        }
