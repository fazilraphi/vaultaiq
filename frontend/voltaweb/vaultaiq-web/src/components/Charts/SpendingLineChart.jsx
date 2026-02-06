import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-slate-900 px-3 py-2 rounded shadow text-sm">
      <p className="text-slate-400">{label}</p>
      <p className="font-semibold text-purple-400">₹{payload[0].value}</p>
    </div>
  );
};

export default function SpendingLineChart({ data = [] }) {
  // Guard against empty / undefined data
  if (!data.length) {
    return (
      <div className="h-full flex items-center justify-center text-slate-500 text-sm">
        No trend data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="month"
          tick={{ fill: "#CBD5E1", fontSize: 12 }}
          axisLine={{ stroke: "#334155" }}
          tickLine={false}
        />

        <YAxis
          tick={{ fill: "#CBD5E1", fontSize: 12 }}
          axisLine={{ stroke: "#334155" }}
          tickLine={false}
        />

        <Tooltip content={<CustomTooltip />} />

        <Line
          type="monotone"
          dataKey="total"
          stroke="url(#lineGradient)"
          strokeWidth={3}
          dot={{ r: 4, strokeWidth: 2, fill: "#0F172A" }}
          activeDot={{ r: 6 }}
          animationDuration={700}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
