import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Logo from "../../../Assets/logo.png";
import "./ForgotPassword.css";
import { MdOutlineMailOutline } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Footer from "../../../Components/OnBoaringComponents/Footer/Footer";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values.email);
      try {
        await axios.post(
          `http://localhost:8081/api/v1/user/resetPassword?email=${values.email}`
        );
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: "A reset link has been sent to your email.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="page-aligment-container">
      <div className="main-container-forgot-password">
        <div className="logo-container-blk">
          <img className="logo" alt="logo" src={Logo} />
        </div>
        <div className="content-padding">
          <h4 className="reset-text">Reset Password</h4>
          <div className="d-flex justify-content-center align-items-center pb-2">
            <div className="text-center">
              Enter your email address and we'll send you a link to your email
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              margin="normal"
              required
              className="textfiled-forgotpassword"
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <button
              className="send-mail-btn mt-4"
              type="submit"
              fullWidth
              disabled={!formik.isValid || !formik.dirty || loading}
            >
              {loading ? (
                <ClipLoader size={23} color="#ffffff" />
              ) : (
                <>
                  <MdOutlineMailOutline size={23} />
                  <span className="px-2">Send Email</span>
                </>
              )}
            </button>
          </form>
          <Link to="/login" className="back-button">
            <button className="send-mail-btn" type="button">
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
