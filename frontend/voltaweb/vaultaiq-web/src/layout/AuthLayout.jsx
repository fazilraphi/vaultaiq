import logo from "../assets/logo-icon.png";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="glass-card p-1">
          <div className="bg-slate-900/50 rounded-xl p-8 backdrop-blur-xl">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 p-3">
                <img src={logo} alt="VaultaIQ" className="w-full h-full object-contain brightness-200" />
              </div>
            </div>

            <h1 className="text-2xl font-bold font-heading text-white text-center tracking-tight mb-2">
              {title}
            </h1>

            {subtitle && (
              <p className="text-sm text-slate-400 text-center mb-8">
                {subtitle}
              </p>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
