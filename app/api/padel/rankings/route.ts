import { getAllRankings } from '@/lib/scrapers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    console.log('Scraping rankings...');

    const rankings = await getAllRankings();
    const limitedRankings = rankings.slice(0, limit);

    const cacheHeaders = {
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=2400',
    };

    return Response.json(
      {
        rankings: limitedRankings,
        total: rankings.length,
        source: 'FIP',
      },
      { headers: cacheHeaders }
    );
  } catch (error: any) {
    console.error('Scraping error:', error.message || error);

    return Response.json(
      { error: 'Failed to fetch rankings', details: error.message },
      { status: 500 }
    );
  }
}
