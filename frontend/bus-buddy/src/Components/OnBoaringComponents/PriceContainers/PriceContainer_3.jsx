import React from "react";
import "./PriceContainer.css";
import { Divider } from "@mui/material";
import checkicon from "../../../Assets/check regular.png";
import arrowicon from "../../../Assets/next_arrow.png";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const CustomButton = styled(Button)({
  backgroundColor: "#ff7a00",
  width: "277px",
  height: "40px",
  display: "flex",
  marginTop: "5px",
  justifyContent: "center",
  alignItems: "center",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#ff9933",
  },
});

function PriceContainer() {
  return (
    <div className="d-flex flex-column main-container">
      <div className="package-label">Elite Package</div>
      <div className="price-tag ">$49.99 per month</div>
      <div className="package-name">Tailored for large bus fleets</div>
      <Divider
        orientation="horizontal"
        variant="middle"
        sx={{ backgroundColor: "#1B1B1B", height: 2 }}
        flexItem
      />
      <div className="description">
        <div className="d-flex flex-row align-items-center ">
          <img className="check-icon" alt="" src={checkicon} />
          <div>Manage up to 20 buses</div>
        </div>
        <div className="d-flex flex-row align-items-top ">
          <img className="check-icon" alt="" src={checkicon} />
          <div>Advanced financial management with reports</div>
        </div>
        <div className="d-flex flex-row align-items-top ">
          <img className="check-icon" alt="" src={checkicon} />
          <div>Bus tracking and maintenance features</div>
        </div>
        <div className="d-flex flex-row align-items-top ">
          <img className="check-icon" alt="" src={checkicon} />
          <div>Booking and advertisement functionalities</div>
        </div>
        <CustomButton
          variant="contained"
          endIcon={<img className="arrow-icon" alt="" src={arrowicon} />}
        >
          Try now
        </CustomButton>
      </div>
    </div>
  );
}

export default PriceContainer;
