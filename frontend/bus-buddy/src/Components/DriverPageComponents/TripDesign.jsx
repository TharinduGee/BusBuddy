import "./TripDesign.css";
import icon2 from "../../Assets/Owner_assests/expenses_icon.png";
import Divider from "@mui/material/Divider";
import icon from "../../Assets/Owner_assests/income_icon.png";
import Location from "../../Assets/Driver/Location.png";
import ConductorIcon from "../../Assets/Driver/Conductor.png";
import StartTime from "../../Assets/Driver/StartTime.png";
import TimeDelay from "../../Assets/Driver/TimeDelay.png";


const TripViewer = ({startplace,endplace, conductor, startTime, endTime, status}) => {
  return (
    <div className="trip-container">
      <div></div>
      <div> 
        <div>
        <div className="icon-contianer-trip">
          <div className=" d-flex">
            <img style={{ height: 60, width: 60 }} src={Location} alt="" />
            <div className="d-flex flex-column">
              <div className="trip-txt">Start Destination</div>
              <div className="trip-value">{startplace}</div>
            </div>
          </div>
          <Divider
            className="divider-class"
            orientation="vertical"
            variant="middle"
            color="black"
            sx={{ height: 50, width: "1px", marginLeft: 2, marginRight: 2 }}
            flexItem
          />
          <div className="items-trip d-flex">
            <img style={{ height: 60, width: 60 }} src={Location} alt="" />
            <div className="d-flex flex-column">
              <div className="trip-txt">End Destination</div>
              <div className="trip-value">{endplace}</div>
            </div>
          </div>
        </div>
        </div>
        <div>
        <div className="icon-contianer-trip">
          <div className=" d-flex">
            <img style={{ height: 60, width: 60 }} src={StartTime} alt="" />
            <div className="d-flex flex-column">
              <div className="trip-txt">Start Time</div>
              <div className="trip-value">{startTime}</div>
            </div>
          </div>
          <Divider
            className="divider-class"
            orientation="vertical"
            variant="middle"
            color="black"
            sx={{ height: 50, width: "1px", marginLeft: 9, marginRight: 2 }}
            flexItem
          />
          <div className="items-trip d-flex">
            <img style={{ height: 60, width: 60 }} src={StartTime} alt="" />
            <div className="d-flex flex-column">
              <div className="trip-txt">End Time</div>
              <div className="trip-value">{endTime}</div>
            </div>
          </div>
        </div>
        <div className="icon-contianer-trip">
          <div className=" d-flex">
            <img style={{ height: 60, width: 60 }} src={ConductorIcon} alt="" />
            <div className="d-flex flex-column">
              <div className="trip-txt">Conductor</div>
              <div className="trip-value">{conductor}</div>
            </div>
          </div>
          <Divider
            className="divider-class"
            orientation="vertical"
            variant="middle"
            color="black"
            sx={{ height: 50, width: "1px", marginLeft: 9, marginRight: 2 }}
            flexItem
          />
          <div className="items-trip d-flex">
            <img style={{ height: 60, width: 60 }} src={icon2} alt="" />
            <div className="d-flex flex-column">
              <div className="trip-txt">Status</div>
              <div className="trip-value">{status}</div>
            </div>
          </div>
        </div>
        </div>
      </div>
      
    </div>
    
  );
};

export default TripViewer;
