export function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    className = "",
    icon: Icon,
    required = false,
    ...props
}) {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">
                    {label}
                </label>
            )}
            <div className="relative group">
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                        <Icon className="w-5 h-5" />
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`
            w-full bg-slate-900/50 text-white border border-slate-700/50 rounded-xl 
            ${Icon ? "pl-11" : "pl-4"} pr-4 py-3.5
            placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50
            transition-all duration-300
            hover:border-slate-600 hover:bg-slate-900/80
          `}
                    placeholder={placeholder}
                    {...props}
                />
            </div>
        </div>
    );
}
