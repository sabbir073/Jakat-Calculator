'use client';

import { useEffect, useState } from 'react';

export default function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/views', { method: 'POST' })
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span>মোট ভিজিটর: {count.toLocaleString('bn-BD')} জন</span>
    </div>
  );
}
