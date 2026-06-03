'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function StreamsPage() {
  const streams = [
    {
      id: 1,
      name: 'Premier Padel YouTube',
      url: 'https://www.youtube.com/@PremierPadelOfficial',
      live: true,
      viewers: '15.2K',
    },
    {
      id: 2,
      name: 'Red Bull TV',
      url: 'https://www.redbull.tv/',
      live: false,
      viewers: 'On Demand',
    },
    {
      id: 3,
      name: 'DirecTV Sports',
      url: 'https://www.directv.com/',
      live: false,
      viewers: 'Cable/Streaming',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-white mb-8">
              <span className="text-[#ff6b6b]">📺</span> Watch Live Streams
            </h1>

            <div className="space-y-4">
              {streams.map((stream) => (
                <a
                  key={stream.id}
                  href={stream.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[#1a1a1a] rounded-lg p-6 border border-[#2a2a2a] hover:border-[#00d97e] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{stream.name}</h3>
                        {stream.live && (
                          <span className="flex items-center gap-1 text-xs bg-[#ff6b6b] text-white px-2 py-1 rounded">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            LIVE
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400">{stream.viewers} viewers</p>
                    </div>
                    <div className="text-4xl">→</div>
                  </div>
                </a>
              ))}
            </div>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">Upcoming Live Streams</h2>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a]"
                  >
                    <p className="text-white font-semibold mb-1">Tournament Match - Premier Padel</p>
                    <p className="text-gray-400 text-sm">
                      Tomorrow at 14:00 - Lebron & Navarro vs Belasteguin & Gutierrez
                    </p>
                    <p className="text-[#00d97e] text-xs mt-2">YouTube</p>
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
