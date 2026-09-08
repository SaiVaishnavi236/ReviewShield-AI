import "./styles/charts.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";


const histogramData = [
  { range: "0-10", count: 4 },
  { range: "10-20", count: 8 },
  { range: "20-30", count: 16 },
  { range: "30-40", count: 27 },
  { range: "40-50", count: 45 },
  { range: "50-60", count: 70 },
  { range: "60-70", count: 92 },
  { range: "70-80", count: 128 },
  { range: "80-90", count: 188 },
  { range: "90-100", count: 145 },
];

const colors = [
  "#38bdf8",
  "#38bdf8",
  "#38bdf8",
  "#38bdf8",
  "#818cf8",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
];

function Charts() {
  return (
    <section className="analytics-container">
      <div className="chart-card">

        <h2>Confidence Score Distribution</h2>

        <p>
          Distribution of AI confidence scores for analyzed reviews.
        </p>

        <ResponsiveContainer width="100%" height={420}>
          <BarChart
            data={histogramData}
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.15}
            />

            <XAxis
              dataKey="range"
              tick={{ fill: "#CBD5E1", fontSize: 13 }}
              label={{
                value: "Confidence Score (%)",
                position: "insideBottom",
                offset: -8,
                fill: "#94A3B8",
              }}
            />

            <YAxis
              tick={{ fill: "#CBD5E1" }}
              label={{
                value: "Reviews",
                angle: -90,
                position: "insideLeft",
                fill: "#94A3B8",
              }}
            />

            <Tooltip
              cursor={{ fill: "rgba(99,102,241,.12)" }}
            />

            <Bar
              dataKey="count"
              radius={[8, 8, 0, 0]}
              animationDuration={1500}
            >
              {histogramData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={colors[index]}
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>

      </div>
    </section>
  );
}

export default Charts;