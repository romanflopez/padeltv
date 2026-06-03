import axios from 'axios';

const PADEL_API_BASE = 'https://api.padelapi.org';
const PADEL_API_TOKEN = process.env.PADEL_API_TOKEN;

export async function GET(request: Request) {
  try {
    if (!PADEL_API_TOKEN) {
      return Response.json({ error: 'API token not configured' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '50';
    const category = searchParams.get('category') || 'men';

    const response = await axios.get(
      `${PADEL_API_BASE}/rankings?limit=${limit}&category=${category}`,
      {
        headers: {
          'Authorization': `Bearer ${PADEL_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );

    const cacheHeaders = {
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
    };

    return Response.json(response.data, { headers: cacheHeaders });
  } catch (error) {
    console.error('Rankings API error:', error);

    const mockData = {
      rankings: [
        { rank: 1, name: 'Juan Lebron', points: 2500, trend: '↑' },
        { rank: 2, name: 'Paquito Navarro', points: 2450, trend: '↓' },
        { rank: 3, name: 'Fernando Belasteguin', points: 2400, trend: '→' },
        { rank: 4, name: 'Sanyo Gutierrez', points: 2350, trend: '↑' },
        { rank: 5, name: 'Alejandro Galan', points: 2300, trend: '↓' },
        { rank: 6, name: 'Pablo Carreno', points: 2250, trend: '→' },
        { rank: 7, name: 'Arturo Codesido', points: 2200, trend: '↑' },
        { rank: 8, name: 'Lolito Sainz', points: 2150, trend: '↑' },
        { rank: 9, name: 'Martin Diestro', points: 2100, trend: '↓' },
        { rank: 10, name: 'Javi Garrido', points: 2050, trend: '→' },
      ],
    };

    return Response.json(mockData);
  }
}
