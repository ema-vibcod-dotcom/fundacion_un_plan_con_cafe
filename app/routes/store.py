from flask import Blueprint, render_template
from app.models import Product

bp = Blueprint('store', __name__, url_prefix='/store')

@bp.route('/')
def store():
    """Página de tienda"""
    # Obtener solo productos activos, ordenados por nombre
    products = Product.query.filter_by(active=True).order_by(Product.name).all()
    return render_template('store.html', products=products)
