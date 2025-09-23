import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewIngrediente = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [suggestions, setSuggestions] = useState([]);


    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const normalize = (str) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const translations = {
        albahaca: "basil",
        arroz: "rice",
        tomate: "tomato",
        cebolla: "onion",
        papa: "potato",
        zanahoria: "carrot",
        ajo: "garlic",
        pollo: "chicken",
        carne: "beef",
        pescado: "fish",
        };

            
    useEffect(() => {
        if (name.trim().length > 1) {
            const normalized = normalize(name);
            const translated = translations[normalized] || normalized;

            fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=${translated}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.ingredients) {
                const ing = data.ingredients[0].strIngredient;
                setImage(`https://www.themealdb.com/images/ingredients/${ing}.png`);
                } else {
                setImage("");
                }
            })
            .catch(() => setImage(""));
        } else {
            setImage("");
        }
    }, [name]);




    function sendData(e){
        e.preventDefault()
        console.log('send data')
        console.log(name, description, image)
        const requestOptions = {
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(

                {
                "name": name,
                "description": description,
                "image": image
                }
            )
        }
        fetch(backendUrl + '/api/ingredients/', requestOptions)
        .then(response => response.json())
        .then(data => 
            {console.log(data)
            navigate("/ingredientes")
            })
    }

    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
            <div className="mb-3"><label className="form-label">Name</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control"/>
                {suggestions.length>0 && (
                <ul className="list-group mt-2">
                    {suggestions.slice(0,5).map(meal=>(
                    <li key={meal.idMeal} className="list-group-item d-flex align-items-center" style={{cursor:"pointer"}} 
                        onClick={()=>{setName(meal.strMeal);setImage(meal.strMealThumb);setSuggestions([]);}}>
                        <img src={meal.strMealThumb} alt={meal.strMeal} width="40" className="me-2"/>{meal.strMeal}
                    </li>
                    ))}
                </ul>
                )}
            </div>
            <div className="mb-3"><label className="form-label">Description</label>
                <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" className="form-control"/>
            </div>
            <div className="mb-3"><label className="form-label">Image</label>
                <input value={image} type="text" className="form-control" readOnly/>
                {image && <img src={image} alt={name} width="200" style={{marginTop:"10px"}}/>}
            </div>
            <button type="submit" className="btn btn-primary">Crear</button>
            </form>

        </div>
    )
}


export default NewIngrediente
