// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token and userId from local storage
    localStorage.removeItem("access");
    localStorage.removeItem("id");

    // Redirect to the login page
    navigate("/");
  };

  return (
    <nav>
      <Link to="/tasks">Tasks</Link>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
