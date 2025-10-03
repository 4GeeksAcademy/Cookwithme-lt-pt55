import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const SidebarEx = () => {
    const { store, dispatch } = useGlobalReducer();

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
    return (
        <>
            {store.authChef && (
                <div>
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close bg-warning" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">
                        <Link to="/chef_home">
                            <button class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                <i class="fa-solid fa-house p-2"></i>
                                <span>Home</span>
                            </button>
                        </Link>
                        <Link to="/chef_home">
                            <button class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                <i class="fa-solid fa-book p-2"></i>
                                <span>Recetas</span>
                            </button>
                        </Link>


                        <Link to="/new_chef_recipe">
                            <button class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                <i class="fa-solid fa-square-plus p-2"></i>
                                <span>Nueva Receta</span>
                            </button>
                        </Link>
                        <Link to="/chef_home">
                            <button class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                <i class="fa-solid fa-question p-2"></i>
                                <span>Preguntas</span>
                            </button>
                        </Link>
                        <div className="dropdown bg-dark container text-center">
                            <div class="row justify-content-around">
                                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="col-4">
                                        <i class="fa-solid fa-user"></i>
                                    </div>
                                    <div className="col-4">
                                        <strong>User Name</strong>
                                    </div>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <Link to="/chef_profile">
                                            <button class="dropdown-item border-end-0 d-inline-block text-truncate list-group-item-dark" data-bs-parent="#sidebar">
                                                <span>Profile</span>
                                            </button>
                                        </Link>
                                    </li>
                                    <li>
                                    </li>
                                    <li>
                                        <Link to="/login_chef">
                                            <button class="dropdown-item border-end-0 d-inline-block text-truncate list-group-item-dark" data-bs-parent="#sidebar" onClick={logout}>
                                                <span>Sing out</span>
                                            </button>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {store.authUser && (
                <div>
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close bg-warning" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">
                        <Link to="/home_user">
                            <button class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                <i class="fa-solid fa-house p-2"></i>
                                <span>Home</span>
                            </button>
                        </Link>
                        <Link to="/home_user">
                            <button class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                <i class="fa-solid fa-book p-2"></i>
                                <span>Buscar Recetas</span>
                            </button>
                        </Link>


                        <Link to="/add_ingredient_user">
                            <button class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                <i class="fa-solid fa-bowl-food p-2"></i>
                                <span>Agregar Ingrediente</span>
                            </button>
                        </Link>
                        <Link to="/add_utensil_to_user">
                            <button class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                <i class="fa-solid fa-utensils p-2"></i>
                                <span>Agregar Utensilio</span>
                            </button>
                        </Link>
                        <Link to="/fav_recipe_user">
                            <button class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                <i class="fa-solid fa-heart p-2"></i>
                                <span>Recetas Favoritas</span>
                            </button>
                        </Link>
                        <div className="dropdown bg-dark container text-center">
                            <div class="row justify-content-around">
                                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="col-4">
                                        <i class="fa-solid fa-user"></i>
                                    </div>
                                    <div className="col-4">
                                        <strong>User Name</strong>
                                    </div>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <Link to="/user_profile">
                                            <button class="dropdown-item border-end-0 d-inline-block text-truncate list-group-item-dark" data-bs-parent="#sidebar">
                                                <span>Profile</span>
                                            </button>
                                        </Link>
                                    </li>
                                    <li>
                                    </li>
                                    <li>
                                        <Link to="/login_user">
                                            <button class="dropdown-item border-end-0 d-inline-block text-truncate list-group-item-dark" data-bs-parent="#sidebar" onClick={logout}>
                                                <span>Sing out</span>
                                            </button>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {store.authAdmin && (
                <div>
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close bg-warning" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">
                        <Link to="/users">
                            <button class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                <i class="fa-solid fa-house p-2"></i>
                                <span>Usuarios</span>
                            </button>
                        </Link>
                        <Link to="/adminuser">
                            <button class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                <i class="fa-solid fa-user-tie p-2"></i>
                                <span>Admins</span>
                            </button>
                        </Link>


                        <Link to="/chefs">
                            <button class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                <i class="fa-solid fa-kitchen-set p-2"></i>
                                <span>Chefs</span>
                            </button>
                        </Link>

                        <Link to="/utensilios">
                            <button class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                <i class="fa-solid fa-utensils p-2"></i>
                                <span>Utensilios</span>
                            </button>
                        </Link>
                        <Link to="/ingredientes">
                            <button class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                <i class="fa-solid fa-bowl-food p-2"></i>
                                <span>Ingredientes</span>
                            </button>
                        </Link>
                        <div className="dropdown bg-dark container text-center">
                            <div class="row justify-content-around">
                                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="col-4">
                                        <i class="fa-solid fa-user"></i>
                                    </div>
                                    <div className="col-4">
                                        <strong>User Name</strong>
                                    </div>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <Link to="/adminuser">
                                            <button class="dropdown-item border-end-0 d-inline-block text-truncate list-group-item-dark" data-bs-parent="#sidebar">
                                                <span>Profile</span>
                                            </button>
                                        </Link>
                                    </li>
                                    <li>
                                    </li>
                                    <li>
                                        <Link to="/login_admin">
                                            <button class="dropdown-item border-end-0 d-inline-block text-truncate list-group-item-dark" data-bs-parent="#sidebar" onClick={logout}>
                                                <span>Sing out</span>
                                            </button>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}
export default SidebarEx