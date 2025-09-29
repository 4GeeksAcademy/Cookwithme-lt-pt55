import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewUtensilio = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [url_img, setUrlImg] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [allUtensils, setAllUtensils] = useState([]);
    const [errorMsg, setErrorMsg] = useState(""); 

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const normalize = (str) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    useEffect(() => {
        fetch("/utensilios.json")
            .then((res) => res.json())
            .then((data) => setAllUtensils(data))
            .catch((err) => console.error("Error cargando utensilios:", err));
    }, []);

    useEffect(() => {
        if (name.trim().length > 0 && showSuggestions) {
            const filtered = allUtensils.filter((u) =>
                normalize(u.name).includes(normalize(name))
            );
            setSuggestions(filtered.slice(0, 5));
        } else {
            setSuggestions([]);
        }
    }, [name, showSuggestions, allUtensils]);

    function handleSelectSuggestion(utensil) {
        setName(utensil.name);
        setDescription(utensil.description);
        setUrlImg(utensil.image);
        setSuggestions([]);
        setShowSuggestions(false);
    }

    function handleInputChange(e) {
        setName(e.target.value);
        setShowSuggestions(true);
    }

    const UploadUtensilImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", "chef_image");
        formData.append("cloud_name", "dwi8lacfr");

        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dwi8lacfr/image/upload",
                { method: "POST", body: formData }
            );

            const data = await response.json();
            if (data.secure_url) {
                setUrlImg(data.secure_url);
            } else {
                console.error("Error subiendo imagen a Cloudinary");
            }
        } catch (error) {
            console.log(error);
        }
    };

    async function sendData(e) {
        e.preventDefault();
        setErrorMsg("");

        try {
            const response = await fetch(backendUrl + "/api/utensils/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description, url_img }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.msg || "Error al crear utensilio");
                return;
            }

            navigate("/utensilios");
        } catch (err) {
            setErrorMsg("Error: probablemente utensilio ya existe, sino otro");
        }
    }

    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        value={name}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control"
                    />
                    {suggestions.length > 0 && (
                        <ul className="list-group mt-2">
                            {suggestions.map((utensil, index) => (
                                <li
                                    key={index}
                                    className="list-group-item d-flex align-items-start"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleSelectSuggestion(utensil)}
                                >
                                    <img
                                        src={utensil.image}
                                        alt={utensil.name}
                                        width="40"
                                        className="me-2"
                                        onError={(e) =>
                                            (e.target.src =
                                                "https://via.placeholder.com/40?text=?")
                                        }
                                    />
                                    <div>
                                        <strong>{utensil.name}</strong>
                                        <p className="mb-0 small text-muted">
                                            {utensil.description}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        rows="3"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input
                        value={url_img}
                        onChange={(e) => setUrlImg(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Pega una URL de imagen"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={UploadUtensilImage}
                        className="form-control mt-2"
                    />
                    {url_img && (
                        <img
                            src={url_img}
                            alt={name}
                            width="200"
                            style={{ marginTop: "10px" }}
                            onError={(e) =>
                                (e.target.src =
                                    "https://via.placeholder.com/200?text=Sin+Imagen")
                            }
                        />
                    )}
                </div>

                {errorMsg && (
                    <div className="alert alert-danger">{errorMsg}</div>
                )}

                <button type="submit" className="btn btn-primary">
                    Crear
                </button>
            </form>
        </div>
    );
};

export default NewUtensilio;
