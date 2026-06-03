import axios from 'axios';

const PADEL_API_BASE = 'https://api.padelapi.org';
const PADEL_API_TOKEN = process.env.PADEL_API_TOKEN;

export async function GET(request: Request) {
  try {
    if (!PADEL_API_TOKEN) {
      return Response.json({ error: 'API token not configured' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '20';

    const response = await axios.get(`${PADEL_API_BASE}/news?limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${PADEL_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    const cacheHeaders = {
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
    };

    return Response.json(response.data, { headers: cacheHeaders });
  } catch (error) {
    console.error('News API error:', error);

    const mockData = {
      news: [
        {
          id: '1',
          title: 'Lebron and Navarro dominate Premier Padel Finals',
          description: 'Juan Lebron and Paquito Navarro continue their winning streak...',
          date: new Date(Date.now()).toISOString(),
          source: 'Premier Padel',
          image: 'https://via.placeholder.com/400x300',
        },
        {
          id: '2',
          title: 'FIP Announces new tournament schedule for 2026',
          description: 'The International Padel Federation releases the official calendar...',
          date: new Date(Date.now() - 3600000).toISOString(),
          source: 'FIP',
          image: 'https://via.placeholder.com/400x300',
        },
        {
          id: '3',
          title: 'Galan and Carreno break rankings record',
          description: 'The duo reaches historic points milestone in the world rankings...',
          date: new Date(Date.now() - 7200000).toISOString(),
          source: 'Padel World',
          image: 'https://via.placeholder.com/400x300',
        },
      ],
    };

    return Response.json(mockData);
  }
}
