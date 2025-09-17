import React, { useEffect } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import FormAdmin from "../../components/FormAdmin.jsx";
import { Navigate } from "react-router-dom";

export const LoginAdmin = () => {

    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {
    }, [])

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Welcome back Admin</h1>
            {store.authAdmin ? <Navigate to='/testadm'/> : <FormAdmin/>}
        </div>
    );
}; 