import { useState } from "react";
import { EXPENSE_CATEGORIES } from "../constants/expenseCategories";

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    category: EXPENSE_CATEGORIES[0],
    merchant: "",
    note: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative values
    if (name === "amount" && Number(value) < 0) return;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(form.amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    onAdd({
      ...form,
      amount: Number(form.amount),
    });

    setForm({
      amount: "",
      category: EXPENSE_CATEGORIES[0],
      merchant: "",
      note: "",
      date: "",
    });
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
        Add New Expense
      </h3>

      <div className="flex flex-col gap-4">
        {/* Amount */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Amount</label>
          <input
            name="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="input w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input w-full"
          >
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Merchant */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Merchant</label>
          <input
            name="merchant"
            placeholder="e.g. Swiggy, Amazon"
            value={form.merchant}
            onChange={handleChange}
            className="input w-full"
          />
        </div>

        {/* Note */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Note</label>
          <input
            name="note"
            placeholder="Optional note"
            value={form.note}
            onChange={handleChange}
            className="input w-full"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Date</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
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
          Add Expense
        </button>
      </div>
    </form>
  );
}
