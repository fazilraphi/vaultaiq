import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { getDashboardData } from "../api/dashboard.api";
import {
  Wallet,
  Target,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
} from "lucide-react";

export default function Dashboard() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const [summary, setSummary] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [summaryRes, budgetsRes, insightsRes] = await getDashboardData(
        year,
        month
      );

      setSummary(summaryRes.data);
      setBudgets(budgetsRes.data);
      setInsights(insightsRes.data.insights || []);
    } catch (err) {
      console.error("Dashboard load failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = summary?.totalSpent ?? 0;
  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalRemaining = budgets.reduce((sum, b) => sum + b.remaining, 0);
  const overspent = budgets.filter((b) => b.exceeded);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh] text-slate-400 animate-pulse">
          Loading dashboard data...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-slate-400">Overview of your financial health</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900/50 px-4 py-2 rounded-full border border-white/5">
            <span>📅 {now.toLocaleString("default", { month: "long" })} {year}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                  <CreditCard className="w-6 h-6" />
                </div>
                {/* <Badge variant="primary">+12%</Badge> */}
              </div>
              <p className="text-slate-400 text-sm font-medium">Total Spent</p>
              <h3 className="text-3xl font-bold text-white mt-1">
                ₹{totalSpent.toLocaleString()}
              </h3>
            </div>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                  <Target className="w-6 h-6" />
                </div>
                <Badge variant={totalRemaining < 0 ? "danger" : "success"}>
                  {Math.round((totalSpent / (totalBudget || 1)) * 100)}% Used
                </Badge>
              </div>
              <p className="text-slate-400 text-sm font-medium">Total Budget</p>
              <h3 className="text-3xl font-bold text-white mt-1">
                ₹{totalBudget.toLocaleString()}
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Remaining: <span className={totalRemaining < 0 ? "text-red-400" : "text-emerald-400"}>
                  ₹{totalRemaining.toLocaleString()}
                </span>
              </p>
            </div>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <Badge variant="danger">{overspent.length} Alerts</Badge>
              </div>
              <p className="text-slate-400 text-sm font-medium">Overspent Categories</p>
              <h3 className="text-3xl font-bold text-white mt-1">
                {overspent.length}
              </h3>
            </div>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Alerts Section */}
            {overspent.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  Critical Alerts
                </h3>
                <div className="grid gap-4">
                  {overspent.map((b) => (
                    <div
                      key={b._id}
                      className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div>
                          <p className="font-medium text-white">{b.category}</p>
                          <p className="text-xs text-red-400">Budget Exceeded</p>
                        </div>
                      </div>
                      <p className="font-bold text-red-400">
                        -₹{Math.abs(b.remaining).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions (Replacing with better visual) */}
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/expenses"
                className="p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:bg-indigo-500/10 hover:border-indigo-500/30 hover:-translate-y-1 transition-all group"
              >
                <div className="p-3 bg-indigo-500/10 w-fit rounded-lg text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                  <Wallet className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-white">Add Expense</h4>
                <p className="text-xs text-slate-400 mt-1">Log a new transaction</p>
              </a>
              <a
                href="/budgets"
                className="p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:-translate-y-1 transition-all group"
              >
                <div className="p-3 bg-emerald-500/10 w-fit rounded-lg text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-white">Manage Budgets</h4>
                <p className="text-xs text-slate-400 mt-1">Set monthly limits</p>
              </a>
              <a
                href="/analytics"
                className="p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:bg-purple-500/10 hover:border-purple-500/30 hover:-translate-y-1 transition-all group"
              >
                <div className="p-3 bg-purple-500/10 w-fit rounded-lg text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-white">View Analytics</h4>
                <p className="text-xs text-slate-400 mt-1">Check spending trends</p>
              </a>
            </div>
          </div>

          {/* Side Column (Insights) */}
          <div className="lg:col-span-1">
            <Card>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-purple-400" />
                AI Insights
              </h3>

              <div className="space-y-4">
                {insights.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <div className="bg-slate-800/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <div className="w-6 h-6 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" />
                      {/* Or just static icon if not loading */}
                    </div>
                    <p>Add expenses to generate insights...</p>
                  </div>
                ) : (
                  insights.slice(0, 5).map((insight, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-800/50 border border-white/5 text-sm text-slate-300">
                      {insight}
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
