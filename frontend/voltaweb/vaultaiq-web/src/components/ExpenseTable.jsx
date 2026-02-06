import { Trash2 } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

export default function ExpenseTable({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 bg-slate-900/30 rounded-2xl border border-white/5 border-dashed">
        <p>No expenses found. Add one to get started!</p>
      </div>
    )
  }

  return (
    <Card className="!p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-900/50 text-slate-400 uppercase tracking-wider text-xs font-semibold border-b border-white/5">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Category</th>
              <th className="p-4">Merchant</th>
              <th className="p-4">Note</th>
              <th className="p-4 text-right">Amount</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {expenses.map((e) => (
              <tr
                key={e._id}
                className="hover:bg-slate-800/30 transition-colors group"
              >
                <td className="p-4 text-slate-300 whitespace-nowrap">
                  {new Date(e.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </td>
                <td className="p-4">
                  <Badge variant="default" className="bg-indigo-500/10 text-indigo-300 border-indigo-500/20">
                    {e.category}
                  </Badge>
                </td>
                <td className="p-4 text-slate-300 font-medium">{e.merchant || "-"}</td>
                <td className="p-4 text-slate-500 max-w-[200px] truncate" title={e.note}>{e.note || "-"}</td>
                <td className="p-4 text-right font-bold text-white">
                  ₹{e.amount.toLocaleString()}
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => onDelete(e._id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Delete Expense"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
