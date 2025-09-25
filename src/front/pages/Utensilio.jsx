import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Utensilio = () => {


    const [utensilios, setUtensilios] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function getUtensilios() {
        fetch(backendUrl + '/api/utensils')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUtensilios(data)
            }
        )

    }


    function deleteUtensilio(utensilio_id) {

        const requestOptions = {
            method: 'DELETE'
        }
        fetch(backendUrl + '/api/utensils/' + utensilio_id, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                getUtensilios()
            })

    }


    useEffect(() => {
        getUtensilios()

    }, [])

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Utensilios</h1>

            <div className="ml-auto">
                <Link to="/add_utensilio">
                    <button className="btn btn-success my-3">Crear Utensilio</button>
                </Link>
            </div>

            {utensilios.map((utensilio) => (
                <React.Fragment key={utensilio.id}>
                    <p>Nombre: {utensilio.name}</p>
                    <p>Descripcion: {utensilio.description}</p>
                    <div className="">
                        <img src={utensilio.Url_img} alt="recipe image" className="h-25 d-inline-block" />
                    </div>

                    <Link to={"/utensilios/" + utensilio.id}>
                        <button className="btn btn-primary">Ver</button>
                    </Link>

                    <Link to={"/utensilios/" + utensilio.id + "/edit"}>
                        <button className="btn btn-info">Editar</button>
                    </Link>

                    <button className="btn btn-danger" onClick={() => deleteUtensilio(utensilio.id)}>Eliminar</button>

                </React.Fragment>
            ))}

        </div>
    );
}; 