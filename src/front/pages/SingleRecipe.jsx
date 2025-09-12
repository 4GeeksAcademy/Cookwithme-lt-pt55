import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import React, { useEffect, useState } from "react"

export const SingleRecipe = props => {

  const [recipe, setRecipe] = useState([])

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  function getRecipe() {
    fetch(backendUrl + `/api/recipes/` + recipe_id,)
      .then(response => response.json())
      .then(data => setRecipe(data))
  }

  useEffect(() => {
    getRecipe()
  }, [])

  const { recipe_id } = useParams()

  return (
    <div className="container text-center">

      <h1 className="display-4">Recipe Name: {recipe.name}</h1>
      <h1 className="display-4">Recipe Description: {recipe.description}</h1>
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
SingleRecipe.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};