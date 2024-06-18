import React from "react";
import Logo from "../../../Assets/logo.png";
import "./ForgotPassword.css";
import { MdOutlineMailOutline } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Footer from "../../../Components/OnBoaringComponents/Footer/Footer";

function PasswordResetPage() {
  return (
    <div className="page-aligment-container">
      <div className="main-container-forgot-password">
        <div className="logo-container-blk">
          <img className="logo" alt="logo" src={Logo} />
        </div>
        <div className="content-padding w-100">
          <h4 className="reset-text">Reset Password </h4>
          <div>
            <div>Enter new password</div>

            <TextField
              // value={credentials.email}
              // onChange={handleChange}
              className="textfiled-forgotpassword"
              margin="normal"
              required
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </div>
          <div className="pb-4">
            <div>Confirm new password</div>
            <TextField
              // value={credentials.email}
              // onChange={handleChange}
              className="textfiled-forgotpassword"
              margin="normal"
              required
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </div>

          <Link to="/login">
            <button
              className="send-mail-btn"
              type="button"
              // onClick={handlePostRequest}
              fullWidth
            >
              <span>Change Password</span>
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

export default PasswordResetPage;
