import React from "react";
import DashbordImage from "../../../Assets/Dashboard_Image.png";
import "./StepDetails.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const CustomButton = styled(Button)({
  backgroundColor: "#ff7a00",
  textAlign: "center",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "16px",
  letterSpacing: "0.5px",
  width: "210px",
  height: "40px",
  display: "flex",
  marginLeft: "9px",
  marginBottom: "20px",
  borderRadius: "4px",
  border: "1px solid #FF7A00", // Set the border property with the correct syntax
  justifyContent: "center",
  alignItems: "center",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#ff9933",
  },
});
const CustomButton_2 = styled(Button)({
  backgroundColor: "white",
  color: "#1B1B1B",
  textAlign: "center",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "16px",
  letterSpacing: "0.5px",
  marginLeft: "9px",
  marginBottom: "20px",
  width: "210px",
  height: "40px",
  display: "flex",
  borderRadius: "4px", // Use camelCase for property names
  border: "1px solid #FF7A00", // Set the border property with the correct syntax
  justifyContent: "center",
  alignItems: "center",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#ff9933",
  },
});
function StepDetails() {
  return (
    <div className="d-flex flex-lg-row flex-md-column flex-sm-column  align-items-sm-center step-detail-main">
      <img className="dashbord-image" alt="" src={DashbordImage} />
      <div className="d-flex flex-column justify-content-end align-items-lg-start align-items-sm-center px-lg-2 px-sm-4 ">
        <div className="details-texts ">
          Step 1: Set Up Your Bus Profile: Upload bus details, define business
          models, and manage employee profiles.
        </div>
        <div className="details-texts ">
          Step 2: Take Control of Finances: Track income and expenses, adjust
          collection models, and generate reports.
        </div>
        <div className="details-texts ">
          Step 3: Optimize Operations: Manage schedules and maintenance, track
          buses in real-time, and handle bookings/advertisements.
        </div>
        <div className="get-started-text">
          Get Started and Take Control Today
        </div>
        <div className="d-flex flex-row align-items-lg-start  btn-row">
          <CustomButton variant="contained">Get started free</CustomButton>
          <CustomButton_2 variant="contained">
            View Subscriptions
          </CustomButton_2>
        </div>
      </div>
    </div>
  );
}

export default StepDetails;
