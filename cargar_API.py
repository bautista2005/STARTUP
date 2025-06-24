def cargar_claves_api(tipo_api):
    """
    Devuelve la API key de OpenWeatherMap si `tipo_api` es True,
    o la de Google Gemini si `tipo_api` es False.
    """
    # Defini tus claves aquí:
    WEATHER_API_KEY = "2ca07f1fc44dfd818b7fcdfa767cc8b4"
    GEMINI_API_KEY = "AIzaSyB_oG88YuOBCnHtHNDXOwxcezAEyXZSpbU"

    return WEATHER_API_KEY if tipo_api else GEMINI_API_KEY
