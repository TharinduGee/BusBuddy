import React from "react";
import img1 from "../Assets/abc.png";
import img2 from "../Assets/bl.png";
import img3 from "../Assets/br1.png";
import img4 from "../Assets/bm1.png";
import Header from "../Components/Header.jsx";

function Landing_page() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
  };

  const imgStyle1 = {
    width: "100%", // Full width
    height: "auto",
    position: "relative",
  };

  const contentContainer = {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    zIndex: 1,
    color: "white", // Set text color
  };

  const textOnImage = {
    fontSize: "50px",
    fontWeight: "bold",
    height: "200px", // Set a fixed height
  };

  const middleText = {
    margin: "10px 0",
    fontSize: "20px",
  };

  const bottomText = {
    margin: "20px 0",
    fontSize: "20px",
  };

  const buttonStyle = {
    backgroundColor: "orange",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px 20px",
    cursor: "pointer",
    position: "relative",
    top: "50px", // Set the top position
  };

  const imagesContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  };

  const imgStyle2 = {
    width: "700px",
    height: "auto",
  };

  const imgStyle3 = {
    width: "400px",
    height: "auto",
    margin: "80px",
  };

  const imgStyle4 = {
    width: "800px",
    height: "auto",
  };

  return (
    <div>
      <Header />
      <div style={containerStyle}>
        <a href="">
          <img src={img1} alt="Image 1" style={imgStyle1} />
          <div style={contentContainer}>
            <div style={textOnImage}>
              GET YOUR TICKETS <br /> WITH JUST 3 STEPS
            </div>
            <div style={middleText}>
              The simplest way to book your bus tickets
            </div>
            <div style={bottomText}>Another line of text here</div>
            <button style={buttonStyle}>JOIN NOW</button>
          </div>
        </a>
        <div style={imagesContainerStyle}>
          <a href="">
            <img src={img2} alt="Image 2" style={imgStyle2} />
          </a>
          <a href="">
            <img src={img4} alt="Image 4" style={imgStyle3} />
          </a>
          <a href="">
            <img src={img3} alt="Image 3" style={imgStyle4} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Landing_page;
