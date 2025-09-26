import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const EditUtensilio = () => {
  const { utensilio_id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  

  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  const changeUploadedImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', 'ingredient_and_utensil_image')
    formData.append('cloud_name', 'dwi8lacfr')

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dwi8lacfr/image/upload", {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      console.log(data)

      if (data.secure_url) {
        setCurrentImageUrl(data.secure_url)

      } else {
        console.error("Failed to upload the image, please try again");
      }

    }
    catch (error) {
      console.error("Error uploading image:", error)
    }
  }

    useEffect(() => {
    fetch(backendUrl + "/api/utensils/" + utensilio_id)
        .then(response => response.json())
        .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setCurrentImageUrl(data.url_img);
        });
    }, [ utensilio_id, backendUrl ]);

  
  function updateData(e) {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, url_img: currentImageUrl  }),
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
        <div>
          <input type="file" accept="image/*" onChange={changeUploadedImage} />
          {currentImageUrl && (
            <div>
              <img 
              src={currentImageUrl} 
              alt="Utensil Imagen" 
              style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
              />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};
