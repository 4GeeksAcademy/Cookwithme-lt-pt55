import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navigate } from "react-router-dom";

export const HomeChef = () => {

    const { store, dispatch } = useGlobalReducer()

    return (
        <div className="text-center mt-5">
            {store.authChef ? 
                <h1 className="display-4">Hello, welcome chef!!</h1>
                :
                <Navigate to='/login_chef'/>
            }
        </div>
    );
}; 