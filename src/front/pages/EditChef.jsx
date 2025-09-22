import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const EditChef = () => {

  const { store, dispatch } = useGlobalReducer()
  const { chef_id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [urlImg, setUrlImg] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(backendUrl + `/api/chefs/` + chef_id)
      .then(response => response.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setRating(data.rating);
      });
  }, [chef_id]);


  function updateData(e) {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, rating }),
    };

    fetch(backendUrl + `/api/chefs/` + chef_id, requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log("Chef actualizado:", data);
      if (!store.authChef)
        return navigate("/chef")
      else navigate("/chef_profile")
      })
  }

  return (
    <div className="container">
      <h1 className="display-4">Editar Chef</h1>
      <form className="w-50 mx-auto" onSubmit={updateData}>
        {!store.authChef ?
          <>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
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
              <label className="form-label">Rating</label>
              <input
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
          </>
          :
          <>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
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
              <label className="form-label">Rating</label>
              <input
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Profile Image</label>
              <input
                value={urlImg}
                onChange={(e) => setUrlImg(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
          </>
        }
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

