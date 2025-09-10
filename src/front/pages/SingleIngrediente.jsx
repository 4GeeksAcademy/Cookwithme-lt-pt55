import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import { useState, useEffect } from "react";



export const SingleIngrediente = props => {


    

    const [ingrediente, setIngrediente] = useState([])
  
    const backendUrl = import.meta.env.VITE_BACKEND_URL
  
    function getIngrediente() {
      fetch(backendUrl + "/api/ingredients/" + ingrediente_id)
        .then(response => response.json())
        .then(data => setIngrediente(data))
    }
  
    useEffect(() => {
      getIngrediente()
    }, [])

    const { ingrediente_id } = useParams()

  return (
    <div className="container text-center">
      <h1 className="display-4">Ingrediente: {ingrediente_id}</h1>
      <h1 className="display-4">Ingrediente Name: {ingrediente.name}</h1>
      <h1 className="display-4">Ingrediente Description: {ingrediente.description}</h1>
      <img
        src={ingrediente.image}
        alt={ingrediente.name}
        className="img-fluid mt-3"
      />
      <hr className="my-4" />  {/* A horizontal rule for visual separation. */}

      <Link to="/ingredientes">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back Ingrediente
        </span>
      </Link>
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
SingleIngrediente.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
