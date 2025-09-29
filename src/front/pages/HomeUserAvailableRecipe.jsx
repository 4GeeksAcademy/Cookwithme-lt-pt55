import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const HomeAvailableRecipes = () => {
  const { store } = useGlobalReducer();
  const [recipes, setRecipes] = useState([]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true); // toggle
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!store.authUser?.token) return;

    fetch(backendUrl + "/api/user/available_recipes", {
      headers: { Authorization: "Bearer " + store.token }
    })
      .then(res => res.json())
      .then(data => setRecipes(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, [store.authUser?.token]);

  // Filtrar según toggle
  const filteredRecipes = showOnlyAvailable
    ? recipes.filter(recipe => recipe.can_make)
    : recipes;

  return (
    <div className="w-75 mx-auto">
      <h1 className="mb-4">Según tu inventario, puedes preparar...</h1>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="toggleAvailable"
          checked={showOnlyAvailable}
          onChange={() => setShowOnlyAvailable(prev => !prev)}
        />
        <label className="form-check-label" htmlFor="toggleAvailable">
          Mostrar solo recetas que puedo preparar
        </label>
      </div>

      {filteredRecipes.length === 0 && <p>No hay recetas disponibles.</p>}

      {filteredRecipes.map(recipe => (
        <div key={recipe.id} className="card mt-3 p-2">
          <h3>{recipe.name}</h3>
          <img
            src={recipe.img}
            alt={recipe.name}
            className="img-fluid mb-2"
            style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
          />
          <p>{recipe.description}</p>

          {recipe.can_make ? (
            <span className="badge bg-success">¡Puedes hacerla!</span>
          ) : (
            <span className="badge bg-warning">
              Te faltan {recipe.missing_ingredients_count} ingredientes y {recipe.missing_utensils_count} utensilios
            </span>
          )}

          <div className="mt-2">
            <Link to={`/recipes/${recipe.id}`}>
              <button className="btn btn-primary">Ver receta</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
