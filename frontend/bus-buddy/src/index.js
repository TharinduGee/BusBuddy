import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Boarding_Page from "./Pages/on_Boarding_Page/Boarding_Page";
import Registration_Page from "./Pages/RegistraionPage/RegistrationPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import WelcomeUser from "./Pages/WelcomeUser";
import UserSelectPage from "./Pages/UserSelectPage/UserSelectPage";
import Dashboard from "./Pages/Bus_Owner_Pages/Dashboard";
import Sidebar from "./Components/OwnerPageComponents/Sidebar";
import Finacial_Center from "./Pages/Bus_Owner_Pages/Finacial_Center";
import Operation_hub from "./Pages/Bus_Owner_Pages/Operation_hub";
import Team_Directory from "./Pages/Bus_Owner_Pages/Team_Directory";
import FleetOperation from "./Pages/Bus_Owner_Pages/Fleet_Operation";
import Filelibrary from "./Pages/Bus_Owner_Pages/File_Library";
import TaxInsight from "./Pages/Bus_Owner_Pages/Tax_Insight";
import RouteManagement from "./Pages/Bus_Owner_Pages/Route_Management";
import TripManagement from "./Pages/Bus_Owner_Pages/Trip_Management";
import AddEmployee from "./Pages/Bus_Owner_Pages/Team_Directory_Add_Employee";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Boarding_Page />} />
        <Route path="/signup" element={<Registration_Page />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<WelcomeUser />} />
        <Route path="/userrole" element={<UserSelectPage />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/dashbord" element={<Dashboard />} />
        <Route path="/finacialcenter" element={<Finacial_Center />} />
        <Route path="/operationhub" element={<Operation_hub />} />
        <Route path="/teamdirectory" element={<Team_Directory />} />
        <Route path="/fleetoperation" element={<FleetOperation />} />
        <Route path="/filelibrary" element={<Filelibrary />} />
        <Route path="/taxinsights" element={<TaxInsight />} />
        <Route path="/routemanagement" element={<RouteManagement />} />
        <Route path="/tripmanagement" element={<TripManagement />} />
        <Route path="/teamdirectory/addemployee" element={<AddEmployee />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
