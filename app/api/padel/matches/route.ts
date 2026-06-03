import axios from 'axios';

const PADEL_API_BASE = 'https://padelapi.org/api';
const PADEL_API_TOKEN = process.env.PADEL_API_TOKEN;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint') || 'list-live-matches';
    const limit = searchParams.get('limit') || '10';

    if (!PADEL_API_TOKEN) {
      console.error('PADEL_API_TOKEN not configured');
      return Response.json(
        { error: 'API token not configured' },
        { status: 500 }
      );
    }

    const url = `${PADEL_API_BASE}/${endpoint}?page_size=${limit}`;

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${PADEL_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    // Cache for 60 seconds
    const cacheHeaders = {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    };

    return Response.json(response.data, { headers: cacheHeaders });
  } catch (error) {
    console.error('Padel API error:', error);

    // Return mock data on error (for demo)
    const mockData = {
      matches: [
        {
          id: '1',
          player1: { name: 'Juan Lebron' },
          player2: { name: 'Paquito Navarro' },
          player3: { name: 'Fernando Belasteguin' },
          player4: { name: 'Sanyo Gutierrez' },
          score: { set1: '6-4', set2: '5-3' },
          tournament: 'Premier Padel',
          status: 'live',
        },
        {
          id: '2',
          player1: { name: 'Alejandro Galan' },
          player2: { name: 'Pablo Carreno' },
          player3: { name: 'Arturo Codesido' },
          player4: { name: 'Lolito Sainz' },
          score: { set1: '4-6', set2: '6-4', set3: '4-2' },
          tournament: 'FIP Platinum',
          status: 'live',
        },
      ],
    };

    return Response.json(mockData);
  }
}
