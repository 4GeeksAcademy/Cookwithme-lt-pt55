import React, { useEffect, useState } from "react";

export const UserInventory = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [ingredients, setIngredients] = useState([]);
  const [utensils, setUtensils] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedUtensils, setSelectedUtensils] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Traer ingredientes y utensilios desde la API
    const fetchData = async () => {
      try {
        const [ingRes, uteRes] = await Promise.all([
          fetch(backendUrl+'/api/ingredients'),
          fetch(backendUrl +'/api/utensils')
        ]);

        setIngredients(await ingRes.json());
        setUtensils(await uteRes.json());
      } catch (error) {
        console.error("Error al cargar ingredientes/utensilios:", error);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const resp = await fetch(backendUrl+'/api/user/inventory', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          ingredients: selectedIngredients,
          utensils: selectedUtensils
        })
      });

      if (!resp.ok) throw new Error("Error al guardar inventario");

      setMessage("✅ Inventario actualizado correctamente");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error al guardar inventario");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mi Inventario</h2>

      <div>
        <h3 className="font-semibold">Ingredientes disponibles</h3>
        <ul>
          {ingredients.map((ing) => (
            <li key={ing.id}>
              <label>
                <input
                  type="checkbox"
                  value={ing.id}
                  checked={selectedIngredients.includes(ing.id)}
                  onChange={(e) => {
                    const id = parseInt(e.target.value);
                    setSelectedIngredients((prev) =>
                      prev.includes(id)
                        ? prev.filter((i) => i !== id)
                        : [...prev, id]
                    );
                  }}
                />
                {ing.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Utensilios disponibles</h3>
        <ul>
          {utensils.map((ute) => (
            <li key={ute.id}>
              <label>
                <input
                  type="checkbox"
                  value={ute.id}
                  checked={selectedUtensils.includes(ute.id)}
                  onChange={(e) => {
                    const id = parseInt(e.target.value);
                    setSelectedUtensils((prev) =>
                      prev.includes(id)
                        ? prev.filter((u) => u !== id)
                        : [...prev, id]
                    );
                  }}
                />
                {ute.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Guardar inventario
      </button>

      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};
