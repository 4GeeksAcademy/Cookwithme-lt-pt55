import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import React, { useEffect, useState } from "react"

// Define and export the Single component which displays individual item details.
export const Recipe = props => {

    const [recipe, setRecipe] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function getRecipes() {
        fetch(backendUrl + `/api/recipes/`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setRecipe(data)})
    }

    function deleteRecipe(recipe_id) {
        const requestOptions = {
            method: 'DELETE'
        }

        fetch(backendUrl + `/api/recipes/` + recipe_id, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                getRecipes()
            })
    }


    useEffect(() => {
        getRecipes()
    }, [])

    const { recipe_id } = useParams()

    return (
        <div className="container text-center">
            <h1>Recipes</h1>
            <Link to="/add_recipe">
                <button className="btn btn-success">Add new recipe</button>
            </Link>

            {recipe.map((recipe) =>
                <React.Fragment key={recipe.id}>
                    <div className="text-center mt-4" key={recipe.id}>
                        <h1>Name: {recipe.name}</h1>
                        <p>Description: {recipe.description}</p>
                        <p>Preparation: {recipe.preparation}</p>
                        <p>Chef who made it: {recipe.chef_id}</p>
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
                        <button className="btn btn-danger" onClick={() => deleteRecipe(recipe.id)}>Delete recipe</button>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Recipe.propTypes = {
    // Although 'match' prop is defined here, it is not used in the component.
    // Consider removing or using it as needed.
    match: PropTypes.object
};