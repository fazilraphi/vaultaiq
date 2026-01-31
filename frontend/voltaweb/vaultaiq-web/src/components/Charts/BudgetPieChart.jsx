import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366F1", "#EF4444"];

export default function BudgetPieChart({ spent, remaining }) {
  const data = [
    { name: "Spent", value: spent },
    { name: "Remaining", value: Math.max(remaining, 0) },
  ];

  return (
    <div className="bg-slate-800 p-4 rounded-lg h-72">
      <h3 className="font-semibold mb-3">Budget Usage</h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
