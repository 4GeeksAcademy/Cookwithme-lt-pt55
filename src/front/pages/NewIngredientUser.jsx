import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewIngredientUser = () => {
  const navigate = useNavigate();

  const [ingredient_id, setIngredient_id] = useState("");
  const [user_id, setUser_id] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  function sendData(e) {
    e.preventDefault();
    console.log("send data");
    console.log({ ingredient_id, user_id });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredient_id: Number(ingredient_id), 
        user_id: Number(user_id),
      }),
    };

    fetch(backendUrl + "/api/ingredient_users", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/ingredient_users");
      });
  }

  return (
    <div>
      <form className="w-50 mx-auto" onSubmit={sendData}>
        <div className="mb-3">
          <label className="form-label">Ingredient ID</label>
          <input
            value={ingredient_id}
            onChange={(e) => setIngredient_id(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">User ID</label>
          <input
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Crear
        </button>
      </form>
    </div>
  );
};

export default NewIngredientUser;
