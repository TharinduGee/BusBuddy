import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../../../Assets/logo.png";
import "./ForgotPassword.css";
import TextField from "@mui/material/TextField";
import Footer from "../../../Components/OnBoaringComponents/Footer/Footer";

function PasswordResetPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryParams = window.location.search;
    console.log(queryParams.split("=")[1]);
    setToken(queryParams.split("=")[1]);
  }, [location.search]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post(
          `http://localhost:8081/api/v1/user/updatePassword?token=${token}&password=${values.password}`
        );
        Swal.fire({
          icon: "success",
          title: "Password Changed",
          text: "Your password has been changed successfully.",
        }).then(() => {
          navigate("/login", { replace: true });
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
        <div className="content-padding w-100">
          <h4 className="reset-text">Reset Password</h4>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div>Enter new password</div>
              <TextField
                type="password"
                className="textfiled-forgotpassword"
                margin="normal"
                required
                id="password"
                name="password"
                autoComplete="new-password"
                autoFocus
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </div>
            <div className="pb-4">
              <div>Confirm new password</div>
              <TextField
                type="password"
                className="textfiled-forgotpassword"
                margin="normal"
                required
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </div>
            <button
              className="send-mail-btn"
              type="submit"
              fullWidth
              disabled={!formik.isValid || !formik.dirty || loading}
            >
              {loading ? "Changing..." : "Change Password"}
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

export default PasswordResetPage;
