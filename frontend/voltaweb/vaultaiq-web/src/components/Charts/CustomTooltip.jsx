export default function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-slate-900 text-white px-3 py-2 rounded text-sm">
      <p className="font-semibold">{payload[0].name}</p>
      <p>₹{payload[0].value}</p>
    </div>
  );
}
