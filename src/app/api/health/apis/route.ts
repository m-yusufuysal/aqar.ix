import { NextResponse } from 'next/server';
import { getModernApiStackHealth } from '@/lib/modernApiStack';

export async function GET() {
  const health = getModernApiStackHealth();
  return NextResponse.json({ success: true, ...health });
}
