// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import React, { useEffect, useState } from "react"

// Define and export the Single component which displays individual item details.
export const SingleChef = props => {

  const [chef, setChef] = useState([])

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  function getChef() {
    fetch(backendUrl + `/api/chefs/` + chef_id,)
      .then(response => response.json())
      .then(data => setChef(data))
  }

  useEffect(() => {
    getChef()
  }, [])

  const { chef_id } = useParams()

  return (
    <div className="container text-center">

      <h1 className="display-4">Chef Name: {chef.name}</h1>
      <h1 className="display-4">Chef Email: {chef.email}</h1>
      <h1 className="display-4">Chef Stars: {chef.rating}</h1>
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
SingleChef.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};