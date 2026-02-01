import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo-icon.png";

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
    `px-3 py-2 rounded-md text-sm font-medium transition-all ${
      isActive
        ? "bg-indigo-500/20 text-indigo-400"
        : "text-slate-300 hover:text-white hover:bg-white/5"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-[#0B1220]/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="VaultaIQ"
            className="w-8 h-8 opacity-85 contrast-90"
          />

          <span className="font-semibold text-lg text-white tracking-tight">
            VaultaIQ
          </span>
        </div>

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

          <div className="mx-2 h-5 w-px bg-white/10" />

          <ThemeToggle />

          <button
            onClick={handleLogout}
            className="ml-2 px-3 py-2 rounded-md text-sm font-medium
                       bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-200 text-xl"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-2 bg-[#0B1220]/95 backdrop-blur border-t border-white/5">
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

          <div className="pt-3 flex items-center justify-between">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium
                         bg-red-500/10 text-red-400 hover:bg-red-500/20"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
