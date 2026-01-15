import { NextResponse } from 'next/server';
import immichApi from '@/lib/axios';

export async function GET() {
  try {
    const { data } = await immichApi.get('/shared-links', {
      headers: {
        'Accept': 'application/json',
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching shared links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shared links' },
      { status: 500 }
    );
  }
}
