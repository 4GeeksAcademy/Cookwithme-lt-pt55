import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../css/Bottoms.css"

export const SingleRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [utensils, setUtensils] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { store, dispatch } = useGlobalReducer();
  const { recipe_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // Receta
      const res = await fetch(`${backendUrl}/api/recipes/${recipe_id}`);
      const data = await res.json();
      setRecipe(data);

      // Ingredientes (trae todos pero toca filtrar para no tocar el back)
      const resIng = await fetch(`${backendUrl}/api/recipe_ingredients`);
      const dataIng = await resIng.json();
      setIngredients(
        dataIng.filter((ing) => ing.recipe_id === parseInt(recipe_id))
      );

      // utensilios (trae todos pero toca filtrar para no tocar el back)
      const resUt = await fetch(`${backendUrl}/api/utensil_recipe`);
      const dataUt = await resUt.json();
      setUtensils(
        dataUt.filter((ut) => ut.recipe_id === parseInt(recipe_id))
      );
    };

    fetchData();
  }, [recipe_id]);

  if (!recipe) {
    return <p className="text-center">Loading recipe...</p>;
  }

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <h5 className="section-title">Recipe Detail</h5>
        <h1 className="display-3 mb-4 text-center">{recipe.name}</h1>

        <div className="row g-5 justify-content-center">
          <div className="col-lg-8">
            <div className="position-relative overflow-hidden rounded shadow">
              <img
                src={recipe.img}
                alt={recipe.name}
                className="img-fluid w-100"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
              <div className="position-absolute bottom-0 end-0 bg-dark text-warning px-3 py-1 rounded-start">
                {recipe.name}
              </div>
            </div>

            <div className="mt-4">
              <p className="fs-5 text-muted">{recipe.description}</p>
              <p className="text-start">
                <strong>Preparation:</strong> {recipe.preparation}
              </p>
            </div>


            <div className="mt-4">
              <h4>🧄 Ingredients</h4>
              {ingredients.length > 0 ? (
                <ul>
                  {ingredients.map((ing) => (
                    <li key={ing.id}>{ing.ingredient_name}</li>
                  ))}
                </ul>
              ) : (
                <p>No ingredients listed.</p>
              )}
            </div>


            <div className="mt-4">
              <h4>🍴 Utensils</h4>
              {utensils.length > 0 ? (
                <ul>
                  {utensils.map((ut) => (
                    <li key={ut.id}>{ut.utensil_name}</li>
                  ))}
                </ul>
              ) : (
                <p>No utensils listed.</p>
              )}
            </div>

            <div className="d-flex align-items-center mt-4">
              {store.authChef ? (
                <>
                <Link to="/chef_home" className="btn btn-custom">
                  <i className="fa-solid fa-arrow-left me-2"></i> Back to Home
                </Link>
                <Link to={`/chef_recipes/${recipe.id}/update`} className="btn btn-custom">
                  <i className="fa-solid fa-arrow-left me-2"></i> Edit recipe
                </Link>
                </>
              ) : (
                <Link
                  to="/home_user"
                  className="btn btn-custom me-2"
                >
                  <i className="fa-solid fa-arrow-left me-2"></i> Back to Recipes
                </Link>
              )}

              {/* Favoritos cuando es usuario*/}
              {store.authUser && (
                <i
                  className={
                    (store.usersFavs[store.authUser.id] || []).includes(
                      recipe.id
                    )
                      ? "fa-solid fa-heart text-danger fs-3 ms-3"
                      : "fa-regular fa-heart text-dark fs-3 ms-3"
                  }
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    dispatch({ type: "toggle_fav_user", payload: recipe.id })
                  }
                ></i>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SingleRecipe.propTypes = {
  match: PropTypes.object,
};
