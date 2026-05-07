export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 bg-white/5 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          AI Email Generator
        </h1>

        <p className="text-sm text-gray-400">
          Generate professional emails instantly
        </p>
      </div>
    </nav>
  );
}