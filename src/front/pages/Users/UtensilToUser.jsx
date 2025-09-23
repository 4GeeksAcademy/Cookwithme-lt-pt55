import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UtensilToUser = () => {
    const [utensilUsers, setUtensilUsers] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getRelations = () => {
        fetch(backendUrl + "/api/utensil_user")
            .then(res => res.json())
            .then(data => setUtensilUsers(data));
    };

    const deleteRelation = (id) => {
        fetch(`${backendUrl}/api/utensil_user/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(() => getRelations());
    };

    useEffect(() => { getRelations(); }, []);

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Utensilios de usuarios</h1>
            <Link to="/add_utensil_to_user">
                <button className="btn btn-success my-3">Añadir utensilio a usuario</button>
            </Link>
            {utensilUsers.map(r => (
                <p key={r.id}>
                    Usuario: {r.user_email} - Utensilio: {r.utensil_name}
                    <Link to={"/utensiluser/" + r.id}><button className="btn btn-primary">Ver</button></Link>
                    <Link to={"/utensiluser/" + r.id + "/edit"}><button className="btn btn-info">Editar</button></Link>
                    <button className="btn btn-danger" onClick={() => deleteRelation(r.id)}>Eliminar</button>
                </p>
            ))}
        </div>
    );
};
