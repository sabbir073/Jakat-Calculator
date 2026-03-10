import { NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '.data');
const COUNTER_FILE = path.join(DATA_DIR, 'views.json');

async function getCount(): Promise<number> {
  try {
    const data = await readFile(COUNTER_FILE, 'utf-8');
    return JSON.parse(data).count || 0;
  } catch {
    return 0;
  }
}

async function setCount(count: number): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(COUNTER_FILE, JSON.stringify({ count }), 'utf-8');
  } catch {
    // ignore write errors
  }
}

// GET: return current count
export async function GET() {
  const count = await getCount();
  return NextResponse.json({ count });
}

// POST: increment and return new count
export async function POST() {
  const count = await getCount();
  const newCount = count + 1;
  await setCount(newCount);
  return NextResponse.json({ count: newCount });
}
