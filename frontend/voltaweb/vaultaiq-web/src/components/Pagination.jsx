import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";

export default function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <Button
        variant="secondary"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="!px-3"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <span className="text-slate-400 text-sm font-medium bg-slate-800/50 px-4 py-2 rounded-xl border border-white/5">
        Page <span className="text-white">{page}</span> of <span className="text-white">{pages}</span>
      </span>

      <Button
        variant="secondary"
        disabled={page === pages}
        onClick={() => onPageChange(page + 1)}
        className="!px-3"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
