import React from "react";

const chefs = [
  {
    name: "John Doe",
    specialty: "Master Chef",
    img: "https://themewagon.github.io/Chefer/img/team-1.jpg",
    socials: { facebook: "#", twitter: "#", instagram: "#" },
  },
  {
    name: "Jane Smith",
    specialty: "Pastry Chef",
    img: "https://themewagon.github.io/Chefer/img/team-2.jpg",
    socials: { facebook: "#", twitter: "#", instagram: "#" },
  },
  {
    name: "Alex Johnson",
    specialty: "Sushi Expert",
    img: "https://themewagon.github.io/Chefer/img/team-3.jpg",
    socials: { facebook: "#", twitter: "#", instagram: "#" },
  },
  {
    name: "Maria Lopez",
    specialty: "Italian Cuisine",
    img: "https://themewagon.github.io/Chefer/img/team-3.jpg",
    socials: { facebook: "#", twitter: "#", instagram: "#" },
  },
];


const WelcomeChef = () => {
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
                <div className="team-item text-center rounded overflow-hidden">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src={chef.img} alt={chef.name} />
                  </div>
                  <div className="team-text bg-light p-4">
                    <h5>{chef.name}</h5>
                    <p className="text-primary">{chef.specialty}</p>
                    <div className="team-social text-center">
                      <a className="btn btn-square mx-1" href={chef.socials.facebook}>
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a className="btn btn-square mx-1" href={chef.socials.twitter}>
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a className="btn btn-square mx-1" href={chef.socials.instagram}>
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WelcomeChef;
