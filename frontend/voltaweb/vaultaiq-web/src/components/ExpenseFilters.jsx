import { EXPENSE_CATEGORIES } from "../constants/expenseCategories";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Filter, X, Calendar, Search } from "lucide-react";

export default function ExpenseFilters({ filters, onChange }) {
  return (
    <Card className="max-w-4xl mx-auto mb-8 bg-slate-900/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4 text-sm font-medium text-slate-400">
        <Filter className="w-4 h-4" />
        Filters
      </div>

      <div className="grid md:grid-cols-4 gap-4 items-end">
        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-xs text-slate-500 font-medium ml-1">Category</label>
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => onChange({ ...filters, category: e.target.value })}
              className="w-full bg-slate-800/50 text-white border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all hover:bg-slate-800"
            >
              <option value="">All Categories</option>
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* From Date */}
        <div className="space-y-1.5">
          <label className="text-xs text-slate-500 font-medium ml-1">From Date</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              value={filters.from}
              onChange={(e) => onChange({ ...filters, from: e.target.value })}
              className="w-full bg-slate-800/50 text-white border border-slate-700/50 rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
        </div>

        {/* To Date */}
        <div className="space-y-1.5">
          <label className="text-xs text-slate-500 font-medium ml-1">To Date</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              value={filters.to}
              onChange={(e) => onChange({ ...filters, to: e.target.value })}
              className="w-full bg-slate-800/50 text-white border border-slate-700/50 rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
        </div>

        {/* Reset */}
        <Button
          variant="secondary"
          onClick={() => onChange({ category: "", from: "", to: "" })}
          className="w-full h-[42px] justify-center"
          icon={X}
        >
          Reset
        </Button>
      </div>
    </Card>
  );
}
