import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserNewCalification = () => {

    const navigate = useNavigate()

    const [recipes, setRecipes] = useState([]);
    const [users, setUsers] = useState([]);

    const [stars, setStars] = useState('')
    const [userId, setUserId] = useState('');
    const [recipeId, setRecipeId] = useState('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL


    useEffect(() => {
        // Fetch the list of all recipes
        fetch(backendUrl + '/api/recipes')
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error("Error fetching recipes:", error));

        // Fetch the list of all users
        fetch(backendUrl + '/api/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users:", error));

    }, []);

    function sendData(e) {
        e.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    "stars": stars,
                    "user_id": userId,
                    "recipe_id": recipeId,
                }
            )
        }
        fetch(backendUrl + '/api/calification', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                navigate("/califications")
            })
    }




    return (

        <div>
                    <form className="w-50 mx-auto" onSubmit={sendData}>
                        <div>
                            <label htmlFor="recipe-select" className="form-label">Select a Recipe</label>
                            <select
                                id="recipe-select"
                                className="form-select form-select-lg mb-3"
                                onChange={(e) => setRecipeId(e.target.value)}
                                value={recipeId} // Controlled component
                                required
                            >
                                <option value="">--Select a Recipe--</option>
                                {recipes.map((recipe) => (
                                    <option value={recipe.id} key={recipe.id}>{recipe.name}</option>
                                ))}
                            </select>

                            <label htmlFor="user-select" className="form-label">Select a User</label>
                            <select
                                id="user-select"
                                className="form-select form-select-lg mb-3"
                                onChange={(e) => setUserId(e.target.value)}
                                value={userId} // Controlled component
                                required
                            >
                                <option value="">--Select a User--</option>
                                {users.map((user) => (
                                    <option value={user.id} key={user.id}>{user.email}</option>
                                ))}
                            </select>




                            <label htmlFor="exampleInputPassword1" className="form-label">Calification </label>
                            <input value={stars} onChange={(e) => setStars(e.target.value)} type="number" className="form-control" id="exampleInputEmail1" />
                        </div>

                        <button type="submit" className="btn btn-primary">Crear</button>
                    </form>
                </div>
                )
}


                export default  UserNewCalification
