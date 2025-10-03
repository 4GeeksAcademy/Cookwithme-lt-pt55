import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import "../css/Homechef.css";

const FavRecipeUser = () => {
  const { store, dispatch } = useGlobalReducer();
  const [recipes, setRecipes] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(backendUrl + "/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error(err));
  }, []);

  const userFavs = store.authUser ? store.usersFavs[store.authUser.id] || [] : [];
  const favRecipes = recipes.filter((res) => userFavs.includes(res.id));

  return (
    <div className="available-recipes-container w-75 mx-auto">
      <h1 className="mb-4 text-center">Mis recetas favoritas</h1>

      {favRecipes.length === 0 ? (
        <p className="text-center">No tienes recetas favoritas aún.</p>
      ) : (
        <div className="d-flex flex-column align-items-center">
          {favRecipes.map((recipe) => {
            const isFavorite = userFavs.includes(recipe.id);

            return (
              <div
                key={recipe.id}
                className="menu-item-vertical card mb-4 p-3"
                style={{ width: "100%" }}
              >
                <Link to={`/recipes/${recipe.id}`} className="text-decoration-none">
                  <img
                    src={recipe.img}
                    alt={recipe.name}
                    className="img-fluid mb-2"
                    style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
                  />
                  <div className="label">{recipe.name}</div>
                </Link>

                <div className="menu-actions mt-2 d-flex justify-content-center">
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

export default FavRecipeUser;
