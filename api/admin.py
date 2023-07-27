from flask_admin import Admin
from .models import db, User
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = "your_secret_key"
    admin = Admin(app, name='Your App Name', template_mode='bootstrap3')

    # Agrega tus modelos a la interfaz de administración
    admin.add_view(ModelView(User, db.session))

    # Puedes agregar más modelos aquí
