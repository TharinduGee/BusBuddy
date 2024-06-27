import React, { useEffect, useState } from "react";
import avatar from "../../../Assets/Owner_assests/Avatar.png";
import "./BusInfo.css";
import RingLoader from "react-spinners/RingLoader";
import axios from "axios";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SidebarOwner from "./SidebarOwner";
import Swal from "sweetalert2";

function BusInfo() {
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
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [imageData, setImageData] = useState(null);
  const [data, setData] = useState({
    businessName: "",
    registrationNo: "",
    address: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/v1/business/getInfo`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response && response.data) {
            setData(response.data);
          }
        })
        .catch((error) => {
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
        data,
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
        <div className="op-main-container">
          <div className="d-flex flex-row align-items-center">
            <div className="d-flex flex-column align-items-center">
              <img
                className="op-prof-pic-set input-and-label"
                src={imageData}
                alt="User"
              />
              <div className="d-flex justify-content-center">
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <Button
                  style={{
                    backgroundColor: "Gray",
                    color: "white",
                    height: "50%",
                    width: "100%",
                  }}
                  variant="contained"
                  component="label"
                  htmlFor="icon-button-file"
                  startIcon={<AddIcon />}
                >
                  Select Image
                </Button>
                <Button
                  style={{
                    width: "50%",
                    height: "50%",
                    backgroundColor: "#ff760d",
                  }}
                  className="d-flex update-btn"
                  variant="contained"
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              </div>
            </div>
            <div className="d-flex flex-column mx-4">
              <label>{username}</label>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-between two-fields">
            <div className="input-and-label">
              <label className="form-label">Business Name*</label>
              <input
                type="text"
                id="businessName"
                className="form-control input-field"
                value={data.businessName}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-and-label">
              <label className="form-label">Registration ID*</label>
              <input
                type="text"
                id="registrationNo"
                className="form-control input-field"
                value={data.registrationNo}
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
              value={data.address}
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
              className="d-flex update-btn"
              variant="contained"
              onClick={handleUpdate}
              disabled={buttonDisabled}
            >
              Update Information
            </Button>
          </div>
        </div>
      </div>
    </SidebarOwner>
  );
}

export default BusInfo;
