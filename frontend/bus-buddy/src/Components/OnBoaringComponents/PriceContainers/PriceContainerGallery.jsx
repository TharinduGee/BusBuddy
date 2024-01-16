import React from "react";
import PriceContainer_1 from "./PriceContainer_1";
import PriceContainer_2 from "./PriceContainer_2";
import PriceContainer from "./PriceContainer_3";

function PriceContainerGallery() {
  return (
    <div className="d-flex align-items-center mx-4 my-4">
      <div className="d-flex flex-wrap justify-content-center">
        <PriceContainer_1 />
        <PriceContainer_2 />
        <PriceContainer />
      </div>
    </div>
  );
}

export default PriceContainerGallery;
