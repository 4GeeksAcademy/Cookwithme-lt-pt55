import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const NewRecipe = () => {

    const navigate = useNavigate()

    const { store, dispatch } = useGlobalReducer()

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [preparation, setPreparation] = useState('')
    const [img, setImg] = useState('')
    
    const [suggestions, setSuggestions] = useState([])

    const [chefs, setChefs] = useState([])

    const [currentChef, setCurrentChef] = useState(null)

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
                console.log(data)
                setChefs(data)
            }
            )
    }

    useEffect(() => {
        const fetchRecipes = async () => {
            if (name.trim().length > 1) {
                try {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
                    const data = await response.json();
                    if (data.meals) {
                        setSuggestions(data.meals);
                    } else {
                        setSuggestions([]);
                    }
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


    function sendData(e) {
        e.preventDefault()
        console.log('send data')
        console.log(name, description, preparation, img)
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    "name": name,
                    "description": description,
                    "preparation": preparation,
                    "img": img,
                    "chef_id": currentChef.id

                }
            )
        }

        fetch(backendUrl + "/api/recipes", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to create recipe.');
                }
            })
            .then(data => {
                console.log(data)
                navigate("/recipes")
            })
    }

    useEffect(() => {
        getChefs()
    }, [])


    return (
        <div>
            <form className="w-50 mx-auto">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputName" />

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
                    <label htmlFor="exampleInputPassword1" className="form-label">Preparation</label>
                    <textarea value={preparation} onChange={(e) => setPreparation(e.target.value)} type="text" className="form-control" rows="5" id="exampleInputPreparation" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Imagen</label>
                    <input 
                        value={img} 
                        onChange={(e) => setImg(e.target.value)} 
                        type="text" 
                        className="form-control" 
                        id="exampleInputImage" 
                    />
                    {img && <img src={img} alt={name} width="200" style={{ marginTop: "10px" }} />}
                </div>
            
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
                <button type="submit" className="btn btn-primary" onClick={sendData}>Create</button>
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
    )
}

export default NewRecipe