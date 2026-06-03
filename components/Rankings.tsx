'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface RankingEntry {
  rank: number;
  name: string;
  points: number;
  trend: string;
}

export default function Rankings() {
  const { data, isLoading } = useSWR('/api/padel/rankings?limit=50&category=men', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 600000,
  });

  const rankings: RankingEntry[] = data?.rankings || [];

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-[#1a1a1a] rounded-lg p-3 animate-pulse h-16" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {rankings.slice(0, 20).map((entry) => (
        <div
          key={entry.rank}
          className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a] hover:border-[#00d97e] transition-colors cursor-pointer hover:bg-[#252525] flex items-center justify-between"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="text-xl font-bold text-[#00d97e] w-8">#{entry.rank}</div>
            <div>
              <p className="text-white font-semibold">{entry.name}</p>
              <p className="text-sm text-gray-500">{entry.points.toLocaleString()} pts</p>
            </div>
          </div>
          <div className="text-2xl">
            {entry.trend === '↑' && <span className="text-[#00d97e]">↑</span>}
            {entry.trend === '↓' && <span className="text-[#ff6b6b]">↓</span>}
            {entry.trend === '→' && <span className="text-gray-500">→</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
