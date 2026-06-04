import { getAllMatches } from '@/lib/scrapers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');

    console.log('Scraping news...');

    const matches = await getAllMatches();

    // Convert matches to news format
    const news = matches.slice(0, limit).map((match: any, i: number) => ({
      id: `news-${i}`,
      title: match.title || `Match: ${match.id}`,
      description: `Tournament: ${match.tournament}`,
      date: match.date,
      source: match.source || match.tournament,
    }));

    const cacheHeaders = {
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
    };

    return Response.json(
      {
        news: news,
        total: matches.length,
        source: 'FIP + Premier Padel',
      },
      { headers: cacheHeaders }
    );
  } catch (error: any) {
    console.error('Scraping error:', error.message || error);

    return Response.json(
      { error: 'Failed to fetch news', details: error.message },
      { status: 500 }
    );
  }
}
