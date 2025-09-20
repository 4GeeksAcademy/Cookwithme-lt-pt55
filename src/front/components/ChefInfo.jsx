import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import React, { useEffect, useState } from "react"

// Define and export the Single component which displays individual item details.
export const ChefInfo = props => {

    const [chef, setChef] = useState([])

    const { chef_id } = useParams() || {};

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Fetch data only when chef_id is not undefined
    useEffect(() => {
        getChefInfo()
    }, []);

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



    return (
        <div className="container text-center">
            {chef && chef.name ? (
                <>
                    <h2>{chef.name}</h2>
                    <p>Email: {chef.email}</p>
                    <p>Rating: {chef.rating}</p>
                    {/* Add more chef details here */}
                </>
            ) : (
                <p>Loading chef info...</p>
            )}
        </div>
    );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
ChefInfo.propTypes = {
    // Although 'match' prop is defined here, it is not used in the component.
    // Consider removing or using it as needed.
    match: PropTypes.object
};