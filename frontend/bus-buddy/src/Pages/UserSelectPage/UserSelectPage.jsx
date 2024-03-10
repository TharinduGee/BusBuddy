import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserSelectPage.css";
import Briefcase from "../../Assets/Briefcase.png"
import SteeringWheel from "../../Assets/SteeringWheel.png"
import User from "../../Assets/User.png"
import Footer from "../../Components/OnBoaringComponents/Footer/Footer";
import {useLocation} from 'react-router-dom';

function UserSelectPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNo: "",
    role: "",
  });

  useEffect(() => {
    if (location.state && location.state.userpre) {
      setUser(location.state.userpre);
    }
  }, [location.state]);


  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSelect = (role) => {

    
    setSelectedRole(role);
    setUser({
      ...user,
      role: mapRoleToApiRole(role), 
    });
  };

  const mapRoleToApiRole = (role) => {
    switch (role) {
      case "Owner":
        return "ROLE_ADMIN";
      case "Driver":
        return "ROLE_DRIVER";
      case "Conductor":
        return "ROLE_CONDUCTOR";
      default:
        return "";
    }
  };

  const handlePostRequest = async () => {
    try {
      console.log("userdata",user);
      const response = await axios.post(
        "http://localhost:8081/api/v1/signUp",
        user 
      );
      console.log("Response:", response.data);
      navigate('/login'); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="user_container_width shadow p-5 pt-3 m-5 rounded-4 p-4 border">
          <button className="back-button" onClick={() => navigate('/signup')}>Back</button>
          <div className="userrole-text-main">Select User Role</div>
          
          <div className="row d-flex justify-content-around">
            <div className="col d-flex justify-content-center ">
              <button 
                className={`user-container d-flex flex-column justify-content-center ${selectedRole === "Owner" ? "selected" : ""}`}
                onClick={() => handleRoleSelect("Owner")}
              >
                <div className="d-flex flex-column justify-content-center text-center ">
                  <div className="row d-flex justify-content-center">
                    <img
                      className=" icon-style mb-4"
                      alt="briefcaseIcon"
                      src={Briefcase}
                    />
                  </div>
                  <div className="row">
                    <div className="role-text">Owner</div>
                  </div>
                </div>
              </button>
            </div>

            <div className="col d-flex justify-content-center ">
              <button 
                className={`user-container d-flex flex-column justify-content-center ${selectedRole === "Driver" ? "selected" : ""}`}
                onClick={() => handleRoleSelect("Driver")}
              >
                <div className="d-flex flex-column justify-content-center text-center ">
                  <div className="row d-flex justify-content-center">
                    <img
                      className=" icon-style mb-4"
                      alt="steeringWheelIcon"
                      src={SteeringWheel}
                    />
                  </div>
                  <div className="row">
                    <div className="role-text">Driver</div>
                  </div>
                </div>
              </button>
            </div>

            <div className="col d-flex justify-content-center ">
              <button 
                className={`user-container d-flex flex-column justify-content-center ${selectedRole === "Conductor" ? "selected" : ""}`}
                onClick={() => handleRoleSelect("Conductor")}
              >
                <div className="d-flex flex-column justify-content-center text-center ">
                  <div className="row d-flex justify-content-center">
                    <img
                      className=" icon-style mb-4"
                      alt="userIcon"
                      src={User}
                    />
                  </div>
                  <div className="row">
                    <div className="role-text">Conductor</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          
          <div className="d-grid gap-2 mt-3 d-md-flex justify-content-center">
            <button
              className="btn me-md-2 create-btn"
              type="button"
              onClick={handlePostRequest}
            >
              CREATE ACCOUNT
            </button>
          </div>
          
        </div>
      </div>
      <div className="footer-full">
        <Footer />
      </div>
    </div>
  );
}

export default UserSelectPage;
