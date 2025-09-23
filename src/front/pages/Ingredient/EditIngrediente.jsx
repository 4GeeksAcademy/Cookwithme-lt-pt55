import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const EditIngrediente = () => {
  const { ingrediente_id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
    fetch(backendUrl + "/api/ingredients/" + ingrediente_id)
        .then(response => response.json())
        .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setImage(data.image);
        });
    }, [ingrediente_id]);

  
  function updateData(e) {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, image }),
    };

    fetch(backendUrl + '/api/ingredients/' + ingrediente_id, requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log("Ingrediente actualizado:", data);
        navigate("/ingredientes");
      })
  }

  return (
    <div className="container">
      <h1 className="display-4">Editar Ingrediente</h1>
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
          <label className="form-label">Imagen</label>
          <input
            value={image}
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
