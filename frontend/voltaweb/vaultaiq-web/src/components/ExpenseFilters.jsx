import { EXPENSE_CATEGORIES } from "../constants/expenseCategories";

export default function ExpenseFilters({ filters, onChange }) {
  return (
    <div
      className="
        bg-slate-800 p-6 rounded-xl mb-8
        w-full max-w-xl
        mx-auto
      "
    >
      <h3 className="text-sm font-semibold text-slate-300 mb-6">
        Filter Expenses
      </h3>

      <div className="flex flex-col gap-4">
        {/* Category */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="input w-full"
          >
            <option value="">All Categories</option>
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* From Date */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">From</label>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => onChange({ ...filters, from: e.target.value })}
            className="input w-full"
          />
        </div>

        {/* To Date */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">To</label>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => onChange({ ...filters, to: e.target.value })}
            className="input w-full"
          />
        </div>

        {/* Reset */}
        <button
          onClick={() => onChange({ category: "", from: "", to: "" })}
          className="
            mt-2 w-full py-2 rounded-md
            border border-slate-600
            text-sm text-slate-300
            hover:bg-slate-700 transition
          "
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
