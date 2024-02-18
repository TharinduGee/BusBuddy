import React from 'react';

const BarChart = ({ data }) => {
  return (
    <div className="bar-chart">
      {data.map((item, index) => (
        <div key={index} className="bar" style={{ height: `${item}px` }}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default BarChart;
