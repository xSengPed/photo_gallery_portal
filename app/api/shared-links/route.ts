import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://photos.test-d.pro/api/shared-links', {
      headers: {
        'Accept': 'application/json',
        'x-api-key' : '',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();

    // Log to check if assetCount is available
    if (data.length > 0 && data[0].album) {
      console.log('Album data structure:', JSON.stringify(data[0].album, null, 2));
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching shared links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shared links' },
      { status: 500 }
    );
  }
}
