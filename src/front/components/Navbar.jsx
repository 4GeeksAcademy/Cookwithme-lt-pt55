import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import Sidebar from "./Sidebar.jsx";
import  Gemini_Generated_Image_neuv33neuv33neuv2r3   from "../assets/img/Gemini_Generated_Image_neuv33neuv33neuv2r3.png";

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
      <div className="row gx-0 ">
        <div className="col-lg-3 d-lg-block" style={{ backgroundColor: "#FB5B21" }}>
          <Link to="/" className="navbar-brand d-flex align-items-center justify-content-center">
            <img src={Gemini_Generated_Image_neuv33neuv33neuv2r3} alt="logo cook with me" height="110" />
          </Link>
        </div>

        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg navbar-dark navbar-main d-flex text-center ">
            <Link to="/" className="navbar-brand d-block d-lg-none">
              <h1 className="text-primary m-0 display-4">CookWithMe</h1>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse d-flex justify-content-around align-items-center" id="navbarCollapse">
              <div className="navbar-nav">
              <Link to="/about_us" className="nav-item nav-link text-light">About us</Link>
                {/* Rol Admin */}
                {store.authAdmin && (
                  <>
                    <Link to="/home_admin" className="nav-item nav-link text-light ">Home</Link>
                    <Link to="/adminuser" className="nav-item nav-link text-light">Admins</Link>
                    <Link to="/chefs" className="nav-item nav-link text-light">Chefs</Link>
                    <Link to="/recipes" className="nav-item nav-link text-light">Recipes</Link>
                    <Link to="/ingredientes" className="nav-item nav-link text-light">Ingredientes</Link>
                    <Link to="/utensilios" className="nav-item nav-link text-light">Utensilios</Link>
                    <Link to="/califications" className="nav-item nav-link text-light">Califications</Link>
                  </>
                )}

                {/* Rol Chef */}
                {store.authChef && (
                  <>
                    <Link to="/chef_home" className="nav-item nav-link text-light">Home Chef</Link>
                    <Link to="/chef_profile" className="nav-item nav-link text-light btn">Perfil Chef</Link>
                  </>
                )}

                {/* Rol User */}
                {store.authUser && (
                  <>
                    <Link to="/home_user_avail_recipe" className="nav-item nav-link text-light mx-3">
                      Recetas<br /> Disponibles
                    </Link>
                    <Link to="/home_user" className="nav-item nav-link text-light">Todas las recetas</Link>
                    <Link to="/fav_recipe_user" className="nav-item nav-link text-light">
                      Favoritos{" "}
                      {userFavs.length > 0 && (
                        <span className="badge bg-secondary">{userFavs.length}</span>
                      )}
                    </Link>
                    <Link to="/user_inventory" className="nav-item nav-link text-light">Inventario</Link>
                    <Link to="/user_profile" className="nav-item nav-link text-light">Mi perfil</Link>
                  </>
                )}

                

                {/* Botón Sidebar + Logout si hay sesión */}
                {(store.authChef || store.authUser || store.authAdmin) && (
                  <div className="d-flex align-items-center">

                     {/* Botón Logout */}
                    <button className="btn btn-outline-light ms-2" onClick={logout}>
                      Logout
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" className="bi bi-door-open-fill mx-2" viewBox="0 0 16 16">
                        <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5
                          A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0
                          0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11
                          2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5
                          8c-.276 0-.5-.448-.5-1s.224-1 .5-1
                          .5.448.5 1-.224 1-.5 1"/>
                      </svg>
                    </button>

                    {/* Botón Sidebar */}
                    <button
                      className="btn btn btn-outline-light ms-3"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasScrolling"
                      aria-controls="offcanvasScrolling"
                    >
                      <i className="fa-solid fa-bars"></i>
                    </button>

                   
                  </div>
                )}
              </div>

              

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

      {/* Offcanvas Sidebar */}
      {(store.authChef || store.authUser || store.authAdmin) && (
        <div
          className="offcanvas offcanvas-start bg-dark text-white"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex="-1"
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel"
        >
          <Sidebar />
        </div>
      )}
    </div>
  );
};
