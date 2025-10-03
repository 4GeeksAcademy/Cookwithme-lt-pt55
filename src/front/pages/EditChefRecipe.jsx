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
    const [img, setImg] = useState("")
    const [urlImg, setUrlImg] = useState("")
    const [utensils, setUtensils] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    function handleNameChange(e) {
        const newName = e.target.value;
        setName(newName);

        if (newName.trim().length > 0) {
            setDescription('');
            setPreparation('');
            setImg('');
            setUtensils('');
        }
    }

    function handleSelectSuggestion(meal) {
        setName(meal.strMeal);
        setDescription(`${meal.strCategory} (${meal.strArea})`);
        setPreparation(meal.strInstructions);
        setImg(meal.strMealThumb);
        setSuggestions([]);
    }

    useEffect(() => {
        const fetchRecipes = async () => {
            if (name.trim().length > 1) {
                try {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
                    const data = await response.json();
                    setSuggestions(data.meals || []);
                } catch (error) {
                    console.error("Error fetching recipes:", error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
            }
        };

        const timerId = setTimeout(() => {
            fetchRecipes();
        }, 300);

        return () => {
            clearTimeout(timerId);
        };
    }, [name]);

    const changeUploadedImage = async (e) => {
        const file = e.target.files[0];

        setImg("");

        const formData = new FormData()

        formData.append('file', file)
        formData.append('upload_preset', 'chef_image')
        formData.append('cloud_name', 'dwi8lacfr')

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dwi8lacfr/image/upload", {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            console.log(data)

            if (data.secure_url) {
                setUrlImg(data.secure_url)

            } else {
                console.error("Failed to upload the image, please try again");
            }

        }
        catch (error) {
            console.error("Error uploading image:", error)
        }
    }

    function updateData(e) {
        e.preventDefault();

        const finalImageUrl = urlImg || img

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
                    "img": finalImageUrl,
                    "utensils": utensils

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
        const keywords = ["pan", "oven", "plate", "spoon"];
        if (!preparation) {
            setUtensils('');
            return;
        }

        const lowercasedPreparation = preparation.toLowerCase();
        const foundKeywords = keywords.filter(keyword =>
            lowercasedPreparation.includes(keyword)
        );

        setUtensils(foundKeywords.join(', '));
    }, [preparation]);

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
                                onChange={handleNameChange}
                                type="text"
                                className="form-control"
                            />
                            {suggestions.length > 0 && (
                                <ul className="list-group mt-2">
                                    {suggestions.slice(0, 5).map(meal => (
                                        <li key={meal.idMeal}
                                            className="list-group-item d-flex align-items-center"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleSelectSuggestion(meal)}>
                                            <img src={meal.strMealThumb} alt={meal.strMeal} width="40" className="me-2" />
                                            {meal.strMeal}
                                        </li>
                                    ))}
                                </ul>
                            )}
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
                            <label htmlFor="utensilsInput" className="form-label">Utensilios</label>
                            <input
                                value={utensils}
                                onChange={(e) => setUtensils(e.target.value)}
                                type="text"
                                className="form-control"
                                id="utensilsInput"
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
                        {/* <div className="mb-3">
                            <label className="form-label">Image</label>
                            <input
                                value={img}
                                onChange={(e) => setImg(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div> */}
                        <div>
                            <input type="file" accept="image/*" onChange={changeUploadedImage} />
                            {(urlImg || img) && (
                                <div>
                                    <img
                                        src={urlImg || img}
                                        alt="Ingrediente Imagen"
                                        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                                    />
                                </div>
                            )}
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