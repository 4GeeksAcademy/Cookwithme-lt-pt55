import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";

const NewRecipe = () => {

    const navigate = useNavigate()

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [preparation, setPreparation] = useState('')
    const [img, setImg] = useState('')


    function sendData(e) {
        e.preventDefault()
        console.log('send data')
        console.log(name, description, preparation, img)
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    "name": name,
                    "description": description,
                    "preparation": preparation,
                    "img": img,
                    "chef_id": 2

                }
            )
        }

        fetch(backendUrl + "/api/recipes", requestOptions)
            .then(response =>{
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to create recipe.');
                }
            })
            .then(data => {
                console.log(data)
                navigate("/recipes")
            })
    }


    return (
        <div>
            <form className="w-50 mx-auto">
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
                    <input value={img} onChange={(e) => setImg(e.target.value)} type="text" className="form-control" id="exampleInputImage" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={sendData}>Create</button>
                <Link to="/recipes">
                    <button className="btn btn-primary">Back to recipes</button>
                </Link>
            </form>
        </div>
    )
}

export default NewRecipe