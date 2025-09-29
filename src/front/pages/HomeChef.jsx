import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navigate, Link } from "react-router-dom";

export const HomeChef = () => {

    const { store, dispatch } = useGlobalReducer()

    const [chefRecipe, setChefRecipe] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [chef, setChef] = useState([])

    function getChefInfo() {
        const token = localStorage.getItem("tokenChef")
        fetch(backendUrl + `/api/chef_info`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setChef(data)
            }
            )
    }

    function getChefRecipes() {

        const token = localStorage.getItem("tokenChef")

        fetch(backendUrl + `/api/chef_recipes`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setChefRecipe(data)
            }
            )
    }

    function deleteRecipe(recipe_id) {
        const token = localStorage.getItem("tokenChef")
        const requestOptions = {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        fetch(backendUrl + `/api/chef_recipes/` + recipe_id, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                getChefRecipes()
            })
    }

    useEffect(() => {
        getChefInfo()
        getChefRecipes()
    }, [])


    return (
        <div className="container text-center mt-5">
            {store.authChef ?
                <>

                    <h1 className="display-4">Hello, welcome {chef.name}!!</h1>
                    {chefRecipe.length != 0 ?
                        <>
                            {chefRecipe.map((recipe) =>
                                <React.Fragment key={recipe.id}>
                                    <div className="text-center mt-4">
                                        <Link to="/new_chef_recipe">
                                            <button className="btn btn-success">Add new recipe</button>
                                        </Link>
                                        <h1>Name: {recipe.name}</h1>
                                        <p>Description: {recipe.description}</p>
                                        <p>Preparation: {recipe.preparation}</p>
                                        <p>Ingredients: {recipe.ingredients}</p>
                                        <p>Utensils: {recipe.utensils}</p>
                                        <div className="">
                                            <img 
                                                src={recipe.img} 
                                                alt="recipe image" 
                                                className="h-25 d-inline-block" 
                                                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}    
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">
                                        <Link to={"/recipes/" + recipe.id}>
                                            <button className="btn btn-primary">See recipe</button>
                                        </Link>
                                        <Link to={"/chef_recipes/" + recipe.id + "/update"}>
                                            <button className="btn btn-warning">Edit recipe</button>
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => deleteRecipe(recipe.id)}>Delete recipe</button>
                                    </div>
                                </React.Fragment>
                            )}
                        </>
                        :
                        <h1>No recipes, add more. </h1>}
                        <Link to="/new_chef_recipe">
                            <button className="btn btn-success">Add new recipe</button>
                        </Link>

                </>
                :

                <Navigate to='/login_chef' />
            }
        </div>
    );
}; 