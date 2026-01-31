export default function BudgetCard({ budget }) {
  const percentage = Math.min(budget.percentageUsed, 100);

  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <div className="flex justify-between mb-1">
        <h3 className="font-semibold">{budget.category}</h3>
        <span className="text-sm text-slate-400">
          ₹{budget.spent} / ₹{budget.limit}
        </span>
      </div>

      <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
        <div
          className={`h-2 rounded-full ${
            budget.exceeded
              ? "bg-red-500"
              : "bg-indigo-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p
        className={`text-sm ${
          budget.exceeded ? "text-red-400" : "text-slate-400"
        }`}
      >
        {budget.exceeded
          ? `Exceeded by ₹${Math.abs(budget.remaining)}`
          : `Remaining ₹${budget.remaining}`}
      </p>
    </div>
  );
}
