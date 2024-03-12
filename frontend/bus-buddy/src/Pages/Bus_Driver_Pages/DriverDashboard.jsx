import React from "react";
import SidebarDriver from "../../Components/DriverPageComponents/SidebarDriver";
import TomorrowTrip from "../../Components/DriverPageComponents/tomorrowtrips";
import TodayTrip from "../../Components/DriverPageComponents/todaytrips";
import './DriverDashboard.css';
import SearchTrip from "../../Components/DriverPageComponents/searchtrip";


function DriverDashboard() {
  // State variables to manage trip data and selected date
<<<<<<< HEAD
  
=======
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

>>>>>>> d4964be41ceb321ff53453a233a7d5f917748552
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
