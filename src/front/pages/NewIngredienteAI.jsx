import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewIngredienteAI = () => {
  const navigate = useNavigate();

  const [urlImg, setUrlImg] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // 📖 Diccionario para traducciones
  const translations = {
    "arroz": "rice",
    "pollo": "chicken",
    "tomate": "tomato",
    "cebolla": "onion",
    "papa": "potato",
    "zanahoria": "carrot",
    "ajo": "garlic",
    "carne": "beef",
    "pescado": "fish",
    "albahaca": "basil",
  };

  const reverseTranslations = Object.fromEntries(
    Object.entries(translations).map(([es, en]) => [en, es])
  );

  const normalize = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const translateToSpanish = (text) => {
    const normalized = normalize(text);
    return reverseTranslations[normalized] || text;
  };

  // 📤 Subir imagen a Cloudinary
  const UploadIngredientImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ingredient_and_utensil_image");
    formData.append("cloud_name", "dwi8lacfr");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwi8lacfr/image/upload",
        { method: "POST", body: formData }
      );

      const data = await response.json();
      if (data.secure_url) {
        setUrlImg(data.secure_url);
        setImage(""); // reset por si venía de TheMealDB
      }
    } catch (error) {
      console.error("❌ Error subiendo imagen:", error);
    }
  };

  // 📥 Cargar lista de todos los ingredientes de TheMealDB
  useEffect(() => {
    const fetchAllIngredients = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        );
        const data = await response.json();
        if (data.meals) setAllIngredients(data.meals);
      } catch (error) {
        console.error("Error fetching all ingredients:", error);
      }
    };
    fetchAllIngredients();
  }, []);

  // 🔎 Autocompletar sugerencias
  useEffect(() => {
    if (name.trim().length > 1) {
      const normalizedName = normalize(name);
      const englishQuery = translations[normalizedName] || normalizedName;

      const filtered = allIngredients
        .filter((ing) => normalize(ing.strIngredient).includes(englishQuery))
        .slice(0, 5);

      setSuggestions(
        filtered.map((ing) => ({
          idMeal: ing.idIngredient,
          strMeal: ing.strIngredient,
          strDescription: ing.strDescription,
          strMealThumb: `https://www.themealdb.com/images/ingredients/${ing.strIngredient}.png`,
        }))
      );
    } else {
      setSuggestions([]);
    }
  }, [name, allIngredients]);

  // ✅ Seleccionar sugerencia
  function handleSelectSuggestion(meal) {
    const spanishName = translateToSpanish(meal.strMeal);
    setName(spanishName);
    setDescription(meal.strDescription);
    setImage(meal.strMealThumb);
    setSuggestions([]);
  }

  // 📌 Guardar ingrediente en tu backend
  function sendData(e) {
    e.preventDefault();

    const finalImageURL = urlImg || image;
    if (!finalImageURL) {
      alert("Por favor sube o selecciona una imagen.");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        image: finalImageURL,
      }),
    };

    fetch(`${backendUrl}/api/ingredients`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Ingrediente creado:", data);
        navigate("/ingredientes");
      })
      .catch((err) => console.error("❌ Error creando ingrediente:", err));
  }

  return (
    <div>
      <form className="w-50 mx-auto" onSubmit={sendData}>
        <h2>🤖 Crear Ingrediente con IA</h2>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
          />
          {suggestions.length > 0 && (
            <ul className="list-group mt-2">
              {suggestions.map((meal) => (
                <li
                  key={meal.idMeal}
                  className="list-group-item d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelectSuggestion(meal)}
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width="40"
                    className="me-2"
                  />
                  {translateToSpanish(meal.strMeal)}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            rows="4"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input
            value={urlImg || image}
            type="text"
            className="form-control"
            readOnly
          />
          {(urlImg || image) && (
            <img
              src={urlImg || image}
              alt={name}
              width="200"
              style={{ marginTop: "10px" }}
            />
          )}
        </div>

        <div>
          <input type="file" accept="image/*" onChange={UploadIngredientImage} />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Crear
        </button>
      </form>
    </div>
  );
};

export default NewIngredienteAI;
