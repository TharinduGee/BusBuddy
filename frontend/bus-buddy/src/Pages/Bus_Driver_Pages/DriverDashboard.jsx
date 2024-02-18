import React from "react";
import SidebarDriver from "../../Components/DriverPageComponents/SidebarDriver";
import TripInformation from "../../Components/DriverPageComponents/Trip";
import tripData from './tripData'; 

function DriverDashboard() {
  return (
    <SidebarDriver>
      <div className="d-flex flex-column justify-content-start">
        <h1>Driver Dashboard</h1>
        <br/>
        <div className="d-flex flex-row"> {/* Container for Today and Tomorrow */}
          {/* Today Section */}
          <div style={{ marginRight: '20px' }}> {/* Add right margin for spacing */}
            <h2>Today</h2>
            <div>
              {tripData.map((data, index) => (
                <TripInformation
                  key={index}
                  place={data.place}
                  conductor={data.conductor}
                  startTime={data.startTime}
                  delayTime={data.delayTime}
                />
              ))}
            </div>
          </div>
          {/* Tomorrow Section */}
          <div>
            <h2>Tomorrow</h2>
            <div>
              {tripData.map((data, index) => (
                <TripInformation
                  key={index}
                  place={data.place}
                  conductor={data.conductor}
                  startTime={data.startTime}
                  delayTime={data.delayTime}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarDriver>
  );
}

export default DriverDashboard;
