import React, { useEffect, useState } from "react";

import gorro from "../assets/img/gorro_cheff.png";

const WelcomeChef = () => {
  const [chefs, setChefs] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const defaultChefImg = gorro; 

  useEffect(() => {
    fetch(`${backendUrl}/api/chefs`)
      .then((res) => res.json())
      .then((data) => {
        setChefs(data);
      })
      .catch((err) => console.error("Error fetching chefs:", err));
  }, [backendUrl]);

  return (
    <>
      <section className="py-5 bg-dark hero-header">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1
            className="display-3 text-white mb-3"
            style={{ fontFamily: '"Emblema One", system-ui, cursive' }}
          >
            Chefs
          </h1>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h5
              className="section-title ff-secondary text-center fw-normal"
              style={{ color: "#FB5B21" }}
            >
              Expert Chefs
            </h5>
            <h1 className="mb-5">Let's Meet The Expert</h1>
          </div>

          <div className="row g-4">
            {chefs.map((chef, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="team-item text-center rounded overflow-hidden shadow">
                  
                  <div className="overflow-hidden">
                    <img
                      className="img-fluid"
                      src={chef.image_url ? chef.image_url : defaultChefImg}
                      alt={chef.name}
                      style={{ height: "250px", objectFit: "cover", width: "100%" }}
                    />
                  </div>
                  
                  <div className="team-text bg-light p-4">
                    <h5>{chef.name}</h5>
                    
                    <p style={{ color: "rgb(251, 91, 33)" }}>
                      {chef.rating ? `⭐ ${chef.rating}` : "No rating yet"}
                    </p>

                    <p style={{ color: "rgb(251, 91, 33)" }}>
                      {chef.email ? `${chef.email}` : "No email yet"}
                    </p>
                    
                    <div className="team-social text-center">
                      <a className="btn btn-square mx-1" href={chef.facebook || "#"}>
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="btn btn-square mx-1" href={chef.twitter || "#"}>
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a className="btn btn-square mx-1" href={chef.instagram || "#"}>
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
          {chefs.length === 0 && (
            <p className="text-center text-muted">No chefs yet, add one!</p>
          )}
        </div>
      </section>
    </>
  );
};

export default WelcomeChef;
