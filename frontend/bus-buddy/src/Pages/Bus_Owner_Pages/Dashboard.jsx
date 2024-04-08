import React, { useState, useEffect } from "react";
import Chart from "../../Components/OwnerPageComponents/chart/Chart";
import "./Dashboard.css";
import IncomeExpensesViewer from "../../Components/OwnerPageComponents/Income_Expenses_Viewer/IncomeExpensesViewer";
import EmployeeCountCard from "../../Components/OwnerPageComponents/EmployeeCountCard/EmployeeCountCard";
import axios from "axios";
function Dashboard() {
  const data = [
    { name: "Monday", Total: 1200, Expenses: 600 },
    { name: "Tuesday", Total: 2100, Expenses: 300 },
    { name: "Wednsday", Total: 800, Expenses: 1200 },
    { name: "Thursday", Total: 1600, Expenses: 300 },
    { name: "Friday", Total: 900, Expenses: 3000 },
    { name: "Saturday", Total: 1700, Expenses: 1200 },
    { name: "Sunday", Total: 1100, Expenses: 400 },
  ];
  const token = localStorage.getItem("token");
  const [count, setcount] = useState({
    totalCount: null,
    driverCount: null,
    conductorCount: null,
    busCount: null,
  });
  const [loadgraph, setLoadGraph] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/v1/bus/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setcount((prevCount) => ({
          ...prevCount,
          busCount: response.data,
        }));
        axios
          .get(`http://localhost:8081/api/v1/employee/countEmployee`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setcount((prevCount) => ({
              ...prevCount,
              totalCount: response.data.totalCount,
              driverCount: response.data.driverCount,
              conductorCount: response.data.conductorCount,
            }));

            setTimeout(function () {
              setLoadGraph(true);
            }, 90);
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1>Dashboard</h1>
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center  m-3">
          <EmployeeCountCard data={count} />
        </div>
        <div className="m-3">
          <IncomeExpensesViewer />
        </div>
      </div>

      <div className="chart-container">
        {loadgraph && <Chart title="Income" aspect={3 / 1} data={data} />}
      </div>
    </div>
  );
}

export default Dashboard;
