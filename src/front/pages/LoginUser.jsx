import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import FormUser from "../components/FormUser.jsx";
import { Navigate } from "react-router-dom";

export const LoginUser = () => {

    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {
    }, [])

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Hello user!!</h1>
            {store.authUser ? <Navigate to='/home_user'/> : <FormUser />}
        </div>
    );
}; 