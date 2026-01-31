export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {subtitle && (
        <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
