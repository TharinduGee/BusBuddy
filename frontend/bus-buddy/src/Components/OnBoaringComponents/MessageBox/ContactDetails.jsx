import React from "react";
import "./ContactDetails.css";
import EmailIcon from "../../../Assets/Email_icon.png";
import LocationIcon from "../../../Assets/Location_Icon.png";
import PhoneIcon from "../../../Assets/Phone_Icon.png";
function ContactDetails() {
  return (
    <div className="d-flex flex-column flex-shrink justify-content-center align-items-start main-bg ">
      <div className="d-flex flex-row align-items-center py-2  ">
        <div>
          <img
            className="d-flex flex-shrink icon-email"
            alt="EmailIcon"
            src={EmailIcon}
          />
        </div>
        <div className="d-flex flex-column ">
          <div className="main-header">Email</div>
          <div className="sub-para">Bussbuddy@gmail.com</div>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center py-2 ">
        <div>
          <img
            className="d-flex flex-shrink icon-loc"
            alt="LocationIcon"
            src={LocationIcon}
          />
        </div>
        <div className="d-flex flex-column  py-2">
          <div className="main-header">Address</div>
          <div className="sub-para">
            123 Mockingbird Lane, Suite 456, Fictionville, FA 54321, Sri Lanka
          </div>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center py-2 ">
        <div>
          <img
            className="d-flex flex-shrink icon-phone"
            alt="PhoneIcon"
            src={PhoneIcon}
          />
        </div>
        <div className="d-flex flex-column">
          <div className="main-header">Call Us</div>
          <div className="sub-para">+94 070 255 8555</div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
