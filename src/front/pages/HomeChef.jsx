import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navigate, Link } from "react-router-dom";

export const HomeChef = () => {

    const { store, dispatch } = useGlobalReducer()

    const [chefRecipe, setChefRecipe] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function getChefRecipes() {
        fetch(backendUrl + `/api/recipes/`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setChefRecipe(data)
            }
            )
    }

    // function deleteChefRecipe(recipe_id) {
    //     const requestOptions = {
    //         method: 'DELETE'
    //     }

    //     fetch(backendUrl + `/api/recipes/` + recipe_id, requestOptions)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             setChefRecipe()
    //         })
    // }

    useEffect(() => {
        getChefRecipes()
    }, [])

    return (
        <div className="container text-center mt-5">
            {store.authChef ?
                <>
                    <h1 className="display-4">Hello, welcome chef!!</h1>
                    <Link to="/add_recipe">
                        <button className="btn btn-success">Add new recipe</button>
                    </Link>
                    {chefRecipe.map((recipe) =>
                        <React.Fragment key={recipe.id}>
                            <div className="text-center mt-4">
                                <h1>Name: {recipe.name}</h1>
                                <p>Description: {recipe.description}</p>
                                <p>Preparation: {recipe.preparation}</p>
                                <div className="">
                                    <img src={recipe.img} alt="recipe image" className="h-25 d-inline-block" />
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <Link to={"/recipes/" + recipe.id}>
                                    <button className="btn btn-primary">See recipe</button>
                                </Link>
                                <Link to={"/recipes/" + recipe.id + "/update"}>
                                    <button className="btn btn-warning">Edit recipe</button>
                                </Link>
                                <button className="btn btn-danger" onClick={() => deleteChefRecipe(recipe.id)}>Delete recipe</button>
                            </div>
                        </React.Fragment>
                    )}
                </>
                :
                <Navigate to='/login_chef' />
            }
        </div>
    );
}; 