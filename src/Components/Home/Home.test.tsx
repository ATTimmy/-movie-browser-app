import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';

vi.mock('../../Api/Home/fetchHomeData', () => ({
  fetchTrendingMovies: vi.fn(),
  fetchTopRatedMovies: vi.fn(),
  fetchUpcomingMovies: vi.fn(),
}));

import {
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../../Api/Home/fetchHomeData';

const mockData = {
  results: [
    { id: 1, title: 'Movie One' },
    { id: 2, title: 'Movie Two' },
  ],
};

describe('<Home />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (fetchTrendingMovies as ReturnType<typeof vi.fn>).mockResolvedValue(mockData);
    (fetchTopRatedMovies as ReturnType<typeof vi.fn>).mockResolvedValue(mockData);
    (fetchUpcomingMovies as ReturnType<typeof vi.fn>).mockResolvedValue(mockData);
  });

  it('shows loading initially', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText(/Loading movies.../i)).toBeInTheDocument();
    });
  });

  it('renders lists after loading', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Trending')).toBeInTheDocument();
      expect(screen.getByText('Top Rated')).toBeInTheDocument();
      expect(screen.getByText('Upcoming')).toBeInTheDocument();
    });

    expect(screen.getAllByRole('listitem')).toHaveLength(6);
  });

  it('logs error if fetch fails', async () => {
    const error = new Error('API failure');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    (fetchTrendingMovies as ReturnType<typeof vi.fn>).mockRejectedValueOnce(error);
    (fetchTopRatedMovies as ReturnType<typeof vi.fn>).mockResolvedValue(mockData);
    (fetchUpcomingMovies as ReturnType<typeof vi.fn>).mockResolvedValue(mockData);

    render(<Home />);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith('Failed fetching movies', error);
    });

    spy.mockRestore();
  });
});
