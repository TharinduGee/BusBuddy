import React from "react";
import "./MessageBox.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContactDetail from "./ContactDetails.jsx";
import { alpha, styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "#1B1B1B",
  },
  "& label.Mui-focused": {
    color: "#1B1B1B",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#1B1B1B",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      padding: "10px",
      borderColor: "#1B1B1B",
      borderRadius: "9px",
    },
    "&:hover fieldset": {
      borderColor: "#1B1B1B",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1B1B1B",
    },
    color: "#1B1B1B",
    fontFamily: "Roboto",
    fontSize: "17px",

    fontWeight: 400,

    letterSpacing: "0.5px",

    width: "440px",
    height: "48px",

    "@media (max-width: 630px)": {
      width: "300px",
      fontSize: "14px",
      // Adjust the width for smaller devices
    },
  },
});

function MessageBox() {
  return (
    <div className="d-flex flex-lg-row  justify-content-start  align-items-center main-bg-box">
      <div className="d-flex flex-column pb-4 justify-content-start">
        <div className="textfield-input">
          <CssTextField label="Name" id="Name" />
        </div>

        <div className="textfield-input">
          <CssTextField label="Email Address" id="custom-css-outlined-input" />
        </div>
        <div className="textfield-input">
          <CssTextField label="Phone Number" id="Phone-Number" />
        </div>
        <div className="textfield-input">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Your Message"
          ></textarea>
        </div>
      </div>
      <ContactDetail />
    </div>
  );
}

export default MessageBox;
