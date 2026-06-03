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

    const response = await axios.get(`${PADEL_API_BASE}/matches?limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${PADEL_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    const cacheHeaders = {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    };

    return Response.json(response.data, { headers: cacheHeaders });
  } catch (error) {
    console.error('Schedule API error:', error);

    const mockData = {
      matches: [
        {
          id: '101',
          player1: { name: 'Juan Lebron' },
          player2: { name: 'Paquito Navarro' },
          player3: { name: 'Fernando Belasteguin' },
          player4: { name: 'Sanyo Gutierrez' },
          tournament: 'Premier Padel',
          date: new Date(Date.now() + 86400000).toISOString(),
          time: '14:00',
          status: 'scheduled',
        },
        {
          id: '102',
          player1: { name: 'Alejandro Galan' },
          player2: { name: 'Pablo Carreno' },
          player3: { name: 'Arturo Codesido' },
          player4: { name: 'Lolito Sainz' },
          tournament: 'FIP Platinum',
          date: new Date(Date.now() + 172800000).toISOString(),
          time: '16:00',
          status: 'scheduled',
        },
      ],
    };

    return Response.json(mockData);
  }
}
