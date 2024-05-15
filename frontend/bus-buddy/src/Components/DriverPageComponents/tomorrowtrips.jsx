import React, { useState, useEffect } from "react";
import TripInformation from "./TripDesign"; 
import '../../Pages/Bus_Driver_Pages/DriverDashboard.css';

function TomorrowTrip() {
  // State variables to manage trip data and selected date
  const [tripData, setTripData] = useState([]);
  const [selectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Set the date to tomorrow
    return tomorrow.toISOString().split('T')[0]; // Default to tomorrow's date
  });

  useEffect(() => {
    // Function to fetch trip data for tomorrow
    const fetchTripData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get JWT token from local storage
        //const token = 'eyJhbGciOiJIUzI1NiJ9.eyJlbXBfaWQiOiIxIiwiYXVkIjoiMyIsInN1YiI6InBhYmFzYXJhQGdtYWlsLmNvbSIsImlhdCI6MTcxMDE1NDQ3NCwiZXhwIjoxNzEwMTk0MDc0fQ.HUgUMThkkBza5tmJxLEjkXnR9kusGcO5FqulrTK4bVU';
        const response = await fetch(`http://localhost:8081/api/v1/trip/findForEmployee?date=${selectedDate}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setTripData(data);
        } else {
          console.error('Failed to fetch trip data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    fetchTripData(); // Fetch trip data when component mounts
  }, [selectedDate]);

  return (
    <div className="d-flex flex-column justify-content-start">
      
      <div className="get-trip"> {/* Add right margin for spacing */}
      <h5 className="trip-date-text">Tomorrow Trips</h5>
        <div>
          {tripData.map((data, index) => (
            <TripInformation
              key={index}
              startplace={data.startDestination}
              endplace={data.endDestination}
              startTime={data.startTime}
              endTime={data.endTime}
              conductor={data.conductor}
              status={data.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TomorrowTrip;
