from flask import Blueprint, render_template
from app.models import Lesson

bp = Blueprint('learn', __name__, url_prefix='/learn')

@bp.route('/')
def learn():
    """Página de aprendizaje"""
    # Obtener lecciones activas, ordenadas por nivel y luego por título
    lessons = Lesson.query.filter_by(active=True).order_by(Lesson.level, Lesson.title).all()
    
    # Agrupar lecciones por nivel
    lessons_by_level = {
        'beginner': [],
        'intermediate': [],
        'advanced': []
    }
    
    for lesson in lessons:
        level_key = lesson.level.lower()
        if level_key in lessons_by_level:
            lessons_by_level[level_key].append(lesson)
        else:
            # Si el nivel no coincide, agregarlo a beginner por defecto
            lessons_by_level['beginner'].append(lesson)
    
    return render_template('learn.html', lessons_by_level=lessons_by_level, total_lessons=len(lessons))
