import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import { useState, useEffect } from "react";


export const SingleAdmin = props => {

    
  const { admin_id } = useParams()

  const [admininfo, setadmininfo] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

   useEffect(()=>{
     fetch(backendUrl +"/api/adminuser/"+ admin_id)
        .then((response)=> response.json())
        .then((data)=> setadmininfo(data))
   },[])

  return (
    <div className="container text-center">
      <h1 className="display-4">Admin  {admin_id} : {admininfo.email} </h1>
      <hr className="my-4" />  {/* A horizontal rule for visual separation. */}

      <Link to="/adminuser">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back Admin list
        </span>
      </Link>
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
SingleAdmin.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
