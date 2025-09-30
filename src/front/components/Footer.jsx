import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <>
      {/* Food Images Strip */}
      <div className="container-fluid px-0">
        <div className="row g-0">
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div
              className="food-strip-div"
              style={{
                backgroundImage:
                  "url(https://diariodegastronomia.com/wp-content/uploads/2018/02/La-comida-asi%C3%A1tica-entra-con-fuerza-en-la-franquicia-759x500.jpg)",
              }}
            ></div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div
              className="food-strip-div"
              style={{
                backgroundImage:
                  "url(https://diariodegastronomia.com/wp-content/uploads/2021/01/La-cocina-peruana-en-Espan%CC%83a-femenina-y-plural-Foto-Promperu-759x500.jpg)",
              }}
            ></div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div
              className="food-strip-div"
              style={{
                backgroundImage:
                  "url(https://estoyhechouncocinillas.com/wp-content/uploads/2023/03/paella-de-marisco.jpg)",
              }}
            ></div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div
              className="food-strip-div"
              style={{
                backgroundImage:
                  "url(https://www.viajaraitalia.com/wp-content/uploads/2009/09/lasagna.jpg)",
              }}
            ></div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div
              className="food-strip-div"
              style={{
                backgroundImage: "url(https://imag.bonviveur.com/pad-thai.webp)",
              }}
            ></div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div
              className="food-strip-div"
              style={{
                backgroundImage:
                  "url(https://tse4.mm.bing.net/th/id/OIP.FIvNkO-jOGKFK7bkq6TvCQHaE8?pid=Api)",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Footer Start */}
      <div className="container-fluid bg-dark text-light footer pt-5">
        <div className="container py-2">
          <div className="row g-5">
            {/* Get In Touch */}
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title text-start ff-secondary fw-normal mb-4">
                Get In Touch
              </h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3"></i>123 Street, New York,
                USA
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3"></i>info@example.com
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3"></i>+012 345 67890
              </p>
              <div className="d-flex pt-2">
                <a className="btn btn-social" href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="btn btn-social" href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-social" href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a className="btn btn-social" href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title text-start ff-secondary fw-normal mb-4">
                Quick Links
              </h4>
              <a className="btn btn-link" href="#">Home</a>
              <a className="btn btn-link" href="#">About Us</a>
              <a className="btn btn-link" href="#">Food Menu</a>
              <a className="btn btn-link" href="#">Our Chefs</a>
              <a className="btn btn-link" href="#">Latest Blog</a>
              <a className="btn btn-link" href="#">Contact Us</a>
            </div>

            {/* More Links */}
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title text-start ff-secondary fw-normal mb-4">
                More Links
              </h4>
              <a className="btn btn-link" href="#">Home</a>
              <a className="btn btn-link" href="#">About Us</a>
              <a className="btn btn-link" href="#">Food Menu</a>
              <a className="btn btn-link" href="#">Our Chefs</a>
              <a className="btn btn-link" href="#">Latest Blog</a>
              <a className="btn btn-link" href="#">Contact Us</a>
            </div>

            {/* Newsletter */}
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title text-start ff-secondary fw-normal mb-4">
                Newsletter
              </h4>
              <p className="text-uppercase fw-bold">Subscribe Our Newsletter</p>
              <p>Amet justo diam dolor rebum lorem sit stet sea justo kasd</p>
              <div
                className="position-relative mx-auto"
                style={{ maxWidth: "400px" }}
              >
                <input
                  className="form-control border-0 w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Your Email"
                />
                <button
                  type="button"
                  className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
