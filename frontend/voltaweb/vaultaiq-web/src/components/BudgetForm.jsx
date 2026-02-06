import { useState } from "react";
import { EXPENSE_CATEGORIES } from "../constants/expenseCategories";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Target, IndianRupee, Tag } from "lucide-react";

export default function BudgetForm({ month, year, onSave, onCancel }) {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">Category</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            <Tag className="w-5 h-5" />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-950/50 text-white border border-slate-700/50 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all hover:bg-slate-900/80"
          >
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Input
        label="Monthly Limit"
        type="number"
        min="1"
        placeholder="0.00"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        required
        icon={IndianRupee}
      />

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" className="flex-1" icon={Target}>
          Set Budget
        </Button>
      </div>
    </form>
  );
}
