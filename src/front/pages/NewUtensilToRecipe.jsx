import React, { useState, useEffect } from "react";

const NewUtensilToRecipe = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [utensils, setUtensils] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [currentUtensil, setCurrentUtensil] = useState(null);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [addedUtensils, setAddedUtensils] = useState([]);

  // Traer utensilios
  useEffect(() => {
    fetch(backendUrl + "/api/utensils")
      .then(res => res.json())
      .then(data => setUtensils(data))
      .catch(err => console.error("Error cargando utensilios:", err));
  }, []);

  // Traer recetas
  useEffect(() => {
    fetch(backendUrl + "/api/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error("Error cargando recetas:", err));
  }, []);

  const addUtensil = async (e) => {
    e.preventDefault();
    if (!currentUtensil || !currentRecipe) return;

    const response = await fetch(backendUrl + "/api/utensil_recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        utensil_id: currentUtensil.id,
        recipe_id: currentRecipe.id
      })
    });

    const data = await response.json();

    // Guardamos para mostrar en la lista
    setAddedUtensils([...addedUtensils, {
      ...data.data,
      utensilName: currentUtensil.name,
      recipeName: currentRecipe.name
    }]);

    // Limpiamos selección de utensilio para poder agregar otro
    setCurrentUtensil(null);
  };

  return (
    <div className="container mt-4">
      <h2>Agregar utensilios a receta</h2>
      <form className="w-50 mx-auto" onSubmit={addUtensil}>
        {/* Dropdown de utensilios */}
        <div className="mb-3">
          <label>Utensilio</label>
          <select 
            className="form-control" 
            value={currentUtensil?.id || ""} 
            onChange={e => setCurrentUtensil(utensils.find(u => u.id === Number(e.target.value)))}
          >
            <option value="">Selecciona un utensilio</option>
            {utensils.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>

        {/* Dropdown de recetas */}
        <div className="mb-3">
          <label>Receta</label>
          <select 
            className="form-control" 
            value={currentRecipe?.id || ""} 
            onChange={e => setCurrentRecipe(recipes.find(r => r.id === Number(e.target.value)))}
          >
            <option value="">Selecciona una receta</option>
            {recipes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>

        <button type="submit" className="btn btn-success mt-3">Agregar utensilio</button>
      </form>

      <div className="mt-4 w-50 mx-auto">
        <h5>Utensilios agregados:</h5>
        <ul className="list-group">
          {addedUtensils.map((u, idx) => (
            <li key={idx} className="list-group-item">
              {u.recipeName} → {u.utensilName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewUtensilToRecipe;
