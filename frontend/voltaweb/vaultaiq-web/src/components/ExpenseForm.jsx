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

    // Prevent negative values at input level
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
      className="bg-slate-800 p-4 rounded-lg mb-6 grid gap-3 md:grid-cols-5"
    >
      <input
        name="amount"
        type="number"
        min="0"
        step="0.01"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
        className="input"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="input"
      >
        {EXPENSE_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        name="merchant"
        placeholder="Merchant"
        value={form.merchant}
        onChange={handleChange}
        className="input"
      />

      <input
        name="note"
        placeholder="Note"
        value={form.note}
        onChange={handleChange}
        className="input"
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
        className="input"
      />

      <button className="md:col-span-5 bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md font-semibold">
        Add Expense
      </button>
    </form>
  );
}
