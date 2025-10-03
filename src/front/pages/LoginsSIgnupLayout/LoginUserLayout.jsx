import React, { useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";
import  Gemini_Generated_Image_neuv33neuv33neuv2r3   from "../../assets/img/Gemini_Generated_Image_neuv33neuv33neuv2r3.png";

const LoginUserLayout = () => {
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
    <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative " >
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-xxl-4 col-lg-5">
                    <div className="card ">

                        {/* <!-- Logo --> */}
                        <div className=" py-4 text-center card-orange">
                            <a href="index.html">
                                <span><img src={Gemini_Generated_Image_neuv33neuv33neuv2r3} alt="logo" height="82"/></span>
                            </a>
                        </div>

                        <div className="card-body p-4">

                            <div className="text-center w-75 m-auto">
                                
                                <h4 className="text-dark-50 text-center pb-0 fw-bold">Hello, welcome User!!</h4>
                                <p className="text-muted mb-4">Enter your email address and password to access user panel.</p>
                            </div>

                            <form action="#">
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="mb-3">
                                 <label className="form-label">Email</label>
                                 <input
                                   value={email}
                                   onChange={e => setEmail(e.target.value)}
                                   type="email"
                                  className="form-control" />
      
                                </div>

                                <div className="mb-3">
                                        <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input value={password} onChange={e => setPassword(e.target.value)}
                                        type="password" className="form-control"/>
                                        </div>
                                </div>


                               <div className="d-flex justify-content-center">
                                    <button type="submit" onClick={sendData} className="text-light orange-primari">
                                     Log in
                                    </button>
                                   
                                    </div>

                            </form>
                        </div> 
                        {/* <!-- end card-body --> */}
                    </div>
                    {/* <!-- end card --> */}

                    <div className="row mt-3">
                        <div className="col-12 text-center">
                            <p className="text-light">Don't have an account? <Link to="/signup_user">
                                      <button type="button" className="btn fw-bold text-light">Sign up</button>
                                    </Link></p>
                        </div> 
                        {/* <!-- end col --> */}
                    </div>
                    {/* <!-- end row --> */}
                        <div className="ml-auto text-center">
                        <Link to="/select_role">
                            <button className="btn btn-outline-light mx-4">Back to Roles</button>
                        </Link>
                        <Link to="/">
                          <button className="btn btn-outline-light mx-4">Back Home</button>
                        </Link>
                        </div>
                       
                        
                        
                </div> 
                {/* <!-- end col --> */}
            </div>
            {/* <!-- end row --> */}
        </div>
        {/* <!-- end container --> */}
    </div>
    {/* <!-- end page --> */}

   



</div>
  );
};

export default LoginUserLayout;
