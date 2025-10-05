import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";

const CustomSidebarButton = ({ to, iconClass, text, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const DEFAULT_COLOR = '#8391a2';
    const HOVER_COLOR = '#bccee4';
    const currentColor = isHovered ? HOVER_COLOR : DEFAULT_COLOR;

    const baseClasses =
        "flex items-center w-full p-3 rounded-lg text-left bg-transparent " +
        "transition duration-200 ease-in-out cursor-pointer focus:outline-none " +
        // Use Bootstrap classes as provided in original code (btn, btn-outline, etc.)
        "btn btn-outline border border-0 object-fit-fill";

    return (
        <Link to={to}>
            <button
                type="button"
                className={baseClasses}
                // Mouse handlers are now specific to THIS button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onClick}
                data-bs-parent="#sidebar"
            >
                <i className={`${iconClass} p-2`} style={{ color: currentColor }}></i>
                <span style={{ color: currentColor }}>{text}</span>
            </button>
        </Link>
    );
};

const Sidebar = () => {
    const { store, dispatch } = useGlobalReducer();
    const [chef, setChef] = useState([])
    const [user, setUser] = useState([])
    const [adminInfo, setadminInfo] = useState({});
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { chef_id } = useParams()
    const { user_id } = useParams()
    const { admin_id } = useParams()

    function getChefInfo() {
        const token = localStorage.getItem("tokenChef")
        fetch(backendUrl + `/api/chef_info`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setChef(data)
            }
            )
    }

    function getUserInfo() {
        const token = localStorage.getItem("tokenUser")
        fetch(backendUrl + `/api/user_info`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUser(data)
            }
            )
    }

    function getadminInfo() {
        const token = localStorage.getItem("tokenAdmin")
        fetch(backendUrl + "/api/adminuser/" + admin_id, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setadminInfo(data)
            })
    }

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

    useEffect(() => {
        if (store.authChef) {
            getChefInfo();
        }
        if (store.authUser) {
            getUserInfo();
        }
        if (store.authAdmin && admin_id) {
            getadminInfo();
        }
    }, [backendUrl, store.authChef, store.authUser, admin_id]);
    return (
        <>
            {store.authChef && (
                <div className="container" style={{ backgroundColor: '#313a46' }}>
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close bg-warning" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">
                        <CustomSidebarButton
                            to="/chef_home"
                            iconClass="fa-solid fa-house"
                            text="Home"
                        />

                        <CustomSidebarButton
                            to="/chef_home"
                            iconClass="fa-solid fa-book"
                            text="Recetas"
                        />

                        <CustomSidebarButton
                            to="/new_chef_recipe"
                            iconClass="fa-solid fa-square-plus"
                            text="Nueva Receta"
                        />

                        <CustomSidebarButton
                            to="/About_us"
                            iconClass="fa-solid fa-question"
                            text="About us"
                        />
                        <hr style={{ "margin-top": "55vh" }}></hr>
                        <div className="position-relative">
                            <div className="dropdown container text-center">
                                <div class="row justify-content-start">
                                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
                                        <div className="col-2">
                                            <span><img src={chef.image_url} alt="" class="rounded-circle" style={{ "width": "32px", "height": "32px" }} /></span>
                                        </div>

                                        <span>{chef.name}</span>

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
                </div>
            )}
            {store.authUser && (
                <div className="container" style={{ backgroundColor: '#313a46' }}>
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close bg-warning" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">
                        <CustomSidebarButton
                            to="/home_user"
                            iconClass="fa-solid fa-house"
                            text="Home"
                        />

                        <CustomSidebarButton
                            to="/home_user_avail_recipe"
                            iconClass="fa-solid fa-book"
                            text="Recetas Disponibles"
                        />

                        <CustomSidebarButton
                            to="/user_inventory"
                            iconClass="fa-solid fa-bowl-food"
                            text="Inventario"
                        />

                        <CustomSidebarButton
                            to="/fav_recipe_user"
                            iconClass="fa-solid fa-heart"
                            text="Recetas Favoritas"
                        />
                        <hr style={{ "margin-top": "55vh" }}></hr>
                        <div className="position-relative">

                            <div className="dropdown container text-center">
                                <div class="row justify-content-start">
                                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
                                        <div className="col-2">
                                            <img src={user.image_url} alt="" class="rounded-circle" style={{ "width": "32px", "height": "32px" }} />
                                        </div>

                                        <span>{user.name}</span>

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
                </div>
            )}
            {store.authAdmin && (
                <div className="container" style={{ backgroundColor: '#313a46' }}>
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close bg-warning" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">
                        <CustomSidebarButton
                            to="/users"
                            iconClass="fa-solid fa-house"
                            text="Usuarios"
                        />

                        <CustomSidebarButton
                            to="/adminuser"
                            iconClass="fa-solid fa-user-tie"
                            text="Admins"
                        />

                        <CustomSidebarButton
                            to="/chefs"
                            iconClass="fa-solid fa-kitchen-set"
                            text="Chefs"
                        />

                        <CustomSidebarButton
                            to="/utensilios"
                            iconClass="fa-solid fa-utensils"
                            text="Utensilios"
                        />

                        <CustomSidebarButton
                            to="/ingredientes"
                            iconClass="fa-solid fa-bowl-food"
                            text="Ingredientes"
                        />

                        <hr style={{ "margin-top": "55vh" }}></hr>
                        <div className="position-relative">
                            <div className="dropdown container text-center">
                                <div class="row justify-content-start">
                                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
                                        <div className="col-2">
                                            <i class="fa-solid fa-user"></i>
                                        </div>
                                        
                                            <span>{adminInfo.name || "Admin"}</span>
                                        
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
                </div>
            )}
        </>

    )
}
export default Sidebar