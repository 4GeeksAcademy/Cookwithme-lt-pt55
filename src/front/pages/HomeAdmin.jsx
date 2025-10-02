import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navigate } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard.jsx";

export const HomeAdmin = () => {

    const { store, dispatch } = useGlobalReducer()

	const navigate = useNavigate()

	 function adminLogout(){
		
		localStorage.removeItem("tokenAdmin");

		dispatch({ type:'set_auth_admin', payload: false })

		navigate('/login_admin')

	 }

    return (
        <div className="text-center mt-5">
            {store.authAdmin ? 
                <>
                    
                    <h1 className="display-4">Hello, welcome Admin!!</h1>  
                </>
                :
                <Navigate to='/login_admin'/>
            }

             
        </div>
        
    );
}; 