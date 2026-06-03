'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'Live Scores', href: '/scores', icon: '⚡' },
  { label: 'Schedule', href: '/schedule', icon: '📅' },
  { label: 'Rankings', href: '/rankings', icon: '🏆' },
  { label: 'News', href: '/news', icon: '📰' },
  { label: 'Streams', href: '/streams', icon: '📺' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-[#1a1a1a] min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#00d97e] text-black'
                  : 'text-gray-300 hover:bg-[#1a1a1a]'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
