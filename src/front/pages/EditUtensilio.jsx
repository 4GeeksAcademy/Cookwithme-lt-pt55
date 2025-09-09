import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const EditUtensilio = () => {
  const { utensilio_id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url_img, setImage] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
    fetch(backendUrl + "/api/utensils/" + utensilio_id)
        .then(response => response.json())
        .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setImage(data.url_img);
        });
    }, [utensilio_id]);

  
  function updateData(e) {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, url_img }),
    };

    fetch(backendUrl + '/api/utensils/' + utensilio_id, requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log("utensilio actualizado:", data);
        navigate("/utensilios");
      })
  }

  return (
    <div className="container">
      <h1 className="display-4">Editar utensilios</h1>
      <form className="w-50 mx-auto" onSubmit={updateData}>
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
          <label className="form-label">Descripcion</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">url img</label>
          <input
            value={url_img}
            onChange={(e) => setImage(e.target.value)}
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
