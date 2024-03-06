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
import SidebarDriver from "./Components/DriverPageComponents/SidebarDriver";
import Finacial_Center from "./Pages/Bus_Owner_Pages/Finacial_Center";
import Operation_hub from "./Pages/Bus_Owner_Pages/Operation_hub";
import Team_Directory from "./Pages/Bus_Owner_Pages/Team_Directory";
import FleetOperation from "./Pages/Bus_Owner_Pages/Fleet_Operation";
import Filelibrary from "./Pages/Bus_Owner_Pages/File_Library";
import TaxInsight from "./Pages/Bus_Owner_Pages/Tax_Insight";
import RouteManagement from "./Pages/Bus_Owner_Pages/Route_Management";
import TripManagement from "./Pages/Bus_Owner_Pages/Trip_Management";
import DriverDashboard from "./Pages/Bus_Driver_Pages/DriverDashboard";
import DriverBusManagement from "./Pages/Bus_Driver_Pages/DriverBusManagement";
import DriverFinancial from "./Pages/Bus_Driver_Pages/DriverFinancial";
import AddEmployee from "./Pages/Bus_Owner_Pages/Team_Directory_Add_Employee";
import Membership from "./Pages/Bus_Owner_Pages/Owner_profile_setting/Membership";
import ContactInfo from "./Pages/Bus_Owner_Pages/Owner_profile_setting/ContactInfo";
import Notifications from "./Pages/Bus_Owner_Pages/Owner_profile_setting/Notifications";
import PasswordSecurity from "./Pages/Bus_Owner_Pages/Owner_profile_setting/PasswordSecurity";


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
        <Route path="/SidebarDriver" element={<SidebarDriver />} />
        <Route path="/dashbord" element={<Dashboard />} />
        <Route path="/finacialcenter" element={<Finacial_Center />} />
        <Route path="/operationhub" element={<Operation_hub />} />
        <Route path="/teamdirectory" element={<Team_Directory />} />
        <Route path="/fleetoperation" element={<FleetOperation />} />
        <Route path="/filelibrary" element={<Filelibrary />} />
        <Route path="/taxinsights" element={<TaxInsight />} />
        <Route path="/routemanagement" element={<RouteManagement />} />
        <Route path="/tripmanagement" element={<TripManagement />} />
        <Route path="/DriverDashboard" element={<DriverDashboard/>} />
        <Route path="/DriverBusManagement" element={<DriverBusManagement/>}/>
        <Route path="/DriverFinancial" element={<DriverFinancial/>}/>
        <Route path="/teamdirectory/addemployee" element={<AddEmployee />} />
        
        <Route path="/membership" element={<Membership />} />
        <Route path="/contactInfo" element={<ContactInfo />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/passwordSecurity" element={<PasswordSecurity />} />


      

        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
