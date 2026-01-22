from flask import Blueprint, render_template, request, flash, redirect, url_for
from app.models import db, Donation
from decimal import Decimal, InvalidOperation

bp = Blueprint('donations', __name__, url_prefix='/donate')

@bp.route('/', methods=['GET', 'POST'])
def donations():
    """Página de donaciones"""
    if request.method == 'POST':
        # Obtener datos del formulario
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        amount_str = request.form.get('amount', '').strip()
        
        # Validaciones
        errors = []
        
        if not name or len(name) < 2:
            errors.append('El nombre debe tener al menos 2 caracteres.')
        
        if not email or '@' not in email:
            errors.append('Por favor ingresa un email válido.')
        
        if not amount_str:
            errors.append('Por favor ingresa un monto.')
        else:
            try:
                amount = Decimal(amount_str)
                if amount <= 0:
                    errors.append('El monto debe ser mayor a cero.')
                elif amount < 1:
                    errors.append('El monto mínimo es $1.00 USD.')
            except (ValueError, InvalidOperation):
                errors.append('Por favor ingresa un monto válido.')
        
        # Si hay errores, mostrarlos
        if errors:
            for error in errors:
                flash(error, 'error')
            return render_template('donations.html', 
                                 name=name, 
                                 email=email, 
                                 amount=amount_str)
        
        # Guardar donación en la base de datos
        try:
            donation = Donation(
                name=name,
                email=email,
                amount_usd=amount
            )
            db.session.add(donation)
            db.session.commit()
            
            # Mensaje de confirmación
            flash(f'¡Gracias {name}! Tu donación de ${amount:.2f} USD ha sido registrada exitosamente.', 'success')
            return redirect(url_for('donations.donations'))
            
        except Exception as e:
            db.session.rollback()
            flash('Ocurrió un error al procesar tu donación. Por favor intenta nuevamente.', 'error')
            return render_template('donations.html', 
                                 name=name, 
                                 email=email, 
                                 amount=amount_str)
    
    # GET request - mostrar formulario
    return render_template('donations.html')
