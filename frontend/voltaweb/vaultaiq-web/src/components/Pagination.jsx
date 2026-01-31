export default function Pagination({ page, pages, onPageChange }) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 bg-slate-700 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-slate-400">
        Page {page} of {pages}
      </span>

      <button
        disabled={page === pages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 bg-slate-700 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
