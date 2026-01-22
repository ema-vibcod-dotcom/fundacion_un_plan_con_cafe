from flask import Blueprint, render_template
from app.models import PodcastEpisode

bp = Blueprint('podcast', __name__, url_prefix='/podcast')

@bp.route('/')
def podcast():
    """Página de podcast"""
    # Obtener episodios ordenados por fecha (más recientes primero)
    episodes = PodcastEpisode.query.order_by(PodcastEpisode.created_at.desc()).all()
    return render_template('podcast.html', episodes=episodes)
