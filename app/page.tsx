'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LiveScores from '@/components/LiveScores';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl">
            <LiveScores />

            {/* Upcoming matches section */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                📅 Upcoming Matches (Next 24h)
              </h2>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a] hover:border-[#00d97e] transition-colors cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm text-[#00d97e] font-semibold">
                        FIP Platinum Tour
                      </p>
                      <p className="text-white mt-1">Team A vs Team B</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Tomorrow</p>
                      <p className="text-white font-semibold">14:00</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Top players section */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                🏆 Top 5 Players
              </h2>
              <div className="grid grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a] text-center hover:bg-[#252525] transition-colors cursor-pointer"
                  >
                    <div className="text-2xl font-bold text-[#00d97e] mb-2">
                      #{i + 1}
                    </div>
                    <p className="text-white text-sm font-semibold">Player Name</p>
                    <p className="text-gray-500 text-xs mt-2">1,250 pts</p>
                  </div>
                ))}
              </div>
            </section>

            {/* News section */}
            <section className="mt-12 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                📰 Latest News
              </h2>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a] hover:bg-[#252525] transition-colors cursor-pointer"
                  >
                    <p className="text-white font-semibold">
                      Breaking news title about padel...
                    </p>
                    <p className="text-gray-400 text-sm mt-2">2 hours ago</p>
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
