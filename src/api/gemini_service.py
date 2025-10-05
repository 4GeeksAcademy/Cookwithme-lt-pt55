import google.generativeai as genai
import os, requests, base64, json

if os.getenv("GOOGLE_API_KEY") is None and os.getenv("GEMINI_API_KEY"):
    os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

MODEL_NAME = "models/gemini-2.5-flash"

def detect_ingredients_from_image(image_url: str):
    model = genai.GenerativeModel(MODEL_NAME)

    resp = requests.get(image_url)
    resp.raise_for_status()
    img_b64 = base64.b64encode(resp.content).decode("utf-8")

    prompt = """
    Analiza esta imagen y responde SOLO con un JSON válido.
    El JSON debe tener exactamente este formato:

    {
      "ingredients": [
        {"name": "Tomato", "confidence": 0.95},
        {"name": "Onion", "confidence": 0.90}
      ]
    }

    Si en la imagen NO hay ingredientes o comida, devuelve:
    {"ingredients": []}
    No incluyas explicaciones ni texto adicional fuera del JSON.
    """

    response = model.generate_content([
        {"text": prompt},
        {
            "inline_data": {
                "mime_type": "image/jpeg",
                "data": img_b64
            }
        }
    ])

    raw_text = response.text.strip()

    # Intentar parsear JSON
    try:
        data = json.loads(raw_text)
    except json.JSONDecodeError:
        start = raw_text.find("{")
        end = raw_text.rfind("}") + 1
        if start != -1 and end != -1:
            try:
                data = json.loads(raw_text[start:end])
            except Exception:
                data = {"ingredients": []}
        else:
            data = {"ingredients": []}

    # Validar detección
    ingredients = data.get("ingredients", [])

    # Lista de palabras NO ingrediente (ruido común)
    non_ingredients = {"person", "table", "plate", "cup", "fork", "knife", "bowl", "pan", "background", "object"}

    valid_ingredients = [
        ing for ing in ingredients
        if ing.get("name") and ing["name"].lower() not in non_ingredients
    ]

    if not valid_ingredients:
        return {"ingredients": [], "message": "No hay ingredientes en la foto"}

    return {"ingredients": valid_ingredients}
