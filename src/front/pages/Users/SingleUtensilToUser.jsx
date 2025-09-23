import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const SingleUtensilToUser = () => {
    const { utensiluser_id } = useParams();
    const [relation, setRelation] = useState(null);
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetch(`${backendUrl}/api/utensil_user/${utensiluser_id}`).then(res => res.json()).then(setRelation);
    }, [utensiluser_id]);

    const deleteRelation = () => {
        fetch(`${backendUrl}/api/utensil_user/${utensiluser_id}`, { method: "DELETE" })
            .then(() => navigate("/utensil_to_user"));
    };

    if (!relation) return <h2>Cargando...</h2>;

    return (
        <div className="container text-center">
            <h1 className="display-4">Relación ID: {relation.id}</h1>
            <h2>Usuario: {relation.user_email}</h2>
            <h2>Utensilio: {relation.utensil_name}</h2>

            <div className="d-flex justify-content-center gap-2">
                <Link to="/utensil_to_user"><button className="btn btn-secondary">Volver</button></Link>
                <Link to={`/utensiluser/${relation.id}/edit`}><button className="btn btn-info">Editar</button></Link>
                <button className="btn btn-danger" onClick={deleteRelation}>Eliminar</button>
            </div>
        </div>
    );
};
