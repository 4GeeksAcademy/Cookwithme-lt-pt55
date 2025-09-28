import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const HomeAvailableRecipes = () => {
  const { store } = useGlobalReducer();
  const [recipes, setRecipes] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

useEffect(() => {
  if (!store.authUser?.token) return;

  fetch(backendUrl + "/api/user/available_recipes", {
    headers: { Authorization: "Bearer " + store.authUser.token }
  })
    .then(res => res.json())
    .then(data => setRecipes(Array.isArray(data) ? data : []))
    .catch(err => console.error(err));
}, [store.authUser?.token]);

  return (
    <div className="w-75 mx-auto">
      <h1>Según tu inventario de productos y utensilios puedes hacer...</h1>
      {recipes.length === 0 && <p>No tienes recetas disponibles aún.</p>}
      {recipes.map(recipe => (
        <div key={recipe.id} className="card mt-3 p-2">
          <h3>{recipe.name}</h3>
          <img src={recipe.img} alt={recipe.name} className="img-fluid mb-2" 
               style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }} />
          <p>{recipe.description}</p>
          <Link to={`/recipes/${recipe.id}`}>
            <button className="btn btn-primary">Ver receta</button>
          </Link>
        </div>
      ))}
    </div>
  );
};
