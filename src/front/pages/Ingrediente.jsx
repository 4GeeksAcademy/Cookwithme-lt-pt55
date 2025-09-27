import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Ingrediente = () => {


    const[ingredientes, setIngredientes] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function getIngredientes(){
        fetch(backendUrl + '/api/ingredients')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setIngredientes(data)
        })

    }    


    function deleteIngrediente(ingrediente_id){

        const requestOptions = {
            method: 'DELETE'
        }
        fetch(backendUrl + '/api/ingredients/' + ingrediente_id, requestOptions)
        .then(response => response.json())
        .then(data => 
            {console.log(data)
            getIngredientes()})

    }    


    useEffect(() => {
        getIngredientes()

    }, [])

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Ingredientes!!</h1>

                <div className="ml-auto">
                    <Link to="/add_ingrediente">
                        <button className="btn btn-success my-3">Crear Ingrediente</button>
                    </Link>
                </div>

           { ingredientes.map((ingrediente) => (
                <p key={ingrediente.id}> 
                    Nombre: {ingrediente.name}
                    Descripcion: {ingrediente.description}
                    Imagen:         <img
                                        src={ingrediente.image}
                                        alt={ingrediente.name}
                                        className="img-fluid mt-3"
                                        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                                    />

                    <Link to={"/ingredientes/"+ingrediente.id}>
                        <button className="btn btn-primary">Ver Ingrediente</button>
                    </Link>

                    <Link to={"/ingredientes/" + ingrediente.id + "/edit"}>
                        <button className="btn btn-info">Editar Ingrediente</button>
                    </Link>

                        <button className="btn btn-danger" onClick={()=>deleteIngrediente(ingrediente.id)}>Eliminar Ingrediente</button>
                                  
                </p>
            ))}
            
        </div>
    );
}; 