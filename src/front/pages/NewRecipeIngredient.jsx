import React, { useEffect, useState } from "react";

const NewRecipeIngredient = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipeId, setRecipeId] = useState("");
  const [ingredientId, setIngredientId] = useState("");
  const [addedIngredients, setAddedIngredients] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Traer recetas
    fetch(backendUrl + "/api/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data));

    // Traer ingredientes
    fetch(backendUrl + "/api/ingredients")
      .then(res => res.json())
      .then(data => setIngredients(data));
  }, []);

  const addIngredient = async (e) => {
    e.preventDefault();
    if (!recipeId || !ingredientId) return;

    const response = await fetch(backendUrl + "/api/recipe_ingredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe_id: Number(recipeId),
        ingredient_id: Number(ingredientId),
      }),
    });

    const data = await response.json();
    // Guardamos tanto id como nombre para mostrar
    const ingredientName = ingredients.find(i => i.id === Number(ingredientId))?.name;
    const recipeName = recipes.find(r => r.id === Number(recipeId))?.name;

    setAddedIngredients([...addedIngredients, {
      ...data.data,
      ingredientName,
      recipeName
    }]);
    setIngredientId(""); // limpiar para agregar otro
  };

  return (
    <div className="container mt-4">
      <h2>Agregar ingredientes a receta</h2>
      <form onSubmit={addIngredient} className="w-50 mx-auto">
        <div className="mb-3">
          <label>Receta</label>
          <select className="form-control" value={recipeId} onChange={e => setRecipeId(e.target.value)}>
            <option value="">Selecciona una receta</option>
            {recipes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>

        <div className="mb-3">
          <label>Ingrediente</label>
          <select className="form-control" value={ingredientId} onChange={e => setIngredientId(e.target.value)}>
            <option value="">Selecciona un ingrediente</option>
            {ingredients.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Agregar ingrediente</button>
      </form>

      <div className="mt-4 w-50 mx-auto">
        <h5>Ingredientes agregados:</h5>
        <ul className="list-group">
          {addedIngredients.map((ing, index) => (
            <li key={index} className="list-group-item">
              {ing.recipeName} → {ing.ingredientName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewRecipeIngredient;
