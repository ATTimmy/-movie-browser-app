import { TMDB_BASE_URL } from '../Constants/apiConstants';
import { ENDPOINTS } from '../Constants/endpoints';

const token = import.meta.env.VITE_TMDB_TOKEN;

const fetchFromTMDB = async (endpoint: string) => {
  const res = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB fetch failed: ${res.status}`);
  }

  return res.json();
};

export const fetchTrendingMovies = () => fetchFromTMDB(ENDPOINTS.MOVIES_TRENDING);
export const fetchTopRatedMovies = () => fetchFromTMDB(ENDPOINTS.MOVIES_TOP_RATED);
export const fetchUpcomingMovies = () => fetchFromTMDB(ENDPOINTS.MOVIES_UPCOMING);
