import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const EditUser = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
//   const [isActive, setIsActive] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/api/users/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.email);
        // setIsActive(data.is_active);
      })
      .catch((err) => console.error(err));
  }, [user_id]);

  const updateData = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        // is_active: isActive,
      }),
    };

    fetch(`${backendUrl}/api/users/${user_id}`, requestOptions)
      .then((res) => res.json())
      .then(() => navigate("/users"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1 className="display-4">Editar Usuario</h1>
      <form className="w-50 mx-auto" onSubmit={updateData}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
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
