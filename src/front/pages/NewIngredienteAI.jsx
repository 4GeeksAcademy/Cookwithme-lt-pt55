import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewIngredienteAI = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); // imagen oficial (TheMealDB)
  const [uploadedImg, setUploadedImg] = useState(""); // foto subida a Cloudinary
  const [detected, setDetected] = useState([]); // sugerencias IA
  const [loading, setLoading] = useState(false);
  const [allIngredients, setAllIngredients] = useState([]); // lista TheMealDB

  // 🔹 Cargar lista de ingredientes de TheMealDB
  useEffect(() => {
    const fetchAllIngredients = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        );
        const data = await response.json();
        if (data.meals) {
          setAllIngredients(data.meals);
        }
      } catch (error) {
        console.error("Error fetching TheMealDB list:", error);
      }
    };
    fetchAllIngredients();
  }, []);

  const UploadIngredientImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ingredient_and_utensil_image");
    formData.append("cloud_name", "dwi8lacfr");

    try {
      setLoading(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwi8lacfr/image/upload",
        { method: "POST", body: formData }
      );

      const data = await response.json();
      if (data.secure_url) {
        setUploadedImg(data.secure_url); // solo mostramos la subida
        setImage(""); // no rellenamos aún Imagen final

        // Llamar a tu endpoint IA
        const aiRes = await fetch(`${backendUrl}/api/detect_ingredients`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image_url: data.secure_url }),
        });

        const aiData = await aiRes.json();
        setDetected(aiData.ingredients || []);
      }
    } catch (err) {
      console.error("Error subiendo imagen:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUseIngredient = (ingName) => {
    // Buscar ingrediente en la lista de TheMealDB
    const found = allIngredients.find(
      (i) =>
        i.strIngredient.toLowerCase() === ingName.toLowerCase()
    );

    if (found) {
      setName(found.strIngredient);
      setDescription(found.strDescription || "");
      setImage(
        `https://www.themealdb.com/images/ingredients/${found.strIngredient}.png`
      );
    } else {
      // fallback si no existe en TheMealDB
      setName(ingName);
      setDescription("Descripción no disponible.");
    }
  };

  const sendData = async (e) => {
    e.preventDefault();
    const finalImage = image || uploadedImg;

    try {
      const response = await fetch(`${backendUrl}/api/ingredients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          image: finalImage,
        }),
      });

      if (response.ok) {
        navigate("/ingredientes");
      } else {
        alert("Error creando ingrediente");
      }
    } catch (err) {
      console.error("Error enviando data:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>🤖 Crear Ingrediente con IA</h2>

      <form className="w-50 mx-auto" onSubmit={sendData}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Nombre del ingrediente"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            rows="4"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen final (DB)</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            className="form-control"
            readOnly
          />
          {image && (
            <img
              src={image}
              alt="final"
              width="200"
              style={{ marginTop: "10px" }}
            />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Sube una foto</label>
          <input type="file" accept="image/*" onChange={UploadIngredientImage} />
          {loading && <p>Analizando con IA...</p>}
          {uploadedImg && (
            <div>
              <p>📷 Imagen subida:</p>
              <img
                src={uploadedImg}
                alt="subida"
                width="200"
                style={{ marginTop: "10px" }}
              />
            </div>
          )}
        </div>

        {detected.length > 0 && (
          <div className="mb-3">
            <h5>Sugerencias IA:</h5>
            <ul>
              {detected.map((ing, idx) => (
                <li key={idx}>
                  {ing.name} ({Math.round(ing.confidence * 100)}%)
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary ms-2"
                    onClick={() => handleUseIngredient(ing.name)}
                  >
                    Usar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Crear
        </button>
      </form>
    </div>
  );
};

export default NewIngredienteAI;
