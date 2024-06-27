import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarOwner from "./SidebarOwner";
import RingLoader from "react-spinners/RingLoader";

function ContactInfo() {
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .get(`${process.env.REACT_APP_API_URL}api/v1/user/getUserDetails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          setLoading(false);
          setUserData(response.data);
          console.log("Data successfully fetched:", response.data);
        })
        .catch(function (error) {
          setLoading(false);
          console.error("Error fetching user data:", error);
        });
    } else {
      setLoading(false);
      console.error("No token found in local storage");
    }
  }, [token]);

  return (
    <SidebarOwner>
      <div className="d-flex flex-row mt-2 justify-content-start">
        <h1>Contact Info</h1>
      </div>
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
        <div className="borderdcontainer border border-2 border-dark rounded-4 m-5">
          <h2 className="m-3">Account</h2>
          <div className="row mt-2 p-3">
            <div className="col-12 col-md-2">
              <span className="p-3">User ID</span>
            </div>
            <div className="col-12 col-md-10">
              <span>{userData.id}</span>
            </div>
          </div>
          <div className="row mt-2 p-3">
            <div className="col-12 col-md-2">
              <span className="p-3">First Name</span>
            </div>
            <div className="col-12 col-md-4">
              <span>{userData.firstName}</span>
            </div>
            <div className="col-12 col-md-2">
              <span className="p-3">Last Name</span>
            </div>
            <div className="col-12 col-md-4">
              <span>{userData.lastName}</span>
            </div>
          </div>
          <div className="row mt-2 p-3">
            <div className="col-12 col-md-2">
              <span className="p-3">Email</span>
            </div>
            <div className="col-12 col-md-10">
              <span>{userData.email}</span>
            </div>
          </div>
          <div className="row mt-2 p-3">
            <div className="col-12 col-md-2">
              <span className="p-3">Phone</span>
            </div>
            <div className="col-12 col-md-10">
              <span>{userData.mobileNo}</span>
            </div>
          </div>
        </div>
      )}
    </SidebarOwner>
  );
}

export default ContactInfo;
