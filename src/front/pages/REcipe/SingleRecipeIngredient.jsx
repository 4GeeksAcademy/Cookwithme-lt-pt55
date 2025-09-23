import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const SingleRecipeIngredient = (props) => {
  const { ri_id } = useParams(); 
  const [recipeIngredient, setRecipeIngredient] = useState({});

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  function getRecipeIngredient() {
    fetch(backendUrl + "/api/recipe_ingredients/" + ri_id)
      .then((response) => response.json())
      .then((data) => setRecipeIngredient(data));
  }

  useEffect(() => {
    getRecipeIngredient();
  }, [ri_id]);

  return (
    <div className="container text-center">
      <h1 className="display-4">Recipe Ingredient ID: {recipeIngredient.id}</h1>
      <h2 className="display-6">Recipe ID: {recipeIngredient.recipe_id}</h2>
      <h2 className="display-6">Ingredient ID: {recipeIngredient.ingredient_id}</h2>
      <hr className="my-4" />

      <Link to="/recipe_ingredients">
        <span className="btn btn-primary btn-lg" role="button">
          Back to Recipe Ingredients
        </span>
      </Link>
    </div>
  );
};

SingleRecipeIngredient.propTypes = {
  match: PropTypes.object,
};
