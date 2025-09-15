import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const NewAdmin = () => {

    const navigate = useNavigate()

    const [admEmail, setadmEmail] = useState('')
    const [admPass, setadmPass] = useState('')

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function sendData(e){
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(

                {
                "email": admEmail,
                "password": admPass,
                }
            )
        }
        fetch(backendUrl + '/api/adminuser/', requestOptions)
        .then(response => response.json())
        .then(data => 
            {console.log(data)
            navigate("/adminuser")
            })
    }

    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input value={admEmail} onChange={(e)=>setadmEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={admPass} onChange={(e)=>setadmPass(e.target.value)} type="password" className="form-control" id="exampleInputEmail1"/>
                </div>
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        </div>
    )
}


export default NewAdmin
