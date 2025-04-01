// src/pages/AuthPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { jwtDecode } from "jwt-decode";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authData = {
      username: username,
      password: password,
    };

    const endpoint = isLogin ? "/login/" : "/register/";
    const url = `https://back-end-task-app.vercel.app/api${endpoint}`;

    try {

      const response = await axios.post(url, authData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === (isLogin ? 200 : 201)) {
        console.log(
          isLogin ? "Login successful" : "Registration successful:",
          response.data
        );

        if (isLogin) {
          // Save the token to local storage for login
          localStorage.setItem("access", response.data.access);
          localStorage.setItem("id", response.data.id);
          
          navigate("/tasks"); // Redirect to tasks page after login
        } else {
          // After registration, switch to login form
          setIsLogin(true);
          setError("Registration successful. Please log in.");
        }
      }
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data.message ||
            (isLogin ? "Login failed." : "Registration failed.")
        );
      } else if (err.request) {
        setError("No response from the server. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
      //console.error(isLogin ? "Login error:" : "Registration error:", err);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button title="btnSubmit" type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          className="toggle-button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError(""); // Clear error message when toggling
          }}
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
