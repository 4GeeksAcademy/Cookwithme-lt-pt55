import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, Navigate } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";


const FormAdmin = () => {

    const navigate = useNavigate();

    const { store, dispatch } = useGlobalReducer()


    const [error, setError] = useState('');

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
                    "password": password
                }
            )
        };
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/login_admin', requestOptions)
            .then(response => {
                console.log(response)
                console.log(response.status)
                if (response.status !== 200) {
                    setError('Invalid email or password.');
                    throw new Error('Login failed');
                } else {
                    setError('');
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
                localStorage.setItem("tokenAdmin", data.access_token);
                dispatch({ type: "set_auth_admin", payload: true })
                navigate("/testadm");
            }
        );
            
    }

    return (
        <form className="w-50 mx-auto">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="d-flex align-content-around">
                <div className="col-6">
                    <button type="submit" onClick={sendData} className="btn btn-primary">Submit</button>
                </div>
                <div className="col-6">
                    <Link to="/signup_admin">
                        <button className="btn btn-warning">Signup as New Admin</button>
                    </Link>
                </div>
            </div>
        </form>
    );
}


export default FormAdmin 