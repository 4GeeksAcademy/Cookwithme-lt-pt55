import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const SingleIngredientUser = (props) => {
  const { ingredient_user_id } = useParams();
  const [ingredientUser, setIngredientUser] = useState({});
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  function getIngredientUser() {
    fetch(backendUrl + "/api/ingredient_users/" + ingredient_user_id)
      .then((response) => response.json())
      .then((data) => setIngredientUser(data));
  }

  useEffect(() => {
    getIngredientUser();
  }, [ingredient_user_id]);

  return (
    <div className="container text-center">
      <h1 className="display-4">IngredientUser: {ingredient_user_id}</h1>
      <h2 className="display-6">Ingredient ID: {ingredientUser.ingredient_id}</h2>
      <h2 className="display-6">User ID: {ingredientUser.user_id}</h2>
      <hr className="my-4" />

      <Link to="/ingredient_users">
        <span className="btn btn-primary btn-lg" role="button">
          Back to IngredientUsers
        </span>
      </Link>
    </div>
  );
};

SingleIngredientUser.propTypes = {
  match: PropTypes.object,
};
