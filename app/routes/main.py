from flask import Blueprint, render_template, request, redirect, url_for, session
from app.translations import translate, get_language, set_language

bp = Blueprint('main', __name__)

@bp.route('/')
def home():
    """Página principal"""
    return render_template('home.html')

@bp.route('/set_language/<lang>')
def set_lang(lang):
    """Cambiar el idioma de la aplicación"""
    set_language(lang)
    # Redirigir a la página desde donde se hizo la solicitud o al home
    return redirect(request.referrer or url_for('main.home'))
