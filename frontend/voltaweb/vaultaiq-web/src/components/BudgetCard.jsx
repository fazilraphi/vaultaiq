import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function BudgetCard({ budget }) {
  const percentage = Math.min(budget.percentageUsed, 100);

  return (
    <Card className="group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-white group-hover:text-indigo-400 transition-colors">
            {budget.category}
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Limit: ₹{budget.limit.toLocaleString()}
          </p>
        </div>
        <Badge variant={budget.exceeded ? "danger" : "primary"}>
          {Math.round(budget.percentageUsed)}%
        </Badge>
      </div>

      <div className="relative w-full bg-slate-700/50 rounded-full h-3 mb-4 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${budget.exceeded
              ? "bg-red-500"
              : "bg-gradient-to-r from-indigo-500 to-purple-500"
            }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Spent: ₹{budget.spent.toLocaleString()}</span>
        <div className={`flex items-center gap-1.5 ${budget.exceeded ? "text-red-400" : "text-emerald-400"}`}>
          {budget.exceeded ? (
            <>
              <AlertTriangle className="w-4 h-4" />
              <span>Exceeded by ₹{Math.abs(budget.remaining).toLocaleString()}</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Remaining ₹{budget.remaining.toLocaleString()}</span>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
