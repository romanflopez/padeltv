import { getAllTournaments } from '@/lib/scrapers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');

    console.log('Scraping tournament schedule...');

    const tournaments = await getAllTournaments();
    const limitedTournaments = tournaments.slice(0, limit);

    const cacheHeaders = {
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
    };

    return Response.json(
      {
        matches: limitedTournaments,
        total: tournaments.length,
        source: 'FIP + Premier Padel',
      },
      { headers: cacheHeaders }
    );
  } catch (error: any) {
    console.error('Scraping error:', error.message || error);

    return Response.json(
      { error: 'Failed to fetch schedule', details: error.message },
      { status: 500 }
    );
  }
}
