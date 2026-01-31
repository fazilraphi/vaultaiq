import {
  BarChart,
  Bar,
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
      <p className="font-semibold text-emerald-400">₹{payload[0].value}</p>
    </div>
  );
};

export default function CategoryBarChart({ data }) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg h-80">
      <h3 className="font-semibold mb-3">Category Comparison</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>
          </defs>

          <XAxis dataKey="_id" tick={{ fill: "#CBD5E1", fontSize: 12 }} />
          <YAxis tick={{ fill: "#CBD5E1", fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="total"
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
            isAnimationActive
            animationDuration={700}
            activeBar={{ fill: "#4ADE80" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
