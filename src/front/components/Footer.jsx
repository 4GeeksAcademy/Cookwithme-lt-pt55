import React from "react";
import "../css/Footer.css";

import ceviche from "../assets/img/Ceviche.jpg";
import lasagna from "../assets/img/Lasagna.jpg";
import paella from "../assets/img/Paella.webp";
import ramen from "../assets/img/Ramen.jpg";
import taco from "../assets/img/Taco.jpeg";
import thai from "../assets/img/Thai.webp";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Footer = () => {
  const { store, dispatch } = useGlobalReducer();
  return (
    <>
      {/* Franja superior con imágenes */}
      <div className="container-fluid px-0 pt-5 mt-5">
        <div className="row g-0">
          {[ceviche, lasagna, paella, ramen, taco, thai].map((img, index) => (
            <div className="col-lg-2 col-md-4 col-sm-6" key={index}>
              <div
                className="food-strip-div"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="container-fluid bg-dark text-light footer pt-5">
        <div className="container py-2">
          <div className="row g-5">
            {/* Get in Touch */}
            <div className="col-lg-4 col-md-6">
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

            {/* Quick Links con IDs de Home */}
            <div className="col-lg-4 col-md-6">
              <h4 className="section-title text-start ff-secondary fw-normal mb-4">
                Quick Links
              </h4>
              <ul className="list-unstyled">
                <li className="mb-2 d-flex align-items-center">
                  <i
                    className="fa fa-arrow-right me-2"
                    style={{ color: "#FB5B21" }}
                  ></i>
                  <Link to="/" className="text-light text-decoration-none">Home</Link>
                </li>
                {!store.authUser}
                {[
                  { text: "About Us", url: "/#aboutus" },
                  { text: "Food Menu", url: "/#menu" },
                  { text: "Our Chefs", url: "/#chefs" },
                ].map((link, i) => (
                  <li key={i} className="mb-2 d-flex align-items-center">
                    <i
                      className="fa fa-arrow-right me-2"
                      style={{ color: "#FB5B21" }}
                    ></i>
                    <a
                      href={link.url}
                      className="text-light text-decoration-none"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-lg-4 col-md-12">
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
