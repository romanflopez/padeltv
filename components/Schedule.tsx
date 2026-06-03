'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Match {
  id: string;
  player1: { name: string };
  player2: { name: string };
  player3: { name: string };
  player4: { name: string };
  tournament: string;
  date: string;
  time: string;
  status: string;
}

export default function Schedule() {
  const { data, isLoading } = useSWR('/api/padel/schedule?limit=20', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
  });

  const matches: Match[] = data?.matches || [];

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-[#1a1a1a] rounded-lg p-4 animate-pulse h-20" />
        ))}
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-3">
      {matches.slice(0, 10).map((match) => (
        <div
          key={match.id}
          className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a] hover:border-[#00d97e] transition-colors cursor-pointer hover:bg-[#252525]"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-[#00d97e] text-black px-2 py-1 rounded">
                  {match.tournament}
                </span>
                <span className="text-xs text-gray-500">{formatDate(match.date)}</span>
              </div>
              <p className="text-white text-sm mb-1">
                {match.player1.name} / {match.player2.name}
              </p>
              <p className="text-gray-400 text-sm">
                vs {match.player3.name} / {match.player4.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-[#00d97e]">{match.time}</p>
              <p className="text-xs text-gray-500">
                {new Date(match.date) > new Date() ? 'Upcoming' : 'Finished'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
