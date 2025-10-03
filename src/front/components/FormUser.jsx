import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from "react-router-dom";
import "../css/Bottoms.css";

const FormUser = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function sendData(e) {
    e.preventDefault();
    // crear el baackend como variable luego

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login_user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.status !== 200) {
        setError('Invalid email or password.');
        return;
      }

      const data = await response.json();
      localStorage.setItem("tokenUser", data.access_token);
      

      dispatch({ type: "set_auth_user", payload: {...data.user,token:data.access_token  } });
      setError('');
      navigate("/home_user");

    } catch (err) {
      console.error(err);
      setError('Login failed.');
    }
  }

  return (
    <form className="w-50 mx-auto">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>

      <div className="d-flex justify-content-between">
        <button type="submit" onClick={sendData} className="btn btn-custom">
          Submit
        </button>
        <Link to="/signup_user">
          <button type="button" className="btn btn-custom">Signup</button>
        </Link>
      </div>
    </form>
  );
};

export default FormUser;
