import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";
import TextField from "@mui/material/TextField";
import Footer from "../../Components/OnBoaringComponents/Footer/Footer";

function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
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
        "http://localhost:8081/api/v1/signIn",
        {
          email: credentials.email,
          password: credentials.password
        }
      );

      console.log("Response:", response.data);

      if (response.data.role === "ROLE_ADMIN") {
        // Navigate to dashboard
        window.location.href = "/dashbord";
      }
      else if (response.data.role === "ROLE_DRIVER"){
        window.location.href = "/DriverDashboard";
      }
      else if (response.data.role === "ROLE_CONDUCTOR"){
        window.location.href = "/ConductorDashbaord";
      }
      else if (response.data.role === "ROLE_SUPPORTER"){
        window.location.href = "/SupporterDashboard";
      }
      
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      if (error.response) {
        if (error.response.status === 400) {
          // Check if the error is due to bad credentials
          if (
            error.response.data &&
            error.response.data === "Bad credentials"
          ) {
            // Display an alert for incorrect email or password
            alert("Email or password incorrect");
          } 
            // Handle other 400 errors if needed
          
        } if (error.response.status === 404) {
          // Check if the error is due to bad credentials
           if (
            error.response.data &&
            error.response.data === "User is not found."
          ) {
            // Display an alert for incorrect email or password
            alert("User is not found.");
          }
            // Handle other 400 errors if needed
          
        }else if (error.response.status === 406) {
          // Check if the error is due to user not assigned
          if (
            error.response.data &&
            error.response.data.message === "User not assigned for this operation."
          ) {
            // Display an alert for business owner to assign the user
            alert("Bus Business owner need to assign you");
          } else {
            // Handle other 406 errors if needed
          }
        }
        // Handle other errors if needed
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="container_width shadow p-5 pt-3 m-5 rounded-4 p-4 border">
          <div className="sign-up-text-main">Sign in to your Busbudy Account</div>

          <TextField
            value={credentials.email}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <br />
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
            autoComplete="current-password"
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
            <div className="mt-3 label-login">
              <a href="ForgotPassword">Forgot password?</a>
            </div>
          </div>
          <br />

          <div className="d-grid gap-2 mt-3 d-md-flex justify-content-center ">
            <button
              className="btn btn-primary me-md-2 creat-account-btn-login"
              type="button"
              onClick={handlePostRequest}
              fullWidth
            >
              Sign in
            </button>
          </div>
          <div className="d-flex flex-row mt-3 mb-5">
            <div className="mt-3 label-login">Don't have an account?</div>
            <a href="/SignUp">
              <div className="mt-3 ms-2 clickable-text mb-3">Sign up here</div>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-full">
        <Footer />
      </div>
    </div>
  );
}

export default LoginPage;
