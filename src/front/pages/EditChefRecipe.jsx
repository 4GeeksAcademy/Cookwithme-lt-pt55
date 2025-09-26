import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useParams, useNavigate, Link } from "react-router-dom";


const EditChefRecipe = () => {

    const navigate = useNavigate();

    const { store, dispatch } = useGlobalReducer()
    const token = localStorage.getItem("tokenChef")
    const { recipe_id } = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [preparation, setPreparation] = useState("");
    const [img, setImg] = useState("https://picsum.photos/200/300")

    function updateData(e) {
        e.preventDefault();

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    "name": name,
                    "description": description,
                    "preparation": preparation,
                    "img": img

                }
            ),
        };

        fetch(backendUrl + `/api/chef_recipes/` + recipe_id, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log("Recipe actualizado:", data);
                navigate("/chef_home");
            })
    }

    function get_current_data() {

        const requestOptions = {
            headers: { "Authorization": `Bearer ${token}` }
        }

        fetch(backendUrl + `/api/chef_recipes/` + recipe_id, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                setName(data.name);
                setDescription(data.description);
                setPreparation(data.preparation);
                setImg(data.img);
            });
    }
    useEffect(() => {
        get_current_data()
    }, [recipe_id]);

    return (
        <div className="container">
            {store.authChef ?
                <>

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
                        <button type="submit" className="btn btn-primary">
                            Guardar Cambios
                        </button>
                        <Link to="/chef_home">
                            <button className="btn btn-primary">Back to home</button>
                        </Link>
                    </form>
                </>
                :
                <h1>Not authorized</h1>
            }
        </div>
    );
}


export default EditChefRecipe 