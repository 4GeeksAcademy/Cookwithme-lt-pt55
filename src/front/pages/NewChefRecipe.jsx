import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom"
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../css/Bottoms.css"
 
const NewChefRecipe = () => {

    const navigate = useNavigate()

    const { store } = useGlobalReducer()

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [preparation, setPreparation] = useState('')
    const [img, setImg] = useState("")
    const [urlImg, setUrlImg] = useState("")
    const [utensils, setUtensils] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [ingredientes, setIngredientes] = useState([])
    const [currentSelection, setCurrentSelection] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState([]);


    const [utensilios, setUtensilios] = useState([])
    const [currentSelectedUtensil, setCurrentSelectedUtensil] = useState('');
    const [selectedUtensils, setSelectedUtensils] = useState([]);


    function getIngredientes() {
        fetch(backendUrl + '/api/ingredients')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setIngredientes(data)
                if (data.length > 0) {
                    setCurrentSelection(data[0].name);
                }
            })
            .catch(error => console.error("Fetch error:", error));
    }

    function getUtensilios() {
        fetch(backendUrl + '/api/utensils')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUtensilios(data)
                if (data.length > 0) {
                    setCurrentSelectedUtensil(data[0].name);
                }
            })
            .catch(error => console.error("Fetch error:", error));
    }

    const handleDropdownUtensils = (event) => {

        setCurrentSelectedUtensil(event.target.value);
    };


    const handleAddUtensil = (e) => {

        e.preventDefault();

        if (currentSelectedUtensil && !selectedUtensils.includes(currentSelectedUtensil)) {

            setSelectedUtensils(prevUtensils => [
                ...prevUtensils,
                currentSelectedUtensil
            ]);
        }
    };

    const handleDropdownChange = (event) => {

        setCurrentSelection(event.target.value);
    };



    const handleAddIngredient = (e) => {

        e.preventDefault();

        if (currentSelection && !selectedIngredients.includes(currentSelection)) {

            setSelectedIngredients(prevIngredients => [
                ...prevIngredients,
                currentSelection
            ]);
        }
    };

    function handleNameChange(e) {
        const newName = e.target.value;
        setName(newName);

        if (newName.trim().length > 0) {
            setDescription('');
            setPreparation('');
            setImg('');
            setUtensils('');
        }
    }

    function handleSelectSuggestion(meal) {
        setName(meal.strMeal);
        setDescription(`${meal.strCategory} (${meal.strArea})`);
        setPreparation(meal.strInstructions);
        setImg(meal.strMealThumb);
        setSuggestions([]);
    }

    useEffect(() => {
        const fetchRecipes = async () => {
            if (name.trim().length > 1) {
                try {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
                    const data = await response.json();
                    setSuggestions(data.meals || []);
                } catch (error) {
                    console.error("Error fetching recipes:", error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
            }
        };

        const timerId = setTimeout(() => {
            fetchRecipes();
        }, 300);

        return () => {
            clearTimeout(timerId);
        };
    }, [name]);


    useEffect(() => {
        getIngredientes()
        getUtensilios()
    }, []);



    const uploadChefRecipeImage = async (e) => {
        const file = e.target.files[0];

        setImg("");

        const formData = new FormData()

        formData.append('file', file)
        formData.append('upload_preset', 'chef_image')
        formData.append('cloud_name', 'dwi8lacfr')

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dwi8lacfr/image/upload", {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            console.log(data)

            if (data.secure_url) {
                setUrlImg(data.secure_url)

            } else {
                console.error("Failed to upload the image, please try again");
            }

        }
        catch (error) {
            console.error("Error uploading image:", error)
        }
    }

async function sendData(e) {
    e.preventDefault();
    console.log('send data');

    const token = localStorage.getItem("tokenChef");
    if (!token) {
        alert("Not authenticated");
        return navigate("/login_chef");
    }

    const finalImageUrl = urlImg || img;

    try {
        //crear receta
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                description,
                preparation,
                img: finalImageUrl
            })
        };

        const recipeResponse = await fetch(backendUrl + "/api/chef_recipes", requestOptions);

        if (!recipeResponse.ok) throw new Error('Failed to create recipe.');

        const recipeData = await recipeResponse.json();
        const recipeId = recipeData["se creo el recipe "].id;  //<------id de receta ya creada
        console.log("Receta creada con id:", recipeId);

        // agregar ingredientes usando el endpoint independiente
        for (const ingredientName of selectedIngredients) {
            const ingredient = ingredientes.find(i => i.name === ingredientName);
            if (!ingredient) continue;

            const ingredientResponse = await fetch(backendUrl + "/api/recipe_ingredients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    recipe_id: recipeId,
                    ingredient_id: ingredient.id
                })
            });

            if (!ingredientResponse.ok) {
                const errorData = await ingredientResponse.json();
                console.error("Error agregando ingrediente:", errorData);
            }
        }

        // Agregar utensilios usando el endpoint independiente
        for (const utensilName of selectedUtensils) {
            const utensil = utensilios.find(u => u.name === utensilName);
            if (!utensil) continue;

            const utensilResponse = await fetch(backendUrl + "/api/utensil_recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    recipe_id: recipeId,
                    utensil_id: utensil.id
                })
            });

            if (!utensilResponse.ok) {
                const errorData = await utensilResponse.json();
                console.error("Error agregando utensilio:", errorData);
            }
        }
        navigate("/chef_home");

    } catch (error) {
        console.error("Error creando la receta:", error);
    }
}

    if (!store.authChef) return <Navigate to="/login_chef" />;

    return (
        <div>
            <h1>Create a new recipe</h1>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input value={name} onChange={handleNameChange} type="text" className="form-control" id="exampleInputName" />

                    {suggestions.length > 0 && (
                        <ul className="list-group mt-2">
                            {suggestions.slice(0, 5).map(meal => (
                                <li key={meal.idMeal}
                                    className="list-group-item d-flex align-items-center"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleSelectSuggestion(meal)}>
                                    <img src={meal.strMealThumb} alt={meal.strMeal} width="40" className="me-2" />
                                    {meal.strMeal}
                                </li>
                            ))}
                        </ul>
                    )}

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="form-control" id="exampleInputsetDescription" />
                </div>


                <div>
                    <h2>Select Utensils for your Recipe</h2>

                    <div>
                        <select
                            value={currentSelectedUtensil}
                            onChange={handleDropdownUtensils}
                            className="form-select me-2"
                        >

                            {utensilios.map(utensil => (
                                <option
                                    key={utensil.id}
                                    value={utensil.name}
                                >
                                    {utensil.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <hr />


                    <h3>Selected Utensils ({selectedUtensils.length})</h3>
                    <ul className="list-group mb-3">

                        {selectedUtensils.map((utensil, index) => (
                            <li key={index} className="list-group-item">{utensil}</li>
                        ))}
                    </ul>
                </div>
                <button type="button" onClick={handleAddUtensil} className="btn btn-custom" disabled={!currentSelectedUtensil}>
                    Add Utensil ➕
                </button>


                <div>
                    <h2>Select Ingredients for your Recipe</h2>

                    <div>
                        <select
                            value={currentSelection}
                            onChange={handleDropdownChange}
                            className="form-select me-2"
                        >

                            {ingredientes.map(ingredient => (
                                <option
                                    key={ingredient.id}
                                    value={ingredient.name}
                                >
                                    {ingredient.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <hr />


                    <h3>Selected Ingredients ({selectedIngredients.length})</h3>
                    <ul className="list-group mb-3">

                        {selectedIngredients.map((ingredient, index) => (
                            <li key={index} className="list-group-item">{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <button type="button" onClick={handleAddIngredient} className="btn btn-custom" disabled={!currentSelection}>
                    Add Ingredient ➕
                </button>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Preparation</label>
                    <input value={preparation} onChange={(e) => setPreparation(e.target.value)} type="text" className="form-control" id="exampleInputPreparation" />
                </div>
                <div>
                    <input type="file" accept="image/*" onChange={uploadChefRecipeImage} />
                    {(urlImg || img) && (
                        <div>
                            <img
                                src={urlImg || img}
                                alt="Ingrediente Imagen"
                                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                            />
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-custom">Create</button>


                <Link to="/chef_home" className="btn btn-custom" >Back to home</Link>

            </form>
        </div >
    )
}

export default NewChefRecipe