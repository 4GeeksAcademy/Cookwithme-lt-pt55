import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewRecipeIngredient = () => {
  const navigate = useNavigate();

  const [recipe_id, setRecipe_id] = useState("");
  const [ingredient_id, setIngredient_id] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  function sendData(e) {
    e.preventDefault();
    console.log("send data");
    console.log({ recipe_id, ingredient_id });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe_id: Number(recipe_id), 
        ingredient_id: Number(ingredient_id),
      }),
    };

    fetch(backendUrl + "/api/recipe_ingredients", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Recipe_ingredient creado:", data);
        navigate("/recipe_ingredients"); 
      });
  }

  return (
    <div>
      <form className="w-50 mx-auto" onSubmit={sendData}>
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
          Crear
        </button>
      </form>
    </div>
  );
};

export default NewRecipeIngredient;
