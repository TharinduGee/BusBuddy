import React, { useState, useEffect } from "react";
import TripCard from "./TripDesign";
import TripModal from "./TripModal";
import "../../Pages/Bus_Driver_Pages/DriverDashboard.css";

function SearchTrip() {
  const [tripData, setTripData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today's date
  const [open, setOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}api/v1/trip/findForEmployee?date=${selectedDate}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setTripData(data);
        } else {
          console.error("Failed to fetch trip data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching trip data:", error);
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
    <div className="get-trip">
      <label className="trip-date-text" htmlFor="datePicker">
        Search by Date:{" "}
      </label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{ fontSize: "20px" }}
      />
      <h1></h1>
      <div>
        {tripData.map((data, index) => (
          <TripCard
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

export default SearchTrip;
