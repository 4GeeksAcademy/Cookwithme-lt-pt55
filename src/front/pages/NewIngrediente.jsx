import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const NewIngrediente = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function sendData(e){
        e.preventDefault()
        console.log('send data')
        console.log(name, description, image)
        const requestOptions = {
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(

                {
                "name": name,
                "description": description,
                "image": image
                }
            )
        }
        fetch(backendUrl + '/api/ingredients/', requestOptions)
        .then(response => response.json())
        .then(data => 
            {console.log(data)
            navigate("/ingredientes")
            })
    }

    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" className="form-control" id="exampleInputEmail1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Image</label>
                    <input value={image} onChange={(e)=>setImage(e.target.value)} type="text" className="form-control" id="exampleInputEmail1"/>
                </div>
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        </div>
    )
}


export default NewIngrediente
