import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewIngrediente = () => {

    const navigate = useNavigate();

    const [urlImg, setUrlImg] = useState("")

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const translations = {
        "arroz": "rice",
        "arroz jazmin": "jasmine rice",
        "pollo": "chicken",
        "tomate": "tomato",
        "cebolla": "onion",
        "papa": "potato",
        "zanahoria": "carrot",
        "ajo": "garlic",
        "carne": "beef",
        "pescado": "fish",
        "albahaca": "basil"
    };

    const reverseTranslations = Object.fromEntries(
        Object.entries(translations).map(([key, value]) => [value, key])
    );

    const normalize = (str) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const translateToSpanish = (text) => {
        const normalizedText = normalize(text);
        return reverseTranslations[normalizedText] || text;
    };

    const UploadIngredientImage = async (e) => {
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
                setUrlImg(data.secure_url)
                setImage("");
            } else {
                console.error("Failed to upload the image, please try again");
            }

        }
        catch (error) {
            console.error("Error uploading image:", error)
        }
    }

    useEffect(() => {
        const fetchAllIngredients = async () => {
            try {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
                const data = await response.json();
                if (data.meals) {
                    setAllIngredients(data.meals);
                }
            } catch (error) {
                console.error("Error fetching all ingredients:", error);
            }
        };
        fetchAllIngredients();
    }, []);

    useEffect(() => {
        if (name.trim().length > 1) {
            const normalizedName = normalize(name);
            const englishQuery = translations[normalizedName] || normalizedName;

            const filteredSuggestions = allIngredients.filter(ing => normalize(ing.strIngredient).includes(englishQuery)).slice(0, 5);

            setSuggestions(filteredSuggestions.map(ing => ({
                idMeal: ing.idIngredient,
                strMeal: ing.strIngredient,
                strDescription: ing.strDescription,
                strMealThumb: `https://www.themealdb.com/images/ingredients/${ing.strIngredient}.png`
            })));

        } else {
            setSuggestions([]);
        }
    }, [name, allIngredients, translations]);

    function handleSelectSuggestion(meal) {
        const spanishName = translateToSpanish(meal.strMeal);
        setName(spanishName);
        setDescription(meal.strDescription);
        setImage(meal.strMealThumb);
        setSuggestions([]);
    }

    function sendData(e) {
        e.preventDefault();

        const finalImageURL = urlImg || image;
        if (!finalImageURL) {
            alert("Please provide an image for the ingredient.");
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "name": name,
                "description": description,
                "image": finalImageURL 
            })
        };
        fetch(backendUrl + '/api/ingredients/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                navigate("/ingredientes");
            })
            .catch(error => console.error("Error posting data:", error));
    }

    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                    {suggestions.length > 0 && (
                        <ul className="list-group mt-2">
                            {suggestions.map(meal => (
                                <li key={meal.idMeal} className="list-group-item d-flex align-items-center" style={{ cursor: "pointer" }}
                                    onClick={() => handleSelectSuggestion(meal)}>
                                    <img src={meal.strMealThumb} alt={meal.strMeal} width="40" className="me-2" />
                                    {translateToSpanish(meal.strMeal)}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" rows="5" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input value={urlImg || image} type="text" className="form-control"/>
                    {(urlImg || image) && <img src={urlImg || image} alt={name} width="200" style={{ marginTop: "10px" }} />}
                    
                </div>
                <div>
                    <input type="file" accept="image/*" onChange={UploadIngredientImage} />
                    {urlImg && (
                        <div>
                            <img src={urlImg} alt="" />
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        </div>
    );
};

export default NewIngrediente
