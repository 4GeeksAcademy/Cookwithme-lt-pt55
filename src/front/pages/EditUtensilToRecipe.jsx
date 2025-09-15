import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const EditUtensilToRecipe = () => {
  const { utensilioreceta_id } = useParams();
  const navigate = useNavigate();

  const [utensilId, setUtensilId] = useState("");
  const [recipeId, setRecipeId] = useState("");
  const [utensils, setUtensils] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Traer la relación existente
  useEffect(() => {
    fetch(`${backendUrl}/api/utensil_recipe/${utensilioreceta_id}`)
      .then((res) => res.json())
      .then((data) => {
        setUtensilId(data.utensil_id);
        setRecipeId(data.recipe_id);
      })
      .catch((err) => console.error(err));
  }, [utensilioreceta_id]);

  // Traer todos los utensilios y recetas para los select
  useEffect(() => {
    fetch(`${backendUrl}/api/utensils`)
      .then((res) => res.json())
      .then((data) => setUtensils(data));

    fetch(`${backendUrl}/api/recipes`)
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  const updateData = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ utensil_id: utensilId, recipe_id: recipeId }),
    };

    fetch(`${backendUrl}/api/utensil_recipe/${utensilioreceta_id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log("Relación actualizada:", data);
        navigate("/utensilio_receta");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1 className="display-4">Editar Utensilio en receta</h1>
      <form className="w-50 mx-auto" onSubmit={updateData}>
        <div className="mb-3">
          <label className="form-label">Utensilio</label>
          <select
            value={utensilId}
            onChange={(e) => setUtensilId(e.target.value)}
            className="form-select"
          >
            {utensils.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Receta</label>
          <select
            value={recipeId}
            onChange={(e) => setRecipeId(e.target.value)}
            className="form-select"
          >
            {recipes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};
