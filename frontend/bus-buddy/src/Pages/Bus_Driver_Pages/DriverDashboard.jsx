import React from "react";
import SidebarDriver from "../../Components/DriverPageComponents/SidebarDriver";
import TomorrowTrip from "../../Components/DriverPageComponents/tomorrowtrips";
import TodayTrip from "../../Components/DriverPageComponents/todaytrips";
import './DriverDashboard.css';
import SearchTrip from "../../Components/DriverPageComponents/searchtrip";


function DriverDashboard() {
  // State variables to manage trip data and selected date
  
  return (
    <div>
      <SidebarDriver>
        <div className="d-flex flex-column justify-content-start">
        <h1>Driver Dashboard</h1>
        </div>
        <br/>
        <div className="d-flex flex-row"> {/* Container for Today and Tomorrow */}
          <div>
             <TodayTrip/>
          </div>
          <div>
             <TomorrowTrip/>
          </div>
          <div> 
             <SearchTrip/>
          </div>
          
        </div>


      </SidebarDriver>
    </div>
          
  );
}

export default DriverDashboard;
