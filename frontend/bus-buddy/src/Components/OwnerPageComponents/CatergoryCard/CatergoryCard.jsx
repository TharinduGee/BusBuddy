import React, { useState } from "react";
import "./CatergoryCard.css";
import { useLocation } from "react-router-dom";

function CatergoryCard({ catorgory }) {
  return (
    <a href={"filelibrary/" + catorgory} className="card-main-container">
      <div>{catorgory}</div>
    </a>
  );
}

export default CatergoryCard;
