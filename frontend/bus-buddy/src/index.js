import React from "react";
import ReactDOM from "react-dom/client";
import Landing_page from "./Pages/Landing_page";
import Login_page from "./Pages/login/Login_page";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrationPage from "./Pages/RegistraionPage/RegistrationPage";
import Admin_Dashboard from "./Pages/User_Dashboard/Admin_Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Landing_page/>} />
        <Route path="/Registration_page" element={<RegistrationPage />} />
        <Route path="/Login_page" element={<Login_page />} />
        <Route path="/Admin_Dashboard" element={<Admin_Dashboard/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);
