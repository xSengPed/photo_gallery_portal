import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ assetId: string }> }
) {
  try {
    const { assetId } = await params;
    console.log('Fetching thumbnail for asset:', assetId);
    const response = await fetch(
      `https://photos.test-d.pro/api/assets/${assetId}/thumbnail`,
      {
        headers: {
          'x-api-key': '',
        },
        cache: 'force-cache',
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch thumbnail: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch thumbnail: ${response.status}`);
    }

    console.log('Thumbnail fetched successfully for:', assetId);

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching thumbnail:', error);
    return new NextResponse('Failed to fetch thumbnail', { status: 500 });
  }
}
