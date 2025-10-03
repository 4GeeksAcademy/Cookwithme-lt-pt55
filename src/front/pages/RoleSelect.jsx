import React, { useEffect } from "react"

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, Navigate } from "react-router-dom";

export const RoleSelect = () => {

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
			 {store.authChef ? <Navigate to='/chef_home'/> 
			 : store.authUser ? <Navigate to='/home_user'/>
			 :store.authAdmin ?	<Navigate to='/home_admin'/>:
				<div className="authentication-bg position-relative ">
					<div className="position-absolute start-0 end-0 start-0 bottom-0 w-100 h-100 ">
					<svg className="bg-dark" width="100vw" height="100vh" viewBox="0 0 800 800">
				<g fillOpacity="0.22">
					<circle
					style={{ fill: 'rgba(var(--ct-warning-rgb), 0.1)' }}
					cx="400"
					cy="400"
					r="600"
					></circle>
					<circle
					style={{ fill: 'rgba(var(--ct-primary-rgb), 0.2)' }}
					cx="400"
					cy="400"
					r="500"
					></circle>
					<circle
					style={{ fill: 'rgba(var(--ct-primary-rgb), 0.3)' }}
					cx="400"
					cy="400"
					r="300"
					></circle>
					<circle
					style={{ fill: 'rgba(var(--ct-primary-rgb), 0.4)' }}
					cx="400"
					cy="400"
					r="200"
					></circle>
					<circle
					style={{ fill: 'rgba(var(--ct-primary-rgb), 0.5)' }}
					cx="400"
					cy="400"
					r="100"
					></circle>
				</g>
				</svg>
					</div>
			<h1 className="display-4">¿What is your role?</h1>
			
			<div className="container-fluid">
  			<div class="row account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative justify-content-center ">
					<div className="card col-lg-4 col-md-6 m-5" >
					<div className="card-body text-center">
						 <img src="https://cdn-icons-png.flaticon.com/512/3461/3461980.png" class="card-img-top" style={{width: 180 }} alt="Chef icon" />
						<h2 className="card-subtitle m-2 text-body-secondary">Chef</h2>
						<div>
							<Link to="/login_chef">
								<button className=" orange-primari m-2">Login as Chef</button>
							</Link>
							<Link to="/signup_chef">
								<button className="btn btn-outline-dark">Signup as New Chef</button>
							</Link>
						</div>
					</div>
					</div>
					


					<div className="card col-lg-4 col-md-6 m-5" >
					<div className="card-body text-center">
						 <img src="https://cdn-icons-png.flaticon.com/512/1400/1400111.png" class="card-img-top" style={{width: 180 }} alt="Chef icon" />
						<h2 className="card-subtitle m-2 text-body-secondary">User</h2>
						<div className="ml-auto">
						<Link to="/login_user">
							<button className="orange-primari m-2">Login as user</button>
						</Link>
						<Link to="/signup_user">
							<button className="btn btn-outline-dark">Signup as New user</button>
						</Link>
					</div>
					</div>
					</div>

						<div className="ml-auto text-center">
						<Link to="/login_admin">
							<button className="btn btn-outline-light ">Login as Admin</button>
						</Link>
						</div>

						<div className="ml-auto text-center">
						<Link to="/">
							<button className="btn btn-outline-light ">Back Home</button>
						</Link>
						</div>
					</div>
					</div>
					</div> }
			

			
		
			{/* <div className="alert alert-info my-5">
				{store.message ? (
					<span>{store.message}</span>
				) : (
					<span className="text-danger">
						Loading message from the backend (make sure your python 🐍 backend is running)...
					</span>
				)}
			</div> */}
			
		
	</>
	);
}; 

