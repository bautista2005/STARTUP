# app.py - VERSIÓN CON LÓGICA FREEMIUM Y REGISTRO POR EMAIL
import datetime as dt
import requests
from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import (
    create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt,
    # Importa 'verify_jwt_in_request' y 'current_user' si los usas para validaciones manuales
)
from flask_sqlalchemy import SQLAlchemy
from PIL import Image
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv
import json

load_dotenv(override=True)

# --- 1. Configuración Centralizada ---
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# --- 2. Inicialización de Extensiones ---
db = SQLAlchemy(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
CORS(app, 
     resources={r"/*": {"origins": "http://localhost:3000"}}, 
     supports_credentials=True,
     allow_headers=["Authorization", "Content-Type"] 
)

# --- 3. Definición de Modelos (con email y plan) ---
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    plan = db.Column(db.String(50), nullable=False, default='free')

    # --- NUEVOS CAMPOS DE PERSONALIZACIÓN ---
    estilo_preferido = db.Column(db.String(50), default='Casual')
    actividad_principal = db.Column(db.String(50), default='Oficina')
    sensibilidad_frio = db.Column(db.String(50), default='Normal')
    colores_preferidos = db.Column(db.String(100), default='Neutros')
    preferencia_clima = db.Column(db.String(50), default='Templado')
    frecuencia_viajes = db.Column(db.String(50), default='Ocasional')
    # NUEVOS CAMPOS
    tipo_calzado = db.Column(db.String(50), default='Deportivo')
    frecuencia_ejercicio = db.Column(db.String(50), default='Ocasional')
    preferencia_tejido = db.Column(db.String(50), default='Algodón')
    prenda_favorita = db.Column(db.String(50), default='Camiseta')
    preferencias_guardadas = db.Column(db.Boolean, default=False)
    ai_outfit_uses = db.Column(db.Integer, default=0)
    ai_travel_uses = db.Column(db.Integer, default=0)
    # --- FIN DE NUEVOS CAMPOS ---

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

class Queries(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    ciudad = db.Column(db.String(100), nullable=False)
    temperatura = db.Column(db.Float, nullable=False)
    descripcion = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime, default=dt.datetime.utcnow)
    user = db.relationship('Users', backref=db.backref('queries', lazy=True))

class OutfitHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    advice = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, default=dt.datetime.utcnow)

    def to_dict(self):
        return {
            'city': self.city,
            'advice': self.advice,
            'date': self.date.isoformat()
        }

# --- 4. Creación de Tablas ---
with app.app_context():
    db.create_all()

# --- 5. Carga de API Keys Externas ---
MIowmAPI = os.getenv("WEATHER_API_KEY")
geminiAPI = os.getenv("GEMINI_API_KEY")

if geminiAPI:
    #api
    gemini_client = genai.Client(api_key=geminiAPI)

# --- 6. Funciones de Ayuda ---
def obtener_datos_clima_api(ciudad):
    base_url = "https://api.openweathermap.org/data/2.5/weather"
    parametros = {'q': ciudad, 'appid': MIowmAPI, 'units': 'metric', 'lang': 'es'}
    try:
        respuesta = requests.get(base_url, params=parametros, timeout=10)
        respuesta.raise_for_status()
        return respuesta.json(), 200
    except requests.exceptions.RequestException as e:
        return None, 500

# --- 7. Endpoints de la Aplicación ---
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username, email, password = data.get('username'), data.get('email'), data.get('password')
    if not username or not email or not password:
        return jsonify({"error": "Nombre de usuario, email y contraseña requeridos"}), 400
    if Users.query.filter_by(email=email).first():
        return jsonify({"error": "El correo electrónico ya está en uso"}), 409
    if Users.query.filter_by(username=username).first():
        return jsonify({"error": "El nombre de usuario ya está en uso"}), 409
    
    new_user = Users(username=username, email=email)
    new_user.set_password(password) # El plan es 'free' por defecto
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"mensaje": f"Usuario {username} creado con éxito"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email, password = data.get('email'), data.get('password')
    user = Users.query.filter_by(email=email).first()
    if user and user.check_password(password):
        # AÑADIMOS 'preferencias_guardadas' a los claims del token
        additional_claims = {
            "plan": user.plan, 
            "username": user.username,
            "prefs_saved": user.preferencias_guardadas,
            "ai_outfit_uses": user.ai_outfit_uses,
            "ai_travel_uses": user.ai_travel_uses
        }
        access_token = create_access_token(identity=str(user.id), additional_claims=additional_claims)
        return jsonify(access_token=access_token)
    return jsonify({"error": "Credenciales inválidas"}), 401

