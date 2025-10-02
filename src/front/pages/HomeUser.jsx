import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../css/Homechef.css"; // Reutilizamos el CSS

export const HomeUser = () => {
  const { store, dispatch } = useGlobalReducer();
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [utensils, setUtensils] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Traer recetas
  useEffect(() => {
    fetch(`${backendUrl}/api/recipes`)
      .then(res => res.json())
      .then(data => setRecipes(data));
  }, []);

  // Inventario: ingredientes
  useEffect(() => {
    if (!store.token) return;
    fetch(`${backendUrl}/api/user/inventory/ingredients`, {
      headers: { Authorization: `Bearer ${store.token}` },
    })
      .then(res => res.json())
      .then(data => setIngredients(data));
  }, [store.token]);

  // Inventario: utensilios
  useEffect(() => {
    if (!store.token) return;
    fetch(`${backendUrl}/api/user/inventory/utensils`, {
      headers: { Authorization: `Bearer ${store.token}` },
    })
      .then(res => res.json())
      .then(data => setUtensils(data));
  }, [store.token]);

  const removeIngredient = (id) => {
    fetch(`${backendUrl}/api/user/inventory/ingredients/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${store.token}` },
    }).then(res => {
      if (res.ok) setIngredients(ingredients.filter(i => i.id !== id));
    });
  };

  const removeUtensil = (id) => {
    fetch(`${backendUrl}/api/user/inventory/utensils/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${store.token}` },
    }).then(res => {
      if (res.ok) setUtensils(utensils.filter(u => u.id !== id));
    });
  };

  const userFavs = store.authUser ? store.usersFavs[store.authUser.id] || [] : [];

  return (
    <div className="menu-container">
      <h5 className="section-title">Your Inventory</h5>
      <h1 className="display-3 mb-0">Manage Your Kitchen</h1>

      {/* Inventario */}
      <div className="mt-4">
        <h2>🍅 Ingredientes</h2>
        {ingredients.length > 0 ? (
          <div>
            {ingredients.map(ing => (
              <span key={ing.id} className="badge bg-primary me-1 mb-1 d-inline-flex align-items-center">
                {ing.name}
                <i className="fa-solid fa-xmark ms-2" style={{cursor: "pointer"}} onClick={() => removeIngredient(ing.id)}></i>
              </span>
            ))}
          </div>
        ) : <p>No tienes ingredientes agregados.</p>}

        <h2 className="mt-3">🍴 Utensilios</h2>
        {utensils.length > 0 ? (
          <div>
            {utensils.map(ut => (
              <span key={ut.id} className="badge bg-success me-1 mb-1 d-inline-flex align-items-center">
                {ut.name}
                <i className="fa-solid fa-xmark ms-2" style={{cursor: "pointer"}} onClick={() => removeUtensil(ut.id)}></i>
              </span>
            ))}
          </div>
        ) : <p>No tienes utensilios agregados.</p>}
      </div>

      {/* Recetas */}
      <h2 className="mt-4">Recetas</h2>
      <div className="menu-grid">
        {recipes.length > 0 ? (
          recipes.map(recipe => {
            const isFavorite = userFavs.includes(recipe.id);
            return (
              <div key={recipe.id} className="menu-item">
                <Link to={`/recipes/${recipe.id}`}>
                  <img src={recipe.img} alt={recipe.name} />
                  <div className="label">{recipe.name}</div>
                </Link>
                <div className="menu-actions">
                  <button
                    className={`menu-btn ${isFavorite ? 'edit' : 'see'}`}
                    onClick={() => dispatch({ type: "toggle_fav_user", payload: recipe.id })}
                  >
                    {isFavorite ? "★" : "☆"}
                  </button>
                </div>
              </div>
            );
          })
        ) : <h3>No hay recetas disponibles.</h3>}
      </div>
    </div>
  );
};
