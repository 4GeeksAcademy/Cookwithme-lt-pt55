import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";

const NewChef = () => {

    const navigate = useNavigate()

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rating, setRating] = useState('')
    

    function sendData(e) {
        e.preventDefault()
        console.log('send data')
        console.log(name, email, password)
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(
                {
                    "email": email,
                    "name": name,
                    "password": password,
                    "rating": rating,

                }
            )
        }

        fetch(backendUrl + `/api/chefs`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                navigate("/chef")
            })
    }


    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Rating</label>
                    <input value={rating} onChange={(e) => setRating(e.target.value)} type="number" className="form-control" id="exampleInputRating" />
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
                <Link to="/chef">
                    <button className="btn btn-primary">Back to chefs</button>
                </Link>
            </form>
        </div>
    )
}

export default NewChef