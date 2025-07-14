import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import type { Movie } from '../../../Types/movie.types';
import { useCarouselMovies } from './useCarouselMovies';

const mockMovies: Movie[] = [
  { id: 1, title: 'Movie One', poster_path: '', backdrop_path: '' },
  { id: 2, title: 'Movie Two', poster_path: '', backdrop_path: '' },
];

describe('useCarouselMovies', () => {
  it('fetches and sets movies successfully', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ results: mockMovies });

    const { result } = renderHook(() => useCarouselMovies(fetchFn));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(result.current.movies).toEqual(mockMovies);
    expect(result.current.loading).toBe(false);
  });

  it('handles fetch error gracefully', async () => {
    const error = new Error('API failed');
    const fetchFn = vi.fn().mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useCarouselMovies(fetchFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(consoleSpy).toHaveBeenCalledWith('Failed to load movies', error);
    expect(result.current.movies).toEqual([]);
    expect(result.current.loading).toBe(false);

    consoleSpy.mockRestore();
  });
});
