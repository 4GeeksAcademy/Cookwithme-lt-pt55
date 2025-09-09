import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const EditAdmin = () => {
  const { admin_id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
    fetch(backendUrl + "/api/adminuser/" + admin_id)
        .then(response => response.json())
        .then((data) => {
        setEmail(data.email);
        setPasword(data.password);
        });
    }, [admin_id]);

  
  function updateAdmin(e) {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email, password }),
    };

    fetch(backendUrl + "/api/adminuser/" + admin_id, requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log("Admin actualizado:", data);
        navigate("/adminuser");
      })
  }

  return (
    <div className="container">
      <h1 className="display-4">Editar</h1>
      <form className="w-50 mx-auto" onSubmit={updateAdmin}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            value={password}
            onChange={(e) => setPasword(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};
export default EditAdmin
