# __init__.py

import os
from flask import Flask, render_template, request, redirect, url_for, session, flash
from dotenv import load_dotenv
from supabase import create_client, Client
from .data import data
from werkzeug.security import generate_password_hash, check_password_hash
import re
import datetime
import uuid

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', os.urandom(24))

# Configuración de Supabase
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
if not url or not key:
    raise RuntimeError("SUPABASE_URL y SUPABASE_KEY deben estar definidos en el entorno")
supabase: Client = create_client(url, key)

@app.route('/')
def index():
    return render_template('index.html', data=data)

@app.route('/asistente')
def asistente():
    if 'user_id' in session:
        return redirect(url_for('perfil'))
    return render_template('asistente.html', data=data)

@app.route('/registro', methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        full_name = request.form.get('full_name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        password = request.form.get('password')

        response = supabase.table('Usuarios').select('id').eq('correo', email).execute()
        if response.data:
            flash('Este correo electrónico ya está registrado.', 'error')
            return redirect(url_for('registro'))

        password_hash = generate_password_hash(password)

        user_data = {
            'id': str(uuid.uuid4()),
            'full_name': full_name,
            'correo': email,
            'telefono': phone,
            'password_hash': password_hash,
            'activo': True,
            'reporte_diario': True,
            'reporte_semanal': True,
            'reporte_mensual': True,
            'donante': True,
            'created_at': datetime.datetime.now().isoformat()
        }
        response = supabase.table('Usuarios').insert(user_data).execute()
        if not hasattr(response, 'data') or not response.data:
            flash('Error al registrar usuario.', 'error')
            return redirect(url_for('registro'))

        new_user_id = response.data[0]['id']
        session['user_id'] = new_user_id
        session['user_name'] = full_name

        flash('¡Registro exitoso! Ya puedes ver tu perfil.', 'success')
        return redirect(url_for('perfil'))

    return render_template('registro.html', data=data)

@app.route('/perfil')
def perfil():
    if 'user_id' not in session:
        flash('Debes iniciar sesión para ver tu perfil.', 'warning')
        return redirect(url_for('asistente'))

    user_id = session['user_id']
    response = supabase.table('Usuarios').select('*').eq('id', user_id).single().execute()
    user_profile = response.data

    if user_profile and user_profile.get('telefono'):
        phone_str = str(user_profile['telefono'])
        phone_cleaned = re.sub(r'[\s+()-]', '', phone_str)
        user_profile['whatsapp_link'] = f"https://wa.me/{phone_cleaned}"

    return render_template('perfil.html', user=user_profile, data=data)

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('user_name', None)
    flash('Has cerrado sesión exitosamente.', 'info')
    return redirect(url_for('asistente'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        response = supabase.table('Usuarios').select('*').eq('correo', email).single().execute()
        user = response.data

        if user and check_password_hash(user['password_hash'], password):
            session['user_id'] = user['id']
            session['user_name'] = user['full_name']
            flash('Inicio de sesión exitoso.', 'success')
            return redirect(url_for('perfil'))
        else:
            flash('Correo o contraseña incorrectos.', 'error')
            return redirect(url_for('login'))

    return render_template('login.html', data=data)

# Datos de ejemplo para el perfil del usuario
@app.route('/datos_ejemplo')
def datos_ejemplo():
    return render_template('perfil.html', user={
        'full_name': 'Adalberto Casteleiro',
        'correo': 'adalbertoprofe@gmail.com',
        'telefono': '1122334455',
        'password_hash': generate_password_hash('123456'),
        'activo': True,
        'reporte_diario': True,
        'reporte_semanal': True,
        'reporte_mensual': True,
        'donante': True,
        'created_at': datetime.datetime.now().isoformat(),
        'profile_pic': 'https://via.placeholder.com/300',
        'cv_url': '/static/CV_Adalberto_Casteleiro.pdf', # <-- RUTA CORREGIDA
        'contact': {
            'linkedin': 'https://www.linkedin.com/in/adalbertoprofesional/',
            'github': 'https://github.com/adacaste',
            'twitter': 'https://twitter.com/adacaste',
            'instagram': 'https://www.instagram.com/adacaste/'
        }
    }, data=data)

if __name__ == '__main__':
    app.run(debug=True)