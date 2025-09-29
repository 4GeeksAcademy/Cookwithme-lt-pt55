import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const SingleRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { store, dispatch } = useGlobalReducer();
  const { recipe_id } = useParams();

  useEffect(() => {
    fetch(`${backendUrl}/api/recipes/${recipe_id}`)
      .then(response => response.json())
      .then(data => setRecipe(data));
  }, [recipe_id]);

  if (!recipe) {
    return <p className="text-center">Loading recipe...</p>;
  }

  return (
    <div className="container my-4 d-flex justify-content-center">
      <div className="card" style={{ maxWidth: "600px" }}>
        <h2 className="card-title text-center">{recipe.name}</h2>
        <img
          src={recipe.img}
          alt={recipe.name}
          className="card-img-top img-fluid"
          style={{ maxHeight: "300px", objectFit: "contain" }}
        />
        <div className="card-body text-center">
          <p className="card-text ">{recipe.description}</p>
          <p className="text-start"><strong>Preparation:</strong> {recipe.preparation}</p>
          
          {store.authChef ? (
            <Link to="/chef_home" className="btn btn-primary me-2">
              Back to Home
            </Link>
          ) : (
            <Link to="/home_user" className="btn btn-secondary me-2">
              Back to Recipes
            </Link>
          )}

          {/* Botón de favoritos */}
          {store.authUser && (
            <i
              className={
                (store.usersFavs[store.authUser.id] || []).includes(recipe.name)
                  ? "fa-solid fa-heart text-danger fs-4 ms-3"
                  : "fa-regular fa-heart text-dark fs-4 ms-3"
              }
              style={{ cursor: "pointer" }}
              onClick={() =>
                dispatch({ type: "toggle_fav_user", payload: recipe.name })
              }
            ></i>
          )}
        </div>
      </div>
    </div>
  );
};

SingleRecipe.propTypes = {
  match: PropTypes.object
};
