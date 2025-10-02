import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

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
      <div className="container d-flex  flex-column">
        <div className="d-flex justify-content-between align-items-center flex-wrap w-100">
          {(store.authChef || store.authUser || store.authAdmin) && (
            <>
              <Sidebar />
              <button className="btn btn-danger" onClick={logout}>
                Logout
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open-fill mx-2" viewBox="0 0 16 16">
                  <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11
              2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/>
                </svg>
              </button>
            </>
          )}

          {/* Botones según rol */}
          {store.authUser && (
            <>

              <Link to="/home_user_avail_recipe">
                <button className="btn btn-primary">
                  🧑‍🍳 Recetas disponibles
                </button>
              </Link>

              <Link to="/fav_recipe_user">
                <button className="btn btn-primary">
                  ⭐ Ver recetas favoritas <span className="badge text-bg-secondary">{userFavs.length}</span>
                </button>
              </Link>

              <Link to="/user_inventory">
                <button className="btn btn-primary">
                  Ingresar mi inventario 🥦🍴
                </button>
              </Link>

              <Link to="/select_ingr&utensil">
                <button className="btn btn-primary m-2">
                  Buscar recetas por componentes
                </button>
              </Link>

              <Link to="/home_user_avail_recipe">
                <button className="btn btn-primary">
                  home recetas disponible
                </button>
              </Link>
            </>
          )}

          {store.authChef && (
            <Link to="/chef_profile">
              <button className="btn btn-success m-2">Perfil Chef
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-square mx-2" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6
                4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                </svg>
              </button>
            </Link>
          )}

          {store.authUser && (
            <Link to="/user_profile">
              <button className="btn btn-success m-2">Perfil User
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-square mx-2" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6
                4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                </svg>
              </button>
            </Link>
          )}

          {store.authAdmin && (
            <Link to="/adminuser">
              <button className="btn btn-primary m-2">Admins</button>
            </Link>
          )}


          {/* Dropdown de favoritos SOLO para USER */}
          {store.authUser && userFavs.length > 0 && (
            <div className="mt-2 dropdown">
              <button
                className="btn btn-primary m-2 dropdown-toggle"
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

          {/* Botones Home */}
          {(store.authChef) && (
            <Link to="/chef_home">
              <button className="btn btn-primary m-2">HOME</button>
            </Link>)}
          {(store.authAdmin) && (
            <Link to="/home_admin">
              <button className="btn btn-primary m-2">HOME</button>
            </Link>)}
          {(store.authUser) && (
            <Link to="/home_user">
              <button className="btn btn-primary m-2">HOME</button>
            </Link>)}

          {/* <Link to="/demo">
            <button className="btn btn-primary m-2">Check the Context</button>
          </Link>  */}
          {store.authAdmin && (
            <Link to="/chefs">
              <button className="btn btn-primary m-2">Chefs</button>
            </Link>)}
          {store.authAdmin && (
            <Link to="/recipes">
              <button className="btn btn-primary m-2">Recipes</button>
            </Link>)}
          {store.authAdmin && (
            <Link to="/ingredientes">
              <button className="btn btn-primary m-2">Ingredientes</button>
            </Link>)}
          {store.authAdmin && (
            <Link to="/utensilios">
              <button className="btn btn-danger  m-2">Utensilios</button>
            </Link>)}
          {(store.authChef || store.authUser || store.authAdmin) && (
            <Link to="/questions">
              <button className="btn btn-primary m-2">Questions</button>
            </Link>)}
          {(store.authUser || store.authChef || store.authAdmin) && (
            <Link to="/answers">
              <button className="btn btn-primary m-2">Answers</button>
            </Link>)}
          {(store.authUser || store.authAdmin) && (
            <Link to="/utensil_user">
              <button className="btn btn-primary m-2">User's Utensils</button>
            </Link>)}
          {(store.authAdmin) && (
            <Link to="/califications">
              <button className="btn btn-primary m-2">Califications</button>
            </Link>)}
          {(store.authChef || store.authAdmin) && (
            <Link to="/utensilio_receta">
              <button className="btn btn-danger">Agregar utensilio a receta</button>
            </Link>)}
          {(store.authUser || store.authAdmin) && (
            <Link to="/ingredient_users">
              <button className="btn btn-primary m-2">Ingredient Users</button>
            </Link>)}
          {(store.authAdmin) && (
            <Link to="/users">
              <button className="btn btn-danger  m-2">Agregar usuario</button>
            </Link>)}
          {(store.authChef || store.authAdmin) && (
            <Link to="/add_recipe_ingredient">
              <button className="btn btn-danger  m-2">Agregar ingrediente a receta</button>
            </Link>)}

        </div>
      </div>
    </nav>
  );
};
