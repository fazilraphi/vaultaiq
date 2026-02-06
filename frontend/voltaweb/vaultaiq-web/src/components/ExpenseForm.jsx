import { useState } from "react";
import { EXPENSE_CATEGORIES } from "../constants/expenseCategories";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Plus, IndianRupee, Tag, Store, FileText, Calendar } from "lucide-react";

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
    <Card className="max-w-xl mx-auto mb-8 bg-gradient-to-br from-slate-900 to-slate-900/50">
      <h3 className="text-lg font-heading font-medium text-white mb-6 flex items-center gap-2">
        <Plus className="w-5 h-5 text-indigo-400" />
        Add New Expense
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Amount"
          name="amount"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={form.amount}
          onChange={handleChange}
          required
          icon={IndianRupee}
        />

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">Category</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              <Tag className="w-5 h-5" />
            </div>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-slate-900/50 text-white border border-slate-700/50 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all hover:bg-slate-900/80"
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
          label="Merchant"
          name="merchant"
          placeholder="e.g. Starbucks, Uber"
          value={form.merchant}
          onChange={handleChange}
          icon={Store}
        />

        <Input
          label="Note"
          name="note"
          placeholder="Optional details"
          value={form.note}
          onChange={handleChange}
          icon={FileText}
        />

        <Input
          label="Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          icon={Calendar}
        />

        <Button type="submit" variant="primary" className="w-full mt-4" icon={Plus}>
          Add Expense
        </Button>
      </form>
    </Card>
  );
}
