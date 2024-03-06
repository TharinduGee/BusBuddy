import React from "react";
import Sidebar from "../../Components/OwnerPageComponents/Sidebar";
import Chart from "../../Components/OwnerPageComponents/chart/Chart";
import "./Dashboard.css";
import IncomeExpensesViewer from "../../Components/OwnerPageComponents/Income_Expenses_Viewer/IncomeExpensesViewer";

function Dashboard() {
  const data = [
    { name: "Monday", Total: 1200, Expenses: 600 },
    { name: "Tuesday", Total: 2100, Expenses: 1000 },
    { name: "Wednsday", Total: 800, Expenses: 400 },
    { name: "Thursday", Total: 1600, Expenses: 900 },
    { name: "Friday", Total: 900, Expenses: 300 },
    { name: "Saturday", Total: 1700, Expenses: 1200 },
    { name: "Sunday", Total: 1100, Expenses: 400 },
  ];

  return (
    <Sidebar>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>Dashboad</h1>
        <div className="d-flex flex-wrap justify-content-center">
          <IncomeExpensesViewer />
          <IncomeExpensesViewer />
        </div>

        <div className="chart-container">
          <Chart title="Income" aspect={3 / 1} data={data} />
        </div>
      </div>
    </Sidebar>
  );
}

export default Dashboard;
