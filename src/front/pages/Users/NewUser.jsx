import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  function sendData(e) {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          username: username,
          name: name,
          password: password,
          email: email
      }),
    };

    fetch(backendUrl + "/api/users", requestOptions)
      .then((res) => res.json())
      .then(() => navigate("/users"))
      .catch((err) => console.error("Error creando usuario:", err));
  }

  return (
    <div className="container">
      <h1 className="display-4">Nuevo Usuario</h1>
      <form className="w-50 mx-auto" onSubmit={sendData}>
        <div className="mb-3">
          <label className="form-label">Nombre de usuario</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="form-control"
            placeholder="ingrese su nombre a crear"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="coloque su nombre a crear"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="******"
          />
        </div>


        <button type="submit" className="btn btn-success">
          Crear
        </button>
      </form>
    </div>
  );
};

export default NewUser;
