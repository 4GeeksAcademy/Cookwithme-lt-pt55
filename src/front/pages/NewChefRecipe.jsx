import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom"
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

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
        const keywords = ["pan", "oven", "plate", "spoon"];
        if (!preparation) {
            setUtensils('');
            return;
        }

        const lowercasedPreparation = preparation.toLowerCase();
        const foundKeywords = keywords.filter(keyword =>
            lowercasedPreparation.includes(keyword)
        );

        setUtensils(foundKeywords.join(', '));
    }, [preparation]);



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

    function sendData(e) {

        const finalImageUrl = urlImg || img


        const ingredientsForPost = selectedIngredients.map(name => ({
            name: name,
            quantity: "1 unit" // Add a default quantity if your model requires it
            // You may need to adjust this structure based on your backend API
        }));

        e.preventDefault();
        console.log('send data')
        const token = localStorage.getItem("tokenChef")
        if (!token) {
            alert("Not authenticated");
            return navigate("/login_chef");
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    "name": name,
                    "description": description,
                    "preparation": preparation,
                    "img": finalImageUrl,
                    "utensils": utensils,
                    "ingredients": selectedIngredients
                }
            )
        }

        fetch(backendUrl + "/api/chef_recipes", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to create recipe.');
                }
            })
            .then(data => {
                console.log(data)
                navigate("/chef_home")
            })
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

                <div className="mb-3">
                    <label htmlFor="utensilsInput" className="form-label">Utensilios</label>
                    <input
                        value={utensils}
                        onChange={(e) => setUtensils(e.target.value)}
                        type="text"
                        className="form-control"
                        id="utensilsInput"
                    />
                </div>
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
                <button type="button" onClick={handleAddIngredient} className="btn btn-secondary" disabled={!currentSelection}>
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
                <button type="submit" className="btn btn-primary">Create</button>

                <Link to="/chef_home">
                    <button className="btn btn-primary">Back to home</button>
                </Link>
            </form>
        </div >
    )
}

export default NewChefRecipe