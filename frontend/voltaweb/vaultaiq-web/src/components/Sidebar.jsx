import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import {
    LayoutDashboard,
    Receipt,
    PiggyBank,
    BarChart3,
    LogOut,
    Moon,
    Sun,
    Menu,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo-icon.png";

export default function Sidebar({ isOpen, onClose }) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/" },
        { icon: Receipt, label: "Expenses", path: "/expenses" },
        { icon: PiggyBank, label: "Budgets", path: "/budgets" },
        { icon: BarChart3, label: "Analytics", path: "/analytics" },
    ];

    const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-white/5 transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `;

    return (
        <>
            <aside className={sidebarClasses}>
                <div className="flex flex-col h-full p-4">
                    {/* Header */}
                    <div className="flex items-center gap-3 px-2 mb-8">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-5 h-5 opacity-90 brightness-200"
                            />
                        </div>
                        <span className="font-heading font-bold text-xl tracking-tight text-white">
                            Vaulta<span className="text-indigo-400">IQ</span>
                        </span>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                                        ? "bg-indigo-500/10 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                                        : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                                    }
                `}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-white/5 space-y-2">


                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                />
            )}
        </>
    );
}
