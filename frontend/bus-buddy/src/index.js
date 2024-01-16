import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Boarding_Page from "./Pages/on_Boarding_Page/Boarding_Page";
import Registration_Page from "./Pages/RegistraionPage/RegistrationPage";
import LoginPage from "./Pages/LoginPage/LoginPage"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Boarding_Page />} />
        <Route path="/signup" element={<Registration_Page />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
