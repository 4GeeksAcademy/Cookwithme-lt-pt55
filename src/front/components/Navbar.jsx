import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useParams, useNavigate } from "react-router-dom";

export const Navbar = () => {

	const navigate = useNavigate();

	const { store, dispatch } = useGlobalReducer()

	function logoutChef() {
		// limpiar token 
		localStorage.removeItem("tokenChef")
		// pasar auth a false
		dispatch({ type: "set_auth_chef", payload: false })
		// redireccioar a login
		navigate("/")

	}

	function logoutUser() {
		// limpiar token 
		localStorage.removeItem("tokenUser")
		// pasar auth a false
		dispatch({ type: "set_auth_user", payload: false })
		// redireccioar a login
		navigate("/")

	}

	function logoutAdmin() {
		// limpiar token 
		localStorage.removeItem("tokenAdmin")
		// pasar auth a false
		dispatch({ type: "set_auth_admin", payload: false })
		// redireccioar a login
		navigate("/")

	}

	return (
		<>
			
			
		 
			
			<nav className="navbar navbar-light bg-light">
					<div className="container">

						{store.authChef ? <button className="btn btn-danger" onClick={logoutChef}>Logout</button>: null}
						{store.authUser ? <button className="btn btn-danger" onClick={logoutUser}>Logout</button>: null}
						{store.authAdmin ? <button className="btn btn-danger" onClick={logoutAdmin}>Logout</button>: null}
						
			{store.authAdmin ?
						 <div className="ml-auto">
							<Link to="/testadm">
								<button className="btn btn-primary">Home</button>
							</Link>
						</div> :null}
			{store.authChef ?
						 <div className="ml-auto">
							<Link to="/chefs">
								<button className="btn btn-primary">Home</button>
							</Link>
						</div> :null}
						{store.authUser || store.authAdmin ?
						<div className="ml-auto">
							<Link to="/recipes">
								<button className="btn btn-primary">Recipes</button>
							</Link>
						</div>:null}
						{store.authAdmin ?
						<div className="ml-auto">
							<Link to="/ingredientes">
								<button className="btn btn-primary">Ingredients</button>
							</Link>
						</div>:null}
						{store.authAdmin ?
						<div className="ml-auto">
							<Link to="/utensilios">
								<button className="btn btn-primary">Utensils</button>
							</Link>
						</div>:null}
						{store.authAdmin ?
						<div className="ml-auto">
							<Link to="/adminuser">
								<button className="btn btn-primary">Admins</button>
							</Link>
						</div>:null}
						{ store.authUser || store.authAdmin || store.authChef?
						<div className="ml-auto">
							<Link to="/questions">
								<button className="btn btn-primary">Questions</button>
							</Link>
						</div>:null}
						{store.authUser || store.authAdmin || store.authChef?
						<div className="ml-auto">
							<Link to="/answers">
								<button className="btn btn-primary">Answer</button>
							</Link>
						</div>:null}
						{store.authUser || store.authAdmin || store.authChef?
						<div className="ml-auto">
							<Link to="/califications">
								<button className="btn btn-primary">Califications</button>
							</Link>
						</div>:null}
						{store.authChef ?
						<div>
							<Link to="/utensilio_receta">
								<button className="btn btn-danger">Agregar utensilio a receta</button>
							</Link>
						</div>:null}
					</div>
					{ store.authUser ?
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
					</div> :null}
					{ store.authUser ?
					<div className="ml-auto">
						<Link to="/utensil_user">
							<button className="btn btn-danger">utensilio usuario</button>
						</Link>
					</div>:null}
					{ store.authUser ?
					<div className="ml-auto">
						<Link to="/ingredient_users">
							<button className="btn btn-primary">Ingredient Users</button>
						</Link>
					</div>:null}
					{ store.authUser ?
					<div className="ml-auto">
						<Link to="/users">
							<button className="btn btn-danger">Agregar usuario</button>
						</Link>
					</div> : null}
					
					</nav >
	</>
	);
};