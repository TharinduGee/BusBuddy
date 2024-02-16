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
              <div>
                <label className="me-2">ID :</label>
                <label>5628463cd</label>
              </div>
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
          <div className="d-flex flex-wrap  justify-content-between two-fields">
            <div className="input-and-label">
              <label class="form-label">City*</label>
              <input type="text" id="City" class="form-control input-field" />
            </div>
            <div className="input-and-label">
              <label class="form-label">State/Province*</label>
              <input
                type="text"
                id="State_Province"
                class="form-control input-field"
              />
            </div>
          </div>

          <div className="input-and-label">
            <label class="form-label ">Zip Code*</label>
            <input
              type="text"
              id="Zip_Codess"
              class="form-control input-field"
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
