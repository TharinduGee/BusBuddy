import React, { useState, useEffect } from "react";
import TripInformation from "./TripDesign"; 
import TripModal from "./TripModal";
import '../../Pages/Bus_Driver_Pages/DriverDashboard.css';

function TodayTrip() {
  const [tripData, setTripData] = useState([]);
  const [selectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [open, setOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

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
      <div className="get-trip">
        <h5 className="trip-date-text">Today Trips</h5>
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
              refId={data.tripId}
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

export default TodayTrip;
