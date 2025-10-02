import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

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

  // Traer inventario del usuario: ingredientes
  useEffect(() => {
    if (!store.token) return;

    fetch(`${backendUrl}/api/user/inventory/ingredients`, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    })
      .then(res => res.json())
      .then(data => setIngredients(data));
  }, [store.token]);

  // Traer inventario del usuario: utensilios
  useEffect(() => {
    if (!store.token) return;

    fetch(`${backendUrl}/api/user/inventory/utensils`, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUtensils(data));
  }, [store.token]);

  // 🔴 Eliminar ingrediente del inventario
  const removeIngredient = (id) => {
    fetch(`${backendUrl}/api/user/inventory/ingredients/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    }).then((res) => {
      if (res.ok) {
        setIngredients(ingredients.filter((ing) => ing.id !== id));
      }
    });
  };

  // 🔴 Eliminar utensilio del inventario
  const removeUtensil = (id) => {
    fetch(`${backendUrl}/api/user/inventory/utensils/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    }).then((res) => {
      if (res.ok) {
        setUtensils(utensils.filter((ut) => ut.id !== id));
      }
    });
  };

  const userFavs = store.authUser ? store.usersFavs[store.authUser.id] || [] : [];

  return (
    <div className="w-50 mx-auto">
      <h1>
        Welcome, <strong>{store.authUser?.username}</strong>
      </h1>

        {/* Inventario del usuario */}
        <div className="mt-4">
          <h2>🍅 Ingredientes en tu inventario</h2>

          {/* Botones de acción */}
          <div className="mb-3">
            <Link to="/add_ingrediente">
              <button className="btn btn-success me-2">
                ➕ Agregar Ingrediente
              </button>
            </Link>
            <Link to="/add_ingrediente_ai">
              <button className="btn btn-warning">
                🤖 Identificar Ingredientes con IA
              </button>
            </Link>
          </div>

          {/* Lista de ingredientes */}
          {ingredients.length > 0 ? (
            <div>
              {ingredients.map((ing) => (
                <span
                  key={ing.id}
                  className="badge bg-primary me-1 mb-1 d-inline-flex align-items-center"
                  style={{ fontSize: "1rem" }}
                >
                  {ing.name}
                  <i
                    className="fa-solid fa-xmark ms-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeIngredient(ing.id)}
                  ></i>
                </span>
              ))}
            </div>
          ) : (
            <p>No tienes ingredientes agregados.</p>
          )}

        <h2 className="mt-3">🍴 Utensilios en tu inventario</h2>
        {utensils.length > 0 ? (
          <div>
            {utensils.map((ut) => (
              <span
                key={ut.id}
                className="badge bg-success me-1 mb-1 d-inline-flex align-items-center"
                style={{ fontSize: "1rem" }}
              >
                {ut.name}
                <i
                  className="fa-solid fa-xmark ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeUtensil(ut.id)}
                ></i>
              </span>
            ))}
          </div>
        ) : (
          <p>No tienes utensilios agregados.</p>
        )}
      </div>

      {/* Recetas */}
      <h2 className="mt-4">Recetas</h2>
      {recipes.map((recipe) => {
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

            <div className="d-flex justify-content-between align-items-center">
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
      })}
    </div>
  );
};
