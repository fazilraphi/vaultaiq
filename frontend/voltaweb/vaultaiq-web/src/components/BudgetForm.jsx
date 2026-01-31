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
      className="bg-slate-800 p-4 rounded-lg mb-6 grid gap-3 md:grid-cols-3"
    >
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input"
      >
        {EXPENSE_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="0"
        placeholder="Monthly Limit"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        required
        className="input"
      />

      <button className="bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold">
        Set Budget
      </button>
    </form>
  );
}
