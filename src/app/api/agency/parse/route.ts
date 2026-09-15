import { NextResponse } from 'next/server';
import { parseAgencyWebsiteDna } from '@/lib/agencyDnaService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { websiteUrl } = body;

    if (!websiteUrl) {
      return NextResponse.json(
        { error: 'websiteUrl string is required' },
        { status: 400 }
      );
    }

    const agencyProfile = await parseAgencyWebsiteDna(websiteUrl);

    return NextResponse.json({
      success: true,
      message: `Successfully analyzed & parsed Agency DNA for ${agencyProfile.agencyName}`,
      agencyProfile,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Agency DNA parsing failed' },
      { status: 500 }
    );
  }
}
