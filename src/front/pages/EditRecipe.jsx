import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const EditRecipe = () => {
    const { recipe_id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [preparation, setPreparation] = useState("");
    const [img, setImg] = useState('')

    const [chefs, setChefs] = useState([])

    const [currentChef, setCurrentChef] = useState(null)

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    function getChefs() {
        fetch(backendUrl + `/api/chefs`)
            .then(response => response.json())
            .then(data => setChefs(data))
    }

    useEffect(() => {
        fetch(backendUrl + `/api/recipes/` + recipe_id)
            .then(response => response.json())
            .then((data) => {
                setName(data.name);
                setDescription(data.description);
                setPreparation(data.preparation);
                setImg(data.img);
            });
        getChefs()
    }, [recipe_id]);


    function updateData(e) {
        e.preventDefault();

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    "name": name,
                    "description": description,
                    "preparation": preparation,
                    "img": img,
                    "chef_id": currentChef.id

                }
            ),
        };

        fetch(backendUrl + `/api/recipes/` + recipe_id, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log("Recipe actualizado:", data);
                navigate("/recipes");
            })
    }

    return (
        <div className="container">
            <h1 className="display-4">Editar Recipe</h1>
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
                    <label className="form-label">Description</label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Preparation</label>
                    <input
                        value={preparation}
                        onChange={(e) => setPreparation(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>

                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {!currentChef ? "Select chef" : "Chef: " + currentChef.name}
                    </button>
                    <ul className="dropdown-menu">
                        {chefs.map((chef) =>
                            <li key={chef.id} onClick={() => setCurrentChef(chef)}><button className="dropdown-item" type="button">{chef.name}</button></li>
                        )}
                    </ul>
                </div>
                <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};
