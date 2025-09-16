import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const RecipeIngredient = () => {
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  function getRecipeIngredients() {
    fetch(backendUrl + "/api/recipe_ingredients")
      .then((response) => response.json())
      .then((data) => setRecipeIngredients(data));
  }

  function deleteRecipeIngredient(ri_id) {
    const requestOptions = {
      method: "DELETE",
    };

    fetch(backendUrl + "/api/recipe_ingredients/" + ri_id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getRecipeIngredients();
      });
  }

  useEffect(() => {
    getRecipeIngredients();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1 className="display-4">Recipe Ingredients</h1>

      <div className="ml-auto">
        <Link to="/add_recipe_ingredient">
          <button className="btn btn-success my-3">
            Crear Recipe Ingredient
          </button>
        </Link>
      </div>

      {recipeIngredients.map((ri) => (
        <p key={ri.id}>
          Recipe ID: {ri.recipe_id} | Ingredient ID: {ri.ingredient_id}
          {"  "}
          <Link to={"/recipe_ingredients/" + ri.id}>
            <button className="btn btn-primary mx-1">Ver</button>
          </Link>
          <Link to={"/recipe_ingredients/" + ri.id + "/edit"}>
            <button className="btn btn-info mx-1">Editar</button>
          </Link>
          <button
            className="btn btn-danger mx-1"
            onClick={() => deleteRecipeIngredient(ri.id)}
          >
            Eliminar
          </button>
        </p>
      ))}
    </div>
  );
};
