import { NextResponse } from 'next/server';
import { getStore } from '@netlify/blobs';

const STORE_NAME = 'zakat-app';
const KEY = 'view-count';

function isNetlify(): boolean {
  return !!process.env.NETLIFY || !!process.env.NETLIFY_BLOBS_CONTEXT;
}

async function getCount(): Promise<number> {
  if (isNetlify()) {
    try {
      const store = getStore(STORE_NAME);
      const data = await store.get(KEY, { type: 'text' });
      if (data) {
        return JSON.parse(data).count || 0;
      }
      return 0;
    } catch {
      return 0;
    }
  }
  // Local dev: file-based
  return getCountFromFile();
}

async function setCount(count: number): Promise<void> {
  if (isNetlify()) {
    try {
      const store = getStore(STORE_NAME);
      await store.set(KEY, JSON.stringify({ count }));
    } catch {
      // ignore
    }
    return;
  }
  // Local dev: file-based
  await setCountToFile(count);
}

async function getCountFromFile(): Promise<number> {
  try {
    const { readFile } = await import('fs/promises');
    const path = await import('path');
    const file = path.join(process.cwd(), '.data', 'views.json');
    const data = await readFile(file, 'utf-8');
    return JSON.parse(data).count || 0;
  } catch {
    return 0;
  }
}

async function setCountToFile(count: number): Promise<void> {
  try {
    const { writeFile, mkdir } = await import('fs/promises');
    const path = await import('path');
    const dir = path.join(process.cwd(), '.data');
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'views.json'), JSON.stringify({ count }), 'utf-8');
  } catch {
    // ignore
  }
}

export async function GET() {
  const count = await getCount();
  return NextResponse.json({ count });
}

export async function POST() {
  const count = await getCount();
  const newCount = count + 1;
  await setCount(newCount);
  return NextResponse.json({ count: newCount });
}
