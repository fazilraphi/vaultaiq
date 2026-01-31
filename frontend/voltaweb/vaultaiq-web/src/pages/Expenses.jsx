import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseFilters from "../components/ExpenseFilters";
import Pagination from "../components/Pagination";
import {
  getExpenses,
  addExpense,
  deleteExpense,
} from "../api/expense.api";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    from: "",
    to: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, [page, filters]);

  const fetchExpenses = async () => {
    const res = await getExpenses({
      page,
      limit: 10,
      ...filters,
    });

    setExpenses(res.data.results);
    setPages(res.data.pages);
  };

  const handleAddExpense = async (data) => {
    await addExpense(data);
    fetchExpenses();
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    await deleteExpense(id);
    fetchExpenses();
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Expenses</h2>

      <ExpenseForm onAdd={handleAddExpense} />

      <ExpenseFilters
        filters={filters}
        onChange={(f) => {
          setPage(1);
          setFilters(f);
        }}
      />

      <ExpenseTable
        expenses={expenses}
        onDelete={handleDeleteExpense}
      />

      <Pagination
        page={page}
        pages={pages}
        onPageChange={setPage}
      />
    </Layout>
  );
}
