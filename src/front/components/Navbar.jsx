import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useParams, useNavigate } from "react-router-dom";

export const Navbar = () => {

	const navigate = useNavigate();

	const { store, dispatch } = useGlobalReducer()

	function logout() {
		// limpiar token 
		localStorage.removeItem("tokenChef")
		// pasar auth a false
		dispatch({ type: "set_auth_chef", payload: false })
		// redireccioar a login
		navigate("/login_chef")

	}

	return (
		<nav className="navbar navbar-light bg-light">
			{store.authChef ? <button className="btn btn-danger" onClick={logout}>Logout</button>
				:
				<>
					<div className="container">
						<Link to="/">
							<span className="navbar-brand mb-0 h1">React Boilerplate</span>
						</Link>
						<div className="ml-auto">
							<Link to="/demo">
								<button className="btn btn-primary">Check the Context in action</button>
							</Link>
						</div>


						<div className="ml-auto">
							<Link to="/chefs">
								<button className="btn btn-primary">Chefs</button>
							</Link>
						</div>
						<div className="ml-auto">
							<Link to="/recipes">
								<button className="btn btn-primary">Recipes</button>
							</Link>
						</div>
						<div className="ml-auto">
							<Link to="/ingredientes">
								<button className="btn btn-primary">Ingredientes</button>
							</Link>
						</div>
						<div className="ml-auto">
							<Link to="/utensilios">
								<button className="btn btn-danger">Utensilios</button>
							</Link>
						</div>
						<div className="ml-auto">
							<Link to="/adminuser">
								<button className="btn btn-primary">Admins</button>
							</Link>
						</div>
						<div className="ml-auto">
							<Link to="/questions">
								<button className="btn btn-primary">Questions</button>
							</Link>
						</div>
						<div className="ml-auto">
							<Link to="/answers">
								<button className="btn btn-primary">Answer</button>
							</Link>
						</div>
						<div className="ml-auto">
							<Link to="/califications">
								<button className="btn btn-primary">Califications</button>
							</Link>
							<Link to="/utensilio_receta">
								<button className="btn btn-danger">Agregar utensilio a receta</button>
							</Link>
						</div>
					</div>

					<div className="dropdown">
						<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Fav Recipes <span className="badge text-bg-secondary"> {store.favItems.length} </span>
						</button>
						<ul className="dropdown-menu">
							{store.favItems.map((favorite, index) =>
								<li key={index} className="dropdown-item">
									{favorite} <span > <button type="button" onClick={() => dispatch({
										type: 'toggle_favitem',
										payload: favorite
									})} class="btn"> X </button> </span>
								</li>)}

						</ul>
					</div>
					<div className="ml-auto">
						<Link to="/utensil_user">
							<button className="btn btn-danger">utensilio usuario</button>
						</Link>
					</div>
					<div className="ml-auto">
						<Link to="/ingredient_users">
							<button className="btn btn-primary">Ingredient Users</button>
						</Link>
					</div>
					<div className="ml-auto">
						<Link to="/users">
							<button className="btn btn-danger">Agregar usuario</button>
						</Link>
					</div>
				</>
			}
		</nav >
	);
};