import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../css/Homechef.css"; // Reutilizamos el CSS existente

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

  return (
    <div className="available-recipes-container">
      <h1 className="mb-4 text-center">Recetas disponibles según tu inventario</h1>

      {recipes.length === 0 ? (
        <p className="text-center">No tienes suficientes ingredientes o utensilios para preparar ninguna receta.</p>
      ) : (
        <div className="menu-grid-vertical">
          {recipes.map(recipe => {
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
                    className={`menu-btn ${isFavorite ? 'edit' : 'see'}`}
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
