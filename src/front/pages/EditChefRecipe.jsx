import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditChefRecipe = () => {
    const navigate = useNavigate();
    const { store } = useGlobalReducer();
    const token = localStorage.getItem("tokenChef");
    const { recipe_id } = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [preparation, setPreparation] = useState("");
    const [img, setImg] = useState("");
    const [urlImg, setUrlImg] = useState("");

    const [utensils, setUtensils] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [newUtensil, setNewUtensil] = useState("");
    const [newIngredient, setNewIngredient] = useState("");

    const [allIngredients, setAllIngredients] = useState([]);
    const [allUtensils, setAllUtensils] = useState([]);
    const [ingredientSuggestions, setIngredientSuggestions] = useState([]);
    const [utensilSuggestions, setUtensilSuggestions] = useState([]);

// Fetch de utensilios existentes y todos los utensilios posibles
const get_current_data = async () => {
    try {
        // Receta
        const res = await fetch(`${backendUrl}/api/chef_recipes/${recipe_id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setName(data.name);
        setDescription(data.description);
        setPreparation(data.preparation);
        setImg(data.img);

        // Ingredientes existentes
        const resIng = await fetch(`${backendUrl}/api/recipe_ingredients`);
        const dataIng = await resIng.json();
        const filteredIng = dataIng
            .filter((ing) => ing.recipe_id === parseInt(recipe_id))
            .map((ing) => ing.ingredient_name);
        setIngredients(filteredIng);

        // Utensilios existentes para esta receta
        const resUt = await fetch(`${backendUrl}/api/utensil_recipe`);
        const dataUt = await resUt.json();
        const filteredUt = dataUt
            .filter((ut) => ut.recipe_id === parseInt(recipe_id))
            .map((ut) => ut.utensil_name);
        setUtensils(filteredUt);

        // Todos los ingredientes para autocompletado
        setAllIngredients([...new Set(dataIng.map((i) => i.ingredient_name))]);

        // 🔹 Todos los utensilios posibles para autocompletado
        const resAllUt = await fetch(`${backendUrl}/api/utensils`);
        const dataAllUt = await resAllUt.json();
        setAllUtensils([...new Set(dataAllUt.map((u) => u.name))]);

    } catch (error) {
        console.error("Error fetching recipe data:", error);
    }
};


    useEffect(() => { get_current_data(); }, [recipe_id]);

    // Autocompletado predictivo
    useEffect(() => {
        if (newIngredient.trim() === "") return setIngredientSuggestions([]);
        const filtered = allIngredients.filter(
            (ing) =>
                ing.toLowerCase().includes(newIngredient.toLowerCase()) &&
                !ingredients.includes(ing)
        );
        setIngredientSuggestions(filtered.slice(0, 5));
    }, [newIngredient, allIngredients, ingredients]);

    useEffect(() => {
        if (newUtensil.trim() === "") return setUtensilSuggestions([]);
        const filtered = allUtensils.filter(
            (ut) =>
                ut.toLowerCase().includes(newUtensil.toLowerCase()) &&
                !utensils.includes(ut)
        );
        setUtensilSuggestions(filtered.slice(0, 5));
    }, [newUtensil, allUtensils, utensils]);

    // Agregar / eliminar ingredientes y utensilios localmente
    const addUtensil = (ut = null) => {
        const val = ut || newUtensil.trim();
        if (val) {
            setUtensils([...utensils, val]);
            setNewUtensil("");
            setUtensilSuggestions([]);
        }
    };
    const addIngredient = (ing = null) => {
        const val = ing || newIngredient.trim();
        if (val) {
            setIngredients([...ingredients, val]);
            setNewIngredient("");
            setIngredientSuggestions([]);
        }
    };
    const removeUtensil = (ut) => setUtensils(utensils.filter((u) => u !== ut));
    const removeIngredient = (ing) => setIngredients(ingredients.filter((i) => i !== ing));

    // Subida de imagen
    const changeUploadedImage = async (e) => {
        const file = e.target.files[0];
        setImg("");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "chef_image");
        formData.append("cloud_name", "dwi8lacfr");

        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dwi8lacfr/image/upload",
                { method: "POST", body: formData }
            );
            const data = await response.json();
            if (data.secure_url) setUrlImg(data.secure_url);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    // Guardar cambios
    const updateData = async (e) => {
        e.preventDefault();
        const finalImageUrl = urlImg || img;

        try {
            // 1️⃣ Actualizar receta principal
            await fetch(`${backendUrl}/api/chef_recipes/${recipe_id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ name, description, preparation, img: finalImageUrl })
            });

            // 2️⃣ Agregar todos los ingredientes (POST)
            for (let ing of ingredients) {
                if (typeof ing === "string") {
                    await fetch(`${backendUrl}/api/recipe_ingredients`, {
                        method: "POST",
                        headers: { 
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({ recipe_id: parseInt(recipe_id), ingredient_name: ing })
                    });
                }
            }

            // 3️⃣ Agregar todos los utensilios (POST)
            for (let ut of utensils) {
                if (typeof ut === "string") {
                    await fetch(`${backendUrl}/api/utensil_recipe`, {
                        method: "POST",
                        headers: { 
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({ recipe_id: parseInt(recipe_id), utensil_name: ut })
                    });
                }
            }

            navigate("/chef_home");
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    };

    if (!store.authChef) return <h1>Not authorized</h1>;

    return (
        <div className="container">
            <h1 className="display-4 mb-4">Editar Recipe</h1>
            <form className="w-50 mx-auto" onSubmit={updateData}>
                {/* Nombre */}
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                {/* Description */}
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                {/* Preparation */}
                <div className="mb-3">
                    <label className="form-label">Preparation</label>
                    <textarea className="form-control" value={preparation} onChange={(e) => setPreparation(e.target.value)} />
                </div>
                {/* Image */}
                <div className="mb-3">
                    <input type="file" accept="image/*" onChange={changeUploadedImage} />
                    {(urlImg || img) && (
                        <div className="mt-2">
                            <img src={urlImg || img} alt="Recipe" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
                        </div>
                    )}
                </div>
                {/* Ingredientes */}
                <div className="mb-3">
                    <label className="form-label">Ingredientes</label>
                    <div className="d-flex mb-2">
                        <input type="text" className="form-control me-2" value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} placeholder="Agregar ingrediente" />
                        <button type="button" className="btn btn-success" onClick={() => addIngredient()}>+</button>
                    </div>
                    {ingredientSuggestions.length > 0 && (
                        <ul className="list-group mb-2">
                            {ingredientSuggestions.map((ing, idx) => (
                                <li key={idx} className="list-group-item list-group-item-action" style={{ cursor: "pointer" }} onClick={() => addIngredient(ing)}>
                                    {ing}
                                </li>
                            ))}
                        </ul>
                    )}
                    <div>
                        {ingredients.map((ing, idx) => (
                            <span key={idx} className="badge bg-primary me-1 mb-1">
                                {ing} <i className="fa-solid fa-xmark ms-1" style={{ cursor: "pointer" }} onClick={() => removeIngredient(ing)}></i>
                            </span>
                        ))}
                    </div>
                </div>
                {/* Utensilios */}
                <div className="mb-3">
                    <label className="form-label">Utensilios</label>
                    <div className="d-flex mb-2">
                        <input type="text" className="form-control me-2" value={newUtensil} onChange={(e) => setNewUtensil(e.target.value)} placeholder="Agregar utensilio" />
                        <button type="button" className="btn btn-success" onClick={() => addUtensil()}>+</button>
                    </div>
                    {utensilSuggestions.length > 0 && (
                        <ul className="list-group mb-2">
                            {utensilSuggestions.map((ut, idx) => (
                                <li key={idx} className="list-group-item list-group-item-action" style={{ cursor: "pointer" }} onClick={() => addUtensil(ut)}>
                                    {ut}
                                </li>
                            ))}
                        </ul>
                    )}
                    <div>
                        {utensils.map((ut, idx) => (
                            <span key={idx} className="badge bg-warning text-dark me-1 mb-1">
                                {ut} <i className="fa-solid fa-xmark ms-1" style={{ cursor: "pointer" }} onClick={() => removeUtensil(ut)}></i>
                            </span>
                        ))}
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-outline-primary">Guardar Cambios</button>
                    <Link to="/chef_home" className="btn btn-outline-secondary">Back to home</Link>
                </div>
            </form>
        </div>
    );
};

export default EditChefRecipe;
