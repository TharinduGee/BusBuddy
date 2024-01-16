import React, { useState } from "react";
import axios from "axios";
import "./RegistraionPage.css";
import TextField from "@mui/material/TextField";

function RegistrationPage() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNo: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const handlePostRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/signUp",
        user
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
          <div className="justify-content-start">Back</div>
          <div className="sign-up-text-main">Sign up to Busbuddy</div>
          <div>
            <div class="row row-cols-2 mt-2">
              <div class="col">
                <TextField
                  value={user.firstName}
                  onChange={handleChange}
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                />
              </div>
              <div class="col">
                <TextField
                  value={user.lastName}
                  onChange={handleChange}
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                  autoFocus
                
                />
              </div>
            </div>
          </div>

          <TextField
            value={user.email}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            value={user.mobileNo}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            id="mobileNo"
            label="Mobile Number"
            placeholder="+94711234567"
            name="mobileNo"
            autoComplete="mobileNo"
            autoFocus
          />
          <TextField
            value={user.password}
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
          <div class="label mt-3">* Something at least 8 characters Long</div>
          <div class="label mt-1">* Use at least one number</div>
          <div class="label mt-1">* Use at least one lowercase letter</div>
          <div class="label mt-1">
            * Use at least one uppercase letter (@,#,$,%..)
          </div>
          <div class="label mt-1">* Use at least one special characters</div>

          <TextField
            value={user.confirm_password}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            id="confirm_password"
            label="Confirm Password"
            type="password"
            name="confirm_password"
            autoComplete="confirm_password"
          />
          <div className="row ms-1  mt-3">
            <input
              class="col-1 form-check-input transparent-box"
              type="checkbox"
              id="gridCheck_1"
            />
            <label class="col  label" for="gridCheck_1">
              Sign me up for the wish list weekly newsletter
            </label>
          </div>
          <div className="row ms-1 mt-2">
            <input
              class="col-1 form-check-input transparent-box "
              type="checkbox"
              id="gridCheck_2"
            />
            <label className="col label" htmlFor="gridCheck_2">
              By clicking the checkbox, I hereby (i) accept{" "}
              <a href="link_to_terms_of_service">TERMS OF SERVICE</a> and agree
              to be bound by them and (ii) acknowledge that I have received and
              reviewed <a href="link_to_privacy_policy">PRIVACY POLICY</a>.
            </label>
          </div>

          <div class="d-grid gap-2 mt-3 d-md-flex justify-content-center ">
            <button
              class="btn btn-primary me-md-2 creat-account-btn"
              type="button"
              onClick={handlePostRequest}
            >
              CREATE ACCOOUNT
            </button>
          </div>
          <div class="d-flex flex-row mt-3 mb-5">
            <div class="mt-3 label">Already have an account?</div>
            <a href="SignUp">
              <div class="mt-3 ms-2 clickable-text mb-3 ">Sign in here</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
