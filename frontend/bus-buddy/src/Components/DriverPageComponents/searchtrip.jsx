import React, { useState, useEffect } from "react";
import TripInformation from "./TripDesign"; 
import '../../Pages/Bus_Driver_Pages/DriverDashboard.css';

function SearchTrip(){
  const [tripData, setTripData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const token = localStorage.getItem('token');
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

    fetchTripData();
  }, [selectedDate]);

  return (
    <div className="get-trip">
      <label className="trip-date-text" htmlFor="datePicker">Search by Date: </label>
      <input 
        type="date" 
        id="datePicker" 
        value={selectedDate} 
        onChange={(e) => setSelectedDate(e.target.value)} 
        style={{fontSize: '20px' }}
      />
      <h1></h1>
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
  );
}

export default SearchTrip;
