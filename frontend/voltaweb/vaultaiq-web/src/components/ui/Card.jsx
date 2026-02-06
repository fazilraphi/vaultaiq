export function Card({ children, className = "", hover = false }) {
    return (
        <div
            className={`glass-card p-6 border border-white/5 shadow-xl transition-all duration-300 ${hover ? "hover:scale-[1.02] hover:bg-slate-800/100" : ""
                } ${className}`}
        >
            {children}
        </div>
    );
}
