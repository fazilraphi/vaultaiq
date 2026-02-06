import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#22C55E", "#6366F1", "#F97316", "#A855F7", "#EF4444"];

/**
 * SAFE tooltip — never renders objects
 */
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const { name, value } = payload[0];

  if (typeof value !== "number") return null;

  return (
    <div className="bg-slate-900 px-3 py-2 rounded shadow text-sm">
      <p className="text-slate-400">{name}</p>
      <p className="font-semibold text-emerald-400">₹{value}</p>
    </div>
  );
};

export default function CategoryDonutChart({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-slate-500 text-sm">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip content={<CustomTooltip />} />

        <Pie
          data={data}
          dataKey="total"
          nameKey="_id"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={2}
          isAnimationActive
          label={false} // 🔥 CRITICAL
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
