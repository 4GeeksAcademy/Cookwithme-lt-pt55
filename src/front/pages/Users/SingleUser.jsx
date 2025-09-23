import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const SingleUser = () => {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${backendUrl}/api/users/${user_id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, [user_id]);

  const deleteUser = () => {
    fetch(`${backendUrl}/api/users/${user_id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        alert("Usuario eliminado");
        navigate("/all_users");
      })
      .catch((err) => console.error(err));
  };

  if (!user) return <h2>Cargando...</h2>;

  return (
    <div className="container text-center">
      <h1 className="display-4">Usuario ID: {user.id}</h1>
      <h2>Email: {user.email}</h2>

      <hr className="my-4" />

      <div className="d-flex justify-content-center gap-2">
        <Link to="/users">
          <button className="btn btn-secondary">Volver a la lista</button>
        </Link>

        <Link to={`/users/${user.id}/edit`}>
          <button className="btn btn-info">Editar</button>
        </Link>

        <button className="btn btn-danger" onClick={deleteUser}>
          Eliminar
        </button>
      </div>
    </div>
  );
};
