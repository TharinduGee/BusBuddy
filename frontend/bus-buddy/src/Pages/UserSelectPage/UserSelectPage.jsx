import React, { useState } from "react";
import axios from "axios";
import "./UserSelectPage.css";
import Briefcase from "../../Assets/Briefcase.png"
import SteeringWheel from "../../Assets/SteeringWheel.png"
import User from "../../Assets/User.png"
import Footer from "../../Components/OnBoaringComponents/Footer/Footer";

function UserSelectPage() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNo: "",
    confirm_password: "",
  });

  const [selectedRole, setSelectedRole] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handlePostRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/signUp",
        { ...user, role: selectedRole } // Include selected role in the request
      );

      console.log("Response:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="user_container_width shadow p-5 pt-3 m-5 rounded-4 p-4 border">
          <div className="justify-content-start">Back</div>
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

          {/* Create Account Button */}
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
