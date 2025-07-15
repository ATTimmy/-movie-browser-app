import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMovieDetails } from './useMovieDetails';
import * as api from '../../../Api/MovieDetails/fetchMovieDetails';

const mockMovie = {
  id: 1,
  title: 'Inception',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  overview: 'Mind-bending thriller',
  release_date: '2010-07-16',
  runtime: 148,
  vote_average: 8.8,
  genres: [{ id: 1, name: 'Sci-Fi' }],
};

describe('useMovieDetails', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should set loading and fetch movie data by ID', async () => {
    vi.spyOn(api, 'fetchMovieDetails').mockResolvedValue(mockMovie);

    const { result } = renderHook(() => useMovieDetails('1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.movie).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movie).toEqual(mockMovie);
  });

  it('should handle fetch error gracefully', async () => {
    vi.spyOn(api, 'fetchMovieDetails').mockRejectedValue(new Error('API Error'));
    const { result } = renderHook(() => useMovieDetails('1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.movie).toBe(null);
    expect(result.current.movie).toBe(null);
  });

  it('should not run fetch if id is undefined', () => {
    const spy = vi.spyOn(api, 'fetchMovieDetails');
    renderHook(() => useMovieDetails(undefined));
    expect(spy).not.toHaveBeenCalled();
  });
});
