import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { CHART_COLORS } from "../../constants/chartColors";
import CustomTooltip from "./CustomTooltip";

export default function CategoryDonutChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data || !data.length) {
    return (
      <div className="bg-slate-800 p-4 rounded-lg h-80 flex items-center justify-center">
        <p className="text-slate-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-4 rounded-lg h-80">
      <h3 className="font-semibold mb-3">Spending by Category</h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="_id"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            activeIndex={activeIndex}
            activeShape={(props) => ({
              ...props,
              outerRadius: props.outerRadius + 12,
            })}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            isAnimationActive
            animationDuration={900}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
