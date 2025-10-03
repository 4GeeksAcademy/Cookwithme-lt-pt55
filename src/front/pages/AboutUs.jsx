import React from "react";
import RigoBaby from "../assets/img/rigo-baby.jpg";
export const AboutUs = () => {
  return (
    <div className="container-fluid p-5">
      <div className="row gx-5">
        {/* Imagen izquierda */}
        <div
          className="col-lg-5 mb-5 mb-lg-0 wow fadeIn"
          data-wow-delay="0.1s"
          style={{ minHeight: "500px", visibility: "visible", animationDelay: "0.1s", animationName: "fadeIn" }}
        >
          <div className="position-relative h-100">
            <div className="position-absolute top-0 start-0 animate-rotate" style={{ width: "160px", height: "160px" }}>
              <img className="img-fluid" src="https://themewagon.github.io/Chefer/img/about-round.jpg" alt="Rigobaby" />
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
          <div
            className="mb-4 wow fadeIn"
            data-wow-delay="0.2s"
            style={{ visibility: "visible", animationDelay: "0.2s", animationName: "fadeIn" }}
          >
            <h5 className="section-title">About Us</h5>
            <h1 className="display-3 mb-0">Cooking Together With The Expert</h1>
          </div>

          <p
            className="mb-4 wow fadeIn"
            data-wow-delay="0.3s"
            style={{ visibility: "visible", animationDelay: "0.3s", animationName: "fadeIn" }}
          >
            Nonumy erat diam duo labore clita. Sit magna ipsum dolor sed ea duo at ut. Tempor sit
            lorem sit magna ipsum duo. Sit eos dolor ut sea rebum, diam sea rebum lorem kasd ut ipsum dolor est
            ipsum. Et stet amet justo amet clita erat, ipsum sed at ipsum eirmod labore lorem.
          </p>

          <div className="row">
            {/* Feature 1 */}
            <div
              className="col-sm-6 wow fadeIn"
              data-wow-delay="0.4s"
              style={{ visibility: "visible", animationDelay: "0.4s", animationName: "fadeIn" }}
            >
              <div className="bg-light rounded p-4">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="https://themewagon.github.io/Chefer/img/feature-1.png"
                  alt="Master Chefs"
                  style={{ width: "80px", height: "80px", backgroundColor:"#FB5B21" }}
                />
                <h4>Master Chefs</h4>
                <p className="mb-0">
                  Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam dolor diam
                  ipsum et, tempor voluptua sit consetetur sit. Aliquyam diam amet diam et eos sadipscing
                  labore.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              className="col-sm-6 wow fadeIn"
              data-wow-delay="0.5s"
              style={{ visibility: "visible", animationDelay: "0.5s", animationName: "fadeIn" }}
            >
              <div className="bg-light rounded p-4">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="https://themewagon.github.io/Chefer/img/feature-3.png"
                  alt="Quality Food"
                  style={{ width: "80px", height: "80px", backgroundColor:"#FB5B21" }}
                />
                <h4>Quality Food</h4>
                <p className="mb-0">
                  Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam dolor diam
                  ipsum et, tempor voluptua sit consetetur sit. Aliquyam diam amet diam et eos sadipscing
                  labore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
