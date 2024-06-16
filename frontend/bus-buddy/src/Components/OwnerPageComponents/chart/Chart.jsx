import "./chart.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ aspect, title, data }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFBE8C" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FFBE8C" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFBE8C" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FFBE8C" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            strokeWidth={0}
            dataKey="name"
            stroke="gray"
            fontSize={12}
            margin={10}
          />
          <YAxis strokeWidth={0} fontSize={12} />

          <Tooltip />
          <Area
            type="monotone"
            dataKey="Income"
            stroke="#FFBE8C"
            strokeWidth={2}
            fillOpacity={0.5}
            fill="url(#total)"
          />
          <Area
            type="monotone"
            dataKey="Expenses"
            stroke="#FF760D"
            strokeWidth={2}
            fillOpacity={0}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
