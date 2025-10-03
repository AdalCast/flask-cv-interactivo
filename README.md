# CV Interactivo con Sistema de Asistente Financiero

Aplicación web desarrollada con Flask que presenta un CV profesional interactivo con un sistema integrado de registro y gestión de usuarios para un asistente financiero personal.

## 🚀 Características

- **CV Profesional:** Página principal que muestra experiencia, habilidades y proyectos
- **Sistema de Usuarios:** Registro y login para acceder al asistente financiero
- **Base de Datos:** Integración con Supabase para gestión de usuarios
- **Diseño Responsivo:** Interfaz moderna con Bootstrap 5
- **Seguridad:** Contraseñas encriptadas y sesiones seguras

## 🛠️ Tecnologías Utilizadas

- **Backend:** Flask (Python)
- **Base de Datos:** Supabase (PostgreSQL)
- **Frontend:** HTML5, CSS3, Bootstrap 5, Bootstrap Icons
- **Seguridad:** Werkzeug (hash de contraseñas)
- **Plantillas:** Jinja2

## 📦 Instalación

1. **Clona el repositorio:**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd flask_cv
   ```

2. **Crea y activa un entorno virtual:**
   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # En Windows
   ```

3. **Instala las dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configura las variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   Edita el archivo `.env` y completa con tus credenciales de Supabase.

5. **Ejecuta la aplicación:**
   ```bash
   set FLASK_APP=app
   flask run
   ```

6. **Abre tu navegador en:** `http://127.0.0.1:5000`

## 🗄️ Configuración de Base de Datos

Crea una tabla `Usuarios` en Supabase con la siguiente estructura:

```sql
CREATE TABLE Usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    telefono BIGINT,
    password_hash TEXT NOT NULL,
    activo BOOLEAN DEFAULT true,
    reporte_diario BOOLEAN DEFAULT true,
    reporte_semanal BOOLEAN DEFAULT true,
    reporte_mensual BOOLEAN DEFAULT true,
    donante BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 📁 Estructura del Proyecto

```
flask_cv/
├── app/
│   ├── __init__.py          # Aplicación principal Flask
│   ├── data.py              # Datos del CV
│   ├── static/              # Archivos estáticos (CSS, imágenes, PDF)
│   └── templates/           # Plantillas HTML
├── venv/                    # Entorno virtual (no incluido en el repo)
├── .env                     # Variables de entorno (no incluido en el repo)
├── .env.example             # Ejemplo de configuración
├── requirements.txt         # Dependencias de Python
└── README.md               # Este archivo
```

## 🔧 Funcionalidades

### CV Profesional
- Información personal y profesional
- Habilidades técnicas
- Proyectos destacados
- Experiencia laboral
- Descarga de CV en PDF

### Sistema de Asistente Financiero
- Registro de nuevos usuarios
- Login con email y contraseña
- Perfil de usuario personalizado
- Enlace directo a chat de WhatsApp
- Gestión segura de sesiones

## 🔐 Seguridad

- Contraseñas encriptadas con Werkzeug
- Validación de formularios
- Protección de rutas según autenticación
- Variables de entorno para credenciales sensibles

## 👨‍💻 Autor

**Adalberto Casteleiro Molina**
- Líder de Operaciones y Desarrollador de Software
- Especialista en automatización e IA

## 📄 Licencia

Este proyecto es de uso personal y profesional.