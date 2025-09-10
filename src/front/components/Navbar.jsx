import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
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
					<Link to="/ingredientes">
						<button className="btn btn-primary">Ingredientes</button>
					</Link>
				</div>
								<div className="ml-auto">
					<Link to="/utensilios">
						<button className="btn btn-primary">Utensilios</button>
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
					<Link to="/questions">
						<button className="btn btn-primary">Answer</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};