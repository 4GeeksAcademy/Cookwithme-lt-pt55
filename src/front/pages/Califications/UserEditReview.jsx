import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const UserEditCalification = () => {
  const { review_id } = useParams();
  const navigate = useNavigate();

  const [stars, setStars] = useState('')
  const [recipeId, setrecipeId] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
    fetch(backendUrl + "/api/calification/" + review_id)
        .then(response => response.json())
        .then((data) => {
        setStars(data.stars);
        setuserId(data.user.email);
        setrecipeId(data.recipe.name);
        });
    }, [review_id]);

  
  function updateReview(e) {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({stars, recipeId }),
    };

    fetch(backendUrl + "/api/calification/" + review_id, requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log("review actualizado:", data);
        navigate("/califications");
      })
  }

  return (
    <div className="container">
      <h1 className="display-4">Editar</h1>
      <form className="w-50 mx-auto" onSubmit={updateReview}>
        <div className="mb-3">
          <label className="form-label">Recipe</label>
          <input
            value={recipeId}
            onChange={(e) => setrecipeId(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Calification</label>
          <input
            value={stars}
            onChange={(e) => setStars(e.target.value)}
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
export default UserEditCalification
