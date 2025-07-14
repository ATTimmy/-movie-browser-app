import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';

vi.mock('./Components/Carousel/Carousel', () => ({
  default: ({ title }: { title: string }) => <div>{title} Carousel</div>,
}));

vi.mock('../../Api/Home/fetchHomeData', () => ({
  fetchTrendingMovies: vi.fn().mockResolvedValue({ results: [] }),
  fetchTopRatedMovies: vi.fn().mockResolvedValue({ results: [] }),
  fetchUpcomingMovies: vi.fn().mockResolvedValue({ results: [] }),
}));

describe('<Home />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the Home component with all carousels', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/🎬 Movie Browser/i)).toBeInTheDocument();
      expect(screen.getByText(/Trending Carousel/)).toBeInTheDocument();
      expect(screen.getByText(/Top Rated Carousel/)).toBeInTheDocument();
      expect(screen.getByText(/Upcoming Carousel/)).toBeInTheDocument();
    });
  });
});
