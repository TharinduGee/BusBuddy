import React from "react";
import Logo from "../../../Assets/logo.png";
import "./ForgotPassword.css";
import { MdOutlineMailOutline } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Footer from "../../../Components/OnBoaringComponents/Footer/Footer";
function ForgotPassword() {
  return (
    <div className="page-aligment-container">
      <div className="main-container-forgot-password">
        <div className="logo-container-blk">
          <img className="logo" alt="logo" src={Logo} />
        </div>
        <div className="content-padding">
          <h4 className="reset-text">Reset Password </h4>
          <div className="d-flex  justify-content center align-items-center pb-2">
            <div className="text-center">
              Enter your email address and we'll send you a link to your email
            </div>
          </div>
          <TextField
            // value={credentials.email}
            // onChange={handleChange}
            margin="normal"
            required
            className="textfiled-forgotpassword"
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Link to="/resetpassword">
            <button
              className="send-mail-btn mt-4"
              type="button"
              // onClick={handlePostRequest}
              fullWidth
            >
              <MdOutlineMailOutline size={23} />

              <span className="px-2">Send Email</span>
            </button>
          </Link>
          <Link to="/login" className="back-button">
            <button className="send-mail-btn" href="/login" type="button">
              Back
            </button>
          </Link>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default ForgotPassword;
