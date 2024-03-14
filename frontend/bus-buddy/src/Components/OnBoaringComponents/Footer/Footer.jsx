import React from "react";
import "./Footer.css";
import playstore from "../../../Assets/appstore.png";
import googlestore from "../../../Assets/googleplay (1).png";
import Divider from "@mui/material/Divider";
import youtube from "../../../Assets/youtube_icon_onboarding.png";
import twitter from "../../../Assets/twitter_icon_onboarding.png";
import instagram from "../../../Assets/instagram_icon.png";
import website from "../../../Assets/website_icon_onboarding.png";

function Footer() {
  return (
    <div className="footerbg">
      <div className="d-flex flex-row flex-wrap  justify-content-around">
        <div className="d-flex flex-column">
          <div className="footer-content-head-text">Company</div>
          <a href="" className="footer-content-text">
            About Us
          </a>
          <a href="" className="footer-content-text">
            Blogs
          </a>
          <a href="" className="footer-content-text">
            Careers
          </a>
          <a href="" className="footer-content-text">
            Contact Us
          </a>
        </div>

        <div className="d-flex flex-column">
          <div className="footer-content-head-text">Support</div>
          <a href="" className="footer-content-text">
            Help Center
          </a>
          <a href="" className="footer-content-text">
            Safety Center
          </a>
          <a href="" className="footer-content-text">
            Community
          </a>
        </div>
        <div className="d-flex flex-column">
          <div className="footer-content-head-text">Legal</div>
          <a href="" className="footer-content-text">
            Cookies Policy
          </a>
          <a href="" className="footer-content-text">
            Privacy Policy
          </a>
          <a href="" className="footer-content-text">
            Terms of Service
          </a>
        </div>
        <div className="justify-content-around">
          <div className="footer-content-head-text">Install</div>
          <div className="d-flex flex-column">
            <a href="playstore">
              <img className="store-btn" alt="" src={playstore} />
            </a>
            <a href="googlestore">
              <img className="store-btn" alt="" src={googlestore} />
            </a>
          </div>
        </div>
      </div>
      <div className="divider">
        <Divider
          className="my-4"
          variant="middle"
          sx={{ backgroundColor: "white", height: 2, opacity: 0.1 }}
        />
      </div>

      <div className="d-flex flex-row justify-content-around mx-4 ">
        <div className="all-rights-reserved">© 2023 - All rights reserved</div>
        <div className="all-rights-reserved"></div>
        <div className="all-rights-reserved"></div>
        <div className="all-rights-reserved"></div>
        <div className="d-flex flex-row">
          <a href="insta">
            <img className="social-btn px-2" alt="" src={instagram} />
          </a>
          <a href="web">
            <img className="social-btn px-2" alt="" src={website} />
          </a>
          <a href="twitter">
            <img className="social-btn px-2" alt="" src={twitter} />
          </a>
          <a href="youtube">
            <img className="social-btn px-2" alt="" src={youtube} />
          </a>
        </div>
      </div>

      {/* <div className="frame-parent2">
        <div className="frame-parent3">
          <div className="frame-parent4">
            <div className="frame-parent5">
              <div className="support-parent">
                <div>Company</div>
                <div className="help-center">About Us</div>
                <div className="help-center">Blog</div>
                <div className="about-us">Careers</div>
                <div className="about-us">Contact Us</div>
              </div>
              <div className="support-parent">
                <div className="help-center">Support</div>
                <div className="help-center">Help Center</div>
                <div className="help-center">Safety Center</div>
                <div className="help-center">Community</div>
              </div>
              <div className="support-parent">
                <div className="company">Legal</div>
                <div className="help-center">Cookies Policy</div>
                <div className="help-center">Privacy Policy</div>
                <div className="cookies-policy">Terms of Service</div>
              </div>
            </div>
            <div className="support-parent">
              <div className="support-parent">Install App</div>
              <img className="artwork-icon1" alt="" src={playstore} />
              <img className="artwork-icon1" alt="" src={googlestore} />
            </div>
          </div>
          <div className="divider-parent">
            <img className="divider-icon" alt="" src={divider} />
            <div className="all-rights-reserved-parent">
              <div className="all-rights-reserved1">
                © 2023 - All rights reserved
              </div>
              <div className="frame-parent6">
                <div className="bg-parent2">
                  <img className="bg-icon4" alt="" src="/bg@2x.png" />
                  <img className="path-icon4" alt="" src="/path@2x.png" />
                </div>
                <div className="bg-parent2">
                  <img className="bg-icon4" alt="" src="/bg@2x.png" />
                  <img className="path-icon5" alt="" src="/path@2x.png" />
                </div>
                <div className="bg-parent2">
                  <img className="bg-icon4" alt="" src="/bg@2x.png" />
                  <img className="path-icon6" alt="" src="/path@2x.png" />
                </div>
                <div className="bg-parent2">
                  <img className="bg-icon4" alt="" src="/bg@2x.png" />
                  <img className="path-icon7" alt="" src="/path@2x.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="frame-inner" />
      </div> */}
    </div>
  );
}

export default Footer;
