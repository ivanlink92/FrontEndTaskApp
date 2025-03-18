// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the login data
    const loginData = {
      username: username,
      password: password,
    };

    try {
      // Call the login API using Axios
      const response = await axios.post(
        "https://back-end-task-app.vercel.app/api/login/",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // If the request is successful
      if (response.status === 200) {
        console.log("Login successful:", response.data);

        // Save the token to local storage (or cookies) for future requests
        localStorage.setItem("token", response.data.token);

        // Redirect to the tasks page
        navigate("/tasks");
      }
    } catch (err) {
      // Handle errors
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(
          err.response.data.message || "Login failed. Please try again."
        );
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from the server. Please try again.");
      } else {
        // Something happened in setting up the request
        setError("An error occurred. Please try again.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
