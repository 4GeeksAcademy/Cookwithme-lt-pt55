import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../css/Homechef.css"; 

export const HomeAvailableRecipes = () => {
  const { store, dispatch } = useGlobalReducer();
  const [recipes, setRecipes] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!store.token) return;

    fetch(`${backendUrl}/api/user/recipes/available`, {
      headers: { Authorization: `Bearer ${store.token}` },
    })
      .then(res => res.json())
      .then(data => setRecipes(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching available recipes:", err));
  }, [store.token]);

  const userFavs = store.authUser ? store.usersFavs[store.authUser.id] || [] : [];

  // cuales si están y no completas
  const availableRecipes = recipes.filter(r => r.is_available);
  const incompleteRecipes = recipes.filter(r => !r.is_available);

  return (
    <div className="available-recipes-container">
      <h1 className="mb-4 text-center">Recetas según tu inventario</h1>

      {/* --- Recetas completas --- */}
      <h3 className="mb-3 text-success">✅ Listas para cocinar</h3>
      {availableRecipes.length === 0 ? (
        <p className="text-center">No tienes recetas listas con tu inventario actual.</p>
      ) : (
        <div className="menu-grid-vertical mb-5">
          {availableRecipes.map(recipe => {
            const isFavorite = userFavs.includes(recipe.id);
            return (
              <div key={recipe.id} className="menu-item-vertical card">
                <Link to={`/recipes/${recipe.id}`} className="text-decoration-none">
                  <img
                    src={recipe.img}
                    alt={recipe.name}
                    className="img-fluid mb-2"
                    style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
                  />
                  <div className="label text-center">{recipe.name}</div>
                </Link>
                <div className="menu-actions mt-2 justify-content-center">
                  <button
                    className={`menu-btn ${isFavorite ? "edit" : "see"}`}
                    onClick={() => dispatch({ type: "toggle_fav_user", payload: recipe.id })}
                  >
                    {isFavorite ? "★" : "☆"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- Recetas incompletas --- */}
      <h3 className="mb-3 text-warning">⚠️ Casi listas (faltan cosas)</h3>
      {incompleteRecipes.length === 0 ? (
        <p className="text-center">Todas las recetas que no puedes hacer están ocultas.</p>
      ) : (
        <div className="menu-grid-vertical">
          {incompleteRecipes.map(recipe => {
            const isFavorite = userFavs.includes(recipe.id);
            return (
              <div key={recipe.id} className="menu-item-vertical card border-warning">
                <Link to={`/recipes/${recipe.id}`} className="text-decoration-none">
                  <img
                    src={recipe.img}
                    alt={recipe.name}
                    className="img-fluid mb-2"
                    style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
                  />
                  <div className="label text-center">{recipe.name}</div>
                </Link>
                <div className="text-center text-muted small mt-2">
                  {recipe.missing_ingredients.length > 0 && (
                    <div>Ingredientes faltantes: {recipe.missing_ingredients.join(", ")}</div>
                  )}
                  {recipe.missing_utensils.length > 0 && (
                    <div>Utensilios faltantes: {recipe.missing_utensils.join(", ")}</div>
                  )}
                </div>
                <div className="menu-actions mt-2 justify-content-center">
                  <button
                    className={`menu-btn ${isFavorite ? "edit" : "see"}`}
                    onClick={() => dispatch({ type: "toggle_fav_user", payload: recipe.id })}
                  >
                    {isFavorite ? "★" : "☆"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
