import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  // Logout unificado
  function logout() {
    if (store.authChef) {
      localStorage.removeItem("tokenChef");
      dispatch({ type: "set_auth_chef", payload: false });
      navigate("/"); // o /login_chef si quieres
    }
    if (store.authUser) {
      localStorage.removeItem("tokenUser");
      dispatch({ type: "set_auth_user", payload: false });
      navigate("/"); // o /login_user
    }
    if (store.authAdmin) {
      localStorage.removeItem("tokenAdmin");
      dispatch({ type: "set_auth_admin", payload: false });
      navigate("/"); // o /login_admin
    }
  }

  const userFavs = store.authUser ? store.usersFavs[store.authUser.id] || [] : [];

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center w-100">
          {(store.authChef || store.authUser || store.authAdmin) && (
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          )}

          {/* Botones según rol */}
          {store.authUser && (
            <Link to="/select_ingr&utensil">
              <button className="btn btn-primary">
                Buscar recetas por componentes
              </button>
            </Link>
          )}

          {store.authChef && (
            <Link to="/chef_profile">
              <button className="btn btn-primary">Perfil Chef</button>
            </Link>
          )}

          {store.authAdmin && (
            <Link to="/adminuser">
              <button className="btn btn-primary">Admins</button>
            </Link>
          )}
        </div>

        {/* Dropdown de favoritos SOLO para USER */}
        {store.authUser && userFavs.length > 0 && (
          <div className="mt-2 dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Mis Favoritos <span className="badge text-bg-secondary">{userFavs.length}</span>
            </button>
            <ul className="dropdown-menu">
              {userFavs.map((fav, index) => (
                <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                  {fav}
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => dispatch({ type: "toggle_fav_user", payload: fav })}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Otros botones (combina lógica de develop y tu rama) */}
        <div className="ml-auto mt-3">
          <Link to="/demo">
            <button className="btn btn-primary">Check the Context</button>
          </Link>
          <Link to="/chefs">
            <button className="btn btn-primary">Chefs</button>
          </Link>
          <Link to="/recipes">
            <button className="btn btn-primary">Recipes</button>
          </Link>
          <Link to="/ingredientes">
            <button className="btn btn-primary">Ingredientes</button>
          </Link>
          <Link to="/utensilios">
            <button className="btn btn-danger">Utensilios</button>
          </Link>
          <Link to="/questions">
            <button className="btn btn-primary">Questions</button>
          </Link>
          <Link to="/answers">
            <button className="btn btn-primary">Answers</button>
          </Link>
          <Link to="/califications">
            <button className="btn btn-primary">Califications</button>
          </Link>
          <Link to="/utensilio_receta">
            <button className="btn btn-danger">Agregar utensilio a receta</button>
          </Link>
          <Link to="/ingredient_users">
            <button className="btn btn-primary">Ingredient Users</button>
          </Link>
          <Link to="/users">
            <button className="btn btn-danger">Agregar usuario</button>
          </Link>
          <Link to="/add_recipe_ingredient">
            <button className="btn btn-danger">Agregar ingrediente a receta</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
