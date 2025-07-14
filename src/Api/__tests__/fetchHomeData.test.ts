import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../Home/fetchHomeData';
import { TMDB_BASE_URL } from '../Constants/apiConstants';
import { ENDPOINTS } from '../Constants/endpoints';

global.fetch = vi.fn();

const mockResponse = {
  results: [{ id: 1, title: 'Test Movie' }],
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe('fetchHomeData', () => {
  it('fetches trending movies', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await fetchTrendingMovies();
    expect(fetch).toHaveBeenCalledWith(
      `${TMDB_BASE_URL}${ENDPOINTS.MOVIES_TRENDING}`,
      expect.any(Object)
    );
    expect(result).toEqual(mockResponse);
  });

  it('fetches top rated movies', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await fetchTopRatedMovies();
    expect(fetch).toHaveBeenCalledWith(
      `${TMDB_BASE_URL}${ENDPOINTS.MOVIES_TOP_RATED}`,
      expect.any(Object)
    );
    expect(result).toEqual(mockResponse);
  });

  it('fetches upcoming movies', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await fetchUpcomingMovies();
    expect(fetch).toHaveBeenCalledWith(
      `${TMDB_BASE_URL}${ENDPOINTS.MOVIES_UPCOMING}`,
      expect.any(Object)
    );
    expect(result).toEqual(mockResponse);
  });

  it('throws error when fetch fails', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: false, status: 500 });

    await expect(fetchTrendingMovies()).rejects.toThrow('TMDB fetch failed: 500');
  });
});
