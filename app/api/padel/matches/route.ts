import axios from 'axios';

const PADEL_API_BASE = 'https://api.padelapi.org';
const PADEL_API_TOKEN = process.env.PADEL_API_TOKEN || 'cidywGICE7z6Pd5DYUNcGCDn9GveyRakOk2RUdYgf0c09d34';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint') || 'matches';

    const response = await axios.get(`${PADEL_API_BASE}/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${PADEL_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    return Response.json(response.data);
  } catch (error) {
    console.error('Padel API error:', error);
    return Response.json(
      { error: 'Failed to fetch from Padel API' },
      { status: 500 }
    );
  }
}
