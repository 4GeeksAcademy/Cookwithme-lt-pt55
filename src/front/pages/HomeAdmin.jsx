import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navigate, Link, useNavigate } from "react-router-dom";
import "../css/Homechef.css";  

export const HomeAdmin = () => {
  const { store, dispatch } = useGlobalReducer();
  const [recipes, setRecipes] = useState([]);
  const [chefs, setChefs] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // Traer todas las recetas de todos los chefs
  function getAllRecipes() {
    const token = localStorage.getItem("tokenAdmin");
    fetch(`${backendUrl}/api/recipes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recipes");
        return res.json();
      })
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }

  // Traer información de chefs para mostrar su nombre junto a las recetas
  function getAllChefs() {
    const token = localStorage.getItem("tokenAdmin");
    fetch(`${backendUrl}/api/admin_chefs`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setChefs(data))
      .catch((err) => console.error("Error fetching chefs:", err));
  }

  function deleteRecipe(recipeId) {
    const token = localStorage.getItem("tokenAdmin");
    fetch(`${backendUrl}/api/admin_recipes/${recipeId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        getAllRecipes();
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getAllRecipes();
    getAllChefs();
  }, []);

  if (!store.authAdmin) return <Navigate to="/login_admin" />;

  // Función para obtener nombre del chef de una receta
  const getChefName = (chefId) => {
    const chef = chefs.find((c) => c.id === chefId);
    return chef ? chef.name : "Unknown Chef";
  };

  return (
    <div className="menu-container">
      <h5 className="section-title">Admin Dashboard</h5>
      <h1 className="display-3 mb-0">Manage Recipes</h1>
      <Link to="/new_admin_recipe" className="btn btn-custom">
        <i className="fa-solid fa-plus me-2"></i> Add New Recipe
      </Link>

      <div className="menu-grid">
        {recipes.length !== 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="menu-item">
              <Link to={`/recipes/${recipe.id}`}>
                <img src={recipe.img || "https://via.placeholder.com/150"} alt={recipe.name} />
                <div className="label">{recipe.name}</div>
              </Link>
              <div className="chef-name">By: {getChefName(recipe.chef_id)}</div>
              <div className="menu-actions">
                <Link
                  to={`/admin_recipes/${recipe.id}/update`}
                  className="menu-btn edit"
                  title="Edit Recipe"
                >
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
          <h3>No recipes found. Add one above!</h3>
        )}
      </div>
    </div>
  );
};
