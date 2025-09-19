import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom"
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const NewChefRecipe = () => {

    const navigate = useNavigate()

    const { store, dispatch } = useGlobalReducer()

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [preparation, setPreparation] = useState('')
    const [img, setImg] = useState('')

    function sendData(e) {
        e.preventDefault()
        console.log('send data')
        const token = localStorage.getItem("tokenChef")

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": `application/json`,
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    "name": name,
                    "description": description,
                    "preparation": preparation,
                    "img": "https://picsum.photos/200/300",
                    "chef_id": token.id
                }
            )
        }

        fetch(backendUrl + "/api/chef_recipes", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to create recipe.');
                }
            })
            .then(data => {
                console.log(data)
                navigate("/chef_home")
            })
    }

    return (
        <div>
            {store.authChef ?
                <>

                    <h1>Create a new recipe</h1>
                    <form className="w-50 mx-auto" onSubmit={sendData}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputName" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                            <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="form-control" id="exampleInputsetDescription" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Preparation</label>
                            <input value={preparation} onChange={(e) => setPreparation(e.target.value)} type="text" className="form-control" id="exampleInputPreparation" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Imagen</label>
                            <input
                                value={"https://picsum.photos/200/300"}
                                onChange={(e) => setImg(e.target.value)}
                                type="text"
                                className="form-control"
                                id="exampleInputImage"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>

                        <Link to="/chef_home">
                            <button className="btn btn-primary">Back to home</button>
                        </Link>
                    </form>
                </>
                :
                <Navigate to='/login_chef' />
            }
        </div>
    )
}

export default NewChefRecipe