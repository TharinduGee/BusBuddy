import React from "react";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import avatar from "./../../Assets/Owner_assests/Avatar.png";
import TextField from "@mui/material/TextField";
import "./Operation_hub.css";

function Operation_hub() {
  return (
    <Sidebar>
      <div>
        <h1>Operation hubs</h1>
        <div className="op-main-container">
          <div className="d-flex flex-row align-items-center">
            <img className="op-prof-pic" src={avatar} alt="Add Icon" />
            <div className="d-flex flex-column mx-4">
              <label>NCG</label>
              <div>
                <label className="me-2">ID :</label>
                <label>5628463cd</label>
              </div>
            </div>
          </div>
          <div>
            <label class="form-label">Business Name*</label>
            <input
              type="text"
              id="BusinessName"
              class="form-control input-field"
            />
          </div>
          <div>
            <label class="form-label">Email*</label>
            <input type="text" id="Email" class="form-control input-field" />
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default Operation_hub;
