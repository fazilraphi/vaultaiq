import { Trash2 } from "lucide-react";

export default function ExpenseTable({ expenses, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-700 text-slate-300">
          <tr>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2">Category</th>
            <th className="p-2">Merchant</th>
            <th className="p-2">Note</th>
            <th className="p-2">Date</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr
              key={e._id}
              className="border-b border-slate-700 hover:bg-slate-800"
            >
              <td className="p-2">₹{e.amount}</td>
              <td className="p-2 text-center">{e.category}</td>
              <td className="p-2 text-center">{e.merchant || "-"}</td>
              <td className="p-2 text-center">{e.note || "-"}</td>
              <td className="p-2 text-center">
                {new Date(e.date).toLocaleDateString()}
              </td>
              <td className="p-2 text-center">
                <button
                  onClick={() => onDelete(e._id)}
                  className="text-red-400 hover:text-red-600"
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
