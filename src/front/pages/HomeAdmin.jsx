import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navigate } from "react-router-dom";

export const HomeAdmin = () => {

    const { store, dispatch } = useGlobalReducer()

    return (
        <div className="text-center mt-5">
            {store.authadmin ? 
                <h1 className="display-4">Hello, welcome Admin!!</h1>
                :
                <Navigate to='/login_admin'/>
            }
        </div>
    );
}; 