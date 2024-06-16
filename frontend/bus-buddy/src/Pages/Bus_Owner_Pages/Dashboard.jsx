import React, { useState, useEffect } from "react";
import Chart from "../../Components/OwnerPageComponents/chart/Chart";
import "./Dashboard.css";
import IncomeExpensesViewer from "../../Components/OwnerPageComponents/Income_Expenses_Viewer/IncomeExpensesViewer";
import EmployeeCountCard from "../../Components/OwnerPageComponents/EmployeeCountCard/EmployeeCountCard";
import axios from "axios";
function Dashboard() {
  const [chartData, setChartData] = useState([]);
  const token = localStorage.getItem("token");
  const [income_expenses, setIncome_expenses] = useState({
    income: 0,
    expense: 0,
  });
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
  }, [token]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/v1/ledger/dailyFinance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIncome_expenses({
          income: response.data.income,
          expense: response.data.expense,
        });
      });
    axios
      .get(`http://localhost:8081/api/v1/ledger/getFinanceOfLastSevenDays`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const responseData = response.data;

        const formatter = new Intl.DateTimeFormat("en-US", { weekday: "long" });

        const transformedData = Object.keys(responseData).map((date) => {
          const dayOfWeek = formatter.format(new Date(date));
          return {
            name: dayOfWeek,
            Income: responseData[date].income,
            Expenses: Math.abs(responseData[date].expense),
          };
        });

        const reversedData = transformedData.reverse();

        setChartData(reversedData);
        console.log(chartData);
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
          <IncomeExpensesViewer data={income_expenses} />
        </div>
      </div>

      <div className="chart-container">
        {loadgraph && <Chart title="Income" aspect={3 / 1} data={chartData} />}
      </div>
    </div>
  );
}

export default Dashboard;
