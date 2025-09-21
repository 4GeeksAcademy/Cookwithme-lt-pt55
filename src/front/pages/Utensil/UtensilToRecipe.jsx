import React, { useEffect, useState } from "react"

import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const UtensilioReceta = () => {


    const[utensiliosRecetas, setUtensiliosRecetas] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function getUtensiliosRecetas(){
        fetch(backendUrl + '/api/utensil_recipe')
        .then(response => response.json())
        .then(data => setUtensiliosRecetas(data))

    }    


     function deleteUtensilioReceta(utensilioReceta_id){

         const requestOptions = {
             method: 'DELETE'
         }
         fetch(backendUrl + '/api/utensil_recipe/' + utensilioReceta_id, requestOptions)
         .then(response => response.json())
         .then(data => 
             {console.log(data)
             getUtensiliosRecetas()})

     }    

     

    useEffect(() => {
        getUtensiliosRecetas()

    }, [])

    return (
        <div className="text-center mt-5">
                <h1 className="display-4">Utensilios de recetas</h1>

                    <div className="ml-auto">
                        <Link to="/add_utensil_to_recipe">
                            <button className="btn btn-success my-3">Añadir utensilio a receta</button>
                        </Link>
                    </div>

            { utensiliosRecetas.map((utensiliosRecetas) => (
                    <p key={utensiliosRecetas.id}> 
                        utensile: {utensiliosRecetas.utensil_id}
                        recipe_id: {utensiliosRecetas.recipe_id}

                         <Link to={"/utensilioreceta/"+utensiliosRecetas.id}>
                            <button className="btn btn-primary">Ver</button>
                        </Link> 

                        {/* <Link to={"/utensilios/" + utensilio.id + "/edit"}>
                            <button className="btn btn-info">Editar</button>
                        </Link> */}

                            <button className="btn btn-danger" onClick={()=>deleteUtensilioReceta(utensiliosRecetas.id)}>Eliminar</button>
                                    
                    </p>
                ))}
            
        </div>
    );
}; 