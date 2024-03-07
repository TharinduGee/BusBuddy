import "./EmployeeCountCard.css";
import bus from "../../../Assets/Owner_assests/bus.png";
import employee from "../../../Assets/Owner_assests/employee.png";
import conductor from "../../../Assets/Owner_assests/conductor.png";
import driver from "../../../Assets/Owner_assests/driver.png";

const EmployeeCountCard = () => {
  return (
    <div className="Employeecount-container">
      <div className="employee-title ">Employee Count Details</div>

      <div className="icon-contianer-Employeecount">
        <div className="d-flex mx-3 mb-3">
          <img style={{ height: 60, width: 60 }} src={employee} alt="" />
          <div className="d-flex flex-column">
            <div className="employee-txt">Total Employees</div>
            <div className="employee-count ">67</div>
          </div>
        </div>

        <div className="d-flex mx-3 mb-3">
          <img style={{ height: 60, width: 60 }} src={driver} alt="" />
          <div className="d-flex flex-column">
            <div className="employee-txt">Drivers</div>
            <div className="employee-count ">24</div>
          </div>
        </div>

        <div className="d-flex mx-3 mb-3">
          <img style={{ height: 60, width: 60 }} src={conductor} alt="" />
          <div className="d-flex flex-column">
            <div className="employee-txt">Conductors</div>
            <div className="employee-count ">51</div>
          </div>
        </div>

        <div className="d-flex mx-3 mb-3">
          <img style={{ height: 60, width: 60 }} src={bus} alt="" />
          <div className="d-flex flex-column">
            <div className="employee-txt">Busses</div>
            <div className="employee-count ">34</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCountCard;
