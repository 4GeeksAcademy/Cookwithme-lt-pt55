import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import "../css/Bottoms.css";

export const InventoryUser = ({ onInventoryChange }) => {
  const { store } = useGlobalReducer();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [ingredients, setIngredients] = useState([]);
  const [utensils, setUtensils] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedUtensils, setSelectedUtensils] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [utensilInput, setUtensilInput] = useState("");
  const [ingredientSuggestions, setIngredientSuggestions] = useState([]);
  const [utensilSuggestions, setUtensilSuggestions] = useState([]);

  const [uploadedImg, setUploadedImg] = useState("");
  const [detected, setDetected] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${backendUrl}/api/ingredients`)
      .then(res => res.json())
      .then(data => setIngredients(data));
    fetch(`${backendUrl}/api/utensils`)
      .then(res => res.json())
      .then(data => setUtensils(data));
  }, []);

  useEffect(() => {
    if (ingredientInput === "") setIngredientSuggestions([]);
    else
      setIngredientSuggestions(
        ingredients.filter(i =>
          i.name.toLowerCase().includes(ingredientInput.toLowerCase())
        )
      );
  }, [ingredientInput, ingredients]);

  useEffect(() => {
    if (utensilInput === "") setUtensilSuggestions([]);
    else
      setUtensilSuggestions(
        utensils.filter(u =>
          u.name.toLowerCase().includes(utensilInput.toLowerCase())
        )
      );
  }, [utensilInput, utensils]);

  const addIngredient = (id) => {
    if (!selectedIngredients.includes(id))
      setSelectedIngredients([...selectedIngredients, id]);
    setIngredientInput("");
    setIngredientSuggestions([]);
  };

  const removeIngredient = (id) => {
    setSelectedIngredients(selectedIngredients.filter(ingId => ingId !== id));
  };

  const addUtensil = (id) => {
    if (!selectedUtensils.includes(id))
      setSelectedUtensils([...selectedUtensils, id]);
    setUtensilInput("");
    setUtensilSuggestions([]);
  };

  const removeUtensil = (id) => {
    setSelectedUtensils(selectedUtensils.filter(utId => utId !== id));
  };

  const saveInventory = () => {
    console.log(store.authUser)
    fetch(`${backendUrl}/api/ingredient_users_bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.token}`
      },
      body: JSON.stringify({
        user_id: store.authUser.id,
        ingredient_ids: selectedIngredients,
        utensil_ids: selectedUtensils
      })
    })
      .then(res => res.json())
      .then(() => {
        alert("Se ha actualizado su inventario");
        if (onInventoryChange) onInventoryChange();
      });
  };

  const UploadIngredientImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ingredient_and_utensil_image");
    formData.append("cloud_name", "dwi8lacfr");

    try {
      setLoading(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwi8lacfr/image/upload",
        { method: "POST", body: formData }
      );

      const data = await response.json();
      if (data.secure_url) {
        setUploadedImg(data.secure_url);

        // 🔹 Llamar a tu backend IA
        const aiRes = await fetch(`${backendUrl}/api/detect_ingredients`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image_url: data.secure_url })
        });

        const aiData = await aiRes.json();
        setDetected(aiData.ingredients || []);
      }
    } catch (err) {
      console.error("Error subiendo imagen:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUseIngredient = (ingName) => {
    const found = ingredients.find(
      i => i.name.toLowerCase() === ingName.toLowerCase()
    );
    if (found) {
      addIngredient(found.id);
    } else {
      alert(`El ingrediente "${ingName}" no está en tu base de datos.`);
    }
  };

  return (
    <div className="container">
      <h2>🛒 Tu Inventario</h2>

      {/* Ingredientes */}
      <h4>Ingredientes</h4>
      <input
        type="text"
        className="form-control"
        placeholder="Escribe un ingrediente..."
        value={ingredientInput}
        onChange={e => setIngredientInput(e.target.value)}
      />
      <div className="list-group">
        {ingredientSuggestions.map(i => (
          <button
            key={i.id}
            type="button"
            className="list-group-item list-group-item-action"
            onClick={() => addIngredient(i.id)}
          >
            {i.name}
          </button>
        ))}
      </div>
      <div className="mt-2">
        {selectedIngredients.map(id => {
          const ing = ingredients.find(i => i.id === id);
          return (
            <span
              key={id}
              className="badge me-1 d-inline-flex align-items-center"
              style={{ backgroundColor: "#f57c00", color: "white" }} // 🔹 Naranja personalizado
            >
              {ing?.name}
              <button
                type="button"
                className="btn-close btn-close-white btn-sm ms-2"
                aria-label="Remove"
                onClick={() => removeIngredient(id)}
                style={{ fontSize: "0.6rem" }}
              />
            </span>
          );
        })}
      </div>

      {/* Subida de imagen e IA */}
      <div className="mt-3">
        <label className="form-label">📷 Identificar Ingredientes con IA</label>
        <input
          type="file"
          accept="image/*"
          onChange={UploadIngredientImage}
          className="form-control"
        />

        {loading && <p className="mt-2">Analizando con IA...</p>}

        {uploadedImg && (
          <div className="mt-2">
            <img
              src={uploadedImg}
              alt="subida"
              width="200"
              className="img-thumbnail"
            />
          </div>
        )}
      </div>

      {detected.length > 0 && (
        <div className="mt-3">
          <p>Sugerencias IA:</p>
          <ul className="list-group">
            {detected.map((ing, idx) => (
              <li
                key={idx}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {ing.name} ({Math.round(ing.confidence * 100)}%)
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleUseIngredient(ing.name)}
                >
                  Agregar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Utensilios */}
      <h4 className="mt-3">🍴 Utensilios</h4>
      <input
        type="text"
        className="form-control"
        placeholder="Escribe un utensilio..."
        value={utensilInput}
        onChange={e => setUtensilInput(e.target.value)}
      />
      <div className="list-group">
        {utensilSuggestions.map(u => (
          <button
            key={u.id}
            type="button"
            className="list-group-item list-group-item-action"
            onClick={() => addUtensil(u.id)}
          >
            {u.name}
          </button>
        ))}
      </div>
      <div className="mt-2">
        {selectedUtensils.map(id => {
          const ut = utensils.find(u => u.id === id);
          return (
            <span
              key={id}
              className="badge bg-success me-1 d-inline-flex align-items-center"
            >
              {ut?.name}
              <button
                type="button"
                className="btn-close btn-close-white btn-sm ms-2"
                aria-label="Remove"
                onClick={() => removeUtensil(id)}
                style={{ fontSize: "0.6rem" }}
              />
            </span>
          );
        })}
      </div>

      <button className="btn btn-custom mt-3" onClick={saveInventory}>
        Guardar Inventario
      </button>
    </div>
  );
};
