'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'হোম', icon: '🕌' },
  { href: '/calculator', label: 'ক্যালকুলেটর', icon: '🧮' },
  { href: '/recipients', label: 'প্রাপক', icon: '🤲' },
  { href: '/faq', label: 'প্রশ্নোত্তর', icon: '❓' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-200 z-50 safe-area-bottom">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16">
        {navItems.map(item => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors min-w-[60px] ${
                isActive
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-primary-600'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`text-xs font-semibold ${isActive ? 'text-primary-600' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
