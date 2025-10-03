import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../css/Bottoms.css";

export const SignupUser = () => {

    const navigate = useNavigate();

    const [error, setError] = useState('');
    const { store, dispatch } = useGlobalReducer()

    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    function sendData(e) {
        e.preventDefault()
        console.log('send data')
        console.log(email, password)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(
                {
                    "email": email,
                    "username": username,
                    "name": name,
                    "password": password
                }
            )
        };
        fetch(import.meta.env.VITE_BACKEND_URL + `/api/signup_user`, requestOptions)
            .then(response => {
                console.log(response)
                console.log(response.status)
                if (response.status !== 200) {
                    setError('Invalid email or password.');
                    throw new Error('Signup failed');
                } else {
                    setError('');
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
                localStorage.setItem("tokenUser", data.access_token);
                dispatch({ type: "set_auth_user", payload: true })
                navigate("/home_user");
            }
        );
    }

    return (
    <div className="container text-center mt-5">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <>
        {store.authUser ? <Navigate to='/home_user' />
        :
        <>
            <h1>Register here</h1>
            <form className="w-50 mx-auto">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputUsername" className="form-label">Username</label>
                    <input value={username} onChange={(e) => setUserName(e.target.value)} type="text" className="form-control" id="exampleUsername" />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                </div>

                <div className="d-flex justify-content-around">
                    <button type="submit" onClick={sendData} className="btn btn-custom">Submit</button>
                    <Link to="/login_user">
                        <button className="btn btn-custom">Log In as user</button>
                    </Link>
                </div>
                
            </form>
        </>
    }            
        </>
    </div>
    );
}