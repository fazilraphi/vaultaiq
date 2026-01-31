import { EXPENSE_CATEGORIES } from "../constants/expenseCategories";

export default function ExpenseFilters({ filters, onChange }) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg mb-6 grid gap-3 md:grid-cols-4">
      <select
        value={filters.category}
        onChange={(e) =>
          onChange({ ...filters, category: e.target.value })
        }
        className="input"
      >
        <option value="">All Categories</option>
        {EXPENSE_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={filters.from}
        onChange={(e) =>
          onChange({ ...filters, from: e.target.value })
        }
        className="input"
      />

      <input
        type="date"
        value={filters.to}
        onChange={(e) =>
          onChange({ ...filters, to: e.target.value })
        }
        className="input"
      />

      <button
        onClick={() =>
          onChange({ category: "", from: "", to: "" })
        }
        className="bg-slate-700 hover:bg-slate-600 rounded-md"
      >
        Reset
      </button>
    </div>
  );
}
