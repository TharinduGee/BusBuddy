import React from "react";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import avatar from "./../../Assets/Owner_assests/Avatar.png";
import TextField from "@mui/material/TextField";
import "./Operation_hub.css";
import Button from "@mui/material/Button";

function Operation_hub() {
  return (
    <Sidebar>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="d-flex pb-3">Operation hub</h1>
        <div className="op-main-container">
          <div className="d-flex flex-row align-items-center">
            <img
              className="op-prof-pic  input-and-label "
              src={avatar}
              alt="Add Icon"
            />
            <div className="d-flex flex-column mx-4">
              <label>NCG</label>
            </div>
          </div>
          <div className="d-flex flex-wrap  justify-content-between two-fields">
            <div className="input-and-label">
              <label class="form-label">Business Name*</label>
              <input
                type="text"
                id="BusinessName"
                class="form-control input-field"
              />
            </div>
            <div className="input-and-label">
              <label class="form-label">Registraion ID*</label>
              <input
                type="text"
                id="Registration_ID"
                class="form-control input-field"
              />
            </div>
            <div className="input-and-label">
              <label class="form-label">Email*</label>
              <input type="text" id="Email" class="form-control input-field" />
            </div>
          </div>
          <div className="input-and-label">
            <label class="form-label ">Address*</label>
            <input
              type="text"
              id="Address"
              class="form-control addres-text-field"
            />
          </div>
          <div className="d-flex justify-content-center">
            <Button
              style={{
                borderRadius: 10,
                margin: 30,
                width: "100%",
                backgroundColor: " #ff760d",
              }}
              className="d-flex  update-btn"
              variant="contained"
            >
              Update Information
            </Button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default Operation_hub;
