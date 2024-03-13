import React from 'react';
import SidebarDriver from "../../Components/DriverPageComponents/SidebarDriver";
import BarChart from '../../Components/DriverPageComponents/SalaryChart';

function DriverFinancial() {

  const data = [50, 80, 60, 20, 65];
 
  return (
    <div>
    <SidebarDriver>
      <div>
        <h1>Salary detailed reports</h1>
      </div>
      <div className="container">
        <h2 className="text-center">Average Monthly Salary</h2>
      </div>
      <BarChart data={data} />
    </SidebarDriver>
    </div>
  );
}

export default DriverFinancial;

