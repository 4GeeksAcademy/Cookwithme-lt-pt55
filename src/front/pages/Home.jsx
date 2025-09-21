import React, { useEffect } from "react"

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, Navigate } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<>
			<div className="text-center  mt-5">
			<h1 className="display-4">¿What is your role?</h1>
			
			
  			<div class="row  d-flex justify-content-around align-items-center m-5">
					<div className="card col-3 p-2 " >
					<div className="card-body">
						 <img src="https://cdn-icons-png.flaticon.com/512/3461/3461980.png" class="card-img-top" style={{width: 180 }} alt="Chef icon" />
						<h2 className="card-subtitle m-2 text-body-secondary">Chef</h2>
						<div>
							<Link to="/login_chef">
								<button className="btn btn-success m-2">Login as Chef</button>
							</Link>
							<Link to="/signup_chef">
								<button className="btn btn-warning m-2">Signup as New Chef</button>
							</Link>
						</div>
					</div>
					</div>
					


					<div className="card col-3 p-2" >
					<div className="card-body">
						 <img src="https://cdn-icons-png.flaticon.com/512/1400/1400111.png" class="card-img-top" style={{width: 180 }} alt="Chef icon" />
						<h2 className="card-subtitle m-2 text-body-secondary">User</h2>
						<div className="ml-auto">
						<Link to="/login_user">
							<button className="btn btn-danger m-2">Login as user</button>
						</Link>
						<Link to="/signup_user">
							<button className="btn btn-danger m-2">Signup as New user</button>
						</Link>
					</div>
					</div>
					</div>


					<div className="card col-3 p-2" >
					<div className="card-body">
						 <img src="https://i.pinimg.com/564x/07/24/da/0724daaa15be4c49aca82e7067fdd5a1.jpg" class="card-img-top" style={{width: 180 }} alt="Chef icon" />
						<h2 className="card-subtitle m-2 text-body-secondary">Admin</h2>
						<div className="ml-auto">
						<Link to="/login_admin">
							<button className="btn btn-success m-2">Login as Admin</button>
						</Link>
						{store.authAdmin ?
						<Link to="/signup_admin">
							<button className="btn btn-warning m-2">Signup as New Admin</button>
						</Link> : null}
						</div>
					</div>
					</div>
			</div>
			

			
		
			<div className="alert alert-info my-5">
				{store.message ? (
					<span>{store.message}</span>
				) : (
					<span className="text-danger">
						Loading message from the backend (make sure your python 🐍 backend is running)...
					</span>
				)}
			</div>
		</div>
		
	</>
	);
}; 


