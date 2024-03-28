import React from "react";
import "./Boardingpage.css";
import "../../App.css";
import { Fade } from "react-awesome-reveal";
import Footer from "../../Components/OnBoaringComponents/Footer/Footer";
import Gallery from "../../Components/OnBoaringComponents/Gallery/Gallery";
import MessageBox from "../../Components/OnBoaringComponents/MessageBox/MessageBox";
import StepDetails from "../../Components/OnBoaringComponents/StepDetails/StepDetails";
import Header from "../../Components/OnBoaringComponents/Header/Header";
import PriceContainerGallery from "../../Components/OnBoaringComponents/PriceContainers/PriceContainerGallery";

function Boarding_Page() {
  return (
    <div className="d-flex flex-column align-items-center">
      <Header />
      <Fade direction="left" triggerOnce={true}>
        <div className="empower-your-fleet">
          Simplify Finances, Empower Your Fleet: The Bus Buddy Journey
        </div>
      </Fade>

      <Fade direction="left" triggerOnce={true}>
        <StepDetails />
      </Fade>
      <div className="empower-your-fleet">
        <Fade direction="right" triggerOnce={true}>
          Ready to Take Control? Explore Our BusBuddy Subscriptions
        </Fade>
      </div>
      <Fade direction="right" triggerOnce={true}>
        <PriceContainerGallery />
      </Fade>
      <div className="empower-your-fleet">
        <Fade direction="left" triggerOnce={true}>
          On the Move with BusBuddy: Inspiring stories, insights, and trends in
          bus transportation.
        </Fade>
      </div>
      <Fade direction="left" triggerOnce={true}>
        <Gallery />
      </Fade>
      <div className="empower-your-fleet">
        <Fade direction="right" triggerOnce={true}>
          On the Move with BusBuddy: Inspiring stories, insights, and trends in
          bus transportation.
        </Fade>
      </div>
      <Fade direction="right" triggerOnce={true}>
        <MessageBox />
      </Fade>
      <div className="footer-full">
        <Fade triggerOnce={true}>
          <Footer />
        </Fade>
      </div>
    </div>
  );
}

export default Boarding_Page;
