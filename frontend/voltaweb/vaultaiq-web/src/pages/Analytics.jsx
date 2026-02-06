import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { MONTHS } from "../constants/months";
import {
  getMonthlySummary,
  getSpendingTrends,
  getTopMerchants,
  getInsights,
} from "../api/analytics.api";

import CategoryDonutChart from "../components/Charts/CategoryDonutChart";
import CategoryBarChart from "../components/Charts/CategoryBarChart";
import SpendingLineChart from "../components/Charts/SpendingLineChart";

import { Card } from "../components/ui/Card";
import { ArrowUpRight, Store, Calendar, PieChart } from "lucide-react";

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
    setInsights(i.data.insights || []);
  };

  return (
    <Layout>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Analytics</h2>
          <p className="text-slate-400">Deep dive into your financial data</p>
        </div>

        {/* MONTH / YEAR SELECT */}
        <div className="flex gap-3 bg-slate-900/50 p-2 rounded-xl border border-white/5">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <Calendar className="w-4 h-4" />
            </div>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="bg-slate-800 text-white rounded-lg pl-9 pr-8 py-2 text-sm focus:ring-2 focus:ring-indigo-500/50"
            >
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="bg-slate-800 text-white rounded-lg px-3 py-2 text-sm w-20 text-center focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
      </div>

      {/* SUMMARY */}
      {summary && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <PieChart className="w-32 h-32 text-indigo-500" />
            </div>

            <h3 className="text-sm text-slate-400 mb-1">
              Total Spent This Month
            </h3>
            <p className="text-4xl font-bold text-white">
              ₹{summary.totalSpent.toLocaleString()}
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <ArrowUpRight className="w-5 h-5 text-emerald-400" />
              Key Insights
            </h3>

            {insights.length === 0 ? (
              <p className="text-sm text-slate-500 italic">
                No insights available for this period.
              </p>
            ) : (
              insights.slice(0, 3).map((i, idx) => (
                <div
                  key={idx}
                  className="p-3 mb-2 rounded-lg bg-slate-800/30 border border-white/5"
                >
                  <p className="text-sm text-slate-300">{i}</p>
                </div>
              ))
            )}
          </Card>
        </div>
      )}

      {/* DONUT + BAR */}
      {summary && (
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <h3 className="text-lg font-bold text-white mb-4">
              Spending Breakdown
            </h3>
            <div className="h-[300px]">
              <CategoryDonutChart data={summary.breakdown} />
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-white mb-4">
              Category Analysis
            </h3>
            <div className="h-[300px]">
              <CategoryBarChart data={summary.breakdown} />
            </div>
          </Card>
        </div>
      )}

      {/* LINE CHART */}
      {trends.length > 0 && (
        <Card className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4">Spending Trends</h3>
          <div className="h-[300px]">
            <SpendingLineChart data={trends} />
          </div>
        </Card>
      )}

      {/* TOP MERCHANTS */}
      <Card>
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Store className="w-5 h-5 text-purple-400" />
          Top Merchants
        </h3>

        <table className="w-full text-sm">
          <tbody>
            {merchants.map((m) => (
              <tr key={m._id} className="border-b border-white/5">
                <td className="py-2 text-white">{m._id}</td>
                <td className="py-2 text-right text-slate-300">
                  ₹{m.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Layout>
  );
}
