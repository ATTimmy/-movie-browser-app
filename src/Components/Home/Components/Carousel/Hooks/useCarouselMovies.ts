import { useEffect, useState } from 'react';
import type { Movie } from '../../../Types/movie.types';

export function useCarouselMovies(fetchFn: () => Promise<{ results: Movie[] }>) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadMovies = async () => {
      try {
        const res = await fetchFn();
        if (isMounted) {
          setMovies(res.results);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Failed to load movies', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, [fetchFn]);

  return { movies, loading };
}
