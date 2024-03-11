import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import avatar from "./../../Assets/Owner_assests/Avatar.png";
import axios from "axios";
import "./Operation_hub.css";
import Button from "@mui/material/Button";

function Operation_hub() {
  const token = localStorage.getItem("token");
  const [Data, setData] = useState({
    businessName: "Acme Corporation",
    registrationNo: "123456789",
    email: "info@acme.com",
    address: "123 Main St, Anytown, CA 12345",
  });

  const [formData, setFormData] = useState({
    businessName: "",
    registrationNo: "",
    email: "",
    address: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    // Fetch actual data if applicable, otherwise use exampleData
    // Example:
    if (token) {
      axios.get("http://localhost:8081/api/v1/business/getInfo", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        if (response && response.data) {
          setFormData(response.data);
          setButtonDisabled(true); // Disable button initially after fetching new data
        }
      })
      .catch(error => {
        console.error(error);
        // Handle error, if any
      });
    }
  }, [token]);

  useEffect(() => {
    const isFormChanged =
      formData.businessName !== Data.businessName ||
      formData.registrationNo !== Data.registrationNo ||
      formData.email !== Data.email ||
      formData.address !== Data.address;

    setButtonDisabled(!isFormChanged); // Disable the button if there are no changes
  }, [formData, Data]);

  useEffect(() => {
    setButtonDisabled(true); // Initially set the button to be disabled
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleUpdate = () => {
    axios.post("http://localhost:8081/api/v1/business/editBusinessInfo", formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      console.log("Update Successful");
      setData(formData); // Update the Data state with edited information
      setButtonDisabled(true); // Disable button after successful update
    })
    .catch(error => {
      console.error("Update Failed:", error);
      // Handle error, if any
    });
  };

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
              <label className="form-label">Business Name*</label>
              <input
                type="text"
                id="businessName"
                className="form-control input-field"
                value={formData.businessName || Data.businessName}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-and-label">
              <label className="form-label">Registration ID*</label>
              <input
                type="text"
                id="registrationNo"
                className="form-control input-field"
                value={formData.registrationNo || Data.registrationNo}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-and-label">
              <label className="form-label">Email*</label>
              <input
                type="text"
                id="email"
                className="form-control input-field"
                value={formData.email || Data.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="input-and-label">
            <label className="form-label">Address*</label>
            <input
              type="text"
              id="address"
              className="form-control address-text-field"
              value={formData.address || Data.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex justify-content-center">
            <Button
              style={{
                borderRadius: 10,
                margin: 30,
                width: "100%",
                backgroundColor: buttonDisabled ? "gray" : "#ff760d",
              }}
              className="d-flex  update-btn"
              variant="contained"
              onClick={handleUpdate}
              disabled={buttonDisabled}
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
