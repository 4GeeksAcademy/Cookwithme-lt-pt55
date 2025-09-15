import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewUtensilToRecipe = () => {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [utensils, setUtensils] = useState([]);      // Lista de utensilios
    const [recipes, setRecipes] = useState([]);        // Lista de recetas
    const [currentUtensil, setCurrentUtensil] = useState(null);  
    const [currentRecipe, setCurrentRecipe] = useState(null);    

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

    function sendData(e) {
        e.preventDefault();

        if (!currentUtensil) return alert("Selecciona un utensilio");
        if (!currentRecipe) return alert("Selecciona una receta");

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                utensil_id: currentUtensil.id,
                recipe_id: currentRecipe.id
            })
        };

        fetch(backendUrl + "/api/utensil_recipe", requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log("Guardado:", data);
                navigate("/utensilio_receta");
            })
            .catch(err => console.error("Error guardando relación:", err));
    }

    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                
                {/* Dropdown de Utensilios */}
                <div className="mb-3">
                    <label className="form-label">Utensilio</label>
                </div>
                <div className="dropdown">
                    <button 
                        className="btn btn-secondary dropdown-toggle" 
                        type="button" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        {!currentUtensil ? "Selecciona un utensilio" : "Utensilio: " + currentUtensil.name}
                    </button>
                    <ul className="dropdown-menu">
                        {utensils.map((utensil) =>
                            <li key={utensil.id}>
                                <button 
                                    type="button" 
                                    className="dropdown-item" 
                                    onClick={() => setCurrentUtensil(utensil)}
                                >
                                    {utensil.name}
                                </button>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Dropdown de Recetas */}
                <div className="mb-3 mt-4">
                    <label className="form-label">Receta</label>
                </div>
                <div className="dropdown">
                    <button 
                        className="btn btn-secondary dropdown-toggle" 
                        type="button" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        {!currentRecipe ? "Selecciona una receta" : "Receta: " + currentRecipe.name}
                    </button>
                    <ul className="dropdown-menu">
                        {recipes.map((recipe) =>
                            <li key={recipe.id}>
                                <button 
                                    type="button" 
                                    className="dropdown-item" 
                                    onClick={() => setCurrentRecipe(recipe)}
                                >
                                    {recipe.name}
                                </button>
                            </li>
                        )}
                    </ul>
                </div>

                <button type="submit" className="btn btn-success mt-4">
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default NewUtensilToRecipe;
