import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row justify-content-end py-5 px-5">
          <div className="col-12 col-md-4 d-flex justify-content-md-end">
            <div className="d-flex flex-column align-items-start">
              <div className="p-2 bold-text text-md-start">ASSISTANCE</div>
              <div className="p-2 normal-text text-md-start">
                Support Center
              </div>
              <div className="p-2 normal-text text-md-start">
                Cancellation Policy
              </div>
              <div className="p-2 normal-text text-md-start">
                Terms & Conditions
              </div>
              <div className="p-2 normal-text text-md-start mb-4">
                Privacy Policy
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-md-end">
            <div className="d-flex flex-column align-items-start">
              <div className="p-2 bold-text text-md-start">ABOUT</div>
              <div className="p-2 normal-text text-md-start">About Us</div>
              <div className="p-2 normal-text text-md-start">Blog</div>
              <div className="p-2 normal-text text-md-start mb-4">Location</div>
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-md-end">
            <div className="d-flex flex-column align-items-start">
              <div className="p-2 bold-text text-md-start">CONNECT WITH US</div>
              <div className="p-2 normal-text text-md-start">Instagram</div>
              <div className="p-2 normal-text text-md-start mb-4">Facebook</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
