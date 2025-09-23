import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  // Función de logout genérica
  function logout() {
    if (store.authChef) {
      localStorage.removeItem("tokenChef");
      dispatch({ type: "set_auth_chef", payload: false });
      navigate("/login_chef");
    } else if (store.authUser) {
      localStorage.removeItem("tokenUser");
      dispatch({ type: "set_auth_user", payload: null });
      navigate("/login_user");
    } else if (store.authAdmin) {
      localStorage.removeItem("tokenAdmin");
      dispatch({ type: "set_auth_admin", payload: false });
      navigate("/login_admin");
    }
  }

  // Favoritos del usuario logueado
  const userFavs = store.authUser
    ? store.usersFavs[store.authUser.id] || []
    : [];

  if (store.authChef || store.authUser || store.authAdmin) {
    return (
      <nav className="navbar navbar-light bg-light">
        <div className="container d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center w-100">
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
            <Link to="/available_recipes">
            <button className="btn btn-primary">Recetas disponible</button>
          </Link>  
          </div>

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
        </div>
      </nav>
    );
  }


  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>

        <div className="ml-auto">
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
          <Link to="/adminuser">
            <button className="btn btn-primary">Admins</button>
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
		<div className="dropdown">
			<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			 Fav Recipes <span className="badge text-bg-secondary"> {store.favItems.length} </span>
			</button>
			<ul className="dropdown-menu">
					{store.favItems.map((favorite, index) =><li key={index} className="dropdown-item">
									{favorite} <span > <button type="button" onClick={() => dispatch({
										type: 'toggle_favitem',
										payload: favorite
									})} class="btn"> X </button> </span>
								</li>)}

						</ul>
		</div>
		  <Link to="/utensil_user">
			<button className="btn btn-danger">utensilio usuario</button>
		</Link>
		<Link to="/ingredient_users">
			<button className="btn btn-primary">Ingredient Users</button>
		</Link>
		<Link to="/users">
			<button className="btn btn-danger">Agregar usuario</button>
		</Link>
			
        </div>
      </div>
    </nav>
  );
};
