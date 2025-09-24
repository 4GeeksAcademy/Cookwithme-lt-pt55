import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; // tu hook para el store

export const SelectIngredients = () => {
  const { store } = useGlobalReducer();  // extraemos el store
  const userId = store.authUser?.id;
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState([]);
  const [utensils, setUtensils] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedUtensils, setSelectedUtensils] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [utensilInput, setUtensilInput] = useState("");
  const [showIngredients, setShowIngredients] = useState(false);
  const [showUtensils, setShowUtensils] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(backendUrl + "/api/ingredients")
      .then(res => res.json())
      .then(setIngredients);

    fetch(backendUrl + "/api/utensils")
      .then(res => res.json())
      .then(setUtensils);
  }, []);

  const toggleIngredient = (id) => {
    setSelectedIngredients(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleUtensil = (id) => {
    setSelectedUtensils(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!userId) return alert("Usuario no definido");

    try {
      for (const ingredientId of selectedIngredients) {
        await fetch(backendUrl + "/api/ingredient_users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, ingredient_id: ingredientId }),
        });
      }
      for (const utensilId of selectedUtensils) {
        await fetch(backendUrl + "/api/utensil_user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, utensil_id: utensilId }),
        });
      }
      navigate("/results");
    } catch (err) {
      console.error(err);
    }
  };

  // filtros dentro del componente
  const filteredIngredients = ingredients.filter(i =>
    i.name.toLowerCase().includes(ingredientInput.toLowerCase())
  );
  const filteredUtensils = utensils.filter(u =>
    u.name.toLowerCase().includes(utensilInput.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1>Selecciona Ingredientes y Utensilios</h1>

      <h3>Ingredientes</h3>
      <div className="mb-3">
        <input
          value={ingredientInput}
          onChange={(e) => {
            setIngredientInput(e.target.value);
            setShowIngredients(true);
          }}
          placeholder="Escribe o selecciona ingredientes"
          className="form-control"
        />
        {showIngredients && (
          <div className="border p-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
            {filteredIngredients.map(i => (
              <div
                key={i.id}
                className={`p-1 mb-1 ${selectedIngredients.includes(i.id) ? "bg-success text-white" : "bg-light"}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  toggleIngredient(i.id);
                  setIngredientInput(""); // limpia input después de seleccionar
                }}
              >
                {i.name}
              </div>
            ))}
          </div>
        )}
        <div className="mt-1">
          {selectedIngredients.map(id => (
            <span key={id} className="badge bg-success me-1">
              {ingredients.find(i => i.id === id)?.name}
            </span>
          ))}
        </div>
      </div>

      <h3>Utensilios</h3>
      <div className="mb-3">
        <input
          value={utensilInput}
          onChange={(e) => {
            setUtensilInput(e.target.value);
            setShowUtensils(true);
          }}
          placeholder="Escribe o selecciona utensilios"
          className="form-control"
        />
        {showUtensils && (
          <div className="border p-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
            {filteredUtensils.map(u => (
              <div
                key={u.id}
                className={`p-1 mb-1 ${selectedUtensils.includes(u.id) ? "bg-success text-white" : "bg-light"}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  toggleUtensil(u.id);
                  setUtensilInput("");
                }}
              >
                {u.name}
              </div>
            ))}
          </div>
        )}
        <div className="mt-1">
          {selectedUtensils.map(id => (
            <span key={id} className="badge bg-success me-1">
              {utensils.find(u => u.id === id)?.name}
            </span>
          ))}
        </div>
      </div>

      <button className="btn btn-primary mt-4" onClick={handleSubmit}>
        Ver Resultado
      </button>
    </div>
  );
};
