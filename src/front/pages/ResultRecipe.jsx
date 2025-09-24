import React, { useEffect, useState } from "react";

export const Results = ({ token }) => {
  const [results, setResults] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(backendUrl + "user/available_recipes")
      .then(res => res.json())
      .then(setResults)
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Resultados</h1>
      {results.length === 0 ? (
        <p>No se encontraron recetas disponibles con tus ingredientes y utensilios.</p>
      ) : (
        results.map(recipe => (
          <div key={recipe.id} className="card mt-3 p-3">
            <h3>{recipe.name}</h3>
            <img src={recipe.img} alt={recipe.name} className="img-fluid mb-2" style={{ maxHeight: "200px" }} />
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};
