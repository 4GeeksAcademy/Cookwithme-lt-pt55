import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const HomeUser = () => {

    const { store, dispatch } = useGlobalReducer()

    return (
        <div className="text-center mt-5">
            {store.authUser ? 
                <h1 className="display-4">Hello, welcome User!!</h1>
                
                            
                :
                <Navigate to='/login_user'/>
            }
             <Link to="/user_profile">
                <button className="btn btn-primary">Profile</button>
                </Link>
                         
        </div>
    );
}; 