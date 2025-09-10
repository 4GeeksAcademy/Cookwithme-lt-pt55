import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const EditAnswer = () => {
  const { answer_id } = useParams();
  const navigate = useNavigate();

  const [text, setText] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(backendUrl + "/api/answers/" + answer_id)
      .then(response => response.json())
      .then((data) => {
        setText(data.text);
      });
  }, [answer_id]);

  function updateData(e) {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    };

    fetch(backendUrl + '/api/answers/' + answer_id, requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log("Answer actualizado:", data);
        navigate("/answers");
      })
  }

  return (
    <div className="container">
      <h1 className="display-4">Editar Answer</h1>
      <form className="w-50 mx-auto" onSubmit={updateData}>
        <div className="mb-3">
          <label className="form-label">Text</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};
