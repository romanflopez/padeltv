'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Schedule from '@/components/Schedule';

export default function SchedulePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl">
            <h1 className="text-3xl font-bold text-white mb-8">
              <span className="text-[#00d97e]">📅</span> Tournament Schedule
            </h1>

            <div className="mb-8 flex gap-4">
              <button className="px-4 py-2 rounded-lg bg-[#00d97e] text-black font-semibold hover:bg-[#00b866]">
                All Tournaments
              </button>
              <button className="px-4 py-2 rounded-lg bg-[#1a1a1a] text-white border border-[#2a2a2a] hover:border-[#00d97e]">
                Premier Padel
              </button>
              <button className="px-4 py-2 rounded-lg bg-[#1a1a1a] text-white border border-[#2a2a2a] hover:border-[#00d97e]">
                FIP Platinum
              </button>
            </div>

            <Schedule />
          </div>
        </main>
      </div>
    </div>
  );
}
