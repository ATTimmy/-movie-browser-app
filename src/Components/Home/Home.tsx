import { useEffect, useState } from 'react';
import {
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../../Api/Home/fetchHomeData';

type Movie = {
  id: number;
  title: string;
};

export default function Home() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [trendingRes, topRatedRes, upcomingRes] = await Promise.all([
          fetchTrendingMovies(),
          fetchTopRatedMovies(),
          fetchUpcomingMovies(),
        ]);

        setTrending(trendingRes.results);
        setTopRated(topRatedRes.results);
        setUpcoming(upcomingRes.results);
      } catch (err) {
        console.error('Failed fetching movies', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <p>Loading movies...</p>;

  return (
    <div>
      <h1>Welcome to Movie Browser App!</h1>

      <h2>Trending</h2>
      <ul>
        {trending.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>

      <h2>Top Rated</h2>
      <ul>
        {topRated.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>

      <h2>Upcoming</h2>
      <ul>
        {upcoming.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
