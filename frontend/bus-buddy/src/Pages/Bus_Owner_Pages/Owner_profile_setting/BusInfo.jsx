import React, { useEffect, useState } from "react";
import avatar from "../../../Assets/Owner_assests/Avatar.png";
import axios from "axios";
import "./BusInfo.css";
import Button from "@mui/material/Button";
import SidebarOwner from "./SidebarOwner";
import RingLoader from "react-spinners/RingLoader";
function BusInfo() {
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [Data, setData] = useState({
    businessName: "",
    registrationNo: "",
    // email: "",
    address: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .get(`${process.env.REACT_APP_API_URL}api/v1/business/getInfo`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setLoading(false);
          if (response && response.data) {
            setData(response.data);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    }
  }, [token]);

  useEffect(() => {
    if (username === "") {
      setLoading(true);
      axios
        .get(`${process.env.REACT_APP_API_URL}api/v1/user/getUsername`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          setLoading(false);
          setUsername(response.data);
        })
        .catch(function (error) {
          setLoading(false);
          console.error("Error posting data:", error);
        });
    }
  }, [username, token]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setButtonDisabled(false); // Enable the button when input changes
  };

  const handleUpdate = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/business/editBusinessInfo`,
        Data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("Update Successful");
        setButtonDisabled(true);
      })
      .catch((error) => {
        console.error("Update Failed:", error);
      });
  };

  return (
    <SidebarOwner>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="d-flex pb-3">Bus Business Information</h1>
        {loading ? (
          <div className="ringloader-position">
            <RingLoader
              loading={loading}
              color="orange"
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div className="op-main-container">
            <div className="d-flex flex-row align-items-center">
              <img
                className="op-prof-pic  input-and-label "
                src={avatar}
                alt="Add Icon"
              />
              <div className="d-flex flex-column mx-4">
                <label>{username}</label>
              </div>
            </div>
            <div className="d-flex flex-wrap  justify-content-between two-fields">
              <div className="input-and-label">
                <label className="form-label">Business Name*</label>
                <input
                  type="text"
                  id="businessName"
                  className="form-control input-field"
                  value={Data.businessName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-and-label">
                <label className="form-label">Registration ID*</label>
                <input
                  type="text"
                  id="registrationNo"
                  className="form-control input-field"
                  value={Data.registrationNo}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div className="input-and-label">
            <label className="form-label">Email*</label>
            <input
              type="text"
              id="email"
              className="form-control input-field"
              value={Data.email}
              onChange={handleInputChange}
            />
          </div> */}
            </div>
            <div className="input-and-label">
              <label className="form-label">Address*</label>
              <input
                type="text"
                id="address"
                className="form-control address-text-field"
                value={Data.address}
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
        )}
      </div>
    </SidebarOwner>
  );
}

export default BusInfo;
