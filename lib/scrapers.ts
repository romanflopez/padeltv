// Temporary scrapers - will be improved
// For now, returning mock data that looks real

export async function scrapeFIPTournaments() {
  return [
    { id: 'fip-1', name: 'FIP Platinum Tour - Madrid', date: '2026-06-15', location: 'Madrid, Spain', source: 'FIP' },
    { id: 'fip-2', name: 'FIP Gold Tour - Barcelona', date: '2026-06-22', location: 'Barcelona, Spain', source: 'FIP' },
    { id: 'fip-3', name: 'Cupra FIP Tour - Valencia', date: '2026-07-01', location: 'Valencia, Spain', source: 'FIP' },
  ];
}

export async function scrapeFIPRankings() {
  return [
    { rank: 1, name: 'Juan Lebron', points: 2850, trend: '↑' },
    { rank: 2, name: 'Paquito Navarro', points: 2800, trend: '↓' },
    { rank: 3, name: 'Fernando Belasteguin', points: 2750, trend: '→' },
    { rank: 4, name: 'Sanyo Gutierrez', points: 2700, trend: '↑' },
    { rank: 5, name: 'Alejandro Galan', points: 2650, trend: '↑' },
  ];
}

export async function scrapeFIPResults() {
  return [
    { id: 'fip-r1', title: 'Lebron/Navarro vs Belasteguin/Gutierrez', score: '6-4, 5-3', date: new Date().toISOString(), tournament: 'FIP', status: 'finished' },
    { id: 'fip-r2', title: 'Galan/Carreno vs Codesido/Sainz', score: '4-6, 6-4, 4-2', date: new Date(Date.now() - 3600000).toISOString(), tournament: 'FIP', status: 'finished' },
  ];
}

export async function scrapePremierPadelMatches() {
  return [
    { id: 'pp-1', player1: { name: 'Juan Lebron' }, player2: { name: 'Paquito Navarro' }, player3: { name: 'Fernando Belasteguin' }, player4: { name: 'Sanyo Gutierrez' }, score: { set1: '6-4' }, tournament: 'Premier Padel', status: 'live' },
    { id: 'pp-2', player1: { name: 'Alejandro Galan' }, player2: { name: 'Pablo Carreno' }, player3: { name: 'Arturo Codesido' }, player4: { name: 'Lolito Sainz' }, score: { set1: '5-3' }, tournament: 'Premier Padel', status: 'live' },
  ];
}

export async function scrapePremierPadelSchedule() {
  return [
    { id: 'pp-s1', name: 'Premier Padel P1 - Madrid', date: '2026-06-10', location: 'Madrid, Spain', tournament: 'Premier Padel', status: 'scheduled' },
    { id: 'pp-s2', name: 'Premier Padel P2 - Barcelona', date: '2026-06-20', location: 'Barcelona, Spain', tournament: 'Premier Padel', status: 'scheduled' },
  ];
}

export async function getAllMatches() {
  const fipResults = await scrapeFIPResults();
  const ppMatches = await scrapePremierPadelMatches();
  return [...fipResults, ...ppMatches];
}

export async function getAllTournaments() {
  const fipTournaments = await scrapeFIPTournaments();
  const ppSchedule = await scrapePremierPadelSchedule();
  return [...fipTournaments, ...ppSchedule];
}

export async function getAllRankings() {
  return await scrapeFIPRankings();
}
