import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const EditRecipeIngredient = () => {
  const { ri_id } = useParams(); 
  const navigate = useNavigate();

  const [recipe_id, setRecipe_id] = useState("");
  const [ingredient_id, setIngredient_id] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(backendUrl + "/api/recipe_ingredients/" + ri_id)
      .then((response) => response.json())
      .then((data) => {
        setRecipe_id(data.recipe_id);
        setIngredient_id(data.ingredient_id);
      });
  }, [ri_id, backendUrl]);

  function updateData(e) {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe_id: Number(recipe_id),
        ingredient_id: Number(ingredient_id),
      }),
    };

    fetch(backendUrl + "/api/recipe_ingredients/" + ri_id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Recipe_ingredient actualizado:", data);
        navigate("/recipe_ingredients");
      });
  }

  return (
    <div className="container">
      <h1 className="display-4">Editar Recipe_ingredient</h1>
      <form className="w-50 mx-auto" onSubmit={updateData}>
        <div className="mb-3">
          <label className="form-label">Recipe ID</label>
          <input
            value={recipe_id}
            onChange={(e) => setRecipe_id(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ingredient ID</label>
          <input
            value={ingredient_id}
            onChange={(e) => setIngredient_id(e.target.value)}
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
