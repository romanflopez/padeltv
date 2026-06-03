'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  source: string;
  image?: string;
}

export default function News() {
  const { data, isLoading } = useSWR('/api/padel/news?limit=20', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
  });

  const news: NewsItem[] = data?.news || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-[#1a1a1a] rounded-lg p-4 animate-pulse h-24" />
        ))}
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-4">
      {news.slice(0, 15).map((item) => (
        <div
          key={item.id}
          className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a] hover:border-[#00d97e] transition-colors cursor-pointer hover:bg-[#252525]"
        >
          <div className="flex gap-4">
            {item.image && (
              <div className="w-20 h-20 bg-gray-700 rounded flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-[#00d97e] font-semibold">{item.source}</span>
                <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
              </div>
              <h3 className="text-white font-semibold mb-1 line-clamp-2">{item.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
