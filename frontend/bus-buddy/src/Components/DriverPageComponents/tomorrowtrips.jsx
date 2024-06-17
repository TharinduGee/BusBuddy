import React, { useState, useEffect } from "react";
import TripInformation from "./TripDesign"; 
import TripModal from "./TripModal";
import '../../Pages/Bus_Driver_Pages/DriverDashboard.css';

function TomorrowTrip() {
  // State variables to manage trip data and selected date
  const [tripData, setTripData] = useState([]);
  const [selectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Set the date to tomorrow
    return tomorrow.toISOString().split('T')[0]; // Default to tomorrow's date
  });

  const [open, setOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    // Function to fetch trip data for tomorrow
    const fetchTripData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get JWT token from local storage
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

  const handleOpen = (trip) => {
    setSelectedTrip(trip);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTrip(null);
  };

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
              conductor={data.employeeName}
              status={data.status}
              onClick={() => handleOpen(data)}
            />
          ))}
        </div>
      </div>
      {selectedTrip && (
        <TripModal
          open={open}
          handleClose={handleClose}
          refId={selectedTrip.tripId}
        />
      )}
    </div>
  );
}

export default TomorrowTrip;
