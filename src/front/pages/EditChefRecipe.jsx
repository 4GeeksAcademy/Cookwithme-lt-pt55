import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../css/Bottoms.css"

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

  const [ingredients, setIngredients] = useState([]); // {id, name}
  const [utensils, setUtensils] = useState([]); // {id, name}

  const [newIngredient, setNewIngredient] = useState("");
  const [newUtensil, setNewUtensil] = useState("");

  const [allIngredients, setAllIngredients] = useState([]); // {id, name}
  const [allUtensils, setAllUtensils] = useState([]); // {id, name}

  const [ingredientSuggestions, setIngredientSuggestions] = useState([]);
  const [utensilSuggestions, setUtensilSuggestions] = useState([]);

// ====== Cargar datos de la receta ======
const get_current_data = async () => {
  try {
    // Receta principal
    const resRecipe = await fetch(`${backendUrl}/api/chef_recipes/${recipe_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const recipeData = await resRecipe.json();
    setName(recipeData.name);
    setDescription(recipeData.description);
    setPreparation(recipeData.preparation);
    setImg(recipeData.img);

    // Ingredientes actuales de la receta
    const resRecipeIngredients = await fetch(`${backendUrl}/api/recipe_ingredients`);
    const allRecipeIngredients = await resRecipeIngredients.json();
    const recipeIngredients = allRecipeIngredients
      .filter((i) => i.recipe_id === parseInt(recipe_id))
      .map((i) => ({ id: i.ingredient_id, name: i.ingredient_name }));
    setIngredients(recipeIngredients);

    // Utensilios actuales de la receta
    const resRecipeUtensils = await fetch(`${backendUrl}/api/utensil_recipe`);
    const allRecipeUtensils = await resRecipeUtensils.json();
    const recipeUtensils = allRecipeUtensils
      .filter((u) => u.recipe_id === parseInt(recipe_id))
      .map((u) => ({ id: u.utensil_id, name: u.utensil_name }));
    setUtensils(recipeUtensils);

    // Todos los ingredientes disponibles (para autocompletado)
    const resAllIngredients = await fetch(`${backendUrl}/api/ingredients`);
    const allIngredientsData = await resAllIngredients.json();
    setAllIngredients(allIngredientsData.map((i) => ({ id: i.id, name: i.name })));

    // Todos los utensilios disponibles (para autocompletado)
    const resAllUtensils = await fetch(`${backendUrl}/api/utensils`);
    const allUtensilsData = await resAllUtensils.json();
    setAllUtensils(allUtensilsData.map((u) => ({ id: u.id, name: u.name })));

  } catch (error) {
    console.error("Error fetching recipe data:", error);
  }
};


  useEffect(() => {
    get_current_data();
  }, [recipe_id]);

  // ====== Autocompletado predictivo ======
useEffect(() => {
    if (newIngredient.trim() === "") return setIngredientSuggestions([]);

    const filtered = allIngredients.filter((i) => {
        // Evita mostrar ingredientes ya agregados
        const alreadyAdded = ingredients.some((ing) => ing.name === i.name);
        return i.name.toLowerCase().includes(newIngredient.toLowerCase()) && !alreadyAdded;
    });

    setIngredientSuggestions(filtered.slice(0, 5));
}, [newIngredient, allIngredients, ingredients]);


  useEffect(() => {
    if (newUtensil.trim() === "") return setUtensilSuggestions([]);
    const filtered = allUtensils.filter(
      (u) =>
        u.name.toLowerCase().includes(newUtensil.toLowerCase()) &&
        !utensils.some((ut) => ut.id === u.id)
    );
    setUtensilSuggestions(filtered.slice(0, 5));
  }, [newUtensil, allUtensils, utensils]);

  //  Agregar / eliminar
  const addIngredient = (ingObj = null) => {
    const val = ingObj || allIngredients.find((i) => i.name === newIngredient.trim());
    if (!val) return;
    if (!ingredients.some((i) => i.id === val.id)) {
      setIngredients([...ingredients, val]);
    }
    setNewIngredient("");
    setIngredientSuggestions([]);
  };

  const addUtensil = (utObj = null) => {
    const val = utObj || allUtensils.find((u) => u.name === newUtensil.trim());
    if (!val) return;
    if (!utensils.some((u) => u.id === val.id)) {
      setUtensils([...utensils, val]);
    }
    setNewUtensil("");
    setUtensilSuggestions([]);
  };

  const removeIngredient = (ing) => setIngredients(ingredients.filter((i) => i.id !== ing.id));
  const removeUtensil = (ut) => setUtensils(utensils.filter((u) => u.id !== ut.id));


  const changeUploadedImage = async (e) => {
    const file = e.target.files[0];
    setImg("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chef_image");
    formData.append("cloud_name", "dwi8lacfr");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dwi8lacfr/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) setUrlImg(data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

const updateData = async (e) => {
    e.preventDefault();
    const finalImageUrl = urlImg || img;

    try {
        // Actualizar receta principal
        await fetch(`${backendUrl}/api/chef_recipes/${recipe_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, description, preparation, img: finalImageUrl }),
        });

        // Traer relaciones actuales de ingredientes y utensilios
        const resIngCurrent = await fetch(`${backendUrl}/api/recipe_ingredients`);
        const currentIngredients = await resIngCurrent.json();
        const ingredientsToDelete = currentIngredients.filter(
            (i) => i.recipe_id === parseInt(recipe_id)
        );

        const resUtCurrent = await fetch(`${backendUrl}/api/utensil_recipe`);
        const currentUtensils = await resUtCurrent.json();
        const utensilsToDelete = currentUtensils.filter(
            (u) => u.recipe_id === parseInt(recipe_id)
        );

        // Borrar relaciones existentes una x una pero con un for
        for (let ing of ingredientsToDelete) {
            await fetch(`${backendUrl}/api/recipe_ingredients/${ing.id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
        }

        for (let ut of utensilsToDelete) {
            await fetch(`${backendUrl}/api/utensil_recipe/${ut.id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
        }

        // Guardar nuevas relaciones
        for (let ing of ingredients) {
            await fetch(`${backendUrl}/api/recipe_ingredients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ recipe_id: parseInt(recipe_id), ingredient_id: ing.id }),
            });
        }

        for (let ut of utensils) {
            await fetch(`${backendUrl}/api/utensil_recipe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ recipe_id: parseInt(recipe_id), utensil_id: ut.id }),
            });
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

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>


        <div className="mb-3">
          <label className="form-label">Description</label>
          <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>


        <div className="mb-3">
          <label className="form-label">Preparation</label>
          <textarea className="form-control" value={preparation} onChange={(e) => setPreparation(e.target.value)} />
        </div>


        <div className="mb-3">
          <input type="file" accept="image/*" onChange={changeUploadedImage} />
          {(urlImg || img) && (
            <div className="mt-2">
              <img src={urlImg || img} alt="Recipe" style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }} />
            </div>
          )}
        </div>


        <div className="mb-3">
          <label className="form-label">Ingredientes</label>
          <div className="d-flex mb-2">
            <input type="text" className="form-control me-2" value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} placeholder="Agregar ingrediente" />
            {/* <button type="button" className="btn btn-success" onClick={() => addIngredient()}>+</button> */}
          </div>
          {ingredientSuggestions.length > 0 && (
            <ul className="list-group mb-2">
              {ingredientSuggestions.map((ing) => (
                <li key={ing.id} className="list-group-item list-group-item-action" style={{ cursor: "pointer" }} onClick={() => addIngredient(ing)}>
                  {ing.name}
                </li>
              ))}
            </ul>
          )}
          <div>
            {ingredients.map((ing) => (
              <span key={ing.id} className="badge bg-primary me-1 mb-1">
                {ing.name} <i className="fa-solid fa-xmark ms-1" style={{ cursor: "pointer" }} onClick={() => removeIngredient(ing)}></i>
              </span>
            ))}
          </div>
        </div>


        <div className="mb-3">
          <label className="form-label">Utensilios</label>
          <div className="d-flex mb-2">
            <input type="text" className="form-control me-2" value={newUtensil} onChange={(e) => setNewUtensil(e.target.value)} placeholder="Agregar utensilio" />
            {/* <button type="button" className="btn btn-success" onClick={() => addUtensil()}>+</button> */}
          </div>
          {utensilSuggestions.length > 0 && (
            <ul className="list-group mb-2">
              {utensilSuggestions.map((ut) => (
                <li key={ut.id} className="list-group-item list-group-item-action" style={{ cursor: "pointer" }} onClick={() => addUtensil(ut)}>
                  {ut.name}
                </li>
              ))}
            </ul>
          )}
          <div>
            {utensils.map((ut) => (
              <span key={ut.id} className="badge bg-warning text-dark me-1 mb-1">
                {ut.name} <i className="fa-solid fa-xmark ms-1" style={{ cursor: "pointer" }} onClick={() => removeUtensil(ut)}></i>
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-custom">Guardar Cambios</button>
          <Link to="/chef_home" className="btn btn-custom">Back to home</Link>
        </div>
      </form>
    </div>
  );
};

export default EditChefRecipe;
