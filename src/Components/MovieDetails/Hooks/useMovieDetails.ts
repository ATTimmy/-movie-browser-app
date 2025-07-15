import { useEffect, useState } from 'react';
import type { Movie } from '../../Home/Types/movie.types';
import { fetchMovieDetails } from '../../../Api/MovieDetails/fetchMovieDetails';

export function useMovieDetails(id?: string) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(id);
        if (isMounted) {
          setMovie(data);
        }
      } catch (error) {
        console.error('Failed to load movie details', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMovie();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { movie, loading };
}
