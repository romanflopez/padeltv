'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Player {
  name: string;
}

interface Match {
  id: string;
  player1: Player;
  player2: Player;
  player3: Player;
  player4: Player;
  score: { set1: string; set2?: string; set3?: string };
  tournament: string;
  status: 'live' | 'finished' | 'upcoming';
}

export default function LiveScores() {
  const { data, isLoading, error } = useSWR(
    '/api/padel/matches?endpoint=matches&limit=6',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 30000, // Refresh every 30s
    }
  );

  const matches: Match[] = data?.matches || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-[#1a1a1a] rounded-lg p-4 animate-pulse h-40" />
        ))}
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg p-6 text-center border border-[#2a2a2a]">
        <p className="text-gray-400">No live matches right now</p>
        <p className="text-gray-500 text-sm mt-2">Check back soon for live pádel action</p>
      </div>
    );
  }

  const liveMatches = matches.filter(m => m.status === 'live');

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        <span className="text-[#ff6b6b]">🔴 LIVE</span> Now
      </h2>
      {liveMatches.length === 0 ? (
        <div className="bg-[#1a1a1a] rounded-lg p-6 text-center border border-[#2a2a2a]">
          <p className="text-gray-400">No live matches</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {liveMatches.slice(0, 4).map((match) => (
            <div
              key={match.id}
              className="bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#252525] transition-colors cursor-pointer border border-[#2a2a2a] hover:border-[#00d97e]"
            >
              <div className="text-xs text-[#00d97e] font-semibold mb-3">
                {match.tournament}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 truncate">
                      {match.player1.name} / {match.player2.name}
                    </p>
                  </div>
                  <div className="text-right ml-2 flex-shrink-0">
                    <p className="text-2xl font-bold text-white">
                      {match.score.set1?.split('-')[0]}
                    </p>
                  </div>
                </div>
                <div className="border-t border-[#2a2a2a]" />
                <div className="flex justify-between items-center">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 truncate">
                      {match.player3.name} / {match.player4.name}
                    </p>
                  </div>
                  <div className="text-right ml-2 flex-shrink-0">
                    <p className="text-2xl font-bold text-white">
                      {match.score.set1?.split('-')[1]}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-[#2a2a2a] flex items-center justify-between">
                <span className="text-xs text-[#ff6b6b]">● LIVE</span>
                <span className="text-xs text-gray-500">{match.score.set2 ? 'Set 2' : 'Set 1'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
