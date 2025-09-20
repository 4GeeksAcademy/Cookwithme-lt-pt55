import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const HomeUser = () => {
  const { store, dispatch } = useGlobalReducer(); // Desestructurar dispatch
  const [recipes, setRecipes] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(backendUrl + "/api/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data));
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1>Welcome</h1>
      <h2>Recetas</h2>
      {recipes.map(recipe => {
        const isFavorite = store.charFav.includes(recipe.name); // Calcular por cada receta
        return (
          <div key={recipe.id} className="card mt-3 p-3">
            <h3>{recipe.name}</h3>
            <img
              src={recipe.img}
              alt={recipe.name}
              className="img-fluid mb-2"
              style={{ maxHeight: "200px" }}
            />
            <p>{recipe.description}</p>
            <i
              className={isFavorite ? "fa-solid fa-heart mx-5" : "fa-regular fa-heart mx-5"}
              style={{ color: isFavorite ? "red" : "black", cursor: "pointer" }}
              onClick={() =>
                dispatch({
                  type: "toggle_charfav", 
                  payload: recipe.name
                })
              }
            ></i>
            <Link to={`/recipes/${recipe.id}`}>
              <button className="btn btn-primary">See Recipe</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
