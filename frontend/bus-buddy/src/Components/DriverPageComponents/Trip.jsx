import React from 'react';
import './Trip.css';
import Location from "../../Assets/Driver/Location.png";
import ConductorIcon from "../../Assets/Driver/Conductor.png";
import StartTime from "../../Assets/Driver/StartTime.png";
import TimeDelay from "../../Assets/Driver/TimeDelay.png";

function TripInformation({ place, conductor, startTime, delayTime }) {
  return (
    <div className="trip-information-container"> {/* Apply CSS class for the shaded box */}
      <span className='trip-text'>Trip</span>
      <div className="trip-details">
        <div className="trip-detail">
          <img src={Location}/>
          <span className="trip-detail-label">Place:</span>
          <span className="trip-detail-value">{place}</span>
        </div>
        <div className="trip-detail">
          <img src={ConductorIcon}/>
          <span className="trip-detail-label">Conductor:</span>
          <span className="trip-detail-value">{conductor}</span>
        </div>
        <div className="trip-detail">
          <img src={StartTime}/>
          <span className="trip-detail-label">Start Time:</span>
          <span className="trip-detail-value">{startTime}</span>
        </div>
        <div className="trip-detail">
          <img src={TimeDelay}/>
          <span className="trip-detail-label">Delay Time:</span>
          <span className="trip-detail-value">{delayTime}</span>
        </div>
      </div>
    </div>
  );
}

export default TripInformation;
