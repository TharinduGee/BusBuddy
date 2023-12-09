import React from "react";
import "./SocialMediaBar.css";
import tiktok from "../Assets/tiktok_icon.png";
import intagram from "../Assets/instagram_icon.png";
import facebook from "../Assets/facebook_icon.png";
import youtube from "../Assets/youtube_icon.png";

function SocialMediaBar() {
  return (
    <div>
      <div className="social-media-bar d-flex justify-content-center align-items-center">
        <a href="tiktok">
          <img src={tiktok} className="App-logo" alt="logo" />
        </a>
        <a href="insta">
          <img src={intagram} className="App-logo" alt="logo" />
        </a>
        <a href="fb">
          <img src={facebook} className="App-logo" alt="logo" />
        </a>
        <a href="ytube">
          <img src={youtube} className="App-logo" alt="logo" />
        </a>
      </div>
    </div>
  );
}

export default SocialMediaBar;
