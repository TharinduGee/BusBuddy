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
  marginTop: "20px",
  justifyContent: "center",
  alignItems: "center",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#ff9933",
  },
});

function PriceContainer_1() {
  return (
    <div>
      <div className="d-flex flex-column main-container">
        <div className="package-label">Starter Package</div>
        <div className="price-tag ">$9.99 per month</div>
        <div className="package-name">Ideal for individual bus owners</div>
        <Divider
          orientation="horizontal"
          variant="middle"
          sx={{ backgroundColor: "#1B1B1B", height: 2 }}
          flexItem
        />
        <div className="description mt-3">
          <div className="d-flex flex-row align-items-center ">
            <img className="check-icon" alt="" src={checkicon} />
            <div>Manage up to 5 buses.</div>
          </div>
          <div className="d-flex flex-row align-items-top ">
            <img className="check-icon" alt="" src={checkicon} />
            <div>Basic financial tracking.</div>
          </div>
          <div className="d-flex flex-row align-items-top ">
            <img className="check-icon" alt="" src={checkicon} />
            <div>Employee profiles and scheduling.</div>
          </div>
          <div className="d-flex flex-row align-items-top ">
            <img className="check-icon" alt="" src={checkicon} />
            <div>Limited reporting tools</div>
          </div>
          <CustomButton
            variant="contained"
            endIcon={<img className="arrow-icon" alt="" src={arrowicon} />}
          >
            Try now
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default PriceContainer_1;
