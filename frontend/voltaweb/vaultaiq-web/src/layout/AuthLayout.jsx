import logo from "../assets/logo-icon.png";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1220] via-[#0E1628] to-black relative overflow-hidden">
      {/* subtle noise */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="VaultaIQ" className="w-12 h-12" />
        </div>

        <h1 className="text-2xl font-semibold text-white text-center">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-slate-400 text-center mt-1 mb-6">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </div>
  );
}
