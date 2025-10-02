import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


const Dashboard = () => {

    const { store, dispatch } = useGlobalReducer();

    return (

        <>
            {store.authChef && (

                <div class="container-fluid">
                    <div class="row flex-nowrap">
                        <div class="col-auto px-0">
                            <div id="sidebar" class="collapse collapse-horizontal show border-end">
                                <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">
                                    <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                        <i class="fa-solid fa-house p-2"></i>
                                        <span>Home</span>
                                    </a>
                                    <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                        <i class="fa-solid fa-book p-2"></i>
                                        <span>Recetas</span>
                                    </a>
                                    <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                        <i class="fa-solid fa-square-plus p-2"></i>
                                        <span>Nueva Receta</span>
                                    </a>
                                    <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                        <i class="fa-solid fa-question p-2"></i>
                                        <span>Preguntas</span>
                                    </a>

                                    <div className="dropdown bg-dark container text-center">
                                        <div class="row justify-content-around">


                                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
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
                                                    <a className="dropdown-item" href="#">
                                                        Profile
                                                    </a>
                                                </li>
                                                <li>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#">
                                                        Sign out
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <main class="col ps-md-2 pt-2">
                            <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none">
                                <i class="fa-solid fa-bars"></i>
                            </a>
                            <div class="page-header pt-3">
                                <h2>Bootstrap 5 Sidebar Menu - Simple</h2>
                            </div>
                            <p class="lead">A offcanvas "push" vertical nav menu example.</p>

                        </main>
                    </div>
                </div>

            )}

            {store.authUser && (

                <div class="container-fluid">
                    <div class="row flex-nowrap">
                        <div class="col-auto px-0">
                            <div id="sidebar" class="collapse collapse-horizontal show border-end">
                                <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">
                                    <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                        <i class="fa-solid fa-house p-2"></i>
                                        <span>Home</span>
                                    </a>
                                    <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                        <i class="fa-solid fa-book p-2"></i>
                                        <span>Buscar Recetas</span>
                                    </a>
                                    <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                        <i class="fa-solid fa-square-plus p-2"></i>
                                        <span>Add Ingrediente</span>
                                    </a>
                                    <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                        <i class="fa-solid fa-question p-2"></i>
                                        <span>Add Utensilio</span>
                                    </a>
                                    <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                        <i class="fa-solid fa-question p-2"></i>
                                        <span>Hacer pregunta</span>
                                    </a>
                                    <a href="#" class="list-group-item border-end-0 d-inline-block text-truncate list-group-item-action list-group-item-dark" data-bs-parent="#sidebar">
                                        <i class="fa-solid fa-question p-2"></i>
                                        <span>Recetas favoritas</span>
                                    </a>

                                    <div className="dropdown bg-dark container text-center">
                                        <div class="row justify-content-around">


                                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
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
                                                    <a className="dropdown-item" href="#">
                                                        Profile
                                                    </a>
                                                </li>
                                                <li>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#">
                                                        Sign out
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <main class="col ps-md-2 pt-2">
                            <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none">
                                <i class="fa-solid fa-bars"></i>
                            </a>
                            <div class="page-header pt-3">
                                <h2>Bootstrap 5 Sidebar Menu - Simple</h2>
                            </div>
                            <p class="lead">A offcanvas "push" vertical nav menu example.</p>

                        </main>
                    </div>
                </div>

            )}

        </>
    )
}

export default Dashboard