import os
from flask import Flask, send_from_directory
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from api.models import db
from api.routes import api
from api.admin import setup_admin


app = Flask(__name__)
app.url_map.strict_slashes = False

# Database configuration
db_url = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/login")
app.config['SQLALCHEMY_DATABASE_URI'] = db_url

# Configuración para JWT
app.config['JWT_SECRET_KEY'] = 'juanito'  # Cambia esto a una clave secreta más segura
jwt = JWTManager(app)

# Inicialización de la base de datos
db.init_app(app)
migrate = Migrate(app, db)

# Allow CORS requests to this API
CORS(app)

# Add the admin
setup_admin(app)

# Add all endpoints from the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
