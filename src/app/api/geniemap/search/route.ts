import { NextResponse } from 'next/server';
import { queryGenieMapLive } from '@/lib/genieMapLiveService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || 'Downtown Dubai';

  try {
    const data = await queryGenieMapLive(q);
    return NextResponse.json({ success: true, query: q, data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'GenieMap search failed' },
      { status: 500 }
    );
  }
}
