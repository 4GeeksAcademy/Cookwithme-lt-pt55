import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const AvailableRecipes = () => {
  const { store } = useGlobalReducer();
  const [recipes, setRecipes] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAvailableRecipes = async () => {
      try {
        const token = localStorage.getItem("tokenUser");
        const res = await fetch(`${backendUrl}/api/user/available_recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener recetas");

        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (store.authUser) {
      fetchAvailableRecipes();
    }
  }, [store.authUser, backendUrl]);

  return (
    <div className="container mt-4">
      <h2>Recetas que puedes cocinar 🍳</h2>
      {recipes.length === 0 ? (
        <p>No tienes suficientes ingredientes y utensilios para cocinar una receta aún.</p>
      ) : (
        <div className="row">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={recipe.image_url || "https://via.placeholder.com/150"}
                  className="card-img-top"
                  alt={recipe.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <button className="btn btn-primary">Ver receta</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
