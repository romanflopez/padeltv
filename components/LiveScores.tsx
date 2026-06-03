'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Match {
  id: string;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  sets1: number;
  sets2: number;
  status: 'live' | 'finished' | 'upcoming';
  time: string;
  tournament: string;
}

export default function LiveScores() {
  const { data: matches, isLoading, error } = useSWR(
    '/api/padel/matches?endpoint=matches',
    fetcher,
    { revalidateOnFocus: false }
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-[#1a1a1a] rounded-lg p-4 animate-pulse h-32" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg p-6 text-center">
        <p className="text-gray-400">Loading live scores...</p>
      </div>
    );
  }

  // Mock data for demo
  const mockMatches: Match[] = [
    {
      id: '1',
      team1: 'Tapia/Gutierrez',
      team2: 'Lebron/Padilla',
      score1: 6,
      score2: 4,
      sets1: 1,
      sets2: 0,
      status: 'live',
      time: 'NOW',
      tournament: 'Premier Padel',
    },
    {
      id: '2',
      team1: 'Brea/Chingotto',
      team2: 'De Ridder/Valkusz',
      score1: 5,
      score2: 3,
      sets1: 0,
      sets2: 0,
      status: 'live',
      time: 'NOW',
      tournament: 'FIP Platinum',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        <span className="text-[#00d97e]">🔴 LIVE</span> Now
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {mockMatches.map((match) => (
          <div
            key={match.id}
            className="bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#252525] transition-colors cursor-pointer border border-[#2a2a2a] hover:border-[#00d97e]"
          >
            <div className="text-xs text-[#00d97e] font-semibold mb-3">
              {match.tournament}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-300 truncate">{match.team1}</p>
                </div>
                <div className="text-right ml-2">
                  <p className="text-2xl font-bold text-white">
                    {match.score1}
                  </p>
                  <p className="text-xs text-gray-500">Set {match.sets1}</p>
                </div>
              </div>
              <div className="border-t border-[#2a2a2a]" />
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-300 truncate">{match.team2}</p>
                </div>
                <div className="text-right ml-2">
                  <p className="text-2xl font-bold text-white">
                    {match.score2}
                  </p>
                  <p className="text-xs text-gray-500">Set {match.sets2}</p>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#2a2a2a] flex items-center justify-between">
              <span className="text-xs text-[#ff6b6b]">● {match.time}</span>
              <span className="text-xs text-gray-500">LIVE</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
