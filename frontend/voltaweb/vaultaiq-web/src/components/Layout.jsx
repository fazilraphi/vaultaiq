import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div
      className="
        min-h-screen
        bg-slate-100 text-slate-500
        dark:bg-slate-900 dark:text-slate-100
        transition-colors duration-300
      "
    >
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
