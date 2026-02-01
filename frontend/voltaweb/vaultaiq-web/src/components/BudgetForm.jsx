import { useState } from "react";
import { EXPENSE_CATEGORIES } from "../constants/expenseCategories";

export default function BudgetForm({ month, year, onSave }) {
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [limit, setLimit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(limit) <= 0) {
      alert("Budget must be greater than 0");
      return;
    }

    onSave({
      category,
      limit: Number(limit),
      month,
      year,
    });

    setLimit("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-slate-800 p-6 rounded-xl mb-8
        w-full max-w-xl
        mx-auto
      "
    >
      <h3 className="text-sm font-semibold text-slate-300 mb-6">
        Set Monthly Budget
      </h3>

      <div className="flex flex-col gap-4">
        {/* Category */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input w-full"
          >
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Monthly Limit */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Monthly Limit
          </label>
          <input
            type="number"
            min="1"
            placeholder="Enter amount"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            required
            className="input w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            mt-2 w-full py-2 rounded-md
            bg-indigo-600 hover:bg-indigo-700
            font-semibold transition
          "
        >
          Set Budget
        </button>
      </div>
    </form>
  );
}
