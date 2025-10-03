import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const NewRecipe = () => {
    const navigate = useNavigate();
    const { store } = useGlobalReducer();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [preparation, setPreparation] = useState('');
    const [img, setImg] = useState('');
    const [utensils, setUtensils] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [chefs, setChefs] = useState([]);
    const [currentChef, setCurrentChef] = useState(null);


    // State for the full list of ingredients (for the dropdown)
    const [allIngredients, setAllIngredients] = useState([]);
    // State for the user's selected ingredients (your "empty list")
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    // State to hold the currently selected ingredient from the dropdown
    const [currentSelection, setCurrentSelection] = useState('');
    // The previous line was the problematic 'currentIngredient' concept, renamed to 'currentSelection'


    const [urlImg, setUrlImg] = useState("")

    const uploadRecipeImage = async (e) => {
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

    function getChefs() {
        fetch(backendUrl + `/api/chefs`)
            .then(response => response.json())
            .then(data => {
                setChefs(data);
            });
    }

    function sendData(e) {
        e.preventDefault();

        const finalImageUrl = urlImg || img

        const ingredientsForPost = selectedIngredients.map(name => ({
            name: name,
            quantity: "1 unit" // Add a default quantity if your model requires it
            // You may need to adjust this structure based on your backend API
        }));

        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "name": name,
                "description": description,
                "preparation": preparation,
                "img": finalImageUrl,
                "utensils": utensils,
                "chef_id": currentChef.id,
                "ingredients": selectedIngredients
            })
        };

        fetch(backendUrl + "/api/recipes", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to create recipe.');
                }
            })
            .then(data => {
                console.log(data);
                navigate("/recipes");
            });
    }

    useEffect(() => {
        getChefs();
        ingredientsFromTheMealDB();
    }, []);

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


    function ingredientsFromTheMealDB() {
        fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
            .then(response => response.json())
            .then(data => {
                const ingredientsArray = data.meals || [];
                // Store the ingredient list for the dropdown
                setAllIngredients(ingredientsArray);
                // Set a default selection for the dropdown
                if (ingredientsArray.length > 0) {
                    setCurrentSelection(ingredientsArray[0].strIngredient);
                }
            })
            .catch(error => console.error("Fetch error:", error));
    }

    const handleDropdownChange = (event) => {
        // event.target.value holds the strIngredient of the selected item
        setCurrentSelection(event.target.value);
    };

    const handleAddIngredient = (e) => {
        // Prevent form submission if the button is inside the form
        e.preventDefault();

        if (currentSelection && !selectedIngredients.includes(currentSelection)) {
            // Add only the ingredient name string to the selected list
            setSelectedIngredients(prevIngredients => [
                ...prevIngredients,
                currentSelection
            ]);
        }
    };

    
    const handleRemoveIngredient = (ingredientName) => {
    setSelectedIngredients(prev =>
        prev.filter(ing => ing !== ingredientName)
    );
    };



    useEffect(() => {
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

    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Name</label>

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
                    <label htmlFor="exampleInputDescription" className="form-label">Description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="form-control" id="exampleInputDescription" />
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
                <div className="mb-3">
                    <label htmlFor="exampleInputPreparation" className="form-label">Preparation</label>
                    <textarea value={preparation} onChange={(e) => setPreparation(e.target.value)} type="text" className="form-control" rows="5" id="exampleInputPreparation" />
                </div>
                <div>
                    <input type="file" accept="image/*" onChange={uploadRecipeImage} />
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



                {/* -------------------- INGREDIENT SELECTOR (FIXED) -------------------- */}
                <div>
                    <h2>Select Ingredients for your Recipe</h2>

                    {/* Dropdown Section */}
                    <div className="mb-3 d-flex align-items-center">
                        <select
                            value={currentSelection}
                            onChange={handleDropdownChange}
                            className="form-select me-2"
                        >
                            {/* Map over the fetched ingredients (allIngredients state) */}
                            {allIngredients.map(ingredient => (
                                <option
                                    key={ingredient.idIngredient}
                                    value={ingredient.strIngredient}
                                >
                                    {ingredient.strIngredient}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={handleAddIngredient} className="btn btn-secondary" disabled={!currentSelection}>
                            Add Ingredient ➕
                        </button>
                    </div>

                    <hr />

                    {/* Selected Ingredients List */}
                    <h3>Selected Ingredients ({selectedIngredients.length})</h3>

                    <ul className="list-group mb-3">
                    {selectedIngredients.map((ingredient, index) => (
                        <li 
                        key={index} 
                        className="list-group-item d-flex justify-content-between align-items-center"
                        >
                        <span>{ingredient}</span>
                        <button 
                            type="button" 
                            className="btn btn-sm"
                            onClick={() => handleRemoveIngredient(ingredient)}
                        >
                            ❌
                        </button>
                        </li>
                    ))}
                    </ul>
                </div>
                {/* --------------------------------------------------------------------- */}




                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {!currentChef ? "Select chef" : "Chef: " + currentChef.name}
                    </button>
                    <ul className="dropdown-menu">
                        {chefs.map((chef) =>
                            <li key={chef.id} onClick={() => setCurrentChef(chef)}><button className="dropdown-item" type="button">{chef.name}</button></li>
                        )}
                    </ul>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
                {store.authChef ?
                    <Link to="/chef_home">
                        <button className="btn btn-primary">Back to home</button>
                    </Link>
                    :
                    <Link to="/recipes">
                        <button className="btn btn-primary">Back to recipes</button>
                    </Link>
                }
            </form>
        </div>
    );
};

export default NewRecipe;