import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
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

  it('renders the Home component with all carousels', () => {
    render(<Home />);

    expect(screen.getByText(/Trending/i)).toBeInTheDocument();
    expect(screen.getByText(/Top Rated/i)).toBeInTheDocument();
    expect(screen.getByText(/Upcoming/i)).toBeInTheDocument();
  });
});
