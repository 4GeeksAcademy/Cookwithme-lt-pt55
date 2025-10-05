import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../css/ShoppingList.css";

export const ShoppingList = () => {
  const { store } = useGlobalReducer();
  const [recipes, setRecipes] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!store.token) return;

    fetch(`${backendUrl}/api/user/recipes/available`, {
      headers: { Authorization: `Bearer ${store.token}` },
    })
      .then(res => res.json())
      .then(data => setRecipes(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching recipes:", err));
  }, [store.token]);

  // juntar todos los faltantes de todas las recetas incompletas
  const incompleteRecipes = recipes.filter(r => !r.is_available);

  const missingIngredients = [
    ...new Set(
      incompleteRecipes.flatMap(r => r.missing_ingredients || [])
    ),
  ];

  const missingUtensils = [
    ...new Set(
      incompleteRecipes.flatMap(r => r.missing_utensils || [])
    ),
  ];

  return (
    <div className="shopping-list-container">
      <h1 className="text-center mb-4">🛍️ Lista de Compras</h1>

      {incompleteRecipes.length === 0 ? (
        <p className="text-center">🎉 ¡Tienes todo lo necesario para cocinar tus recetas!</p>
      ) : (
        <div className="shopping-cards">
          <div className="shopping-card">
            <h3>🥦 Ingredientes</h3>
            {missingIngredients.length > 0 ? (
              <ul className="list-group">
                {missingIngredients.map((ing, idx) => (
                  <li key={idx} className="list-group-item">
                    <label>
                      <input type="checkbox" /> <span>{ing}</span>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No faltan ingredientes 🎉</p>
            )}
          </div>

          <div className="shopping-card">
            <h3>🍴 Utensilios</h3>
            {missingUtensils.length > 0 ? (
              <ul className="list-group">
                {missingUtensils.map((ut, idx) => (
                  <li key={idx} className="list-group-item">
                    <label>
                      <input type="checkbox" /> <span>{ut}</span>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No faltan utensilios 🎉</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
