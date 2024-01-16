// LoginPage.js

import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";
import TextField from "@mui/material/TextField";

function LoginPage() {
  const [credentials, setCredentials] = useState({
    emailOrUsername: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setCredentials({
      ...credentials,
      [e.target.name]: value,
    });
  };

  const handlePostRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/login",
        credentials
      );

      console.log("Response:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="container_width shadow p-5 pt-3 m-5 rounded-4 p-4 border">
          <div className="sign-up-text-main">Sign in to your Busbudy Account</div>

          <TextField
            value={credentials.emailOrUsername}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            id="emailOrUsername"
            label="Email or Username"
            name="emailOrUsername"
            autoComplete="emailOrUsername"
            autoFocus
          />

          <TextField
            value={credentials.password}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            autoComplete="password"
          />

          <div className="d-flex justify-content-between align-items-center mt-2">
            <div>
              <input
                type="checkbox"
                id="rememberMe"
                checked={credentials.rememberMe}
                onChange={handleChange}
              />
              <label className="ms-2" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <div>
              <a href="ForgotPassword">Forgot password?</a>
            </div>
          </div>

          <div className="d-grid gap-2 mt-3 d-md-flex justify-content-center ">
            <button
              className="btn btn-primary me-md-2 creat-account-btn"
              type="button"
              onClick={handlePostRequest}
            >
              SIGN IN
            </button>
          </div>
          <div className="d-flex flex-row mt-3 mb-5">
            <div className="mt-3 label">Don't have an account?</div>
            <a href="SignUp">
              <div className="mt-3 ms-2 clickable-text mb-3">Sign up here</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
