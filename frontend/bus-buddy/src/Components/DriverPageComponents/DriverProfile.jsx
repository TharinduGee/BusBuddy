import React from "react";
import avatar from "../../Assets/Owner_assests/Avatar.png"
import './DriverProfile.css'

function profile () {
  

  return (
    <div className="d-flex flex-wrap justify-content align-items-center">
          <div>
            <img className="p-photo-view" src={avatar} alt="Add Icon" />
          </div>

          <div className="d-flex flex-column">
            <lable className="p-profession">Driver</lable>
            <lable class="p-name-avatar">Kamal Fernando </lable>
            <div className="p-normal-details">
              <lable>ID :</lable>
              <lable> PV13289290</lable>
            </div>

          </div>
          
        </div>
  )

}

export default profile ; 