export default function Header() {
  return (
    <header className="bg-[#0f0f0f] border-b border-[#1a1a1a] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold">
            <span className="text-[#00d97e]">Padel</span>
            <span className="text-white">TV</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search players, teams..."
            className="bg-[#1a1a1a] text-white placeholder-gray-500 rounded px-3 py-2 text-sm w-64 border border-[#2a2a2a] focus:border-[#00d97e] focus:outline-none"
          />
          <button className="text-gray-400 hover:text-white text-2xl">🔔</button>
          <button className="text-gray-400 hover:text-white">⚙️</button>
        </div>
      </div>
    </header>
  );
}
