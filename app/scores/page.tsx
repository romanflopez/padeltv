'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LiveScores from '@/components/LiveScores';

export default function ScoresPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl">
            <h1 className="text-3xl font-bold text-white mb-8">
              <span className="text-[#ff6b6b]">⚡</span> Live Scores
            </h1>
            <LiveScores />

            {/* Recent results */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">📊 Recent Results</h2>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a]"
                  >
                    <p className="text-sm text-[#00d97e] font-semibold mb-2">FIP Platinum</p>
                    <p className="text-white text-sm mb-2">Team A vs Team B</p>
                    <p className="text-gray-400 text-sm">6-4, 5-3</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
