import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import { useEffect, useState } from "react";



export const SingleUtensilio = () => {
  const { utensilio_id } = useParams();
  const [utensilio, setUtensilio] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(backendUrl + "/api/utensils/" + utensilio_id)
      .then((res) => res.json())
      .then((data) => setUtensilio(data))
      .catch((err) => console.error(err));
  }, [utensilio_id]);

  if (!utensilio) return <h2>Cargando...</h2>;

  return (
    <div className="container text-center">
      <h1 className="display-4">Utensilio: {utensilio.id}</h1>
      <h2 className="display-6">Nombre: {utensilio.name}</h2>
      <h2 className="display-6">Descripción: {utensilio.description}</h2>
      <img
        src={utensilio.url_img}
        alt={utensilio.name}
        className="img-fluid mt-3"
      />
      <hr className="my-4" />

      <Link to="/utensilios">
        <span className="btn btn-primary btn-lg" role="button">
          Back utensilios
        </span>
      </Link>
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
SingleUtensilio.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
