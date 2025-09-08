// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component

// Define and export the Single component which displays individual item details.
export const SingleChef = props => {


  // Retrieve the 'theId' URL parameter using useParams hook.
  const { chef_id } = useParams()

  return (
    <div className="container text-center">
      <h1 className="display-4">Chef: {chef_id}</h1>
      <hr className="my-4" />  {/* A horizontal rule for visual separation. */}

      <Link to="/chef">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back Chefs
        </span>
      </Link>
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
SingleChef.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};