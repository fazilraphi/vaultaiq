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
    setMerchants(m.data);
    setInsights(i.data.insights || []);

    // 🔥 NORMALIZE TREND DATA (CRITICAL)
    const normalized = (t.data || []).map((item) => ({
      month: item._id?.month,
      total: item.total,
    }));

    setTrends(normalized);
  };

  return (
    <Layout>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Analytics</h2>
          <p className="text-slate-400">Deep dive into your financial data</p>
        </div>

        <div className="flex gap-3 bg-slate-900/50 p-2 rounded-xl border border-white/5">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="bg-slate-800 text-white rounded-lg pl-9 pr-6 py-2 text-sm"
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
            className="bg-slate-800 text-white rounded-lg px-3 py-2 text-sm w-20 text-center"
          />
        </div>
      </div>

      {/* SUMMARY */}
      {summary && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="relative overflow-hidden">
            <PieChart className="absolute right-4 top-4 w-24 h-24 opacity-10 text-indigo-500" />
            <p className="text-sm text-slate-400">Total Spent This Month</p>
            <p className="text-4xl font-bold text-white">
              ₹{summary.totalSpent.toLocaleString()}
            </p>
          </Card>

          <Card>
            <h3 className="flex items-center gap-2 font-semibold mb-3">
              <ArrowUpRight className="text-emerald-400" />
              Key Insights
            </h3>

            {insights.length === 0 ? (
              <p className="text-slate-500 italic text-sm">
                No insights available.
              </p>
            ) : (
              insights.slice(0, 3).map((i, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/30 border border-white/5 rounded-lg p-3 mb-2"
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
            <h3 className="font-bold mb-4">Spending Breakdown</h3>
            <div className="h-[300px]">
              <CategoryDonutChart data={summary.breakdown} />
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-4">Category Analysis</h3>
            <div className="h-[300px]">
              <CategoryBarChart data={summary.breakdown} />
            </div>
          </Card>
        </div>
      )}

      {/* 🔥 LINE CHART — ONLY RENDERS WHEN DATA EXISTS */}
      {trends.length > 0 && (
        <Card className="mb-8">
          <h3 className="font-bold mb-4">Spending Trends</h3>
          <div className="relative w-full h-[320px] min-h-[300px]">
            <SpendingLineChart data={trends} />
          </div>
        </Card>
      )}

      {/* MERCHANTS */}
      <Card>
        <h3 className="flex items-center gap-2 font-bold mb-4">
          <Store className="text-purple-400" />
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
