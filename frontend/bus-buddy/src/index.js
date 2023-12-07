import React from "react";
import ReactDOM from "react-dom/client";
import Registration_page from "./Pages/Registration_page";
import Landing_page from "./Pages/Landing_page";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Landing_page />} />
        <Route path="/Registration_page" element={<Registration_page />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
