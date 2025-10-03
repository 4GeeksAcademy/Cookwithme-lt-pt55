import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navigate, Link } from "react-router-dom";
import "../css/Homechef.css"; // mantiene los estilos base

export const HomeChef = () => {
  const { store } = useGlobalReducer();
  const [chefRecipe, setChefRecipe] = useState([]);
  const [chef, setChef] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;



  function getChefInfo() {
    const token = localStorage.getItem("tokenChef");
    fetch(backendUrl + `/api/chef_info`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setChef(data));
  }



  function getChefRecipes() {
    const token = localStorage.getItem("tokenChef");
    fetch(backendUrl + `/api/chef_recipes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setChefRecipe(data));
  }


  function deleteRecipe(recipe_id) {
    const token = localStorage.getItem("tokenChef");
    fetch(backendUrl + `/api/chef_recipes/${recipe_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(() => getChefRecipes());
  }

  useEffect(() => {
    getChefInfo();
    getChefRecipes();
  }, []);

  if (!store.authChef) return <Navigate to="/login_chef" />;

  return (
    <div className="menu-container">
      <h5 className="section-title">Your Recipes</h5>
      <h1 className="display-3 mb-0">Manage Your Creations</h1>


      <Link to="/new_chef_recipe" className="add-recipe-btn">
        <i className="fa-solid fa-plus me-2"></i> Add New Recipe
      </Link>

      <div className="menu-grid">
        {chefRecipe.length !== 0 ? (
          chefRecipe.map((recipe) => (
            <div key={recipe.id} className="menu-item">
              {/* Hacer que al clickear la imagen se vea la receta */}
              <Link to={`/recipes/${recipe.id}`}>
                <img src={recipe.img} alt={recipe.name} />
                <div className="label">{recipe.name}</div>
              </Link>

              <div className="menu-actions">

                <Link to={`/chef_recipes/${recipe.id}/update`} className="menu-btn edit" title="Edit Recipe">
                  <i className="fa-solid fa-pen"></i>
                </Link>
                <button
                  className="menu-btn delete"
                  onClick={() => deleteRecipe(recipe.id)}
                  title="Delete Recipe"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3>No recipes yet. Add one below!</h3>
        )}
      </div>
    </div>
  );
};
