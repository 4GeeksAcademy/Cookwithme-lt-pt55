import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    print("ADVERTENCIA: La variable de entorno GEMINI_API_KEY no está configurada.")

def translate_text(text_to_translate: str) -> str:
    """
    Traduce un texto a español usando la API de Gemini.

    Args:
        text_to_translate: El texto que se va a traducir.

    Returns:
        El texto traducido a español o el texto original si ocurre un error.
    """
    if not text_to_translate or not isinstance(text_to_translate, str):
        return ""

    
    if not GEMINI_API_KEY:
        print("Error: No se puede traducir porque la GEMINI_API_KEY no está disponible.")
        return text_to_translate

    try:
        model = genai.GenerativeModel('gemini-pro')
        prompt = f"Translate the following text to Spanish: \"{text_to_translate}\""
        response = model.generate_content(prompt)
        return response.text.strip().replace('*', '')
    except Exception as e:
        print(f"Error al traducir con Gemini: {e}")
        return text_to_translate