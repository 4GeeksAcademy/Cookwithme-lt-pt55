import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/Homechef.css"; // mantenemos estilos de HomeChef

export const AdminList = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAdmins = () => {
    fetch(`${backendUrl}/api/adminuser`)
      .then((res) => res.json())
      .then((data) => setAdminUsers(data));
  };

  const deleteAdminUser = (id) => {
    fetch(`${backendUrl}/api/adminuser/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => getAdmins());
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <div className="menu-container">
      <h5 className="section-title">Admin Dashboard</h5>
      <h1 className="display-3 mb-0">Manage Admin Users</h1>

      <div className="text-center my-4">
        <Link to="/add_admin" className="btn btn-custom">
          <i className="fa-solid fa-plus me-2"></i> Add New Admin
        </Link>
      </div>

      <div className="menu-grid">
        {adminUsers.length > 0 ? (
          adminUsers.map((admin) => (
            <div key={admin.id} className="menu-item">
              <div className="label mb-2">Email: {admin.email}</div>

              <div className="menu-actions">
                <Link to={`/adminuser/${admin.id}`}>
                  <button className="menu-btn edit" title="View Admin">
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </Link>

                <Link to={`/adminuser/${admin.id}/edit`}>
                  <button className="menu-btn edit" title="Edit Admin">
                    <i className="fa-solid fa-pen"></i>
                  </button>
                </Link>

                <button
                  className="menu-btn delete"
                  onClick={() => deleteAdminUser(admin.id)}
                  title="Delete Admin"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-center mt-4">No admin users found.</h3>
        )}
      </div>
    </div>
  );
};
