import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewQuestion = () => {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [recipe_id, setRecipe_id] = useState("");
  const [user_id, setUser_id] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  function sendData(e) {
    e.preventDefault();
    console.log("send data");
    console.log({ text, recipe_id, user_id });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
        recipe_id: Number(recipe_id), // lo mandamos como int
        user_id: Number(user_id),
      }),
    };

    fetch(backendUrl + "/api/questions/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/questions");
      });
  }

  return (
    <div>
      <form className="w-50 mx-auto" onSubmit={sendData}>
        <div className="mb-3">
          <label className="form-label">Text</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Recipe ID</label>
          <input
            value={recipe_id}
            onChange={(e) => setRecipe_id(e.target.value)}
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

export default NewQuestion;
