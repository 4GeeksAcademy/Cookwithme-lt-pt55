import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const EditIngredientUser = () => {
  const { ingredient_user_id } = useParams();
  const navigate = useNavigate();

  const [ingredient_id, setIngredient_id] = useState("");
  const [user_id, setUser_id] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(backendUrl + "/api/ingredient_users/" + ingredient_user_id)
      .then((response) => response.json())
      .then((data) => {
        setIngredient_id(data.ingredient_id);
        setUser_id(data.user_id);
      });
  }, [ingredient_user_id, backendUrl]);

  function updateData(e) {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredient_id: Number(ingredient_id),
        user_id: Number(user_id),
      }),
    };

    fetch(backendUrl + "/api/ingredient_users/" + ingredient_user_id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("IngredientUser actualizado:", data);
        navigate("/ingredient_users");
      });
  }

  return (
    <div className="container">
      <h1 className="display-4">Editar IngredientUser</h1>
      <form className="w-50 mx-auto" onSubmit={updateData}>
        <div className="mb-3">
          <label className="form-label">Ingredient ID</label>
          <input
            value={ingredient_id}
            onChange={(e) => setIngredient_id(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">User ID</label>
          <input
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};
