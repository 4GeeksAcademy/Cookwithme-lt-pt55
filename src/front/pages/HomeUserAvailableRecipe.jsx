import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const HomeAvailableRecipes = () => {
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
      .catch(err => console.error("Error fetching available recipes:", err));
  }, [store.token]);

  return (
    <div className="w-75 mx-auto">
      <h1 className="mb-4">Recetas que puedes preparar según tu inventario</h1>

      {recipes.length === 0 ? (
        <p>No tienes suficientes ingredientes o utensilios para preparar ninguna receta.</p>
      ) : (
        recipes.map(recipe => (
          <div key={recipe.id} className="card mt-3 p-2">
            <h3>{recipe.name}</h3>
            <img
              src={recipe.img}
              alt={recipe.name}
              className="img-fluid mb-2"
              style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
            />
            <p>{recipe.description}</p>
            <div className="mt-2">
              <Link to={`/recipes/${recipe.id}`}>
                <button className="btn btn-primary">Ver receta</button>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
