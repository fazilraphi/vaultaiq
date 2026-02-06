export function Button({
    children,
    onClick,
    variant = "primary",
    className = "",
    type = "button",
    disabled = false,
    icon: Icon,
}) {
    const baseStyles =
        "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide";

    const variants = {
        primary:
            "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 border border-white/10",
        secondary:
            "bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 hover:text-white shadow-md",
        danger:
            "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40",
        ghost: "text-slate-400 hover:text-white hover:bg-white/5",
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {Icon && <Icon className="w-4 h-4" />}
            {children}
        </button>
    );
}
