import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const IngredientUser = () => {
  const [ingredientUsers, setIngredientUsers] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  function getIngredientUsers() {
    fetch(backendUrl + "/api/ingredient_users")
      .then((response) => response.json())
      .then((data) => setIngredientUsers(data));
  }

  function deleteIngredientUser(ingredient_user_id) {
    const requestOptions = {
      method: "DELETE",
    };
    fetch(backendUrl + "/api/ingredient_users/" + ingredient_user_id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getIngredientUsers();
      });
  }

  useEffect(() => {
    getIngredientUsers();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1 className="display-4">Ingredient Users</h1>

      <div className="ml-auto">
        <Link to="/add_ingredient_user">
          <button className="btn btn-success my-3">Crear Ingredient User</button>
        </Link>
      </div>

      {ingredientUsers.map((iu) => (
        <p key={iu.id}>
          Ingredient ID: {iu.ingredient_id} | User ID: {iu.user_id}
          
          <Link to={"/ingredient_users/" + iu.id}>
            <button className="btn btn-primary mx-2">Ver</button>
          </Link>

          <Link to={"/ingredient_users/" + iu.id + "/edit"}>
            <button className="btn btn-info mx-2">Editar</button>
          </Link>

          <button
            className="btn btn-danger mx-2"
            onClick={() => deleteIngredientUser(iu.id)}
          >
            Eliminar
          </button>
        </p>
      ))}
    </div>
  );
};
