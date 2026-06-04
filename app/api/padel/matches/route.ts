import { getAllMatches } from '@/lib/scrapers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    console.log('Scraping matches from FIP and Premier Padel...');

    const matches = await getAllMatches();
    const limitedMatches = matches.slice(0, limit);

    const cacheHeaders = {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    };

    return Response.json(
      {
        matches: limitedMatches,
        total: matches.length,
        source: 'FIP + Premier Padel',
      },
      { headers: cacheHeaders }
    );
  } catch (error: any) {
    console.error('Scraping error:', error.message || error);

    return Response.json(
      { error: 'Failed to fetch matches', details: error.message },
      { status: 500 }
    );
  }
}
