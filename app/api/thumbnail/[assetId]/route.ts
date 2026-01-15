import { NextRequest, NextResponse } from 'next/server';
import immichApi from '@/lib/axios';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ assetId: string }> }
) {
  try {
    const { assetId } = await params;
    console.log('Fetching thumbnail for asset:', assetId);

    const response = await immichApi.get(`/assets/${assetId}/thumbnail`, {
      responseType: 'arraybuffer',
    });

    console.log('Thumbnail fetched successfully for:', assetId);

    const contentType = response.headers['content-type'] || 'image/jpeg';

    return new NextResponse(response.data, {
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
