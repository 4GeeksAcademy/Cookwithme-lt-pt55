import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const EditAnswer = () => {
  const { answer_id } = useParams();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [question_id, setQuestion_id] = useState("");
  const [chef_id, setChef_id] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(backendUrl + "/api/answers/" + answer_id)
      .then((response) => response.json())
      .then((data) => {
        setText(data.text);
        setQuestion_id(data.question_id);
        setChef_id(data.chef_id);
      });
  }, [answer_id, backendUrl]);

  function updateData(e) {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        question_id: Number(question_id),
        chef_id: Number(chef_id),
      }),
    };

    fetch(backendUrl + "/api/answers/" + answer_id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Answer actualizado:", data);
        navigate("/answers");
      });
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

        <div className="mb-3">
          <label className="form-label">Question ID</label>
          <input
            value={question_id}
            onChange={(e) => setQuestion_id(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Chef ID</label>
          <input
            value={chef_id}
            onChange={(e) => setChef_id(e.target.value)}
            type="number"
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
