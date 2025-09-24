import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Chef = () => {

    const [chefs, setChefs] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function getChefs() {
        fetch(backendUrl + `/api/chefs`)
            .then(response => response.json())
            .then(data => setChefs(data))
    }

    function deleteChefs(chef_id) {
        const requestOptions = {
            method: 'DELETE'
        }

        fetch(backendUrl + `/api/chefs/` + chef_id, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                getChefs()
            })
    }

    useEffect(() => {
        getChefs()
    }, [])

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Chefs!!</h1>
            <Link to="/add_chef">
                <button className="btn btn-success">Add new chef</button>
            </Link>

            {chefs.map((chef) =>
                <ul key={chef.id}>
                    <li>Name: {chef.name}</li>
                    <li>Email: {chef.email}</li>
                    <li>Rating: {chef.rating}</li>
                    <Link to={"/chefs/" + chef.id}>
                        <button className="btn btn-primary">See chef</button>
                    </Link>
                    <Link to={"/chefs/" + chef.id + "/update"}>
                        <button className="btn btn-warning">Edit chef</button>
                    </Link>
                    <button className="btn btn-danger" onClick={() => deleteChefs(chef.id)}>Delete chef</button>
                </ul>
            )}
        </div>
    );
}; 