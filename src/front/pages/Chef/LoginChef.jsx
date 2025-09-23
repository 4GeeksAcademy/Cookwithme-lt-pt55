import React, { useEffect } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import FormChef from "../../components/FormChef.jsx";
import { Navigate } from "react-router-dom";

export const LoginChef = () => {

    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {
    }, [])

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Hello Chef!!</h1>
            {store.authChef ? <Navigate to='/chef_home'/> : <FormChef />}
        </div>
    );
}; 