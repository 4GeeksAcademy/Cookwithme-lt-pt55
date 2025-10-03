import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../css/Bottoms.css";

const FormAdmin = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendData = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/login_admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Invalid email or password.");
        return;
      }

      // Guardamos token y actualizamos store
      localStorage.setItem("tokenAdmin", data.access_token);
      dispatch({ type: "set_auth_admin", payload: true });

      navigate("/home_admin");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Si ya está logueado, redirige automáticamente
  if (store.authAdmin) return <Navigate to="/home_admin" />;

  return (
    <form className="w-50 mx-auto mt-5">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          id="email"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          id="password"
        />
      </div>

      <div className="d-flex justify-content-between">
        <button
          type="submit"
          onClick={sendData}
          className="btn btn-custom"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Submit"}
        </button>

        <Link to="/signup_admin">
          <button type="button" className="btn btn-custom">
            Signup as New Admin
          </button>
        </Link>
      </div>
    </form>
  );
};

export default FormAdmin;
