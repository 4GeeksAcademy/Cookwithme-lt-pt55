import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewAnswer = () => {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [question_id, setQuestion_id] = useState("");
  const [chef_id, setChef_id] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  function sendData(e) {
    e.preventDefault();
    console.log("send data");
    console.log({ text, question_id, chef_id });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
        question_id: Number(question_id), 
        chef_id: Number(chef_id),
      }),
    };

    fetch(backendUrl + "/api/answers/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/answers");
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
          Crear
        </button>
      </form>
    </div>
  );
};

export default NewAnswer;
