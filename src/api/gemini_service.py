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

    # Intentar parsear como JSON
    try:
        data = json.loads(raw_text)
        return data
    except json.JSONDecodeError:
        # Si Gemini devuelve texto extraño, intentar limpiar
        start = raw_text.find("{")
        end = raw_text.rfind("}") + 1
        if start != -1 and end != -1:
            try:
                return json.loads(raw_text[start:end])
            except:
                pass
        # fallback: devolver como texto plano
        return {"ingredients": [], "raw_response": raw_text}
