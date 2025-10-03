import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import  Gemini_Generated_Image_neuv33neuv33neuv2r3   from "../assets/img/Gemini_Generated_Image_neuv33neuv33neuv2r3.png";
import personafeliz from "../assets/img/personafeliz.png";
import logov1 from "../assets/img/logov1.png";
import iafoto from "../assets/img/iafoto.png";
import gorro from "../assets/img/gorro_cheff.png";
import { Link } from "react-router-dom"

export const Home = () => {

  const { store,dispatch } = useGlobalReducer();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loadMessage = async () => {
    try {
      if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");
      const response = await fetch(backendUrl + "/api/hello");
      const data = await response.json();
      if (response.ok) dispatch({ type: "set_hello", payload: data.message });
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };
  
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

  useEffect(() => {
    loadMessage();
  }, []);

  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    if (!backendUrl) return;
    fetch(`${backendUrl}/api/chefs`)
      .then((res) => res.json())
      .then((data) => setChefs(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching chefs:", err));
  }, [backendUrl]);

  return (
    <>
      {/* === BLOQUE ORIGINAL (sin cambios) ===
      <div className="text-center  mt-5">
        <h1 className="display-4">¿What is your role?</h1>

        <div className="row  d-flex justify-content-around align-items-center m-5">
          <div className="card col-3 p-2 ">
            <div className="card-body">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3461/3461980.png"
                className="card-img-top"
                style={{ width: 180 }}
                alt="Chef icon"
              />
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

          <div className="card col-3 p-2">
            <div className="card-body">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1400/1400111.png"
                className="card-img-top"
                style={{ width: 180 }}
                alt="Chef icon"
              />
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

          <div className="card col-3 p-2">
            <div className="card-body">
              <img
                src="https://i.pinimg.com/564x/07/24/da/0724daaa15be4c49aca82e7067fdd5a1.jpg"
                className="card-img-top"
                style={{ width: 180 }}
                alt="Chef icon"
              />
              <h2 className="card-subtitle m-2 text-body-secondary">Admin</h2>
              <div className="ml-auto">
                <Link to="/login_admin">
                  <button className="btn btn-success m-2">Login as Admin</button>
                </Link>
                {store.authAdmin ? (
                  <Link to="/signup_admin">
                    <button className="btn btn-warning m-2">Signup as New Admin</button>
                  </Link>
                ) : null}
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
      </div> */}

      {/* Navbar Exclusivo de HOME */}
        <div className="container-fluid bg-dark px-0">
        <div className="row gx-0 wow fadeIn" data-wow-delay="0.1s">
            <div className="col-lg-3  d-none d-lg-block">
                <a href="index.html" className="navbar-brand primary-orange w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
                    <img src={Gemini_Generated_Image_neuv33neuv33neuv2r3} alt="logo cook with me" height="110" />
                </a>
            </div>
            <div className="col-lg-9 ">
                <nav className="navbar navbar-expand-lg navbar-dark p-3 p-lg-0 px-lg-5 h-100" style={{background: '#111111'}}>

                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between align-items-center" id="navbarCollapse">
                        <div className="navbar-nav mr-auto py-0">
                          <button className="btn text-light m-2">Recipes</button>
                           <button className="btn text-light m-2">Chefs</button>
                           <button className="btn text-light m-2">About us</button>
                           <button className="btn text-light m-2">Contact</button>
                           {(store.authChef || store.authUser || store.authAdmin ? null :(
                            <Link to="/select_role">
                            <button className="btn btn-outline-light m-2">Enter</button>
                            </Link>
                              ))}
                           {(store.authChef || store.authUser || store.authAdmin) && (
                             <button className="btn btn-outline-danger" onClick={logout}>
                                  Logout
                                </button>)}
                         
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        </div> 
      {/* --------------------------------- */}

      {/* === NUEVA SECCIÓN: Layout tipo "foto" === */}
      <section style={{ background: "#2a2e33" }} className="py-5">
        <div className="container">
          <h2
            className="display-1 fw-bold text-center text-white mb-5"
            style={{ letterSpacing: 2 }}
          >
            CookWith Me
          </h2>

          <div className="row g-4 align-items-center">
            {/* Izquierda */}
            <div className="col-lg-4">
              <img
                src={personafeliz}
                alt="dish left"
                className="img-fluid rounded-3 shadow"
              />
              <div className="text-white-50 mt-4">
                <div className="fs-3">↓</div>
                <p className="mb-0">
                  Somos una startup creada para simplificar tu día a día: solo con lo
                  que ya tienes en tu nevera o despensa, te ayudamos a decidir qué
                  cocinar de manera fácil, práctica y sin complicaciones.
                </p>
              </div>
            </div>

            {/* Centro */}
            <div className="col-lg-4">
              <img
                src={logov1}
                alt="chef portrait"
                className="img-fluid rounded-3"
              />
            </div>

            {/* Derecha */}
            <div className="col-lg-4">
              <p className="text-white-50 mb-4">
                Con solo una foto de tu cocina o despensa, nuestra tecnología
                identifica tus ingredientes y te sugiere recetas deliciosas y fáciles
                de preparar.
              </p>
              <div className="fs-3 text-white-50 mb-2">↑</div>
              <img
                src={iafoto}
                alt="dish right"
                className="img-fluid rounded-3 shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* === 2. About Us === */}
      <div id="aboutus" className="container-fluid p-5">
        <div className="row gx-5">
          {/* Imagen izquierda */}
          <div
            className="col-lg-5 mb-5 mb-lg-0 wow fadeIn"
            data-wow-delay="0.1s"
            style={{ minHeight: "500px" }}
          >
            <div className="position-relative h-100">
              <div
                className="position-absolute top-0 start-0 animate-rotate"
                style={{ width: "160px", height: "160px" }}
              >
                <img
                  className="img-fluid"
                  src="https://themewagon.github.io/Chefer/img/about-round.jpg"
                  alt="Rigobaby"
                />
              </div>
              <img
                className="position-absolute w-100 h-100 rounded-circle rounded-bottom rounded-end"
                src="https://themewagon.github.io/Chefer/img/about.jpg"
                alt="About"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Contenido derecho */}
          <div className="col-lg-7">
            <div className="mb-4 wow fadeIn" data-wow-delay="0.2s">
              <h5
                className="fw-normal"
                style={{ color: "#FB5B21", letterSpacing: 2 }}
              >
                ABOUT US
              </h5>
              <h1 className="display-3 mb-0">Cooking Together With The Expert</h1>
            </div>

            <p className="mb-4 wow fadeIn" data-wow-delay="0.3s">
              Nonumy erat diam duo labore clita. Sit magna ipsum dolor sed ea duo at ut.
              Tempor sit lorem sit magna ipsum duo. Sit eos dolor ut sea rebum, diam sea
              rebum lorem kasd ut ipsum dolor est ipsum. Et stet amet justo amet clita
              erat.
            </p>

            <div className="row">
              {/* Feature 1 */}
              <div className="col-sm-6 wow fadeIn" data-wow-delay="0.4s">
                <div className="bg-light rounded p-4">
                  <img
                    className="img-fluid rounded-circle mb-3"
                    src="https://themewagon.github.io/Chefer/img/feature-1.png"
                    alt="Master Chefs"
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "#FB5B21",
                    }}
                  />
                  <h4>Master Chefs</h4>
                  <p className="mb-0">
                    Tempor erat elitr at rebum. Diam dolor diam ipsum et.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="col-sm-6 wow fadeIn" data-wow-delay="0.5s">
                <div className="bg-light rounded p-4">
                  <img
                    className="img-fluid rounded-circle mb-3"
                    src="https://themewagon.github.io/Chefer/img/feature-3.png"
                    alt="Quality Food"
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "#FB5B21",
                    }}
                  />
                  <h4>Quality Food</h4>
                  <p className="mb-0">
                    Aliquyam diam amet diam et eos sadipscing labore.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === 3. Our Menu === */}
      <section id="menu" className="container-xxl py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h6
              className="text-uppercase"
              style={{ color: "#ff6b2c", letterSpacing: 4 }}
            >
              Our Menu
            </h6>
            <h2
              className="display-1 fw-bold text-center text-black mb-5"
              style={{ letterSpacing: 2 }}
            >
              More than 1.000 Recipe
            </h2>
          </div>

          <div className="row g-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-lg-3">
                <div className="position-relative rounded-3 overflow-hidden shadow-sm">
                  <img
                    src={`https://themewagon.github.io/Chefer/img/menu-${
                      (idx % 8) + 1
                    }.jpg`}
                    alt="Menu item"
                    className="img-fluid w-100"
                    style={{ aspectRatio: "4 / 3", objectFit: "cover" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === 4. Our Chefs === */}
      <section id="chefs" style={{ background: "#2a2e33" }} className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h5
              className="fw-normal"
              style={{ color: "#FB5B21", letterSpacing: 2 }}
            >
              EXPERT CHEFS
            </h5>
            <h1 className="mb-0 text-white">Let's Meet The Expert</h1>
          </div>

          <div className="row g-4">
            {chefs.map((chef, idx) => {
              const img = chef.image_url || gorro;
              const name = chef.name || "Unnamed Chef";
              const socials = [
                { key: "facebook", icon: "fab fa-facebook-f", url: chef.facebook },
                { key: "twitter", icon: "fab fa-twitter", url: chef.twitter },
                { key: "instagram", icon: "fab fa-instagram", url: chef.instagram },
              ].filter((s) => !!s.url);

              return (
                <div key={idx} className="col-lg-3 col-md-6">
                  <div className="text-center rounded overflow-hidden shadow bg-white h-100">
                    <div className="overflow-hidden">
                      <img
                        className="img-fluid"
                        src={img}
                        alt={name}
                        style={{
                          height: 250,
                          objectFit: "cover",
                          width: "100%",
                        }}
                        onError={(e) => {
                          e.currentTarget.src = gorro;
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h5 className="mb-3">{name}</h5>
                      <div className="d-flex justify-content-center gap-2">
                        {socials.length > 0 ? (
                          socials.map((s) => (
                            <a
                              key={s.key}
                              className="btn btn-sm btn-outline-dark rounded-circle"
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${name} on ${s.key}`}
                              style={{
                                width: 36,
                                height: 36,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <i className={s.icon} />
                            </a>
                          ))
                        ) : (
                          <span className="text-muted small">No social links</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {chefs.length === 0 && (
            <p className="text-center text-muted mt-4">No chefs yet, add one!</p>
          )}
        </div>
      </section>
    </>
  );
};
