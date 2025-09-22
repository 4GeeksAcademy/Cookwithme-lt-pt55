import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const SingleUtensilRecipe = () => {
  const { utensilioreceta_id } = useParams(); // coincide con la ruta en router
  const [relation, setRelation] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${backendUrl}/api/utensil_recipe/${utensilioreceta_id}`)
      .then((res) => res.json())
      .then((data) => setRelation(data))
      .catch((err) => console.error(err));
  }, [utensilioreceta_id]);

  const deleteRelation = () => {
    fetch(`${backendUrl}/api/utensil_recipe/${utensilioreceta_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Relación eliminada");
        navigate("/utensilio_receta"); // regresar a la lista
      })
      .catch((err) => console.error(err));
  };

  if (!relation) return <h2>Cargando...</h2>;

  return (
    <div className="container text-center">
      <h1 className="display-4">Relación ID: {relation.id}</h1>
      <h2 className="display-6">Utensilio ID: {relation.utensil_id}</h2>
      {relation.utensil_name && <h3>Utensilio: {relation.utensil_name}</h3>}
      <h2 className="display-6">Receta ID: {relation.recipe_id}</h2>
      {relation.recipe_name && <h3>Receta: {relation.recipe_name}</h3>}

      <hr className="my-4" />

      <div className="d-flex justify-content-center gap-2">
        <Link to="/utensilio_receta">
          <button className="btn btn-secondary">Volver a la lista</button>
        </Link>

        <Link to={`/utensilioreceta/${relation.id}/edit`}>
          <button className="btn btn-info">Editar</button>
        </Link>

        <button className="btn btn-danger" onClick={deleteRelation}>
          Eliminar
        </button>
      </div>
    </div>
  );
};
