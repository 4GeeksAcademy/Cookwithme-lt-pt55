import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import "../css/Bottoms.css";

export const InventoryUser = ({ onInventoryChange }) => {
  const { store } = useGlobalReducer();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [ingredients, setIngredients] = useState([]);
  const [utensils, setUtensils] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedUtensils, setSelectedUtensils] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [utensilInput, setUtensilInput] = useState("");
  const [ingredientSuggestions, setIngredientSuggestions] = useState([]);
  const [utensilSuggestions, setUtensilSuggestions] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/api/ingredients`).then(res => res.json()).then(data => setIngredients(data));
    fetch(`${backendUrl}/api/utensils`).then(res => res.json()).then(data => setUtensils(data));
  }, []);

  useEffect(() => {
    if (ingredientInput === "") setIngredientSuggestions([]);
    else setIngredientSuggestions(ingredients.filter(i => i.name.toLowerCase().includes(ingredientInput.toLowerCase())));
  }, [ingredientInput, ingredients]);

  useEffect(() => {
    if (utensilInput === "") setUtensilSuggestions([]);
    else setUtensilSuggestions(utensils.filter(u => u.name.toLowerCase().includes(utensilInput.toLowerCase())));
  }, [utensilInput, utensils]);

  const addIngredient = (id) => {
    if (!selectedIngredients.includes(id)) setSelectedIngredients([...selectedIngredients, id]);
    setIngredientInput("");
    setIngredientSuggestions([]);
  };

  const addUtensil = (id) => {
    if (!selectedUtensils.includes(id)) setSelectedUtensils([...selectedUtensils, id]);
    setUtensilInput("");
    setUtensilSuggestions([]);
  };

  const saveInventory = () => {
    fetch(`${backendUrl}/api/ingredient_users_bulk`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${store.token}` },
      body: JSON.stringify({
        user_id: store.authUser.id,
        ingredient_ids: selectedIngredients,
        utensil_ids: selectedUtensils
      })
    })
      .then(res => res.json())
      .then(() => {
        alert("Se ha actualizado su inventario")
        if (onInventoryChange) onInventoryChange(); //refresca las recetas
      });
  };

  return (
    <div className="container">
      <h2>🛒 Tu Inventario</h2>

      {/* Ingredientes */}
      <h4>Ingredientes</h4>
      <input type="text" className="form-control" placeholder="Escribe un ingrediente..." value={ingredientInput} onChange={e => setIngredientInput(e.target.value)} />
      <div className="list-group">
        {ingredientSuggestions.map(i => (
          <button key={i.id} type="button" className="list-group-item list-group-item-action" onClick={() => addIngredient(i.id)}>{i.name}</button>
        ))}
      </div>
      <div className="mt-2">
        {selectedIngredients.map(id => {
          const ing = ingredients.find(i => i.id === id);
          return <span key={id} className="badge bg-primary me-1">{ing?.name}</span>;
        })}
      </div>

      {/* Utensilios */}
      <h4 className="mt-3">🍴 Utensilios</h4>
      <input type="text" className="form-control" placeholder="Escribe un utensilio..." value={utensilInput} onChange={e => setUtensilInput(e.target.value)} />
      <div className="list-group">
        {utensilSuggestions.map(u => (
          <button key={u.id} type="button" className="list-group-item list-group-item-action" onClick={() => addUtensil(u.id)}>{u.name}</button>
        ))}
      </div>
      <div className="mt-2">
        {selectedUtensils.map(id => {
          const ut = utensils.find(u => u.id === id);
          return <span key={id} className="badge bg-success me-1">{ut?.name}</span>;
        })}
      </div>

      <button className="btn btn-custom mt-3" onClick={saveInventory}>Guardar Inventario</button>
    </div>
  );
};
