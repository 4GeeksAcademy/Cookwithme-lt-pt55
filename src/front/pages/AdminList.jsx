import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const AdminList = () => {

    const[adminUsers, setadminUsers] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function getAdmins(){
        fetch(backendUrl + '/api/adminuser')
        .then(response => response.json())
        .then(data => setadminUsers(data))

    }    


    function deleteadminuser(adminuser_id){

        const requestOptions = {
            method: 'DELETE'
        }
        fetch(backendUrl + '/api/adminuser/' + adminuser_id, requestOptions)
        .then(response => response.json())
        .then(data => 
            {console.log(data)
            getAdmins()})

    }    


    useEffect(() => {
        getAdmins()

    }, [])

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">These are the admins:</h1>

                <div className="ml-auto">
                    <Link to="/add_admin">
                        <button className="btn btn-success my-3">Registrate</button>
                    </Link>
                </div>

           { adminUsers.map((adminuser) => (
                <p key={adminuser.id}> 
                    email: {adminuser.email}

                    <Link to={"/adminuser/"+ adminuser.id}>
                            <button className="btn btn-primary m-2">Ver Usuario</button>
                    </Link>

                    <Link to={"/adminuser/"+ adminuser.id+"/edit"}>
                        <button className="btn btn-info m-2">Editar Usuario</button>
                    </Link>

                        <button className="btn btn-danger m-2" onClick={()=>deleteadminuser(adminuser.id)}>Eliminar Usuario</button>
                                  
                </p>
            ))}
            
        </div>
    );
}; 