import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BudgetForm from "../components/BudgetForm";
import BudgetCard from "../components/BudgetCard";
import { getBudgets, setBudget } from "../api/budget.api";
import { MONTHS } from "../constants/months";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Card } from "../components/ui/Card";
import { Plus, Calendar, Target, Wallet, AlertTriangle } from "lucide-react";

export default function Budgets() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [budgets, setBudgets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBudgets();
  }, [month, year]);

  const fetchBudgets = async () => {
    const res = await getBudgets(month, year);
    setBudgets(res.data);
  };

  const handleSaveBudget = async (data) => {
    await setBudget(data);
    setIsModalOpen(false);
    fetchBudgets();
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const progress = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold font-heading text-white">Budgets</h2>
          <p className="text-slate-400">Manage your monthly spending limits</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-3 bg-slate-900/50 p-1.5 rounded-xl border border-white/5 items-center">
            <div className="pl-3 text-slate-500">
              <Calendar className="w-4 h-4" />
            </div>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="bg-transparent text-white border-0 text-sm focus:ring-0 cursor-pointer hover:text-indigo-400 transition"
            >
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value} className="bg-slate-900">
                  {m.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="bg-transparent text-white border-0 text-sm w-16 focus:ring-0 text-center hover:text-indigo-400 transition"
            />
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            icon={Plus}
            className="shadow-indigo-500/20 py-3 px-2 text-sm h-9"
          >
            New Budget
          </Button>
        </div>
      </div>

      {/* Summary Header */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="relative overflow-hidden">
          <div className="absolute right-0 top-0 p-4 opacity-5">
            <Target className="w-24 h-24" />
          </div>
          <p className="text-sm font-medium text-slate-400">Total Budget</p>
          <h3 className="text-3xl font-bold text-white mt-1">₹{totalBudget.toLocaleString()}</h3>
          <div className="mt-4 w-full bg-slate-800 rounded-full h-1.5">
            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute right-0 top-0 p-4 opacity-5">
            <Wallet className="w-24 h-24" />
          </div>
          <p className="text-sm font-medium text-slate-400">Total Spent</p>
          <h3 className="text-3xl font-bold text-white mt-1">₹{totalSpent.toLocaleString()}</h3>
          <div className="mt-4 w-full bg-slate-800 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${progress > 100 ? 'bg-red-500' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute right-0 top-0 p-4 opacity-5">
            <AlertTriangle className="w-24 h-24" />
          </div>
          <p className="text-sm font-medium text-slate-400">Remaining</p>
          <h3 className={`text-3xl font-bold mt-1 ${totalRemaining < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {totalRemaining < 0 ? '-' : ''}₹{Math.abs(totalRemaining).toLocaleString()}
          </h3>
          <p className="text-xs text-slate-500 mt-4">
            {progress > 100 ? 'You have exceeded your total budget' : 'You are within your total budget'}
          </p>
        </Card>
      </div>

      {/* Budget Grid */}
      {budgets.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-white/5">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-medium text-white">No budgets set</h3>
          <p className="text-slate-400 max-w-sm mx-auto mt-2 mb-6">
            Set a budget for a category to start tracking your spending goals for {MONTHS.find(m => m.value === month)?.label}.
          </p>
          <Button onClick={() => setIsModalOpen(true)} variant="secondary" icon={Plus}>
            Create First Budget
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {budgets.map((b) => (
            <BudgetCard key={b._id} budget={b} />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Set Budget for ${MONTHS.find(m => m.value === month)?.label} ${year}`}
      >
        <BudgetForm
          month={month}
          year={year}
          onSave={handleSaveBudget}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </Layout>
  );
}
