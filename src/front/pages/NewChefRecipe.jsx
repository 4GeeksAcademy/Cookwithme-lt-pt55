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
    const [img, setImg] = useState("")
    const [urlImg, setUrlImg] = useState("")
    
    const uploadChefRecipeImage = async (e) => {
        const file = e.target.files[0];

        setImg("");

        const formData = new FormData()

        formData.append('file', file)
        formData.append('upload_preset', 'chef_image')
        formData.append('cloud_name', 'dwi8lacfr')

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dwi8lacfr/image/upload", {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            console.log(data)

            if (data.secure_url) {
                setUrlImg(data.secure_url)

            } else {
                console.error("Failed to upload the image, please try again");
            }

        }
        catch (error) {
            console.error("Error uploading image:", error)
        }
    }

    function sendData(e) {

        const finalImageUrl = urlImg || img

        e.preventDefault();
        console.log('send data')
        const token = localStorage.getItem("tokenChef")
        if (!token) {
            alert("Not authenticated");
            return navigate("/login_chef");
        }

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
                    "img": finalImageUrl
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

    if (!store.authChef) return <Navigate to="/login_chef" />;

    return (
        <div>
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
                {/* <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Imagen</label>
                    <input
                        value={"https://picsum.photos/200/300"}
                        onChange={(e) => setImg(e.target.value)}
                        type="text"
                        className="form-control"
                        id="exampleInputImage"
                    />
                </div> */}
                <div>
                    <input type="file" accept="image/*" onChange={uploadChefRecipeImage} />
                    {(urlImg || img) && (
                        <div>
                            <img 
                                src={urlImg || img}
                                alt="Ingrediente Imagen" 
                                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                            />
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Create</button>

                <Link to="/chef_home">
                    <button className="btn btn-primary">Back to home</button>
                </Link>
            </form>
        </div>
    )
}

export default NewChefRecipe