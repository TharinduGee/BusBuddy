import React, { useState, useEffect } from "react";
import SidebarDriver from "../../Components/DriverPageComponents/SidebarDriver";
import TomorrowTrip from "./todaytrip";
import TripInformation from "../../Components/DriverPageComponents/Trip"; 
import './DriverDashboard.css';

function DriverDashboard() {
  // State variables to manage trip data and selected date
  const [tripData, setTripData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date

  useEffect(() => {
    // Function to fetch trip data based on the selected date
    const fetchTripData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get JWT token from local storage
      
        const response = await fetch(`http://localhost:8081/api/v1/trip/findForEmployee?date=${selectedDate}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include JWT token in headers
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setTripData(data); // Update trip data state with fetched data
        } else {
          // Handle error responses
          console.error('Failed to fetch trip data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    fetchTripData(); // Fetch trip data when component mounts or selected date changes
  }, [selectedDate]);

  return (
    <SidebarDriver>
      <div className="d-flex flex-column justify-content-start">
        <h1>Driver Dashboard</h1>
        <br/>
        <div className="d-flex flex-row"> {/* Container for Today and Tomorrow */}
          {/* Today Section */}
          <div>
          <label htmlFor="datePicker">Select Date:</label>
          <input 
            type="date" 
            id="datePicker" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
          />
          <div className="get-trip"> {/* Add right margin for spacing */}
            <h1> </h1>
            <div>
              {tripData.map((data, index) => (
                <TripInformation
                  key={index}
                  startplace={data.startplace}
                  endplace={data.endplace}
                  startTime={data.startTime}
                  endTime={data.endTime}
                  conductor={data.conductor}
                  status={data.status}
                />
              ))}
            </div>
          </div>
        </div> 
        <div>
         <TomorrowTrip/>
       </div>
        </div>
      </div>
    </SidebarDriver>
  );
}

export default DriverDashboard;
