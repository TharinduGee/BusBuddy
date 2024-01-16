import React from "react";
import "./Boardingpage.css";

import "../../App.css";
import Footer from "../../Components/OnBoaringComponents/Footer/Footer";
import PriceContainer_3 from "../../Components/OnBoaringComponents/PriceContainers/PriceContainer_3";
import PriceContainer_1 from "../../Components/OnBoaringComponents/PriceContainers/PriceContainer_1";
import PriceContainer_2 from "../../Components/OnBoaringComponents/PriceContainers/PriceContainer_2";
import Gallery from "../../Components/OnBoaringComponents/Gallery/Gallery";
import MessageBox from "../../Components/OnBoaringComponents/MessageBox/MessageBox";
import ContactDetails from "../../Components/OnBoaringComponents/MessageBox/ContactDetails";
import StepDetails from "../../Components/OnBoaringComponents/StepDetails/StepDetails";
import Header from "../../Components/OnBoaringComponents/Header/Header";
import PriceContainerGallery from "../../Components/OnBoaringComponents/PriceContainers/PriceContainerGallery";

function Boarding_Page() {
  return (
    <div className="d-flex flex-column align-items-center">
      <Header />
      <div className="empower-your-fleet">
        Simplify Finances, Empower Your Fleet: The Bus Buddy Journey
      </div>
      <StepDetails />
      <div className="empower-your-fleet">
        Ready to Take Control? Explore Our BusBuddy Subscriptions
      </div>
      <PriceContainerGallery />
      <div className="empower-your-fleet">
        On the Move with BusBuddy: Inspiring stories, insights, and trends in
        bus transportation.
      </div>
      <Gallery />
      <div className="empower-your-fleet">
        On the Move with BusBuddy: Inspiring stories, insights, and trends in
        bus transportation.
      </div>
      <MessageBox />
      <div className="footer-full">
        <Footer />
      </div>
    </div>
  );
}

export default Boarding_Page;
