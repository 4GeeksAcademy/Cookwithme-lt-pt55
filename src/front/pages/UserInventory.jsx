import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
export const InventoryUser = () => {
  const { store } = useGlobalReducer();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [ingredients, setIngredients] = useState([]);
  const [utensils, setUtensils] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedUtensils, setSelectedUtensils] = useState([]);

  // 1. get ingredientes y utensilios
  useEffect(() => {
    fetch(`${backendUrl}/api/ingredients`)
      .then(res => res.json())
      .then(data => setIngredients(data));

    fetch(`${backendUrl}/api/utensils`)
      .then(res => res.json())
      .then(data => setUtensils(data));
  }, []);

  // 2. selección de ingredientes
  const toggleIngredient = (id) => {
    setSelectedIngredients(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // 3. selección de utensilios
  const toggleUtensil = (id) => {
    setSelectedUtensils(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // 4. Post en backend
  const saveInventory = () => {
    fetch(`${backendUrl}/api/ingredient_users_bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.token}` // JWT token
      },
      body: JSON.stringify({
        user_id: store.authUser.id,
        ingredient_ids: selectedIngredients,
        utensil_ids: selectedUtensils
      })
    })
      .then(res => res.json())
      .then(data => {
        alert("Inventario actualizado");
      });
  };

  return (
    <div className="container">
      <h2>🛒 Tu Inventario</h2>

      <h4>Ingredientes</h4>
      <div className="d-flex flex-wrap">
        {ingredients.map(ing => (
          <label key={ing.id} className="m-2">
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ing.id)}
              onChange={() => toggleIngredient(ing.id)}
            />
            {ing.name}
          </label>
        ))}
      </div>

      <h4 className="mt-3">🍴 Utensilios</h4>
      <div className="d-flex flex-wrap">
        {utensils.map(ut => (
          <label key={ut.id} className="m-2">
            <input
              type="checkbox"
              checked={selectedUtensils.includes(ut.id)}
              onChange={() => toggleUtensil(ut.id)}
            />
            {ut.name}
          </label>
        ))}
      </div>
    
         <Link to="/home_user_avail_recipe">
      <button className="btn btn-success mt-3" onClick={saveInventory}>
        Guardar Inventario
      </button>
      </Link>
    </div>
  );
};
