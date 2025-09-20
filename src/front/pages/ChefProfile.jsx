import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ChefInfo } from "../components/ChefInfo";


const ChefProfile = () => {

    const { store, dispatch } = useGlobalReducer()

    return(
        <div>
            {store.authChef ? 
            <ChefInfo/>
            : 
            <h1>Tienes que autenticarte</h1>
            }
        </div>
        
    )
}

export default ChefProfile
