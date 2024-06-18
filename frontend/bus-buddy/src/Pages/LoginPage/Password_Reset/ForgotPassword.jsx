import React from "react";
import Logo from "../../../Assets/logo.png";
import "./ForgotPassword.css";
import { MdOutlineMailOutline } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
function ForgotPassword() {
  return (
    <div className="page-aligment-container">
      <div className="main-container-forgot-password">
        <div className="logo-container-blk">
          <img className="logo" alt="logo" src={Logo} />
        </div>
        <div className="content-padding">
          <h4 className="reset-text">Reset Password Password</h4>
          <div className="d-flex  justify-content center align-items-center pb-2">
            <div className="ps-2 text-center">
              Enter your email address and we'll send you a link to your
            </div>
          </div>
          <TextField
            // value={credentials.email}
            // onChange={handleChange}
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <button
            className="send-mail-btn"
            type="button"
            // onClick={handlePostRequest}
            fullWidth
          >
            <MdOutlineMailOutline size={23} />

            <span className="px-2">Send Email</span>
          </button>
          <Link to="/login" className="back-button">
            <button className="send-mail-btn" href="/login" type="button">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
