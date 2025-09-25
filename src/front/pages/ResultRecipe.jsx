import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Results = () => {
  console.log("🚀 Entré a Results.jsx");
  const { store } = useGlobalReducer();
  const token = store.authUser?.token; 
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!token) {
      console.log("⏳ Esperando token...");
      return; 
    }


  console.log("✅ Token detectado:", token);

  const fetchRecipes = async () => {
    try {
      console.log("🔄 Fetch a:", backendUrl + "/api/user/available_recipes");
      const res = await fetch(backendUrl + "/api/user/available_recipes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error fetching recipes");
      }

      const data = await res.json();
      console.log("📦 Recetas recibidas:", data);
      setResults(data);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchRecipes();
  }, [token, backendUrl]);

  if (loading) return <p className="mt-5">Cargando recetas...</p>;
  if (error) return <p className="mt-5 text-danger">Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h1>Resultados</h1>
      {results.length === 0 ? (
        <p>No se encontraron recetas disponibles con tus ingredientes y utensilios.</p>
      ) : (
        results.map((recipe) => (
          <div key={recipe.id} className="card mt-3 p-3">
            <h3>{recipe.name}</h3>
            {recipe.img && (
              <img
                src={recipe.img}
                alt={recipe.name}
                className="img-fluid mb-2"
                style={{ maxHeight: "200px" }}
              />
            )}
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};
