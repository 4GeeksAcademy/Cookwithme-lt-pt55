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
            .then(data => setRecipe(data))
    }

    useEffect(() => {
        getRecipes()
    }, [])

    const { recipe_id } = useParams()

    return (
        <div className="container text-center">
            <h1>Recipes</h1>

            {recipe.map((recipe) =>
                <ul key={recipe.id}>
                    <li>Name: {recipe.name}</li>
                    <li>Description: {recipe.description}</li>
                    <li>Img: {recipe.img}</li>
                    <Link to="/recipes">
                        <button className="btn btn-primary">See recipe</button>
                    </Link>
                    {/* <button className="btn btn-danger" onClick={() => deleteChefs(chef.id)}>Delete chef</button> */}
                </ul>
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