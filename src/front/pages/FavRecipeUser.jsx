import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const FavRecipeUser = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const [recipes, setRecipes] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(backendUrl + "/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  const userFavs = store.authUser ? store.usersFavs[store.authUser.id] || [] : [];
  const favRecipes = recipes.filter((res) => userFavs.includes(res.id));

  return (
    <div className="w-50 mx-auto">
      <h2>Mis recetas favoritas</h2>
      {favRecipes.length > 0 ? (
        favRecipes.map((recipe) => {
          const isFavorite = userFavs.includes(recipe.id);
          return (
            <div key={recipe.id} className="card mt-2 p-1">
              <h3 className="text-center">{recipe.name}</h3>
              <img
                src={recipe.img}
                alt={recipe.name}
                className="img-fluid mb-2"
                style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
              />
              <p className="text-center">{recipe.description}</p>
              <div className="d-flex justify-content-between">
                <Link to={`/recipes/${recipe.id}`}>
                  <button className="btn btn-primary">Ver receta</button>
                </Link>
                <i
                  className={
                    isFavorite
                      ? "fa-solid fa-heart text-danger fs-4"
                      : "fa-regular fa-heart text-dark fs-4"
                  }
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch({ type: "toggle_fav_user", payload: recipe.id });
                  }}
                ></i>
              </div>
            </div>
          );
        })
      ) : (
        <p>No tienes recetas favoritas aún.</p>
      )}
    </div>
  );
};

export default FavRecipeUser;
