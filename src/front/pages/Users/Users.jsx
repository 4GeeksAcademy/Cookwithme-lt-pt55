import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  function getUsers() {
    fetch(backendUrl + "/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error cargando usuarios:", err));
  }

  function deleteUser(userId) {
    fetch(backendUrl + "/api/users/" + userId, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => getUsers())
      .catch((err) => console.error("Error eliminando usuario:", err));
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4">Usuarios</h1>

      <div className="mb-3">
        <Link to="/add_user">
          <button className="btn btn-success">Añadir usuario</button>
        </Link>
      </div>

      {users.map((u) => (
        <div key={u.id} className="card my-2 p-3">
          <p>Email: {u.email}</p>
          <div className="d-flex justify-content-center gap-2">
            <Link to={`/users/${u.id}`}>
              <button className="btn btn-primary">Ver</button>
            </Link>
            <Link to={`/users/${u.id}/edit`}>
              <button className="btn btn-info">Editar</button>
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => deleteUser(u.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
