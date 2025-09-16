import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewUtensilToUser = () => {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [utensils, setUtensils] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentUtensil, setCurrentUtensil] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetch(backendUrl + "/api/utensils").then(res => res.json()).then(setUtensils);
        fetch(backendUrl + "/api/users").then(res => res.json()).then(setUsers);
    }, []);

    const sendData = (e) => {
        e.preventDefault();
        if (!currentUtensil || !currentUser) return alert("Selecciona utensilio y usuario");

        fetch(backendUrl + "/api/utensil_user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ utensil_id: currentUtensil.id, user_id: currentUser.id })
        })
        .then(res => res.json())
        .then(() => navigate("/utensil_to_user"));
    };

    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label className="form-label">Utensilio</label>
                    <select className="form-select" onChange={e => setCurrentUtensil(utensils.find(u => u.id == e.target.value))}>
                        <option value="">Selecciona un utensilio</option>
                        {utensils.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <select className="form-select" onChange={e => setCurrentUser(users.find(u => u.id == e.target.value))}>
                        <option value="">Selecciona un usuario</option>
                        {users.map(u => <option key={u.id} value={u.id}>{u.email}</option>)}
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Guardar</button>
            </form>
        </div>
    );
};

export default NewUtensilToUser;
