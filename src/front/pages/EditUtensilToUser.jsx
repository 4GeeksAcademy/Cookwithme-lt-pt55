import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const EditUtensilToUser = () => {
    const { utensiluser_id } = useParams();
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [utensilId, setUtensilId] = useState("");
    const [userId, setUserId] = useState("");
    const [utensils, setUtensils] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${backendUrl}/api/utensil_user/${utensiluser_id}`).then(res => res.json()).then(data => {
            setUtensilId(data.utensil_id);
            setUserId(data.user_id);
        });
        fetch(`${backendUrl}/api/utensils`).then(res => res.json()).then(setUtensils);
        fetch(`${backendUrl}/api/users`).then(res => res.json()).then(setUsers);
    }, [utensiluser_id]);

    const updateData = (e) => {
        e.preventDefault();
        fetch(`${backendUrl}/api/utensil_user/${utensiluser_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ utensil_id: utensilId, user_id: userId })
        }).then(res => res.json()).then(() => navigate("/utensil_to_user"));
    };

    return (
        <div className="container">
            <h1 className="display-4">Editar Utensilio de Usuario</h1>
            <form className="w-50 mx-auto" onSubmit={updateData}>
                <div className="mb-3">
                    <label className="form-label">Utensilio</label>
                    <select className="form-select" value={utensilId} onChange={e => setUtensilId(e.target.value)}>
                        {utensils.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <select className="form-select" value={userId} onChange={e => setUserId(e.target.value)}>
                        {users.map(u => <option key={u.id} value={u.id}>{u.email}</option>)}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};
