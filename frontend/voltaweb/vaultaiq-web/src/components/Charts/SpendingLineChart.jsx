import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-slate-900 px-3 py-2 rounded shadow text-sm">
      <p className="text-slate-300">{label}</p>
      <p className="font-semibold text-purple-400">₹{payload[0].value}</p>
    </div>
  );
};

export default function SpendingLineChart({ data }) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg h-80">
      <h3 className="font-semibold mb-3">Spending Trend</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>

          <XAxis dataKey="_id.month" tick={{ fill: "#CBD5E1", fontSize: 12 }} />
          <YAxis tick={{ fill: "#CBD5E1", fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="total"
            stroke="url(#lineGradient)"
            strokeWidth={4}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 7 }}
            isAnimationActive
            animationDuration={900}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
