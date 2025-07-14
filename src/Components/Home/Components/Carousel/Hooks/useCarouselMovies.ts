import { useEffect, useState } from 'react';
import type { Movie } from '../../../Types/movie.types';

export function useCarouselMovies(fetchFn: () => Promise<{ results: Movie[] }>) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const res = await fetchFn();
        setMovies(res.results);
      } catch (error) {
        console.error('Failed to load movies', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [fetchFn]);

  return { movies, loading };
}