@app.route('/api/user/preferences', methods=['POST'])
@jwt_required()
def save_preferences():
    current_user_id = get_jwt_identity()
    user = Users.query.get(current_user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.get_json()
    user.estilo_preferido = data.get('estilo', user.estilo_preferido)
    user.actividad_principal = data.get('actividad', user.actividad_principal)
    user.sensibilidad_frio = data.get('sensibilidad', user.sensibilidad_frio)
    user.colores_preferidos = data.get('colores_preferidos', user.colores_preferidos)
    user.preferencia_clima = data.get('preferencia_clima', user.preferencia_clima)
    user.frecuencia_viajes = data.get('frecuencia_viajes', user.frecuencia_viajes)
    user.preferencias_guardadas = True
    db.session.commit()
    
    # --- ¡LA SOLUCIÓN! ---
    # 1. Creamos las propiedades para el nuevo token, ahora con 'prefs_saved' en True.
    additional_claims = {
        "plan": user.plan, 
        "username": user.username,
        "prefs_saved": user.preferencias_guardadas, # Esto ahora será True
        "ai_outfit_uses": user.ai_outfit_uses,
        "ai_travel_uses": user.ai_travel_uses
    }
    new_token = create_access_token(identity=str(user.id), additional_claims=additional_claims)
    
    # 3. Lo devolvemos en la respuesta.
    return jsonify({
        "mensaje": "Preferencias guardadas con éxito",
        "access_token": new_token # <-- ¡NUEVO!
    }), 200

@app.route('/api/v1/weather/<string:ciudad>', methods=['GET'])
@jwt_required()
def get_weather(ciudad):
    datos_clima, status_code = obtener_datos_clima_api(ciudad)
        
    if not datos_clima:
        return jsonify({"error": f"No se pudo obtener el clima. Código: {status_code}"}), status_code
    
    try:
        current_user_id = get_jwt_identity()
        nueva_consulta = Queries(
            user_id=current_user_id,
            ciudad=datos_clima['name'],
            temperatura=datos_clima['main']['temp'],
            descripcion=datos_clima['weather'][0]['description']
        )
        db.session.add(nueva_consulta)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error al guardar en la base de datos: {e}")
    
    return jsonify(datos_clima)

@app.route('/api/v1/history', methods=['GET'])
@jwt_required()
def get_history():
    current_user_id = get_jwt_identity()
    claims = get_jwt()
    user_plan = claims.get("plan", "free") # Obtenemos el plan del token

    query = Queries.query.filter_by(user_id=current_user_id).order_by(Queries.timestamp.desc())

    # Aplicamos la lógica Freemium
    if user_plan == 'free':
        query = query.limit(5)
    
    consultas = query.all()
    historial_json = [{"ciudad": c.ciudad, "temperatura": c.temperatura, "descripcion": c.descripcion, "fecha": c.timestamp.strftime("%Y-%m-%d %H:%M:%S")} for c in consultas]
    return jsonify(historial_json)

@app.route('/api/v1/ai-outfit', methods=['POST'])
@jwt_required()
def get_ai_outfit():
    current_user_id = get_jwt_identity()
    user = Users.query.get(current_user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado."}), 404

    # Verificar el plan del usuario
    if user.plan == 'free':
        if user.ai_outfit_uses >= 3:
            return jsonify({"error": "Has alcanzado el límite de 3 usos para el consejo de vestimenta. Actualiza a Pro para usos ilimitados."}), 403
        user.ai_outfit_uses += 1
        db.session.commit()

    # Obtener la ciudad del formulario o JSON, no de la URL
    ciudad = request.form.get('ciudad') # Asumimos que la ciudad vendrá como parte del formulario
    if not ciudad:
        return jsonify({"error": "Ciudad requerida para el consejo de vestimenta."}), 400

    # Obtener los archivos de imagen
    if 'imagenes' not in request.files:
        return jsonify({"error": "No se encontraron archivos de imagen."}), 400
    
    archivos_imagenes = request.files.getlist('imagenes')
    if not archivos_imagenes:
        return jsonify({"error": "No se seleccionaron imágenes."}), 400

    imagenes_pil = []
    for archivo in archivos_imagenes:
        if archivo.filename == '':
            return jsonify({"error": "Nombre de archivo no válido."}), 400
        if archivo:
            try:
                # Abrir la imagen directamente del stream para evitar guardar en disco innecesariamente
                imagen = Image.open(archivo.stream)
                imagenes_pil.append(imagen)
            except Exception as e:
                return jsonify({"error": f"Error al procesar imagen: {e}"}), 400
            
    # 2. Obtenemos los datos del clima (sin cambios aquí)
    datos_clima, status_code = obtener_datos_clima_api(ciudad)
    if not datos_clima: return jsonify({"error": f"No se pudo obtener el clima para la IA. Código: {status_code}"}), status_code
    if not geminiAPI: return jsonify({"consejo": "La función de IA no está configurada."})

    try:
        descripcion = datos_clima['weather'][0]['description']
        temperatura = datos_clima['main']['temp']
        sensacion_termica = datos_clima['main']['feels_like']
        humedad = datos_clima['main']['humidity']

        prompt = (
            f"""
            Basándote en las prendas identificadas en las imágenes, 
            el clima actual en {ciudad} 
            (Temperatura: {temperatura}°C, 
            Sensación térmica: {sensacion_termica}°C, 
            Humedad: {humedad}%, 
            Descripción: {descripcion}), 
            y las preferencias del usuario (Estilo: {user.estilo_preferido}, 
            Actividad: {user.actividad_principal}, 
            Sensibilidad al frío: {user.sensibilidad_frio}, 
            Colores Preferidos: {user.colores_preferidos}, 
            Preferencia de Clima: {user.preferencia_clima}, 
            Frecuencia de Viajes: {user.frecuencia_viajes},
            Tipo de Calzado Preferido: {user.tipo_calzado},
            Frecuencia de Ejercicio Físico: {user.frecuencia_ejercicio},
            Preferencia de Tejidos: {user.preferencia_tejido},
            Prenda Favorita: {user.prenda_favorita}),
            genera una recomendación de vestimenta estructurada 

            Tu recomendación debe incluir las siguientes secciones:
            - Parte de arriba:
            - Parte de abajo:
            - Calzado:
            - Capas adicionales (si aplica):
            - Accesorios relevantes (si aplica):

            Para cada prenda o accesorio sugerido, incluye una descripción muy breve de sus características 
            (ej. 'camiseta blanca de algodón', 'pantalón vaquero oscuro', 'zapatillas deportivas') para que el usuario pueda identificarla en sus fotos. 
            Enfócate en un atuendo práctico y con estilo. NO USES LETRAS NEGRITAS, ASTERISCOS, NI HTML TAGS.
            """
        )


        response = gemini_client.models.generate_content(
            model='gemini-2.5-flash-lite-preview-06-17',
            config=types.GenerateContentConfig(
                system_instruction="Sos un asistente de estilo y moda profesional. Analiza las prendas de las imágenes para tus recomendaciones.",
                max_output_tokens=600
            ),
            contents=imagenes_pil + [prompt] # Enviamos las imágenes y luego el prompt
        )

        advice_text = response.text
        # Save the AI advice to the outfit history
        print(f"[DEBUG] Saving outfit for user_id={current_user_id}, city={ciudad}, advice={advice_text[:60]}...")
        new_outfit = OutfitHistory(
            user_id=current_user_id,
            city=ciudad,
            advice=advice_text,
            date=dt.datetime.utcnow()
        )
        db.session.add(new_outfit)
        db.session.commit()

        # Generate a new token with updated claims
        additional_claims = {
            "plan": user.plan,
            "username": user.username,
            "prefs_saved": user.preferencias_guardadas,
            "ai_outfit_uses": user.ai_outfit_uses,
            "ai_travel_uses": user.ai_travel_uses
        }
        new_token = create_access_token(identity=str(user.id), additional_claims=additional_claims)

        return jsonify({"consejo": advice_text, "access_token": new_token})
    except Exception as e:
        print(f"Error al contactar la API de Gemini o procesar: {e}")
        return jsonify({"error": "No se pudo generar el consejo de IA de vestimenta."}), 500

@app.route('/api/v1/ai-advice/<string:ciudad>', methods=['GET'])
@jwt_required()
def get_ai_advice(ciudad):
    # 1. Obtenemos la identidad del usuario y sus datos de la BD
    current_user_id = get_jwt_identity()
    user = Users.query.get(current_user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado para generar consejo."}), 404

    # 2. Obtenemos los datos del clima (sin cambios aquí)
    datos_clima, status_code = obtener_datos_clima_api(ciudad)
    if not datos_clima: return jsonify({"error": f"No se pudo obtener el clima para la IA. Código: {status_code}"}), status_code
    if not geminiAPI: return jsonify({"consejo": "La función de IA no está configurada."})

    try:
        # 3. Construimos el MEGA-PROMPT
        descripcion = datos_clima['weather'][0]['description']
        temperatura = datos_clima['main']['temp']
        sensacion_termica = datos_clima['main']['feels_like']
        humedad = datos_clima['main']['humidity']

        # Usamos los datos del usuario para enriquecer el prompt
        prompt = (
            f"Actúa como un asistente de moda y estilo de vida personal. "
            f"El usuario tiene las siguientes preferencias: "
            f"Estilo: '{user.estilo_preferido}', "
            f"Actividad principal del día: '{user.actividad_principal}', "
            f"Sensibilidad al frío: '{user.sensibilidad_frio}', "
            f"Colores preferidos: '{user.colores_preferidos}', "
            f"Preferencia de clima: '{user.preferencia_clima}', "
            f"Frecuencia de viajes: '{user.frecuencia_viajes}', "
            f"Tipo de calzado preferido: '{user.tipo_calzado}', "
            f"Frecuencia de ejercicio físico: '{user.frecuencia_ejercicio}', "
            f"Preferencia de tejidos: '{user.preferencia_tejido}', "
            f"Prenda favorita: '{user.prenda_favorita}'.\n"
            f"El clima actual es: Condición: {descripcion}, Temperatura: {temperatura}°C, "
            f"Sensación térmica: {sensacion_termica}°C, Humedad: {humedad}%.\n"
            f"Basado en TODA esta información (preferencias del usuario Y el clima), "
            f"genera una recomendación de vestimenta breve, práctica y con estilo en un solo párrafo. "
            f"Dirígete al usuario de forma amigable y directa. Por ejemplo, si su sensibilidad al frío es alta, sugiérele una capa extra. "
            f"Si su estilo es elegante, recomienda prendas más formales. Responde únicamente con la recomendación."
        )

        # 4. Generamos y devolvemos la respuesta (sin cambios aquí)
        response = gemini_client.models.generate_content(
            model="gemini-2.0-flash",
            config = types.GenerateContentConfig(
                max_output_tokens=600
            ),
            contents=prompt           
        )
        return jsonify({"consejo": response.text})
    except Exception as e:
        print(f"Error al contactar la API de Gemini: {e}")
        return jsonify({"error": "No se pudo generar el consejo de la IA."}), 500

@app.route('/api/user/upgrade', methods=['POST'])
@jwt_required()
def upgrade_plan():
    current_user_id = get_jwt_identity()
    user = Users.query.get(current_user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.get_json()
    new_plan = data.get('plan') # Ej: 'premium' o 'pro'

    if new_plan not in ['premium', 'pro']:
        return jsonify({"error": "Plan no válido"}), 400

    user.plan = new_plan
    db.session.commit()

    # ¡Paso clave! Creamos y devolvemos un NUEVO token con el plan actualizado.
    additional_claims = {
        "plan": user.plan, 
        "username": user.username,
        "prefs_saved": user.preferencias_guardadas,
        "ai_outfit_uses": user.ai_outfit_uses,
        "ai_travel_uses": user.ai_travel_uses
        }
    new_token = create_access_token(identity=str(user.id), additional_claims=additional_claims)
    
    # Creamos UN SOLO diccionario con ambas claves: "mensaje" y "access_token".
    return jsonify({
        "mensaje": f"¡Felicidades! Has actualizado al plan {user.plan.title()}",
        "access_token": new_token
    }), 200

# --- NUEVO ENDPOINT: ASISTENTE DE VIAJE IA ---
@app.route('/api/v1/ai-travel-assistant', methods=['POST'])
@jwt_required()
def get_ai_travel_advice():
    current_user_id = get_jwt_identity()
    user = Users.query.get(current_user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado."}), 404

    # 1. Verificar el plan del usuario
    if user.plan == 'free':
        if user.ai_travel_uses >= 1:
            return jsonify({"error": "Has alcanzado el límite de 1 uso para el asistente de viaje. Actualiza a Pro para usos ilimitados."}), 403
        user.ai_travel_uses += 1
        db.session.commit()

    data = request.get_json()
    ciudad_destino = data.get('ciudad_destino')
    fecha_inicio_str = data.get('fecha_inicio')
    fecha_fin_str = data.get('fecha_fin')

    if not all([ciudad_destino, fecha_inicio_str, fecha_fin_str]):
        return jsonify({"error": "Se requieren ciudad de destino, fecha de inicio y fecha de fin."}), 400

    # 2. Obtener el pronóstico del tiempo (real)
    datos_clima, status_code = obtener_datos_clima_api(ciudad_destino)
    if not datos_clima:
        return jsonify({"error": f"No se pudo obtener el clima para {ciudad_destino}. Código: {status_code}"}), status_code

    if not geminiAPI:
        return jsonify({"consejo": "La función de IA no está configurada."})

    try:
        descripcion = datos_clima['weather'][0]['description']
        temperatura = datos_clima['main']['temp']
        sensacion_termica = datos_clima['main']['feels_like']
        humedad = datos_clima['main']['humidity']

        # 3. Construir el prompt para la IA
        prompt = (
            f"Actúa como un asistente de viaje experto y conciso. Tu tarea es crear una lista de equipaje inteligente y detallada.\n\n"
            f"Destino: {ciudad_destino}\n"
            f"Fechas del viaje: del {fecha_inicio_str} al {fecha_fin_str}\n\n"
            f"Preferencias del usuario:\n"
            f"- Estilo preferido: {user.estilo_preferido}\n"
            f"- Actividad principal planeada: {user.actividad_principal}\n"
            f"- Sensibilidad al frío: {user.sensibilidad_frio}\n"
            f"- Colores preferidos: {user.colores_preferidos}\n"
            f"- Preferencia de clima: {user.preferencia_clima}\n"
            f"- Frecuencia de viajes: {user.frecuencia_viajes}\n"
            f"- Tipo de calzado preferido: {user.tipo_calzado}\n"
            f"- Frecuencia de ejercicio físico: {user.frecuencia_ejercicio}\n"
            f"- Preferencia de tejidos: {user.preferencia_tejido}\n"
            f"- Prenda favorita: {user.prenda_favorita}\n\n"
            f"Clima actual en {ciudad_destino}:\n"
            f"Temperatura: {temperatura}°C\n"
            f"Sensación térmica: {sensacion_termica}°C\n"
            f"Humedad: {humedad}%\n"
            f"Descripción del clima: {descripcion}\n\n"
            f"Basándote en toda esta información, genera una lista de equipaje organizada por categorías (ej. Ropa, Calzado, Accesorios, Artículos de Aseo, Documentos). \n"
            f"Para cada prenda o artículo, sé específico (ej. '2 camisetas de algodón de manga corta', '1 par de zapatillas cómodas para caminar', '1 chaqueta impermeable ligera').\n"
            f"Añade una sección final con 2 o 3 consejos prácticos para el viaje basados en el clima y el destino.\n\n"
            f"El resultado debe ser una lista fácil de leer y accionable para el usuario.\n"
            f"NO USES LETRAS NEGRITAS EN LAS RESPUESTAS, NO USES ASTERISCOS, NO USES HTML TAGS.\n"
        )

        # 4. Generar y devolver la respuesta de la IA
        response = gemini_client.models.generate_content(
            model='gemini-2.5-flash-lite-preview-06-17',
            config=types.GenerateContentConfig(
                system_instruction="Eres un asistente de viajes y experto en planificación de equipaje.",
                max_output_tokens=1000
            ),
            contents=[prompt]
        )

        # Generate a new token with updated claims
        additional_claims = {
            "plan": user.plan,
            "username": user.username,
            "prefs_saved": user.preferencias_guardadas,
            "ai_outfit_uses": user.ai_outfit_uses,
            "ai_travel_uses": user.ai_travel_uses
        }
        new_token = create_access_token(identity=str(user.id), additional_claims=additional_claims)

        return jsonify({"consejo": response.text, "access_token": new_token})
    except Exception as e:
        print(f"Error al contactar la API de Gemini o procesar: {e}")
        return jsonify({"error": "No se pudo generar el consejo de viaje de IA."}), 500

@app.route('/api/v1/outfits', methods=['GET'])
@jwt_required()
def get_outfits():
    user_id = get_jwt_identity()
    outfits = OutfitHistory.query.filter_by(user_id=user_id).order_by(OutfitHistory.date.desc()).all()
    print(f"[DEBUG] Fetching outfits for user_id={user_id}, found {len(outfits)} outfits.")
    return jsonify([o.to_dict() for o in outfits])

@app.route('/api/v1/outfits', methods=['POST'])
@jwt_required()
def save_outfit():
    user_id = get_jwt_identity()
    data = request.get_json()
    new_outfit = OutfitHistory(
        user_id=user_id,
        city=data.get('city'),
        advice=data.get('advice'),
        date=dt.datetime.fromisoformat(data['date']) if 'date' in data else dt.datetime.utcnow()
    )
    db.session.add(new_outfit)
    db.session.commit()
    return jsonify({'success': True, 'id': new_outfit.id})

# --- 8. Ejecución de la Aplicación ---
if __name__ == '__main__':
    app.run(port=5000, debug=True)
