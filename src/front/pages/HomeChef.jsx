import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navigate, Link } from "react-router-dom";

export const HomeChef = () => {

    const { store, dispatch } = useGlobalReducer()

    return (
        <div className="text-center mt-5">
            {store.authChef ?
                <>
                    <h1 className="display-4">Hello, welcome chef!!</h1>
                    <Link to="/add_recipe">
                        <button className="btn btn-success">Add new recipe</button>
                    </Link>
                </>
                :
                <Navigate to='/login_chef' />
            }
        </div>
    );
}; 