import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { MONTHS } from "../constants/months";
import {
  getMonthlySummary,
  getSpendingTrends,
  getTopMerchants,
  getInsights,
} from "../api/analytics.api";

// ✅ FIXED RELATIVE IMPORTS
import CategoryDonutChart from "../components/Charts/CategoryDonutChart";
import CategoryBarChart from "../components/Charts/CategoryBarChart";
import SpendingLineChart from "../components/Charts/SpendingLineChart";

export default function Analytics() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, [month, year]);

 const fetchAnalytics = async () => {
  const [s, t, m, i] = await Promise.all([
    getMonthlySummary(year, month),
    getSpendingTrends(year, month),
    getTopMerchants(year, month),
    getInsights(year, month),
  ]);

  setSummary(s.data);
  setTrends(t.data);
  setMerchants(m.data);
  setInsights(i.data.insights);
};


  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Analytics</h2>

      {/* Month / Year Selector */}
      <div className="flex gap-3 mb-8">
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

      {/* SUMMARY CARD */}
      {summary && (
        <div className="bg-slate-800 p-6 rounded-lg mb-8">
          <h3 className="font-semibold mb-2 text-slate-300">
            Total Spent This Month
          </h3>
          <p className="text-4xl font-bold text-indigo-400">
            ₹{summary.totalSpent}
          </p>
        </div>
      )}

      {/* 🔥 CHARTS SECTION */}
      {summary && (
        <div className="grid gap-6 lg:grid-cols-2 mb-10">
          <CategoryDonutChart data={summary.breakdown} />
          <CategoryBarChart data={summary.breakdown} />
        </div>
      )}

      {trends.length > 0 && (
        <div className="mb-10">
          <SpendingLineChart data={trends} />
        </div>
      )}

      {/* TOP MERCHANTS */}
      <div className="bg-slate-800 p-6 rounded-lg mb-8">
        <h3 className="font-semibold mb-4">Top Merchants</h3>
        <ul className="space-y-2 text-sm">
          {merchants.map((m) => (
            <li key={m._id} className="flex justify-between text-slate-300">
              <span>{m._id}</span>
              <span className="font-medium">₹{m.total}</span>
            </li>
          ))}
        </ul>
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
