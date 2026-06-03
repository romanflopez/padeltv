'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import News from '@/components/News';

export default function NewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-white mb-8">
              <span className="text-[#ff6b6b]">📰</span> Latest News
            </h1>

            <div className="mb-8 flex gap-4">
              <button className="px-4 py-2 rounded-lg bg-[#00d97e] text-black font-semibold hover:bg-[#00b866]">
                All News
              </button>
              <button className="px-4 py-2 rounded-lg bg-[#1a1a1a] text-white border border-[#2a2a2a] hover:border-[#00d97e]">
                Tournament News
              </button>
              <button className="px-4 py-2 rounded-lg bg-[#1a1a1a] text-white border border-[#2a2a2a] hover:border-[#00d97e]">
                Player Updates
              </button>
            </div>

            <News />
          </div>
        </main>
      </div>
    </div>
  );
}
