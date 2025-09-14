import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewUtensilToRecipe = () => {

    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [utensils, setUtensils] = useState([]);       // Lista de utensilios
    const [currentUtensil, setCurrentUtensil] = useState(null);  // Utensilio seleccionado
    useEffect(() => {
        fetch(backendUrl + "/api/utensil_recipe")
            .then(res => res.json())
            .then(data => setUtensils(data));
    }, []);

    function sendData(e) {
        e.preventDefault();
        if (!currentUtensil) return alert("Selecciona un utensilio");

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                utensil_id: currentUtensil.id,
                recipe_id: 2
            })
        };

        fetch(backendUrl + "/api/utensil_recipe", requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                navigate("/utensil_recipe");
            });
    }

    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label className="form-label">Utensilio</label>
                </div>

                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {!currentUtensil ? "Select utensilio" : "Utensilio: " + currentUtensil.name}
                    </button>
                    <ul className="dropdown-menu">
                        {utensils.map((utensil) =>
                            <li key={utensil.id}>
                                <button type="button" className="dropdown-item" onClick={() => setCurrentUtensil(utensil)}>
                                    {utensil.utensil_name}
                                </button>
                            </li>

                        )}
                    </ul>
                </div>

                <div className="mb-3">
                    <label className="form-label">Recetas</label>
                </div>
            
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {!currentUtensil ? "Select recetas" : "recetas: " + currentUtensil.name}
                    </button>
                    <ul className="dropdown-menu">
                        {utensils.map((utensil) =>
                            <li key={utensil.id}>
                                <button type="button" className="dropdown-item" onClick={() => setCurrentUtensil(utensil)}>
                                    {utensil.recipe_name}
                                </button>
                            </li>

                        )}
                    </ul>
                </div>


                <button type="submit" className="btn btn-success mt-3">Guardar</button>
            </form>
        </div>
    );
};

export default NewUtensilToRecipe;
