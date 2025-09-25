import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewUtensilio = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [url_img, setUrlImg] = useState('')

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const UploadUtensilImage = async (e) => {
        const file = e.target.files[0];

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
                setError("Failed to upload the image please try again")
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    function sendData(e) {
        e.preventDefault()
        console.log(name, description, url_img)
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    "name": name,
                    "description": description,
                    "url_img": url_img
                }
            )
        }
        fetch(backendUrl + '/api/utensils/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                navigate("/utensilios")
            })
    }

    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">url de img</label>
                    <input value={url_img} onChange={(e) => setUrlImg(e.target.value)} type="text" className="form-control" id="exampleInputUtensilImage" />
                </div>
                <div>
                    <input type="file" accept="image/*" onChange={UploadUtensilImage} />
                    {url_img && (
                        <div>
                            <img src={url_img} alt="" />
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        </div>
    )
}


export default NewUtensilio
