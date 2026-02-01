import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import { getDashboardData } from "../api/dashboard.api";

export default function Dashboard() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const [summary, setSummary] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const [s, b, i] = await getDashboardData(year, month);
    setSummary(s.data);
    setBudgets(b.data);
    setInsights(i.data.insights);
  };

  const totalBudget = budgets.reduce(
    (sum, b) => sum + b.limit,
    0
  );

  const overspent = budgets.filter((b) => b.exceeded);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <StatCard
          title="Spent This Month"
          value={`₹${summary?.totalSpent ?? 0}`}
        />

        <StatCard
          title="Total Budget"
          value={`₹${totalBudget}`}
          subtitle={`Remaining ₹${totalBudget - (summary?.totalSpent ?? 0)}`}
        />

        <StatCard title="Overspent Categories" value={overspent.length} />
      </div>

      {/* Overspent Alerts */}
      {overspent.length > 0 && (
        <div className="bg-red-900/30 border border-red-500 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-red-400 mb-2">
            Overspending Alert
          </h3>
          <ul className="list-disc list-inside text-sm">
            {overspent.map((b) => (
              <li key={b._id}>
                {b.category} exceeded by ₹{Math.abs(b.remaining)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <a
          href="/expenses"
          className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700"
        >
          ➕ Add Expense
        </a>
        <a
          href="/budgets"
          className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700"
        >
          🎯 Manage Budgets
        </a>
        <a
          href="/analytics"
          className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700"
        >
          📊 View Analytics
        </a>
      </div>

      {/* Insights Preview */}
      <div className="bg-slate-800 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Insights</h3>

        {insights.length === 0 ? (
          <p className="text-sm text-slate-400">
            No insights yet. Add some expenses to unlock insights.
          </p>
        ) : (
          <ul className="list-disc list-inside text-sm space-y-1">
            {insights.slice(0, 3).map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
