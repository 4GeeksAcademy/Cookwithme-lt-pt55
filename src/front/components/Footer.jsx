
import { Link, Navigate } from "react-router-dom";
export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<p>
			<Link to="/">
				<button className="btn btn-success">Regresar</button>
			</Link>
		</p>
	</footer>
);
