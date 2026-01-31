import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-700"
    }`;

  return (
    <nav className="bg-slate-800 dark:bg-slate-900 border-b border-slate-700 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <h1 className="font-bold text-indigo-400 text-lg">VaultaIQ</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/expenses" className={linkClass}>
            Expenses
          </NavLink>
          <NavLink to="/budgets" className={linkClass}>
            Budgets
          </NavLink>
          <NavLink to="/analytics" className={linkClass}>
            Analytics
          </NavLink>

          <ThemeToggle />

          <button
            onClick={handleLogout}
            className="ml-2 px-3 py-2 rounded-md text-sm font-medium
              bg-red-600 hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-200 focus:outline-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-slate-800 dark:bg-slate-900">
          <NavLink to="/" onClick={() => setOpen(false)} className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink
            to="/expenses"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            Expenses
          </NavLink>
          <NavLink
            to="/budgets"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            Budgets
          </NavLink>
          <NavLink
            to="/analytics"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            Analytics
          </NavLink>

          <div className="pt-2 flex items-center justify-between">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium
                bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
