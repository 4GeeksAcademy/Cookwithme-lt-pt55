import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  function logout() {
    if (store.authChef) {
      localStorage.removeItem("tokenChef");
      dispatch({ type: "set_auth_chef", payload: false });
      navigate("/");
    }
    if (store.authUser) {
      localStorage.removeItem("tokenUser");
      dispatch({ type: "set_auth_user", payload: false });
      navigate("/");
    }
    if (store.authAdmin) {
      localStorage.removeItem("tokenAdmin");
      dispatch({ type: "set_auth_admin", payload: false });
      navigate("/");
    }
  }

  const userFavs = store.authUser ? store.usersFavs[store.authUser.id] || [] : [];

  return (
    <div className="navbar-container">
      {/* Top Info Bar */}
      <div className="row gx-0 top-bar">
        <div className="col-6 text-start">
          <div className="info-item">
            <i className="fa fa-envelope text-primary me-2"></i>
            <span>info@example.com</span>
          </div>
        </div>
        <div className="col-6 text-end">
          <div className="info-item">
            <i className="fa fa-phone-alt text-primary me-2"></i>
            <span>+012 345 6789</span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="row gx-0">
        <div className="col-lg-3 d-lg-block" style={{backgroundColor:"#FB5B21"}}>
          <Link to="/" className="navbar-brand d-flex align-items-center justify-content-center">
            <h1 className="text-white m-0 display-4">CookWithMe</h1>
          </Link>
        </div>

        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg navbar-dark navbar-main">
            <Link to="/" className="navbar-brand d-block d-lg-none">
              <h1 className="text-primary m-0 display-4">CookWithMe</h1>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
              <div className="navbar-nav">

                {/* Rol Admin */}
                {store.authAdmin && (
                  <>
                    <Link to="/adminuser" className="nav-item nav-link">Admins</Link>
                    <Link to="/chefs" className="nav-item nav-link">Chefs</Link>
                    <Link to="/recipes" className="nav-item nav-link">Recipes</Link>
                    <Link to="/ingredientes" className="nav-item nav-link">Ingredientes</Link>
                    <Link to="/utensilios" className="nav-item nav-link">Utensilios</Link>
                    <Link to="/califications" className="nav-item nav-link">Califications</Link>
                  </>
                )}

                {/* Rol Chef */}
                {store.authChef && (
                  <>
                    <Link to="/chef_home" className="nav-item nav-link">Home Chef</Link>
                    <Link to="/chef_profile" className="nav-item nav-link">Perfil Chef</Link>
                    <Link to="/utensilio_receta" className="nav-item nav-link">Agregar Utensilio a Receta</Link>
                    <Link to="/add_recipe_ingredient" className="nav-item nav-link">Agregar Ingrediente</Link>
                  </>
                )}

                {/* Rol User */}
                {store.authUser && (
                  <>
                    <Link to="/home_user_avail_recipe" className="nav-item nav-link">Recetas Disponibles</Link>
                    <Link to="/fav_recipe_user" className="nav-item nav-link">
                      Favoritos {userFavs.length > 0 && <span className="badge bg-secondary">{userFavs.length}</span>}
                    </Link>
                    <Link to="/user_inventory" className="nav-item nav-link">Mi Inventario</Link>
                    <Link to="/select_ingr&utensil" className="nav-item nav-link">Buscar por Componentes</Link>
                    <Link to="/user_profile" className="nav-item nav-link">Perfil User</Link>
                    <Link to="/utensil_user" className="nav-item nav-link">User's Utensils</Link>
                  </>
                )}

                {/* Logout para todos */}
                {(store.authChef || store.authUser || store.authAdmin) && (
                  <span className="nav-item nav-link text-danger" onClick={logout}>Logout</span>
                )}
              </div>
              <Link to="/about_us" className="nav-item nav-link">About us</Link>
              {/* Social Icons */}
              <div className="d-none d-lg-flex align-items-center social-icons">
                <a className="btn btn-outline-secondary btn-square rounded-circle ms-2" href="">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-outline-secondary btn-square rounded-circle ms-2" href="">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="btn btn-outline-secondary btn-square rounded-circle ms-2" href="">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
                
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
