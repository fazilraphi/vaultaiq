import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BudgetForm from "../components/BudgetForm";
import BudgetCard from "../components/BudgetCard";
import { getBudgets, setBudget } from "../api/budget.api";
import { MONTHS } from "../constants/months";

export default function Budgets() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchBudgets();
  }, [month, year]);

  const fetchBudgets = async () => {
    const res = await getBudgets(month, year);
    setBudgets(res.data);
  };

  const handleSaveBudget = async (data) => {
    await setBudget(data);
    fetchBudgets();
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Budgets</h2>

      {/* Month / Year Selector */}
      <div className="flex gap-3 mb-6">
        <select
  value={month}
  onChange={(e) => setMonth(Number(e.target.value))}
  className="input"
>
  {MONTHS.map((m) => (
    <option key={m.value} value={m.value}>
      {m.label}
    </option>
  ))}
</select>


        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="input w-28"
        />
      </div>

      <BudgetForm
        month={month}
        year={year}
        onSave={handleSaveBudget}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((b) => (
          <BudgetCard key={b._id} budget={b} />
        ))}
      </div>
    </Layout>
  );
}
